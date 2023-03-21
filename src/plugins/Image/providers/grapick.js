export let name = 'Grapick';
let gp = undefined;
let currentId = '';
let instance = {};
let dialog = undefined;

export function Init(context,id) {
    let grapick = false;
    let spectrum = false;
    Array.from(document.head.querySelectorAll('script[src]')).forEach((el) => {
        if (el.src.indexOf('grapick.min.js')!==-1) grapick=true;
        if (el.src.indexOf('spectrum.min.js')!==-1) spectrum=true;
    });
    if (!grapick) Include('js/grapick/grapick.min.js','js/grapick/grapick.min.css');
    if (!spectrum) Include('js/spectrum/spectrum.min.js', 'js/spectrum.min.css');

    instance = context;
    currentId = `provider-${context.fileid}-${id}`;
    const content = StringToFragment(`
    <dialog id="${currentId}" class="ImageProvider">
        <form method="dialog">
            <p><button id="choose" value="Use gradient"></button> <button value="cancel">Cancel</button>
            <div class="Preview">
                <div id="gp"></div>
            </div>
        </form>
    </dialog>
    `.replace(/[\n\t]/g,''));
    document.body.appendChild(content);
    dialog = document.body.querySelector(`#${currentId}`);
    // dialog.querySelector('#choose').addEventListener('click', search);
    dialog.addEventListener('close', (event) => {
        if (dialog.returnValue=="Use gradient" && instance.callback && typeof instance.callback == 'function') {
            instance.hotlink = true; // skip 'downloading' and use raw value
            instance.callback({
                src: gp.getValue()
            }, instance, true);
        }
    });
}

export function Show() {
  // cnp from https://github.com/artf/grapick
    gp = new Grapick({
        el: dialog.querySelector('#gp'),
        direction: 'right',
        min: 1,
        max: 99,
        colorEl: '<input id="colorpicker"/>' // I'll use this for the custom color picker
    });

    gp.addHandler(1, '#085078', 1);
    gp.addHandler(99, '#85D8CE', 1, { keepSelect: 1 });
    gp.on('change', function(complete) {
        const value = gp.getValue();
        dialog.querySelector('.Preview').style.backgroundImage = value;
    })
    gp.emit('change');

    gp.setColorPicker(handler => {
        const el = handler.getEl().querySelector('#colorpicker');
        const $el = $(el);

        $el.spectrum({
            color: handler.getColor(),
            showAlpha: true,
            change(color) {
                handler.setColor(color.toRgbString());
            },
            move(color) {
                handler.setColor(color.toRgbString(), 0);
            }
        });

        // return a function in order to destroy the custom color picker
        return () => {
            $el.spectrum('destroy');
        }
    });
}