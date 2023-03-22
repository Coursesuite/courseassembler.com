export let name = 'Pexels';
export let icon = 'ninja-pexels';
let currentId = '';
let instance = {};
let dialog = undefined;

export function Init(context,id) {
    instance = context;
    currentId = `provider-${context.fileid}-${id}`;
    const content = StringToFragment(`
    <dialog id="${currentId}" class="ImageProvider">
        <form method="dialog">
            <p>
                <input type="text" size="40" placeholder="Search Pexels for ...">
                <button id="execute_search" value="search">Search</button> <button value="cancel">Cancel</button>
            </p>
            <div class="SearchResults"></div>
        </form>
    </dialog>
    `.replace(/[\n\t]/g,''));
    document.body.appendChild(content);
    dialog = document.body.querySelector(`#${currentId}`);
    dialog.querySelector('#execute_search').addEventListener('click', search);
    dialog.addEventListener('close', (event) => {
        if (dialog.returnValue=="search") { event.stopPropagation(); event.preventDefault(); return;}
    });

}

export function Show() {
    dialog.showModal();
}

function performApiCall(qs) {
    fetch(document.location.href.split('/').slice(0,-1).join('/') + '/plugins/Image/providers/pexels.php?' + qs, {
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
    }
}

function useImage(event) {
    event.preventDefault();
    const figure = event.target.closest('figure');
    let data = Object.assign({}, ...Object.keys(figure.dataset).map(key => { return {[key]:figure.dataset[key]} }));

    Choose({
        src: data.src,
        attribution: `This <a href="${data.url}" target="_blank">Photo</a> was taken by <a href="${data.photographerUrl}" target="_blank">${data.photographer}</a> on Pexels.`
    });
}

function showError(message) {
    console.error(message);
    dialog.querySelector('.SearchResults').textContent = 'A search error occurred. See developer console for details.';
}


function render(results) {
    const node = dialog.querySelector('.SearchResults');
    // console.log('results',results);
    node.innerHTML = '';
    results.photos.forEach((photo) => {
        const figure = StringToFragment(`
        <figure data-photo-id="${photo.id}" data-photographer="${photo.photographer}" data-url="${photo.url}" data-photographer-url="${photo.photographer_url}" data-src="${photo.src.portrait}" title="${photo.alt}">
            <img src="${photo.src.portrait}" alt="${photo.alt}">
            <a href='#select'>Use</a>
            <figcaption>${photo.id}</figcaption>
        </figure>
        `.replace(/[\n\t]/g,''));
        node.appendChild(figure);

    });
    Array.from(node.querySelectorAll(`a[href='#select']`)).forEach((a) => { a.addEventListener('click', useImage) });
    if (results.hasOwnProperty('next_page') || results.hasOwnProperty('prev_page')) {
        const p = document.createElement('p');
        p.classList.add('PagingBar');
        node.appendChild(p);
        let link = '';

        if (results.hasOwnProperty('prev_page')) {
            link = document.createElement('a');
            link.href = '?' + results.prev_page.split('?').pop();
            link.textContent = "< Previous";
            link.addEventListener('click', (event) => {
                event.preventDefault();
                performApiCall(event.target.href.split('?').pop());
            });
            p.appendChild(link);
        }

        if (results.hasOwnProperty('next_page')) {
            link = document.createElement('a');
            link.href = '?' + results.next_page.split('?').pop();
            link.textContent = "Next >";
            link.addEventListener('click', (event) => {
                event.preventDefault();
                performApiCall(event.target.href.split('?').pop());
            });
            p.appendChild(link);
        }

    }
    return results;
}

function Choose(data) {
    if (instance.callback && typeof instance.callback == 'function') {
        instance.callback(data, instance, true);
    }
    // .. reset
    // instance = {};
    // currentId = '';

    dialog.close();
}