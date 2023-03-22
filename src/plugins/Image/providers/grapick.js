export let name = 'Grapick';
export let icon = 'ninja-settings-gradient';
let gp = undefined;
let currentId = '';
let instance = {};
let dialog = undefined;
let swType = undefined;
let swAngle = undefined;
let copyText = undefined;

export function Init(context,id) {
    let grapick = false;
    let spectrum = false;
    Array.from(document.head.querySelectorAll('script[src]')).forEach((el) => {
        if (el.src.indexOf('grapick.min.js')!==-1) grapick=true;
        if (el.src.indexOf('spectrum.min.js')!==-1) spectrum=true;
    });
    if (!grapick) Include('js/grapick/grapick.min.js','js/grapick/grapick.min.css');
    if (!spectrum) Include('js/spectrum/spectrum.min.js', 'js/spectrum/spectrum.min.css');

    if (!document.head.querySelector('style#grapick')) {
        const tag = document.createElement('style'); tag.id = 'grapick';
        tag.appendChild(document.createTextNode(`.Preview .container{position:absolute;width:85%;max-width:360px;height:200px;left:0;right:0;margin:auto;top:0;bottom:0}.Preview .grapick-cont{box-shadow:0 20px 50px rgba(0, 0, 0, 0.3);border-radius:3px;margin:-15px;padding:25px 15px;width:100%;min-height:100px;background:white}.Preview .grp-preview{border-radius:3px}.Preview .grp-wrapper{height:40px !important}.Preview .inputs{margin:25px 0 15px}.Preview .form-control{background-color:transparent;border:1px solid #ccc;border-radius:3px;height:30px;width:49%}.Preview .copy-grid{display:flex}.Preview .txt-value{flex-grow:1;background-color:#f1f1f1;padding:5px 7px;color:#555;min-height:30px;display:block;border:1px solid rgba(0, 0, 0, 0.1);border-radius:3px}`));
        document.head.appendChild(tag);
    }

    instance = context;
    currentId = `provider-${context.fileid}-${id}`;
    const content = StringToFragment(`
    <dialog id="${currentId}" class="ImageProvider">
        <form method="dialog">
            <p><button id="choose" value="choose">Use gradient</button> <button value="cancel">Cancel</button>
            <div class="Preview">

            <div class="container">
            <div class="grapick-cont">
                <div id="gp"></div>
                <div class="inputs">
                    <select class="form-control" id="switch-type">
                    <option value="">- Select Type -</option>
                    <option value="radial">Radial</option>
                    <option value="linear">Linear</option>
                    <option value="repeating-radial">Repeating Radial</option>
                    <option value="repeating-linear">Repeating Linear</option>
                    </select>

                    <select class="form-control" id="switch-angle">
                    <option value="">- Select Direction -</option>
                    <option value="top">Top</option>
                    <option value="right">Right</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    </select>
                </div>
                <div class="copy-grid">
                    <textarea class="txt-value" readonly></textarea>
                </div>
            </div>
            </div>

            </div>
        </form>
    </dialog>
    `.replace(/[\n\t]/g,''));
    document.body.appendChild(content);
    dialog = document.body.querySelector(`#${currentId}`);
    copyText = dialog.querySelector('.txt-value');
    swType = dialog.querySelector('#switch-type');
    swAngle = dialog.querySelector('#switch-angle');
    // dialog.querySelector('#choose').addEventListener('click', search);
    dialog.addEventListener('close', (event) => {
        if (dialog.returnValue=="choose" && instance.callback && typeof instance.callback == 'function') {
            instance.hotlink = true; // skip 'downloading' and use raw value
            instance.callback({
                src: copyText.value
            }, instance, true);
        }
    });
}

export function Show() {
  // https://github.com/artf/grapick
    gp = new Grapick({
        el: dialog.querySelector('#gp'),
        direction: 'right',
        min: 1,
        max: 99,
        colorEl: '<input id="colorpicker"/>' // I'll use this for the custom color picker
    });

    swType.addEventListener('change', function(e) {
        gp && gp.setType(this.value || 'linear');
    });

    swAngle.addEventListener('change', function(e) {
        gp && gp.setDirection(this.value || 'right');
    });

    gp.addHandler(1, '#085078', 1);
    gp.addHandler(99, '#85D8CE', 1, { keepSelect: 1 });
    gp.on('change', function(complete) {
        const value = gp.getValue();
        dialog.querySelector('.Preview').style.backgroundImage = value;
        copyText.value = value;
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

    dialog.showModal();
}