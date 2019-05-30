function postToIframe(data,url,target){
	console.log(data,url,target);
    $('body').append('<form action="'+url+'" method="post" target="'+target+'" id="postToIframe"></form>');
    $.each(data,function(n,v){
        $('#postToIframe').append("<input type='hidden' name='"+n+"' value='"+v.replace("'","&apos;").replace('"',"&quot;")+"' />");
    });
    $('#postToIframe').submit().remove();
}
$(function () {
	var _options = $(".theme-preview-options"),
		_iframe = $("#theme-preview"),
		$dd = $("#theme-layout");
	$dd.on("change", function (event) {
		var qs = $.param({
			theme: event.target.value,
			bgc: $("#theme-bgc").val(),
			fgc: $("#theme-fgc").val(),
			bgi: "", //$("#theme-bgi").dataset.src,
			hi: "", //$("#theme-hi").dataset.src,
			font: "",
			menu: document.querySelector("#theme-oc").checked ? 1 : 0,
			name: $("#ocn").val(),
			description: $("#ocd").val(),
			copyright: $("#occ").val()
		});
		var nav = [];
		localforage.iterate(function (value, key, iterationNumber) {
			if (key.indexOf("file-") != -1) {
				nav.push({
					"index": iterationNumber,
					"title": $.trim($("li[data-fileid='" + key + "']").text().replace(/\s+/g," ")),
					"score": ~~value.score||1,
					"content": ("youtube vimeo soundcloud slideshare".indexOf(value.format)!=-1) ? "media" : value.kind,
					"href": "preview.html?" + key,
					"depth": Math.max(0,+value.depth||0),
					"audio": value.payload.hasOwnProperty("mp3") && value.payload.mp3.length ? md5(value.payload.mp3)+".mp3" : undefined
	         	});
	        }
	    }).then(function () {
	    	var data = {nav:JSON.stringify(nav)};
	    	postToIframe(data,"plugins/Theme/theme.php?"+qs,"_theme-preview");
	    });
	});
	App.Themes.forEach(function (obj) {
		var key = Object.keys(obj)[0];
		$dd.append($("option").val(key).text(obj[key].name));
	});
	$dd.trigger("change");
});