/* plugin is currently assuming once instance on a page */
(function (DocNinja, undefined) {
	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.Image = DocNinja.Plugins.Image || {};
	DocNinja.Plugins.Image.Providers = [];
	DocNinja.Plugins.Image.Instances = [];

	function LoadProviders(instance) {
		if (DocNinja.Plugins.Image.Providers.length) return;
		import('./providers.js').then((module) => {
			module.providers.forEach((provider,index) => {
				DocNinja.Plugins.Image.Providers.push({"Name": provider.name, "Plugin": provider});
				if (typeof provider.Init === 'function') {
					provider.Init(DocNinja.Plugins.Image.Instances[instance], index);
				}
			})
		});
	}

	// Get the plugin instance given its name
	DocNinja.Plugins.Image.GetInstance = function(name) {
		if (!name) return undefined;
		return DocNinja.Plugins.Image.Providers.filter((o)=>o.Name===name).pop().Plugin;
	}

	function AddStyle(doc, path) {
		const tag = document.createElement('link');
		tag.rel = "stylesheet";
		tag.type = "text/css";
		tag.href = document.location.href.split('/').slice(0,-1).join('/') + path; // full path required to load inside blob object urls
		doc.querySelector('head').appendChild(tag);

	}

	function setupDom(instance) {

		const domTarget = DocNinja.Plugins.Image.Instances[instance].target;

		let style = window.getComputedStyle(domTarget.parentNode);
		if (style.getPropertyValue("position")!=="absolute"&&style.getPropertyValue("position")!=="fixed") {
			domTarget.parentNode.position = "absolute";
 		}

		const doc = domTarget.closest("html");
		const id = 'i'+(new Date().getTime()).toString(36);

		const css = `
			position:absolute;top:10px;right:10px;
			width:40px;line-height:40px;
			background:var(--button-bg);
			border-radius:20px;
			color:white;
			text-shadow: 1px 1px 0 #00000040;
			box-shadow:0 3px 5px ##ffffff7f;
			padding:0 10px;
			cursor:pointer;
		`.replace(/\s{2,}/g,'');

		const node = StringToFragment(`<div style="${css}" id="${id}" data-instance="${instance}"><i class="ninja-stack-empty"></i></div>`);
		domTarget.appendChild(node); // node will now be a blank DocumentFragment since its elements "moved out"
		domTarget.querySelector('#'+id).addEventListener('click', Open);

		let needsFont = true, needsCss = true;
		Array.from(doc.querySelectorAll("link[href]")).forEach((el) => {
			if (el.href.indexOf('//')===1&&el.href.indexOf('/font/style.css')!==-1) needsFont = false;
			if (el.href.indexOf('//')===1&&el.href.indexOf('/plugins/Image/plugin.css')!==-1) needsCss = false;
		});
		if (needsFont) AddStyle(doc,'/css/font/style.css');
		if (needsCss) AddStyle(doc,'/plugins/Image/plugin.css');
	}

	function Open(event) {
		const p = event.target.closest('div');
		const f = p.parentNode.querySelector('[data-form]');
		if (f) {
			RemoveListeners(f);
			f.parentNode.removeChild(f);
			p.removeAttribute('data-open');
			return;
		}
		p.setAttribute('data-open', true);
		const r = getRelativePosition(p);
		const s = parseInt(getComputedStyle(p).getPropertyValue('right'),10);
		const arrow = 10;
		const providers = [];
		const actions = [];
		const bias = [];
		const options = DocNinja.Plugins.Image.Instances[+p.dataset.instance];

		const tint = '#f4f4f4'; // var(--toolbar)

		DocNinja.Plugins.Image.Providers.forEach((n) => {
			providers.push(`<a href="#" data-provider="${n.Name}"><i class="ninja-image1"></i>${n.Name}</a>`);
		});

		if (options.settable.indexOf('position')!==-1) {
			actions.push(`<a href="#" data-settable="position" data-setting="top left" title="Align to top left"><i class="ninja-settings-topleft"></i></a>`);
			actions.push(`<a href="#" data-settable="position" data-setting="center" title="Align to middle"><i class="ninja-settings-center"></i></a>`);
		}
		if (options.settable.indexOf('size')!==-1) {
			actions.push(`<a href="#" data-settable="size" data-setting="cover" title="Fill container"><i class="ninja-settings-cover"></i></a>`);
			actions.push(`<a href="#" data-settable="size" data-setting="contain" title="Fit image"><i class="ninja-settings-contain"></i></a>`);
			actions.push(`<a href="#" data-settable="size" data-setting="unset" title="Natural size"><i class="ninja-settings-natural"></i></a>`);
		}
		if (options.settable.indexOf('bias')!==-1) {
			bias.push(`<div class="Bias">`);
			bias.push(`<a href="#" data-settable="bias" data-setting="flex-50-50 left" title="Split (left)"><i class="ninja-bias-left-50"></i></a>`);
			bias.push(`<a href="#" data-settable="bias" data-setting="flex-50-50 right" title="Split (right)"><i class="ninja-bias-right-50"></i></a>`);
			bias.push(`<a href="#" data-settable="bias" data-setting="flex-30-70 left" title="Narrow split (left)"><i class="ninja-bias-left-25"></i></a>`);
			bias.push(`<a href="#" data-settable="bias" data-setting="flex-30-70 right" title="Narrow split (right)"><i class="ninja-bias-right-25"></i></a>`);
			bias.push(`<a href="#" data-settable="bias" data-setting="flex-fill left" title="No image"><i class="ninja-bias-fill"></i></a>`);
			bias.push(`</div>`);
		}

		const node = StringToFragment(`
			<div data-form="true" class="ImagePlugin" data-instance="${p.dataset.instance}">
				<div style="position:absolute;top:${r.top + r.height - arrow}px;right:${s + (r.width/2) - arrow}px;border:${arrow}px solid transparent;border-bottom-color:${tint};"></div>
				<div style="position:absolute;top:${r.top + r.height + arrow}px;right:${s}px;background:${tint};box-shadow:0 4px 5px #0000007f;padding:10px;width:auto;">
					<div class="Providers">${providers.join('')}</div>
					<div class="Actions">${actions.join('')}</div>
					${bias.join('')}
				</div>
			</div>
		`.replace(/[\n\t]/g,''));
		p.parentNode.appendChild(node);

		// select defaults
		options.settable.forEach((v)=> {
			const setting = options.setup[v];
			if ('bias'===v&&!/(left|right)/.test(setting)) setting+= ' left'; // set a bias if missing
			var d = p.parentNode.querySelector(`a[data-settable="${v}"][data-setting="${setting}"]`);
			// console.log('settable foreach', v, options.setup[v], setting, d);
			if (d) d.classList.add('active');
		});

		AttachListeners(p.parentNode.querySelector('.ImagePlugin'));
	}

	function AttachListeners(element) {
		element.addEventListener('click', ImagePluginClick);
	}
	function RemoveListeners(element) {
		element.removeEventListener('click', ImagePluginClick);
	}

	function ImagePluginClick(event) {
		event.stopPropagation();
		event.preventDefault();
		const target = event.target.nodeName == 'I' ? event.target.parentNode : event.target;
		const instance = DocNinja.Plugins.Image.Instances[+this.dataset.instance];
		if ('provider' in target.dataset) {
			const plugin = DocNinja.Plugins.Image.GetInstance(target.dataset.provider);
			if (plugin) plugin.Show(instance);
		}
		if ('settable' in target.dataset) {
			// switch(target.dataset.settable) {
			// 	case "size":
			// 	case "bias":
			// 	case "position":
			// 		Array.from(instance.target.querySelectorAll(`a[data-settable="${target.dataset.settable}"]`)).forEach((v)=>{
			// 			v.classList[v.dataset.setting==target.dataset.setting?'add':'remove']('active');
			// 		});
			// 		break;
			// }
			instance.callback({
				[`payload.${target.dataset.settable}`]: target.dataset.setting
			}, instance, true);
		}
	}

	// given a source image, download it (no hotlinking)
	function DownloadSource(src, hotlink = false) {
		return new Promise(function(ready,failed) {
			if (hotlink) ready(src);
			fetch(src)
				.then((res) => res.blob())
				.then((blob) => {
					const reader = new FileReader();
					reader.onload = () => {
						ready(reader.result);
					}
					reader.onerror = failed;
					reader.readAsDataURL(blob);
				}).catch(failed);
		})
	}

	DocNinja.Plugins.ImageSelector = function(domTarget, options = {}) {

		if (typeof domTarget === 'string') domTarget = document.querySelector(domTarget); // bug?
		if (!domTarget) return;

		let i = DocNinja.Plugins.Image.Instances.length;
		DocNinja.Plugins.Image.Instances.push({});

		const app = (()=>{for(var a=self,b=0;null==a.DocNinja&&null!==a.parent&&a.parent!==a;){if(7<++b)return null;a=a.parent}return a})();
		let defaults = {
			app, // frame reference
			fileid: app.DocNinja.filePreview.CurrentFile(), // current file reference
			attribution: null, // element to write attribution to or null
			element: null, // if null assume background on target
			target: domTarget, // target to append to
			ignore: [], // name of provider
			hotlink: false, // allow hotlinking or force downloading
			settable: ['position','size','source'], // supported actions
			callback: function(data, instance, reload = false) {
				// console.info('inside callback', instance, data);
				if (typeof data === 'string') { // upload, gradient
					saveToCurrentFile({
						"payload.image": data,
						"payload.attribution": ""
					}).then(() => {
						if (reload) app.DocNinja.filePreview.Refresh();
					});
				} else if (data.hasOwnProperty("src")) { // api image selection

					DownloadSource(data.src, instance.hotlink)
						.then((base64) => {
							return saveToCurrentFile({
								"payload.image": base64,
								"payload.attribution": data.attribution
							})
						})
						.then(() => {
							if (reload) app.DocNinja.filePreview.Refresh();
						});
				} else {
					saveToCurrentFile(data).then(() => {
						if (reload) app.DocNinja.filePreview.Refresh();
					});
				}
			},
			instance: i,
			setup: {bias:'flex-50-50 left', size:'cover', position:'center'}
		}

		Object.assign(DocNinja.Plugins.Image.Instances[i], defaults, options);

		setupDom(i);
		LoadProviders(i);

	}

})(window.DocNinja = window.DocNinja || {});