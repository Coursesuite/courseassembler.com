export let name = 'Upload';
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
                <input type="file" accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp">
            </p>
            <p>
                <img style="max-width:600px">
            </p>
            <p>
                <button value="cancel">Cancel</button>
                <button id="selectFromDialog" value="default">Choose</button>
            </p>
        </form>
    </dialog>
    `.replace(/[\n\t]/g,''));
    document.body.appendChild(content);
    dialog = document.body.querySelector(`#${currentId}`);
    dialog.querySelector('input[type="file"]').addEventListener('change', preview);
    dialog.addEventListener('close', () => {
        let src = dialog.querySelector(`img`).src;
        if (dialog.returnValue=="cancel") src = null;
        Select(src);
    });

}

export function Show() {
    dialog.showModal();
}

function preview(event) {
    const img = dialog.querySelector(`img`);
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
}

function Select(data) {
    if (instance.callback && typeof instance.callback == 'function') {
        instance.callback(data, instance, true);
    }
    instance = {};
    currentId = '';
}