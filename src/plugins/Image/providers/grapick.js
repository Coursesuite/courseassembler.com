export let name = 'Gradient';
export let icon = 'ninja-settings-gradient';
let gp = undefined;
let currentId = '';
let instance = {};
let dialog = undefined;
let swType = undefined;
let swAngle = undefined;
let copyText = undefined;
const presets = [
    ['#ffffff'],
    ['#e5e5e5'],
    ['#000000'],
    ['#4158D0', '#C850C0', '#FFCC70'],
    ['#FA8BFF', '#2BD2FF', '#2BFF88'],
    ['#FF3CAC', '#784BA0', '#2B86C5'],
    ['#FBAB7E', '#F7CE68'],
    ['#0093E9', '#80D0C7'],
    ['#F4D03F', '#16A085'],
    ['#FAACA8', '#DDD6F3'],
    ['#FAD961', '#F76B1C'],
    ['#649173', '#dbd5a4'],
    ['#e6dada', '#274046'],
    ['#eeeeee', '#999999'],
];

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
            <div class='flex-split'>
                <button value="cancel" class="noborder"><i class="ninja-x"></i>Cancel</button>
                <button id="choose" value="choose">Use gradient</button>
            </div>
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
                    <option value="top left">&nwarr;</option>
                    <option value="top">&uarr;</option>
                    <option value="top right">&nearr;</option>
                    <option value="right">&rarr;</option>
                    <option value="bottom right">&searr;</option>
                    <option value="bottom">&darr;</option>
                    <option value="bottom left">&swarr;</option>
                    <option value="left">&larr;</option>
                    <option value="center">Center</option>
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
    const spl = dialog.querySelector('.flex-split > button:first-of-type');
    presets.forEach((v, i) => {
        const a = document.createElement('a');
        a.href = '#'+i;
        a.innerHTML = '&nbsp;';
        let s = 'linear-gradient(to right, ' + v.map((c, j) => {
            return c + [' 0%',' 50%',' 100%'][j]
        }).join(',') + ')';
        a.style.backgroundColor = v[0];
        a.style.backgroundImage = s;
        a.addEventListener('click', selectPreset);
        spl.insertAdjacentElement("afterend", a);
    });
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

function selectPreset(event) {
    const preset = presets[parseInt(event.target.href.split('#').pop(),10)];
    gp.clear();
    preset.forEach((v,i) => {
        switch (preset.length) {
            case 1: gp.addHandler(1, v, 1, { keepSelect: 1 }); break;
            case 2: gp.addHandler([10,90].map(n=>n+randomIntFromInterval(-6,8))[i], v, 1, { keepSelect: 1 }); break;
            case 3: gp.addHandler([5,45,95].map(n=>n+randomIntFromInterval(-7,5))[i], v, 1, { keepSelect: 1 }); break;
        }
    });
    gp.emit('change');
}

export function Show() {
  // https://github.com/artf/grapick
    gp = new Grapick({
        el: dialog.querySelector('#gp'),
        direction: 'right',
        min: 1,
        max: 99,
       // colorEl: '<input id="colorpicker"/>' // I'll use this for the custom color picker
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

    // gp.setColorPicker(handler => {
    //     const el = handler.getEl().querySelector('#colorpicker');
    //     const $el = $(el);

    //     $el.spectrum({
    //         color: handler.getColor(),
    //         showAlpha: true,
    //         change(color) {
    //             handler.setColor(color.toRgbString());
    //         },
    //         move(color) {
    //             handler.setColor(color.toRgbString(), 0);
    //         }
    //     });

    //     // return a function in order to destroy the custom color picker
    //     return () => {
    //         $el.spectrum('destroy');
    //     }
    // });

    dialog.showModal();
}