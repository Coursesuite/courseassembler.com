export let name = 'Unsplash';
export let icon = 'ninja-unsplash';
let currentId = '';
let instance = {};
let dialog = undefined;
let page = 1;

export function Init(context,id) {
    instance = context;
    currentId = `provider-${context.fileid}-${id}`;
    const content = StringToFragment(`
    <dialog id="${currentId}" class="ImageProvider">
        <form method="dialog">
            <p>
                <button value="cancel" class="noborder"><i class="ninja-x"></i>Cancel</button>
                <input type="text" size="40" placeholder="Search Unsplash for ...">
                <button id="execute_search" value="search">Search</button>
            </p>
            <div class="SearchResults"></div>
        </form>
    </dialog>
    `.replace(/[\n\t]/g,''));
    document.body.appendChild(content);
    dialog = document.body.querySelector(`#${currentId}`);
    dialog.querySelector('#execute_search').addEventListener('click', search);
    dialog.addEventListener('close', (event) => {
        if (dialog.returnValue=="search") { event.stopPropagation(); event.preventDefault(); console.info('cancelling close'); return;}
    });

}

export function Show() {
    dialog.showModal();
}

function performApiCall(qs) {
    fetch(document.location.href.split('/').slice(0,-1).join('/') + '/plugins/Image/providers/unsplash.php?' + qs, {
        cache: 'no-store',
        referrerPolicy: 'no-referrer-when-downgrade'
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    })
    .then(json => render(json))
    .catch(showError);
}

function search(event) {
    event.preventDefault();
    event.stopPropagation();
    const field = dialog.querySelector(`input[type="text"]`);
    if (field.value.trim().length) {
        performApiCall('query=' + encodeURI(field.value));
        page = 1;
    }
}

function useImage(event) {
    event.preventDefault();
    const figure = event.target.closest('figure');
    let data = Object.assign({}, ...Object.keys(figure.dataset).map(key => { return {[key]:figure.dataset[key]} }));

    Choose({
        src: data.src,
        attribution: `<a href="${data.pageurl}" target="_blank">Image</a> by <a href="${data.photographer}" target="_blank">${data.user}</a> on Unsplash.`
    });
}

function showError(message) {
    console.error(message);
    dialog.querySelector('.SearchResults').textContent = 'A search error occurred. See developer console for details.';
}


function render(json) {
    const node = dialog.querySelector('.SearchResults');
    // console.log('results',results);
    node.innerHTML = '';
    json.results.forEach((photo) => {
        const figure = StringToFragment(`
        <figure data-photo-id="${photo.id}" data-photographer="${photo.user.links.html}" data-user="${photo.user.username}" data-pageurl="${photo.links.html}" data-src="${photo.urls.regular}" title="${photo.description}">
            <img src="${photo.urls.small}" alt="${photo.description}">
            <a href='#select'>Use</a>
            <figcaption>${photo.id}</figcaption>
        </figure>
        `.replace(/[\n\t]/g,''));
        node.appendChild(figure);

    });
    Array.from(node.querySelectorAll(`a[href='#select']`)).forEach((a) => { a.addEventListener('click', useImage) });
    if (page < parseInt(json.total_pages,10)) {
        const p = document.createElement('p');
        p.classList.add('PagingBar');
        node.appendChild(p);
        let link = '';

        const field = dialog.querySelector(`input[type="text"]`);
        const type = dialog.querySelector(`select`);

        if (page > 1) {
            link = document.createElement('a');
            link.href = '?query=' + encodeURI(field.value) + '&page=' + (page-1);
            link.textContent = "< Previous";
            link.addEventListener('click', (event) => {
                page--;
                event.preventDefault();
                performApiCall(event.target.href.split('?').pop());
            });
            p.appendChild(link);
        }

        link = document.createElement('a');
        link.href = '?query=' + encodeURI(field.value) + '&page=' + (page+1);
        link.textContent = "Next >";
        link.addEventListener('click', (event) => {
            page++;
            event.preventDefault();
            performApiCall(event.target.href.split('?').pop());
        });
        p.appendChild(link);
    }
    return json;
}

function Choose(data) {
    if (instance.callback && typeof instance.callback == 'function') {
        instance.hotlink = true; // required for unsplash
        instance.callback(data, instance, true);
    }
    // .. reset
    // instance = {};
    // currentId = '';

    dialog.close();
}