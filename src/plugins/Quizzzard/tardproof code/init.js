var htmlTree = [],
	_global_tab_count = 0,
	_debug = false;
$.jstree._themes = "/engine/layout/third-party/jstree/themes/";

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');}


if(typeof String.prototype.safeForXml !== 'function') {
	String.prototype.safeForXml = function() {
		return this.replace(/\&/g,"&amp;").replace(/\'/g, "&apos;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;");
	}
}

var _runtimes = ['1.2','2004'];

// numbers match the VISUAL order of the tabs, not their actual id's
var enTabs = {
	"CourseConfig": 0,
	"VisualLayout": 1,
	"Hacks": 2,
	"Page": 3,
	"Content": 4,
	"Quiz": 5
}

var _fields = ["title", "fileName", "type", "contribute", "contributeScore", "contributePercentage", "nav", "template"];
var _fx = ["none", "blindX", "blindY", "blindZ", "cover", "curtainX", "curtainY", "fade", "fadeZoom", "growX", "growY", "scrollUp", "scrollDown", "scrollLeft", "scrollRight", "scrollHorz", "scrollVert", "shuffle", "slideX", "slideY", "toss", "turnUp", "turnDown", "turnLeft", "turnRight", "uncover", "wipe", "zoom"];

$(function () {

	if ($("#page_template").length) {
	$("#page_template").layout({
		contentSelector: ".content",
		applyDefaultStyles: true,
		north: {
			size: 150
		},
		west: {
			size: 250
		},
		east: {
			size: 250,
			initClosed: true,
			maxSize: 250
		},
		applyDemoStyles: true
	});
	}

	var shiftHeld = false;
	
	// bootstrap doesn't know which button closes a modal, so tag the div
	$("div[role='dialog'] .modal-footer button").each(function (index, el) {
		var $el = $(el);
		$el.click(function () {
			if ($el.text().toLowerCase() != "cancel") {
				$el.closest("div[role='dialog']").attr("data-action","saved");
			}
		})
	})

	$(".action-check-shift")
	    .on('mousedown', function (e) { shiftHeld = e.shiftKey })
	    .on('click', function (e) {
	    	var t = $(this)
    		if (!shiftHeld) {
    			window.open(t.attr("href") + "&wrap=true", t.attr("target"));
    			e.preventDefault();
    		}
		});
	
	var _current_xml;
	$.get("/engine/action.asp?id=" + _courseid + "&action=ajax_loadfix_pagesxml", function (data) {
		$.cachedScript("/engine/pages/edit/nav.xmltree.js").done(function() {
			__init__xmltree(data);
		});
	});

	// interface building happens when you click a tab
	$("#tabs").tabs({
		activate: function(event, ui) {
		
			$("div[id^='tabs-']:not(#tabs-1)").empty();
			
			// CRITICAL! unbind everthing bound by "on" inside this tab, if any.
			$("div[id^='tabs-']").each(function(){$(this).off();}); 

			/*
			 * Edit course settings (raw property editor)
			 */
			if ( ui.newTab.index() == enTabs.CourseConfig) {

				$.cachedScript("/engine/pages/edit/tab.courseconfig.js").done(function() {
					__init__courseconfig();
				});

			/*
			 * Edit course layout (visual layout editor)
			 */
			} else if ( ui.newTab.index() == enTabs.VisualLayout) {

				$.cachedScript("/engine/pages/edit/tab.visuallayout.js").done(function() {
					__init__visuallayout();
				});

			/*
			 * Style edit screen, rename, and all the other bits that don't fit anywhere else
			 */
			} else if ( ui.newTab.index() == enTabs.Hacks) {

				$.cachedScript("/engine/pages/edit/tab.hacks.js").done(function() {
					__init__hacks();
				});

			/*
			 * Content edit screen
			 */
				
			} else if ( ui.newTab.index() == enTabs.Content) { // edit content

				$.cachedScript("/engine/pages/edit/tab.content.js").done(function() {
					__init__content();
				});

			/*
			 * Quiz edit screen
			 */
				
			} else if ( ui.newTab.index() == enTabs.Quiz) { // edit content

				$.cachedScript("/engine/pages/edit/tab.quiz.js").done(function() {
					__init__quiz();
				});

			}

			/*
			 * Page edit screen is NOT drawn inside this handler; it is loaded by xmlTree
			 */

    	}
	});

	// disable the tabs we can't see until we edit a file
	$("#tabs").tabs( "option", "disabled", [enTabs.Page,enTabs.Content,enTabs.Quiz])
	$("#tabs").tabs( "option", "active", -1 ).tabs( "option", "active", enTabs.VisualLayout); //doesn't seem to switch index to zero unless you do this?

	$(document).ajaxError(function(e, xhr, settings, exception) {
		if (_debug) $.jGrowl('Error in: ' + settings.url + ' \n'+'error:\n' + xhr.responseText );
	}); 

});



// populate attributes on a newly created node for pages.xml
function setDefaultAttributes(node) {
	var newId = getNextHighestId();
	node.attr("title","New node");
	node.attr("fileName","page_" + newId + ".txt");
	node.attr("type","Information");
	node.attr("id","_" + newId);
	node.attr("contribute","n");
	node.attr("contributeScore","100");
	node.attr("contributePercentage","100");
	node.attr("nav","n");
	node.attr("template","");
}

// read through all the nodes looking for ID's and return a number higher than the highest value
function getNextHighestId() {
	var h = 0;
	$("li", "#xmlTree").each(function(index,el) {
		try {
			var i = parseInt($(el).attr("id").replace(/\_/,""), 10);
			if (i > h) h = i;
		} catch (ex) {}
	});
	return h+1;
}



















// determine what to do once a selection is made in the textarea editor's commands drop down
function doEditCommand(obj,region) {
	var $obj = $(obj),
		command = $obj.val(),
		_easyedit = ($obj.find(":selected").attr("data-easy-edit") == "true"),
		_pilledit = ($obj.find(":selected").attr("data-pill-edit") == "true");
	if (typeof region == 'undefined') region = "edit-area";
	if (!command) return;
	var selection = get_selection(region); // returns object {start, end, length, text}
	var justcommand = command.split(" ")[0].replace(/\{/,"");

	// unset selection from the control that told us what to do
	obj.selectedIndex = 0;

	// prompt user if the command requires text selected first
	if ((command.indexOf("%selection%")!=-1) && (selection.length==0)) {
		alert("You need to select some text first...");
		return;
	}
	
	// popWindow called with various parameters to tell ASP file how to draw itself
	if (_easyedit) {
	
		show_dialogue_easyedit(command, region);

	} else if (_pilledit) {
	
		show_dialogue_pilledit(command, region);
		
	} else if (command.indexOf("%ref%") != -1) {
		
		show_dialogue_references(region);

	} else if (command.indexOf("%term%") != -1) {
	
		show_dialogue_glossary(region);
		
	} else if (command.indexOf("zoom") != -1) {

		popWindow({
			command: "zoomimage",
			areaid: region
		});

	} else if (command.indexOf("{splitimage ") != -1) {

		popWindow({
			command: "splitimage",
			areaid: region
		});

	} else if (command.indexOf("{overstretch ") != -1) {

		popWindow({
			command: "overstretch",
			areaid: region
		});

	} else if ((command.indexOf("%image%") != -1) && (command.indexOf("{fullscreenvideoimage ") == -1)) {

		popWindow({
			command: justcommand,
			areaid: region,
			selection: selection.text
		});

	} else if (command.indexOf("{clickimage ") != -1) {

		popWindow({
			command: "clickimage",
			areaid: region
		});
		
	} else if (command.indexOf("%images%") != -1) {

		popWindow({
			command: "rightimages",
			areaid: region
		});
		
	} else if (command.indexOf("%anchor%") != -1) {

		popWindow({
			command: "glossary",
			areaid: region,
			selection: selection.text
		});

	} else if (command.indexOf("{parse ") != -1) {

		popWindow({
			command: "parse",
			areaid: region,
			selection: selection.text
		});

	} else if (command.indexOf("{popup ") != -1) {

		popWindow({
			command: "popup",
			areaid: region,
			selection: selection.text
		});

	} else if (command.indexOf("{popuptext ") != -1) {

		popWindow({
			command: "popuptext",
			areaid: region,
			selection: selection.text
		});

	} else if (command.indexOf("{load ") != -1) {

		popWindow({
			command: "load",
			areaid: region,
			selection: selection.text
		});

	} else if (command.indexOf("{parse ") != -1) {

		popWindow({
			command: "parse",
			areaid: region,
			selection: selection.text
		});

	} else if (command.indexOf("%linkurl%") != -1) {

		var size = 0,
			linkurl = "";
		var str = $("<div />")
				.append("<p>Paste in the video link (e.g. YouTube url, Vimeo url, TED Talks Url, etc):</p>")
				.append("<form><div class='controls'><input id='dialogue_videourl' class='input-block-level' type='text' placeholder='Paste in the video url here'></div></form>");
		var buttons = [{
			    "label" : "Ok",
			    "class" : "btn-primary",
			    "callback": function() {
			    	if (command.indexOf("{fullscreenvideoimage ") == -1) {
			    		replace_selection(region, "{fullscreenvideo " + $("#dialogue_videourl").val() + "}");
			    	} else {
			    		replace_selection(region, "{fullscreenvideo VideoButtonLabel|" + $("#dialogue_videourl").val() + "}");
			    		setTimeout(function () { // give the textarea a bit of time to think
				    		// set_selection_to_string(region, "VideoButtonLabel");
							popWindow({
								command: "image",
								areaid: region,
								selection: set_selection_to_string(region, "VideoButtonLabel") // get_selection(region)
							});
						}, 234);
			    	}
			    }
		}];
		if (command.indexOf("{inlinevideo ") != -1) {
			buttons = [];
			buttons.push({
				"label": "Cancel",
				"class": "pull-left"
			});
			buttons.push({
			    "label" : "560x315",
			    "class" : "btn-info",
			    "callback": function() {
			    	if ($("#dialogue_videourl").val())
			    	replace_selection(region, "{inlinevideo " + [1,$("#dialogue_videourl").val()].join("|") + "}");
			    }
			});
			buttons.push({
			    "label" : "640x360",
			    "class" : "btn-info",
			    "callback": function() {
			    	if ($("#dialogue_videourl").val())
			    	replace_selection(region, "{inlinevideo " + [2,$("#dialogue_videourl").val()].join("|") + "}");
			    }
			});
			buttons.push({
			    "label" : "853x480",
			    "class" : "btn-info",
			    "callback": function() {
			    	if ($("#dialogue_videourl").val())
			    	replace_selection(region, "{inlinevideo " + [3,$("#dialogue_videourl").val()].join("|") + "}");
			    }
			});
			buttons.push({
			    "label" : "1280x720",
			    "class" : "btn-info",
			    "callback": function() {
			    	if ($("#dialogue_videourl").val())
			    	replace_selection(region, "{inlinevideo " + [4,$("#dialogue_videourl").val()].join("|") + "}");
			    }
			});
		}
		bootbox.dialog(str, buttons);

	} else if (command.indexOf("%url%") != -1) {

		popWindow({
			command: function() {
				return command.split(" ")[0].replace(/\{/,"");
			},
			areaid: region,
			selection: selection.text
		});
		
	} else if (command.indexOf("%link%") != -1) {

		bootbox.prompt("Paste in the URL to link to", function (r) {
			if (r != null) {
				replace_selection(region, command.replace("%link%", r).replace("%selection%", selection.text));
			}
		});
		
	} else if (command.indexOf("%xml%") != -1) {

		popWindow({
			command: "xml",
			areaid: region
		});

	} else if (command.indexOf("%effect%") != -1) { // requires an effect type; ask user in a modal dialogue (built on-the-fly)

		var _sel = $("<select />").attr("id", "fxSel");
		$.each(_fx, function(index,value) { _sel.append($("<option />").attr("value",value).text(value)) });
		$("#fx").remove();
		$("<div />").attr({
				id: "fx",
				title: "Choose an effect"
			})
			.append($("<label />").attr("for","fxSel").text("Effect:"))
			.append(_sel)
			.appendTo("body")
			.dialog({
				modal: true,
            	buttons: {
                	Ok: function() {
						popWindow({
							command: "slideshow",
							areaid: region,
							selection: $("#fxSel").val()
						});
                    	$(this).dialog("close");
                	},
                	Cancel: function() {
                		$(this).dialog("close");
                	}
            	}
           });

	} else if (command.indexOf("%selection%") != -1) {

		replace_selection(region, command.replace("%selection%",selection.text));

	} else if (command == "//convertBLOCK//") {
	
		$.post("/engine/action.asp?id=" + _courseid + "&action=ajax_convertblock", {
			filename: _editing_file,
			content: get_selection(region).text
		}, function (filename) {

			var selNode = $("a.jstree-clicked","#xmlTree").closest("li").attr("id"),
				node = $("#xmlTree").jstree("create", node, "last", filename.replace(".html","").replace(".txt",""), null, false);
			setDefaultAttributes(node);
			node.attr("title",filename.replace(".html","").replace(".txt","")); // overwrite defaults
			node.attr("fileName",filename);

			replace_selection(region, "{parse " + filename + "}");

		});

	} else if (command == "//convertAUTO//") {

		var val = $("#" + region).val();

		// headings
		val = val.replace(/\<h([1-6])\>/gi,"{tag h$1|").replace(/\<\/h[1-6]\>/gi,"} ");

		// breaks
		val = val.replace(/\<br([\ ]?[\/]?)\>/gi,"{\/}");

		// bold, italic, underline
		val = val.replace(/\<([biu])>/gi,"{tag $1|").replace(/\<\/[biu]\>/gi,"} ");

		val = val.replace("<p class=\"centered\">","{centered ");
		val = val.replace("<a href=\"Content/popup","{popup popup");
		val = val.replace("\" rev=\"overlay\" class=\"rp-button-dialogue\">\n","|");
		// TODO: work out a few more of these
		$("#" + region).val(val);

	} else if (command == "//stripHTML//") {

		var val = $("#" + region).val(),
			out = [],
			inp = [];
		if (val.indexOf("</head>")!=-1) val = val.substring(val.indexOf("</head>") + 7);
		inp = val.replace(/<[^>]*>?/g, "").split("\n"); // strip html, then split on lines

		$.map(inp, function (val) {
			val = $.trim(val).replace("&nbsp;"," ").replace("&bull;", "*");
			//if (val.substring(0,1)=="{" && val.substring(val.length-1)=="}") val = "~@~" + val + "~@~"; // lines containing only commands
			if (val.length) out.push(val);
		});
		$("#" + region).val($.trim(out.join("\n\n").replace(/\n{3,}/g,"\n\n"))); // doublespace, but no more than that

	} else if (command == "//stripHEAD//") {

		var val = $("#" + region).val();
		if (val.indexOf("</head>")!=-1) val = val.substring(val.indexOf("</head>") + 7).replace("</html>","");
		if (val.indexOf("<body")!=-1) val = val.replace("</body>","").replace("<body>","");
		$("#" + region).val($.trim(val));
		
	} else {

		// catch everything else and just dump the command value onto the selection / cursor
		replace_selection(region, command);
		
	}
}
















// popup window to allow user to select one or more things
/*
data = {
	folder: _folder,
	command: command,
	selection: foo,
	containerid: blah,
	returnmode: blah,
	areaid: fofo
} */
function popWindow(data) {
	data.id = _courseid;
	var qs = $.param(data);
	window.open("/engine/pages/list/?" + qs, "list", "scrolling=1,scrollbars=1,resizable=1,width=1024,height=644").focus();
}

function openWindow(command, selection, containerid, returnmode) {
	var data = {
		"id": _courseid,
		"command": command,
		"selection": escape(selection),
		"containerid": escape(containerid),
		"returnmode": escape(returnmode),
		"areaid": escape(areaid)
	};
	// id=" + _courseid + "&command=" + command + "&selection=" + escape(selection) + "&containerid=" + escape(containerid) + "&returnmode=" + escape(returnmode) + "&areaid=" + escape(areaid)
	var qs = $.param(data);
	var w = window.open("/engine/pages/list/?" + qs,"list","scrolling=1,scrollbars=1,resizable=1,width=1220,height=640");
	w.focus();
}

// prompt the user if they need to save
function setConfirmUnload(on) {   
	window.onbeforeunload = (on) ? unloadMessage : null;
}

// message to show user as they navigate away
function unloadMessage() {
     return 'Reloading, or navigating away at this point might' +
        ' mean you lose stuff...';
}

// un-set the dirty flag on window unload (stops prompt to save on unload)
function makeClean() {
	$("#toXML").removeClass("ui-button-warning").addClass("ui-button-success").html("<i class='icon-save'></i> Nav saved");
	setConfirmUnload(false);
	
	_revisions = 0; // reset number of revisions so that navtree revision check starts afresh
	$("#revised").hide(); // because it's no longer a valid status

	$(document).trigger("navtree.revisions");
	
}

// set the dirty flag on window unload (prompts user to confirm no-save)
function makeDirty() {
	$("#toXML").removeClass("ui-button-success").addClass("ui-button-warning").html("<i class='icon-exclamation-sign'></i> Nav not saved!");
	setConfirmUnload(true);
}

// turns <ul><li>node<ul><li>sub-node</li></ul></ul> into <page>node<page>node</page></page>
// then sends data to server for further processing & saving
function handleSave() {
	var copy = $("#xmlTree").clone();
	$("a", copy).each(function(index,node) {
		$(node).closest("li").attr("title", $(node).text());
	});
	$("a,ins", copy).remove();
	$("ul,li", copy).removeAttr("class").removeAttr("style");
	var html = $(copy).html()
		.replace(/\&nbsp\;/g,"")
		.replace(/\&amp\;/g,"&")
		.replace(/<ul>/g,"")
		.replace(/<\/ul>/g,"</page>")
		.replace(/<li\s/g,"<page ")
		.replace(/><\/li>/g," />")
		.replace(/<\/li>/g,"</page>")
		.replace(/<\/li\ \/>/g,"</page>")
		.replace(/<\/page\ \/>/g,"</page>")
		.replace(/\ id\=\"_/g," id=\"");
		
		
	$.post("/engine/action.asp?id=" + _courseid + "&action=ajaxSavePagesXML", {
		xml: html
	}, function (data) {
		$.jGrowl("Ok, Pages.xml has been saved");
		// $(document).trigger("navtree.revisions");
	});

	// unset dirty
	makeClean();
}

// runs through a <page> node in pages.xml and turns it into a <li> node that jsTree can then make a treeview out of
function processPages(obj){
	var t = $(this);
	htmlTree.push("<li")
	if (!t.attr("title")) {
		htmlTree.push (" class='jstree-open'>");
	} else {
		htmlTree.push(" title='" + t.attr("title").safeForXml() + "'");
		htmlTree.push(" fileName='" + t.attr("fileName").safeForXml() + "'");
		htmlTree.push(" type='" + t.attr("type") + "'");
		htmlTree.push(" id='_" + t.attr("id") + "'");
		htmlTree.push(" contribute='" + t.attr("contribute") + "'");
		htmlTree.push(" contributeScore='" + t.attr("contributeScore") + "'");
		htmlTree.push(" contributePercentage='" + t.attr("contributePercentage") + "'");
		htmlTree.push(" nav='" + t.attr("nav") + "'");
		htmlTree.push(" template='" + t.attr("template") + "'>");
	}
	htmlTree.push("<a href='#'" + (_selected==t.attr("id") ? " class='jstree-hovered jstree-clicked'" : "") + ">" + ((t.attr("title")) ? t.attr("title") : "Course") + "</a>")
    if( t.children().length>0 ){
        htmlTree.push('<ul>');
        t.children().each(processPages);
        htmlTree.push('</ul>');
    }else{
       htmlTree.push('</li>'); 
    }
}

// helpers; dealing with selections in a textarea is different for each browser (of course).
// http://stackoverflow.com/questions/401593/understanding-what-goes-on-with-textarea-selection-with-javascript
function get_selection(the_id) {
    var e = document.getElementById(the_id);

    if('selectionStart' in e) { //Mozilla and DOM 3.0
        var l = e.selectionEnd - e.selectionStart;
        if (e.value.substr(e.selectionStart, l).endsWith(" ")) { e.selectionEnd--; l--;} // trim trailing space, update length
        return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
    } else if(document.selection) { //IE
        e.focus();
        var r = document.selection.createRange();
        var tr = e.createTextRange();
        var tr2 = tr.duplicate();
        tr2.moveToBookmark(r.getBookmark());
        tr.setEndPoint('EndToStart',tr2);
        if (r == null || tr == null) return { start: e.value.length, end: e.value.length, length: 0, text: '' };
        var text_part = r.text.replace(/[\r\n]/g,'.'); //for some reason IE doesn't always count the \n and \r in the length
        var text_whole = e.value.replace(/[\r\n]/g,'.');
        var the_start = text_whole.indexOf(text_part,tr.text.length);
        return { start: the_start, end: the_start + text_part.length, length: text_part.length, text: r.text };
    }
    //Browser not supported
    else return { start: e.value.length, end: e.value.length, length: 0, text: '' };
}

function replace_selection(the_id,replace_str) {
    var e = document.getElementById(the_id);
    selection = get_selection(the_id);
    var start_pos = selection.start;
    if (replace_str.endsWith(" ")) replace_str = replace_str.trim();
    var end_pos = start_pos + replace_str.length;

    if (true) { // support undo, which may or may not fuck up eventually depending on chrome's development
	    if (document.createEvent) {
			var event = document.createEvent('TextEvent');
			event.initTextEvent('textInput', true, true, null, replace_str);
			e.dispatchEvent(event);
			set_selection(the_id,start_pos,end_pos);

	    } else if (document.execCommand) {
			set_selection(the_id,start_pos,end_pos);
	    	document.execCommand("insertText", false, replace_str);
	    }
	    
	} else {
    	e.value = e.value.substr(0, start_pos) + replace_str + e.value.substr(selection.end, e.value.length);
		set_selection(the_id,start_pos,end_pos);
    }
    return {start: start_pos, end: end_pos, length: replace_str.length, text: replace_str};
}

function set_selection_to_string(the_id, to_find) {
    var el = document.getElementById(the_id),
    	val = el.value,
    	start_pos = val.indexOf(to_find);
    set_selection(the_id, start_pos, start_pos + to_find.length);
   	// el.setSelectionRange(start_pos, start_pos + to_find.length); // end pos is not length, its caret position
   	return get_selection(the_id);
}

function set_selection(the_id,start_pos,end_pos) {
    var e = document.getElementById(the_id);

    if ('selectionStart' in e) { //Mozilla and DOM 3.0
        e.focus();
        e.selectionStart = start_pos;
        e.selectionEnd = end_pos;
    } else if(document.selection) { //IE
        e.focus();
        var tr = e.createTextRange();

        //Fix IE from counting the newline characters as two seperate characters
        var stop_it = start_pos;
        for (i=0; i < stop_it; i++) if( e.value[i].search(/[\r\n]/) != -1 ) start_pos = start_pos - .5;
        stop_it = end_pos;
        for (i=0; i < stop_it; i++) if( e.value[i].search(/[\r\n]/) != -1 ) end_pos = end_pos - .5;

        tr.moveEnd('textedit',-1);
        tr.moveStart('character',start_pos);
        tr.moveEnd('character',end_pos - start_pos);
        tr.select();
    }
    return get_selection(the_id);
}

function wrap_selection(the_id, left_str, right_str, sel_offset, sel_length) {
    var the_sel_text = get_selection(the_id).text;
    var selection =  replace_selection(the_id, left_str + the_sel_text + right_str );
    if(sel_offset !== undefined && sel_length !== undefined) selection = set_selection(the_id, selection.start +  sel_offset, selection.start +  sel_offset + sel_length);
    else if(the_sel_text == '') selection = set_selection(the_id, selection.start + left_str.length, selection.start + left_str.length);
    return selection;
}

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

// routine to detect selecting a keyword and expanding the selection to encompass the whole tag, which
// might contain nested tags. please feel free to go cross-eyed.
function checkIfWeNeedToExpandTheSelection(el) {
	var val = el.value,
		sel = "", op=[],cl=[],se=0;
	if (val.slice(el.selectionStart-1,el.selectionStart)=="{" && (val.slice(el.selectionEnd,el.selectionEnd+1)==" "||val.slice(el.selectionEnd,el.selectionEnd+1)=="\n")) {
		el.selectionStart = el.selectionStart - 1;
		el.selectionEnd = val.indexOf("}", el.selectionEnd) + 1;
		sel=val.slice(el.selectionStart,el.selectionEnd);
		op=sel.split("{");cl=sel.split("}");
		while(op.length>cl.length) {
			se=val.indexOf("}", el.selectionEnd) + 1;
			if(se<el.selectionStart)se=val.length;if(se>val.length)se=val.length;
			el.selectionEnd = se;
			sel=val.slice(el.selectionStart,el.selectionEnd);
			op=sel.split("{");cl=sel.split("}");
		}
	}
}

(function($) {

    function pasteIntoInput(el, text) {
        el.focus();
        if (typeof el.selectionStart == "number") {
            var val = el.value;
            var selStart = el.selectionStart;
            el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
            el.selectionEnd = el.selectionStart = selStart + text.length;
        } else if (typeof document.selection != "undefined") {
            var textRange = document.selection.createRange();
            textRange.text = text;
            textRange.collapse(false);
            textRange.select();
        }
    }

    function allowTabChar(el) {
        $(el).keydown(function(e) {
            if (e.which == 9) {
                pasteIntoInput(this, "\t");
                return false;
            }
        });

        // For Opera, which only allows suppression of keypress events, not keydown
        $(el).keypress(function(e) {
            if (e.which == 9) {
                return false;
            }
        });
    }

    $.fn.allowTabChar = function() {
        if (this.jquery) {
            this.each(function() {
                if (this.nodeType == 1) {
                    var nodeName = this.nodeName.toLowerCase();
                    if (nodeName == "textarea" || (nodeName == "input" && this.type == "text")) {
                        allowTabChar(this);
                    }
                }
            })
        }
        return this;
    }
    
    $.fn.attachEditor = function () {
	    this.each(function () {
		    if (this.nodeType == 1) {
			    if (this.nodeName.toLowerCase() == "textarea") {
			    	var $textarea = $(this), _div = null, _id = $textarea.uniqueId().attr("id");
		    		if (_div === null) {
				    	$textarea
							.attr("wrap","soft")
							.allowTabChar()
				    		.on("select", function(event) {
					    		checkIfWeNeedToExpandTheSelection(this);
				    		});
				    	_div = Handlebars.getCompiledTemplate("tabs/content/toolbar", {
				    		id: _id,
				    		data: toolbarjson,
				    		base: (_id=="edit-area"||_id=="help-content")
				    	});
			    		$textarea.before(_div); // $textarea must be in DOM already
			    		var _toolbar = $("#" + _id + "-tab-toolbar");
			    		if (_id != "edit-area") {
			    			$("#toolbar-save,#toolbar-grids", _toolbar).remove();
							$(".content-command option[data-nestable='false']", _toolbar).remove();
			    		}

						$(".content-command", _toolbar).change(function () {
							doEditCommand(this, _id);
						});
	
						$("button[data-command]", _toolbar).click(function(event) {
							event.preventDefault();
							var cmd = $(this).attr("data-command");
							$(".content-command", _toolbar).each(function(index,element) {
								if ($("[value='" + cmd + "']", element)) {
									$(element).val(cmd).trigger("change");
								}
							});
						});

		    		}
				}
		    }
	    });
	    return this;
    }
})(jQuery);

// return function called from /engine/pages/list/init.js to populate the selected image in the layout interface
function setting_SelectImage(path, obj) {
	$("#" + obj).html("<img src='" + _folder + "/SCO1/en-us/Content/media/" + path + "' lowsrc='Content/media/" + path + "' />");
}

function doubleQuotedString(s) {
	if (typeof s === 'undefined') return String.fromCharCode(34) + String.fromCharCode(34);
	s = s.replace(/\"/g, String.fromCharCode(92) + String.fromCharCode(34));
	return String.fromCharCode(34) + s + String.fromCharCode(34);
	// return "\"" + s.replace("\"","\\\"") + "\"";
}


function saveQuiz(fn) {

	var pools = [];
	$("[data-grouping='questionPool']", "#tabs-5").each(function(pIndex, el) {
		var questions = [];

		// each fieldset contains a question in this pool
		$("fieldset",$(el)).each(function (qIndex, qObj) {
			var choices = [],
				choicesA = [],
				choicesB = [],
				feedback = [],
				$obj = $(qObj),
				data = {},
				type = $obj.attr("data-question-type");
				
			data["type"] = type;
			data["id"] = "q" + pIndex + "." + qIndex;
			if ($(":input[data-attribute='randomize']",$obj).length) {
				data["randomize"] = $(":input[data-attribute='randomize']",$obj).is(":checked");
			}
			data["layout"] = $(":input[data-attribute='layout']",$obj).val();
			if ($(":input[data-attribute='media']", $obj).length) {
				data["media"] = $(":input[data-attribute='media']",$obj).val();
			}
			data["prompt"] = $(":input[data-attribute='prompt']",$obj).val();
			if (type == "QuestionMatching") {
				$("tbody tr", $obj).each(function(trIndex, tr) {
					choicesA.push($(":input[data-attribute='choiceA']",tr).val());
					choicesB.push($(":input[data-attribute='choiceB']",tr).val());
				});
				data["choicesA"] = choicesA;
				data["choicesB"] = choicesB;
			} else {
				$("tbody tr", $obj).each(function(trIndex, tr) {
					var opts = {};
					opts["value"] = $(":input[data-attribute='choice']",tr).val(); // all question types have a choice
					switch (type) {
						case "QuestionRankInOrder": // adds nothing, but skip default
						case "QuestionFillIn": // adds nothing, but skip default
							break;

						case "QuestionDragToList": // drag contains a list name
							opts["list"] = $(":input[data-attribute='list']",tr).val();
							break;

						case "QuestionChoice":
							feedback.push($(":input[data-attribute='feedback']",tr).val()); // single choice has feedback
							// DON'T break, also appends default

						default: // determine if choice is correct using checkbox
							opts["correct"] = $("input:checkbox",tr).is(":checked");
							break;
					}
					choices.push(opts); // append THIS distractor
				});
				if (feedback.length) data["feedback"] = feedback;
				data["choices"] = choices;
			}
			data["feedbackCorrect"] = $(":input[data-attribute='feedbackCorrect']",$obj).val();
			data["feedbackIncorrect"] = $(":input[data-attribute='feedbackIncorrect']",$obj).val();
			data["review"] = $(":input[data-attribute='review']",$obj).val();
			questions.push(data);
		});
		
		// add the current questions to the pool
		pools.push({
			deliver: $(":input[data-id='questionPool." + pIndex + ".deliver']").val(),
			order: $(":input[data-id='questionPool." + pIndex + ".order']:checked").val(),
			question: questions
		});
	});
	
	// console.log("inputs with data ids", $(":input[data-id]"));
	
	// create the test object container that contains the entire test
	var oJson = {
		"test": {
			id: "",
			timeLimit: $(":input[data-id='test.timeLimit']").val(),
			maxAttempts: $(":input[data-id='test.maxAttempts']").val(),
			showStatus: $(":checkbox[data-id='show-status']").is(":checked"),
			revealAnswers: $(":input[data-id='revealAnswers']").val(),
			restartable: $(":input[data-id='restartable']").val(),
			indexLayout: $(":input[data-id='indexLayout']").val(),

			introduction: $(":input[data-id='introduction']").val(),
			passedMessage: $(":input[data-id='passedMessage']").val(),
			failedMessage: $(":input[data-id='failedMessage']").val(),
			incompleteMessage: $(":input[data-id='incompleteMessage']").val(),
			completedMessage: $(":input[data-id='completedMessage']").val(),
			attemptsMessage: $(":input[data-id='attemptsMessage']").val(),
			checkQuestionVisible: $(":input[data-id='checkQuestionVisible']").val(),
			exitButtonVisible: $(":input[data-id='exitButtonVisible']").is(":checked"),
			exitButtonLabel:  $(":input[data-id='exitButton']").val(),
			maxAttemptsReachedMessage: $(":input[data-id='maxAttemptsReachedMessage']").val(),
			questionPool: pools
		}
	}
	
	console.log("generating xml to save", oJson);
	
	// Generate the XML using a Handlebars template (shortcut)
	var xml = Handlebars.getCompiledTemplate("tabs/quiz/quizxml",oJson).split("\n").map($.trim).filter(function(line) { return line != "" }).join("\n");

	// console.log("quiz save", xml, oJson);

	// tell the server to store the quiz data (we send both the xml and the json
	// a future version may use JSON format for quiz data
	$.post("/engine/action.asp?id=" + _courseid + "&action=ajax_saveQuizXML", {
		xml: xml,
		json: JSON.stringify(oJson),
		filename: fn
	}, function (ok) {
		$.jGrowl("Quiz XML has been updated.")
	});


}


function enable_drag_image_to_editor(container) {

 	$("#" + container).filedrop({
	    fallback_id: 'manual_upload_off',	   // an identifier of a standard file input element, becomes the target of "click" events on the dropzone
	    url: '/engine/listUpload.asp?id=' + _courseid,     // upload handler, handles each file separately, can also be a function taking the file and returning a url
	    paramname: 'userfile',            // POST parameter name used on serverside to reference file, can also be a function taking the filename and returning the paramname
	    withCredentials: false,          // make a cross-origin request with cookies
	    data: {
	    	"stop": true
	    },
	    error: function(err, file) {
	    	alert(err);
	    	console.log("enable_drag_image_to_editor",err,file);
	    },
	    allowedfiletypes: ['image/jpeg','image/png','image/gif'],   // filetypes allowed by Content-Type.  Empty array means no restrictions
	    allowedfileextensions: ['.jpg','.jpeg','.png','.gif'], // file extensions allowed. Empty array means no restrictions
	    maxfiles: 1,
	    maxfilesize: 20,
	    uploadFinished: function(i, file, response, time) {
	        replace_selection(container, "{image box-shadow|" + file.name + "}");
	    }
	});
}

	
function show_dialogue_glossary(editor) {

	function showTermEditor(event, ui) {
	
		var _editObj = $("#termEdit"),
			_tagObj = $("#termTags");
		_editObj.show();
		_tagObj.hide();
	
		var li = $(event.srcElement).closest("li"),
			tagLabel = ui.tagLabel,
			inpTerm = $("input[name='term']", _editObj),
			inpDefn = $("textarea", _editObj),
			obj = find_in_json(__glossary_json.terms, "term", tagLabel)[0];
	
		if (typeof obj !== "undefined") {
			inpTerm.val(obj.term);
			inpDefn.val(obj.definition);
		} else {
			inpTerm.val(tagLabel);
			inpDefn.val("");
		}
	
		$("input[type='button']", _editObj).unbind("click").click(function () {
			li.removeClass("tagit-selected");
			var current_text = inpTerm.val(),
				current_defn = inpDefn.val().replace(/\n/g,"\\n"),
				found = false;
			for (var key in __glossary_json.terms) {
				if (__glossary_json.terms[key].term == current_text) {
					__glossary_json.terms[key].definition = current_defn;
					found = true;
				}
			}
			if (!found) {
				__glossary_json.terms.push({
					"term": current_text,
					"definition": current_defn
				});
				_tagObj.tagit("createTag", current_text, "", true, true);
			}
	
			_editObj.hide();
			_tagObj.show();
	
		});
	}

	$("#dialogue-glossary").remove();
	$("<div />")
		.attr({
			"id":"dialogue-glossary",
			"title":"Glossary"
		})
		.appendTo("body");

	$.get("/engine/action.asp?id=" + _courseid + "&action=edit_ajax_load_glossary&q=" + Math.random(), function (data) {
		if (typeof editor !== "undefined") {
			data['returnmode'] = true;
		}
		// sort the glossary
		__glossary_json = data;

		$("#dialogue-glossary")
			.html(Handlebars.getCompiledTemplate("glossary",__glossary_json))
			.dialog({
				modal: true,
				maxHeight: $(window).height() - 100,
				maxWidth: $(window).width() - 200,
				width: $(window).width() / 2,
				open: function() {
					$(this).dialog('option', {
						'maxHeight': $(window).height() - 100,
						'maxWidth': $(window).width() - 200
					});
					$("#termEdit", this).hide();
					$("#termTags", this).tagit({
						allowSpaces: true,
						caseSentitive: false,
						removeConfirmation: true,
						onTagClicked: function(event,ui) {
							var tgt = $(event.srcElement),
								li = tgt.closest("li");
							li.siblings().removeClass("tagit-selected");
							if (li.hasClass("tagit-selected")) {
								showTermEditor(event,ui);
							} else {
								li.addClass("tagit-selected");
							}
						},
						afterTagAdded: function(event, ui) {
							if (!ui.duringInitialization) {
								var tgt = $(event.srcElement),
									li = tgt.closest("li").addClass("tagit-selected");
								li.siblings().removeClass("tagit-selected");
								showTermEditor(event, ui);
							}
						},
						afterTagRemoved: function (event, ui) {
							for (var key in __glossary_json.terms) {
								if (__glossary_json.terms[key].term == ui.tagLabel) {
									__glossary_json.terms.removeValue("term", ui.tagLabel);
								}
							}
						}
					});
				},
				buttons: {
					"Save": function () {
						var $this = $(this);

						// sort the terms alphabetically
						__glossary_json.terms = __glossary_json.terms.sort( function(a,b) { return (a.term.toLowerCase()<b.term.toLowerCase()) ? -1 : (a.term.toLowerCase()>b.term.toLowerCase()) ? 1 : 0 } );
						delete __glossary_json.returnmode;
						__glossary_json.label = __settings.navigation.glossary.label;

						$.post("/engine/action.asp?id=" + _courseid + "&action=edit_ajax_save_glossary", {
							data: JSON.stringify(__glossary_json)
						}, function (ret) {
							if (ret == "ok") {

								// apply the selection before the dialogue closes
								if (typeof editor !== "undefined") {
									if ($this.find(".tagit-selected").length) {
										replace_selection(editor, "{term " + [$this.find(".tagit-selected").find(".tagit-label").text()].join("|") + "}")
									}
								}

								$this.dialog("close");
								$.jGrowl("Your glossary has been saved.");

							} else {
								alert("Something stuffed up saving the glossary. Check the console.");
								console.log("Error saving glossary", ret);
							}
						});
					},
					Cancel: function () {
						$(this).dialog("close");
					}
				}
			});
	});
}
	
function show_dialogue_references(editor) {

	$("#dialogue-references").remove();
	$("<div />")
		.attr({
			"id":"dialogue-references",
			"title":"Citiations / References"
		})
		.appendTo("body");

	$.get("/engine/action.asp?id=" + _courseid + "&action=edit_ajax_load_references&q=" + Math.random(), function (data) {
		if (typeof editor !== "undefined") {
			data['returnmode'] = true;
		}
		$("#dialogue-references")
			.html(Handlebars.getCompiledTemplate("reference",data))
			.dialog({
				modal: true,
				maxHeight: $(window).height() - 100,
				maxWidth: $(window).width() - 200,
				width: $(window).width() / 2,
				open: function() {
					var $this = $(this);
					$this.dialog('option', {
						'maxHeight': $(window).height() - 100,
						'maxWidth': $(window).width() - 200
					});
					$("<button><i class='icon-plus-circle'></i> Add item</button>").click(function () {
						var tbl = $this.find("table").filter(":first"),
							copy = tbl.clone();
							copy.find(":text").val("");
							copy.attr("data-id", getUID().toString());
							copy.insertBefore(tbl);

							$this.dialog('option', {
								'maxHeight': $(window).height() - 100,
								'maxWidth': $(window).width() - 200
							});

					}).button().appendTo(".ui-dialog-buttonpane");
					$(this).on("click", "a[href=#remove]", function (event) {
						event.preventDefault();
						$(this).closest("table").remove();
					});
				},
				buttons: {
					"Save": function () {
						var $this = $(this);
						var out = {"references":[]},
							inp = $("table", this);
						inp.each(function(index, el) {
							var $el = $(el),
								_ref = $.trim($el.find(":text[name='reference']").val()),
								_link = "", _desc = "";
							if (_ref.indexOf("://")==-1) { _desc=_ref; _link="#"} else { _desc=""; _link=_ref; }
							out.references.push({
								"uniqueid": either($el.attr("data-id"),getUID().toString()),
								"title": $.trim($el.find(":text[name='cite']").val()),
								"description": _desc,
								"hyperlink": _link
							});
						});
						$.post("/engine/action.asp?id=" + _courseid + "&action=edit_ajax_save_references", {
							data: JSON.stringify(out)
						}, function (ret) {
							if (ret == "ok") {

								// apply the selection before the dialogue closes
								if (typeof editor !== "undefined") {
									replace_selection(editor, "{ref " + [$this.find(":checked").val()].join("|") + "}")
								}

								$this.dialog("close");
								$.jGrowl("The references have been saved.");
								
								
							} else {
								alert("Something stuffed up saving the references. Check the console.");
								console.log("Error saving references", ret);
							}
						});
					},
					Cancel: function () {
						$(this).dialog("close");
					}
				}
			});
		$(".sortable-elements", "#dialogue-references").sortable({
			handle: ".icon-resize-vertical",
			axis: "y"
		})
	});
}
	
function show_dialogue_help() {
	
	$("#dialogue-help").remove();
	$("<div />")
		.attr({
			"id":"dialogue-help",
			"title":"Editing the help file"
		})
		.appendTo("body");

	$.get("/engine/action.asp?id=" + _courseid + "&action=edit_ajax_load_help&q=" + Math.random(), function (data) {
		$("#dialogue-help")
			.html(Handlebars.getCompiledTemplate("help",{content: data}))
			.dialog({
				modal: true,
				maxHeight: $(window).height() - 100,
				maxWidth: $(window).width() - 200,
				width: $(window).width() - ($(window).width() / 4),
				open: function() {
					var $this = $(this);
					$this.dialog('option', {
						'maxHeight': $(window).height() - 100,
						'maxWidth': $(window).width() - 200
					});
					$this.find("textarea").attachEditor();
				},
				buttons: {
					"Save": function () {
						var $this = $(this);
						console.log("help save", $("textarea", this).val());
						$.post("/engine/action.asp?id=" + _courseid + "&action=edit_ajax_save_help", {
							data: $("textarea", this).val()
						}, function (ret) {
							if (ret == "ok") {
								$this.dialog("close");
								$.jGrowl("The help file has been saved.");
							} else {
								alert("Something stuffed up saving the help file. Check the console.");
								console.log("Error saving help", ret);
							}
						});
					},
					Cancel: function () {
						$(this).dialog("close");
					}
				}
			});
	});
}

function show_dialogue_easyedit(command, region) {

	$("#easy-edit").remove();
	var selection = get_selection(region),
		dlg = $("<div />")
			.attr({
				"id":"easy-edit",
				"title":"Insert a list of items"
			})
			.appendTo("body");
		
	$("<p>").text("Each line you enter below will be turned into a number or bullet").appendTo(dlg);
	$("<textarea>").attr({"wrap":"off","rows":8,"class":"input-block-level"}).appendTo(dlg);
		
	dlg.dialog({
		modal: true,
		maxHeight: $(window).height() - 100,
		maxWidth: $(window).width() - 200,
		width: $(window).width() / 2,
		open: function() {
			var $this = $(this);
			$this.dialog('option', {
				'maxHeight': $(window).height() - 100,
				'maxWidth': $(window).width() - 200
			});
			$("textarea", this).val(selection.text);
		},
		buttons: {
			"Save": function () {
				var $this = $(this);
				var out = [],
					cmd = (command.indexOf("bullets")==-1)?"numbers":"bullets",
					inp = $("textarea", dlg).val().replace(/<[^>]*>?/g, "").split("\n");
				$.map(inp, function (val, index) {
					if ($.trim(val) != "") out.push($.trim(val));
				});
				replace_selection(region, "{" + cmd + " " + out.join("|") + "}");
				$(this).dialog("close");
			},
			Cancel: function () {
				$(this).dialog("close");
			}
		}
	});
}

function show_dialogue_pilledit(command, region) {
	
	$("#pill-edit").remove();
	var selection = get_selection(region),
		dlg = $("<div />")
			.attr({
				"id":"pill-edit",
				"title":"Author multi-page item"
			})
			.appendTo("body"),
		tmplJson = {"tabs":[]};

	if (selection.text) {
		// TODO: break up the selected data if its a tab, accordion or columns, and feed this back into the template as json
		tmplJson = {"tabs":[
			{
				"label": "Item 0",
				"content": selection.text,
				"filename": ("parse" + $("a.jstree-clicked","#xmlTree").closest("li").attr("fileName").split(".")[0].replace(/[^a-zA-Z0-9_]/g,"") + "_0").replace(" ","_")
			}
		]};
		_global_tab_count = tmplJson.tabs.length;
	}
	
	dlg
		.html(Handlebars.getCompiledTemplate("tabs/content/pilledit", tmplJson))
		.dialog({
			modal: true,
			maxHeight: $(window).height() - 200,
			maxWidth: $(window).width() - 200,
			width: $(window).width() - 200,
			height: $(window).height() - 200,
			open: function() {
				var $this = $(this);
				$this.dialog('option', {
					'maxHeight': $(window).height() - 100,
					'maxWidth': $(window).width() - 200
				});
				var tabs = $("#tabbed-editor")
					.tabs()
					.on( "click", "i.icon-remove", function(e) {
						e.preventDefault();
						e.stopPropagation();
						if ($(this).closest("ul").find("li").length > 1) {
							var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
							$( "#" + panelId ).remove();
							tabs.tabs( "refresh" );
						}
				    })
					.find(".ui-tabs-nav").sortable({
						axis: "x",
						stop: function () {
							// tabs.tabs( "refresh" );
						}
					});
				$("#pillAdd", this).click(function(e) {
					e.preventDefault();
					addPill();
				});
				if (tmplJson.tabs.length == 0) addPill(); // add default
			},
			buttons: {
				"Save": function () {
					var $this = $(this);
					var out = [],
						cmd = (command.indexOf("tabs")!=-1) ? "tabs" : (command.indexOf("accordion")!=-1) ? "accordion" : (command.indexOf("columns")!=-1) ? "columns" : "error",
						inp = $("li", dlg.find("ul:first")),
						blob = [];
					inp.each(function (idx,el) {
						var a = $("a",el),
							filename = a.attr("href").replace(/[#]/,"") + ".txt", // .html",
							div = $(a.attr("href")),
							header = $.trim(div.find("input:text").val()),
							doc = $.trim(div.find("textarea").val());
						blob.push(["filename",filename].join("="));
						blob.push(["contents",escape(doc)].join("="));
						var selNode = $("a.jstree-clicked","#xmlTree").closest("li").attr("id"),
							node = $("#xmlTree").jstree("create", node, "last", header, null, false);
						setDefaultAttributes(node);
						node.attr("title",header); // overwrite defaults
						node.attr("fileName",filename);
						if (cmd == "columns") {
							out.push("{parse " + filename + "}");
						} else {
							out.push(header);
							out.push(filename);
						}
					});
					$.post("/engine/action.asp?id=" + _courseid + "&action=edit_post_tabeditmodal_saveall", blob.join("&"), function(data) {
						if (data != "ok") {
							alert("Uh oh. This did NOT save. Check the console for the error details.");
							console.log(data);
						}
					});
					replace_selection(region, "{" + cmd + " " + out.join("|") + "}");
					_global_tab_count = 0;
					$(this).dialog("close"); // .dialog("destroy");
					// $("#pill-edit").remove();
				},
				Cancel: function () {
					_global_tab_count = 0;
					$(this).dialog("close"); // .dialog("destroy");
					// $("#pill-edit").remove();
				}
			}
		});
	
}

// in pill-edit-modal, clicking add (or initalising) adds a tab, based on the filename of the current select object
function addPill() {
	var tabs = $("#tabbed-editor"),
		numPills = _global_tab_count++,
		tabFileName = ("parse" + $("a.jstree-clicked","#xmlTree").closest("li").attr("fileName").split(".")[0].replace(/[^a-zA-Z0-9_]/g,"") + "_" + numPills.toString()).replace(" ","_"),
		_ta = $("<textarea />")
				.addClass("input-block-level")
				.attr({"rows": 15, "placeholder":"Here is where the markup for item " + numPills.toString() + " goes. This will get saved in a file called '" + tabFileName + ".txt' and appended as a child under the selected page in the treeview."});

	$("<li />")
		.append($("<a>").attr("href","#" + tabFileName).text("Item " + numPills).append("<i class='icon-remove'></i>"))
		.appendTo($("ul",tabs));
	$("<div />")
		.hide()
		.attr("id", tabFileName)
		.append($("<input />").addClass("input-block-level").attr({"type": "text","placeholder": "Give your new item a title here..."}))
		.append(_ta)
		.appendTo(tabs);
	tabs.tabs("refresh");
	tabs.tabs( "option", "active", numPills );
	_ta.attachEditor(); // must be done after the textarea exists in DOM
}
