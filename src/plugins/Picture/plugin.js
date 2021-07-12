(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.Picture = DocNinja.Plugins.Picture || {};

	DocNinja.Plugins.Picture.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterAction({
			plugin: context,
			icon: '<div class="ga-picture"><a data-action="add-picture-page"><i class="ninja-image1"></i>Captioned image</a></div>',
			type: 'page',
			order: 7,
			supports: ['edit','view','compile','audio'],
			handler: 'add-picture-page'
		});
	};

	DocNinja.Plugins.Picture.Add = function () {
		var newId = DocNinja.PurityControl.Nav.GetFileId(),
			fileInfo = {
				name: "Picture",
				kind: "plugin",
				plugin: "Picture",
				depth: 0,
				payload: {}
			};
		localforage.setItem(newId, fileInfo).then(function(obj) {
			DocNinja.PurityControl.Nav.Add(DocNinja.navItems, newId, fileInfo, null, "ready");
			window.setItemOrder();
			DocNinja.filePreview.Select(newId);
		});
	}

	function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

	// html: loaded from plugins/Intro/styleX.html
	// payload: obj.payload object from localstorage instance
	DocNinja.Plugins.Picture.Compile = function (html, payload) {
		if (!html) return '';
		var doc = document.implementation.createHTMLDocument('untitled');
		doc.documentElement.innerHTML = html;
		var src = payload.image || payload.url;
		if (src.length && doc.querySelector("img[src]")) doc.querySelector("img[src]").src = src;
		var styleNode = doc.getElementById("main"),
			css = styleNode.textContent,
			font = payload.hasOwnProperty('font') ? payload.font : 'Roboto',
			fontUrl = font.replace(' ', '+'),
			pageBg = payload.backgroundColour || '#000000',
			figBg = payload.figureBackground || 'transparent',
			headerShadow = rgba(contrastingColour(payload.headerColour),.5), // 50% of black or white
			headerBg = rgba(contrastingColour(payload.headerColour),.1), // 10% of black or white
			captionShadow = rgba(contrastingColour(payload.captionColour),.5),
			captionBg = rgba(contrastingColour(payload.captionColour),.2),
			headerNode = doc.querySelector('.header'),
			captionNode = doc.querySelector('.caption');

		// don't render figure background if its the same as the body
		if (figBg === pageBg) figBg = "transparent";

		// remove img zoom if not required
		if (!payload.zoom) {
			const nodes = Array.from(doc.querySelectorAll("head [id^='zoom']"));
			for (let node of nodes) {
				if (node) node.parentNode.removeChild(node);
			}
		}

		// replace fonts
		css = css.replace("&family=Montserrat", `&family=${fontUrl}`);
		css = css.replace("font-family:-apple-system,",`font-family:'${font}',-apple-system,`);

		// replace colour variables
		css = css.replace("--header: #333333;",`--header:${payload.headerColour};`);
		css = css.replace("--caption: #666666;",`--caption:${payload.captionColour};`);
		css = css.replace("--pbg: #000000;",`--pbg:${pageBg};`);
		css = css.replace("--fbg: transparent;",`--fbg:${figBg};`);
		css = css.replace("--hbg: rgba(255,255,255,.1);",`--hbg:${headerBg};`);
		css = css.replace("--cbg: rgba(255,255,255,.2);",`--cbg:${captionBg};`);
		css = css.replace("--hs: black",`--hs:${headerShadow}`);
		css = css.replace("--cs: black",`--cs:${captionShadow}`);
		styleNode.textContent = css;

		// update or remove header and caption
		if (payload.hasOwnProperty('header') && payload.header.length) {
			headerNode.textContent = payload.header;
		} else {
			headerNode.parentNode.removeChild(headerNode);
		}
		if (payload.hasOwnProperty('caption') && payload.caption.length) {
			captionNode.innerHTML = payload.caption.replace(/\n/g,'<br>');
		} else {
			captionNode.parentNode.removeChild(captionNode);
		}

		return "<!DOCTYPE html>" + doc.documentElement.outerHTML;
	}

})(window.DocNinja = window.DocNinja || {});