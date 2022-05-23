(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['import-tr'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<tr data-src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":14},"end":{"line":1,"column":22}}}) : helper)))
    + "\">\n	<td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":5},"end":{"line":2,"column":13}}}) : helper)))
    + "</td>\n	<td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":3,"column":5},"end":{"line":3,"column":13}}}) : helper)))
    + "</td>\n	<td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"filesize") || (depth0 != null ? lookupProperty(depth0,"filesize") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filesize","hash":{},"data":data,"loc":{"start":{"line":4,"column":5},"end":{"line":4,"column":17}}}) : helper)))
    + "</td>\n	<td>\n		<button data-action='import-saved-course' title='Import this course'>Import</button>\n		<button data-action='download-saved-course' title='Download this course'><i class='ninja-paperclip'></i></button>\n		<button data-action='remove-saved-course' title='Delete this course'><i class='ninja-discard'></i></button>\n	</td>\n</tr>";
},"useData":true});
templates['imscpmanifest'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <item identifier=\"I"
    + alias4(((helper = (helper = lookupProperty(helpers,"identifier") || (depth0 != null ? lookupProperty(depth0,"identifier") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"identifier","hash":{},"data":data,"loc":{"start":{"line":8,"column":27},"end":{"line":8,"column":41}}}) : helper)))
    + "\" isvisible=\"true\" identifierref=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"identifier") || (depth0 != null ? lookupProperty(depth0,"identifier") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"identifier","hash":{},"data":data,"loc":{"start":{"line":8,"column":76},"end":{"line":8,"column":90}}}) : helper)))
    + "\">\n         <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":9,"column":16},"end":{"line":9,"column":25}}}) : helper)))
    + "</title>\n        </item>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <resource identifier=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"identifier") || (depth0 != null ? lookupProperty(depth0,"identifier") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"identifier","hash":{},"data":data,"loc":{"start":{"line":16,"column":27},"end":{"line":16,"column":41}}}) : helper)))
    + "\" type=\"webcontent\" xml:base=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"base") || (depth0 != null ? lookupProperty(depth0,"base") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"base","hash":{},"data":data,"loc":{"start":{"line":16,"column":71},"end":{"line":16,"column":79}}}) : helper)))
    + "\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data,"loc":{"start":{"line":16,"column":87},"end":{"line":16,"column":95}}}) : helper)))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"files") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":0},"end":{"line":19,"column":9}}})) != null ? stack1 : "")
    + "    </resource>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <file href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"href","hash":{},"data":data,"loc":{"start":{"line":18,"column":18},"end":{"line":18,"column":26}}}) : helper)))
    + "\" />\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!-- This package has been created using http://document.scormification.ninja/ -->\n<manifest xmlns=\"http://www.imsglobal.org/xsd/imscp_v1p1\" xmlns:imsmd=\"http://www.imsglobal.org/xsd/imsmd_v1p2\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" identifier=\"MANIFEST-648345a17d5d94d9b6ad419e526bee21\" xsi:schemaLocation=\"http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://www.imsglobal.org/xsd/imsmd_v1p2 imsmd_v1p2p2.xsd\">\n  <organizations default=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":4,"column":27},"end":{"line":4,"column":40}}}) : helper)))
    + "\">\n    <organization identifier=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":5,"column":31},"end":{"line":5,"column":44}}}) : helper)))
    + "\" structure=\"hierarchical\">\n      <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":6,"column":13},"end":{"line":6,"column":35}}}) : helper)))
    + "</title>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"resources") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":0},"end":{"line":11,"column":9}}})) != null ? stack1 : "")
    + "    </organization>\n  </organizations>\n  <resources>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"resources") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":0},"end":{"line":21,"column":9}}})) != null ? stack1 : "")
    + "  </resources>\n</manifest>";
},"useData":true});
templates['nav-item'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<span class=\"label dn-flex-1\">Importing <em>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":45},"end":{"line":3,"column":54}}}) : helper)))
    + "</em></span>\n	<span class=\"progress-bar dn-flex-1\"><progress max=\"100\" value=\"0\"><span>0</span>%</progress></span>\n	<span class=\"cancel-conversion dn-flex dn-flex-v-center\"><a href=\"javascript:CancelConversion('"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":5,"column":96},"end":{"line":5,"column":102}}}) : helper)))
    + "');\"><i class=\"ninja-cancel\"></i></a></span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"state") : depth0),"conversion",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":24,"column":24}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n	<span class=\"conversion-spinner dn-flex dn-flex-v-center\"><img src=\"img/dual-ring-loader.svg\" width=\"24\" height=\"24\" alt=\"\"></span>\n	<span class=\"label dn-flex-1\">Converting <em>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":8,"column":46},"end":{"line":8,"column":55}}}) : helper)))
    + "</em></span>\n	<span class=\"cancel-conversion dn-flex dn-flex-v-center\"><a href=\"javascript:CancelConversion('"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":9,"column":96},"end":{"line":9,"column":102}}}) : helper)))
    + "');\"><i class=\"ninja-cancel\"></i></a></span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"state") : depth0),"cache",{"name":"compare","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":24,"column":12}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n	<span class=\"conversion-spinner dn-flex dn-flex-v-center\"><img src=\"img/dual-ring-loader.svg\" width=\"24\" height=\"24\" alt=\"\"></span>\n	<span class=\"label dn-flex-1\">Caching <em>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":12,"column":43},"end":{"line":12,"column":52}}}) : helper)))
    + "</em></span>\n	<span class=\"cancel-conversion dn-flex dn-flex-v-center\"><a href=\"javascript:void(0);\" onclick=\"CancelThis(this);\"><i class=\"ninja-cancel\"></i></a></span>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<span class=\"drag-handle\" title=\"Drag up or down to re-order item\"><i class=\"ninja-reorder\"></i></span>\n	<a class=\"toggle-switch indent\" data-action=\"item-depth-cycle\" href=\"javascript:;\"><i class=\"ninja-indent-"
    + alias4(((helper = (helper = lookupProperty(helpers,"depth") || (depth0 != null ? lookupProperty(depth0,"depth") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"depth","hash":{},"data":data,"loc":{"start":{"line":16,"column":107},"end":{"line":16,"column":116}}}) : helper)))
    + "\"></i></a>\n	<span class=\"format-icon\"><i class=\""
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","youtube,vimeo,soundcloud,video",{"name":"compare","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":17,"column":37},"end":{"line":17,"column":528}}})) != null ? stack1 : "")
    + "\"></i></span>\n	<span class=\"label dn-flex-1 dn-flex dn-flex-c-1\"><a href=\"javascript:\" data-action=\"preview\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":18,"column":95},"end":{"line":18,"column":103}}}) : helper)))
    + "</a></span>\n	<a class=\"rename-hint\" data-action=\"toggle-rename\" href=\"javascript:;\"><i class=\"ninja-keyboard\" title=\"Rename this page\"></i></a>\n	<a class=\"rename-hint\" data-action=\"trash\" href=\"javascript:;\"><i class=\"ninja-discard\" title=\"Remove this page\"></i></a>\n	<span class=\"video-icon\" title=\"Page has video\"><i class=\"ninja-video\"></i></span>\n	<span class=\"audio-icon\" title=\"Page has audio\"><i class=\"ninja-volume_up\"></i></span>\n	<span class=\"attach-icon\" title=\"Page has attachment(s)\"><i class=\"ninja-paperclip\"></i></span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "ninja-film";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","oembed,package,iframe",{"name":"compare","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":17,"column":112},"end":{"line":17,"column":516}}})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    return "ninja-link";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"plugin") : depth0),"QuizBuilder",{"name":"compare","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":17,"column":178},"end":{"line":17,"column":504}}})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    return "ninja-check-square";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"plugin") : depth0),"Section",{"name":"compare","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(21, data, 0),"data":data,"loc":{"start":{"line":17,"column":237},"end":{"line":17,"column":492}}})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    return "ninja-power_input";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"plugin") : depth0),"Intro",{"name":"compare","hash":{},"fn":container.program(22, data, 0),"inverse":container.program(24, data, 0),"data":data,"loc":{"start":{"line":17,"column":291},"end":{"line":17,"column":480}}})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data) {
    return "ninja-home";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"plugin") : depth0),"Markdown",{"name":"compare","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(27, data, 0),"data":data,"loc":{"start":{"line":17,"column":336},"end":{"line":17,"column":468}}})) != null ? stack1 : "");
},"25":function(container,depth0,helpers,partials,data) {
    return "ninja-edit";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"kind") : depth0),"image",{"name":"compare","hash":{},"fn":container.program(28, data, 0),"inverse":container.program(30, data, 0),"data":data,"loc":{"start":{"line":17,"column":384},"end":{"line":17,"column":456}}})) != null ? stack1 : "");
},"28":function(container,depth0,helpers,partials,data) {
    return "ninja-image1";
},"30":function(container,depth0,helpers,partials,data) {
    return "ninja-file-text";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"nav-item dn-flex dn-flex-lr\">\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"state") : depth0),"import",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":24,"column":36}}})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});
templates['nonemanifest'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<file href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"href","hash":{},"data":data,"loc":{"start":{"line":16,"column":33},"end":{"line":16,"column":41}}}) : helper)))
    + "\" />\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<?xml version=\"1.0\" standalone=\"no\"?>\n<manifest>\n  <organizations default=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":3,"column":27},"end":{"line":3,"column":40}}}) : helper)))
    + "\">\n    <organization identifier=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":4,"column":31},"end":{"line":4,"column":44}}}) : helper)))
    + "\">\n      <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":5,"column":13},"end":{"line":5,"column":35}}}) : helper)))
    + "</title>\n      <item identifier=\"I"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":6,"column":25},"end":{"line":6,"column":38}}}) : helper)))
    + "\" identifierref=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":6,"column":56},"end":{"line":6,"column":69}}}) : helper)))
    + "\">\n        <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":7,"column":15},"end":{"line":7,"column":37}}}) : helper)))
    + "</title>\n      </item>\n    </organization>\n  </organizations>\n  <resources>\n    <resource identifier=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":12,"column":27},"end":{"line":12,"column":40}}}) : helper)))
    + "\" type=\"webcontent\" adlcp:scormtype=\"sco\" href=\"index.html\">\n      <file href=\"index.html\" />\n      <file href=\"_package.js\" />\n      <file href=\"_package.css\" />\n      "
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"pages") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":6},"end":{"line":17,"column":15}}})) != null ? stack1 : "")
    + "    </resource>\n  </resources>\n</manifest>";
},"useData":true});
templates['page-attachment'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='page-attachment-row'>\n	<span class='fn'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":18},"end":{"line":2,"column":26}}}) : helper)))
    + "</span>\n	<span class='fd' data-action='remove-page-attachment' data-name='"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":66},"end":{"line":3,"column":74}}}) : helper)))
    + "'><i class='ninja-discard'></i></span>\n</div>";
},"useData":true});
templates['pdf-toolbar'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"pdflink") || (depth0 != null ? lookupProperty(depth0,"pdflink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pdflink","hash":{},"data":data,"loc":{"start":{"line":35,"column":25},"end":{"line":35,"column":36}}}) : helper)))
    + "\" title=\"Download\" download><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M452 432c0 11-9 20-20 20s-20-9-20-20 9-20 20-20 20 9 20 20zm-84-20c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm144-48v104c0 24.3-19.7 44-44 44H44c-24.3 0-44-19.7-44-44V364c0-24.3 19.7-44 44-44h99.4L87 263.6c-25.2-25.2-7.3-68.3 28.3-68.3H168V40c0-22.1 17.9-40 40-40h96c22.1 0 40 17.9 40 40v155.3h52.7c35.6 0 53.4 43.1 28.3 68.3L368.6 320H468c24.3 0 44 19.7 44 44zm-261.7 17.7c3.1 3.1 8.2 3.1 11.3 0L402.3 241c5-5 1.5-13.7-5.7-13.7H312V40c0-4.4-3.6-8-8-8h-96c-4.4 0-8 3.6-8 8v187.3h-84.7c-7.1 0-10.7 8.6-5.7 13.7l140.7 140.7zM480 364c0-6.6-5.4-12-12-12H336.6l-52.3 52.3c-15.6 15.6-41 15.6-56.6 0L175.4 352H44c-6.6 0-12 5.4-12 12v104c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12V364z\"/></svg></a>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<style>\n#pdfToolbar {\n	background: -moz-linear-gradient(left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 12.5%, rgba(0,0,0,0) 25%);\n	background: -webkit-linear-gradient(left, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 12.5%,rgba(0,0,0,0) 25%);\n	background: linear-gradient(to right, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 12.5%,rgba(0,0,0,0) 25%);\n	position:fixed;\n	top:0;\n	left:0;\n	width:100vw;\n	padding:.5em;\n	opacity:1;\n	transition:opacity .2s ease\n}\n#pdfToolbar>a {\n	display: inline-block;\n	border: none;\n	background-color: white;\n	border-radius: 2px;\n	line-height: 12px;\n	padding: 2px;\n	margin-right: 4px;\n	cursor: pointer;\n}\n#pdfToolbar>a>svg {\n	max-width: 20px;\n	max-height: 20px;\n	width: 20px;\n}\n</style>\n<div id=\"pdfToolbar\" onmouseover=\"this.style.opacity=1\" onmouseout=\"this.style.opacity=0\">\n	<a onclick=\"pdf2htmlEX.defaultViewer.fit_width()\" title=\"Fit width\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M502.6 233.4l-64-64c-20.1-20.1-54.6-5.9-54.6 22.6v47H128v-47c0-28.4-34.5-42.8-54.6-22.6l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c20.1 20.1 54.6 5.9 54.6-22.6v-47h256v47c0 28.4 34.5 42.8 54.6 22.6l64-64c12.5-12.6 12.5-32.8 0-45.3zM100 320c0 3.5-4.3 5.4-6.8 2.8l-64-64c-1.6-1.6-1.6-4.1 0-5.6l64-64c2.5-2.5 6.8-.7 6.8 2.8zm382.8-61.2l-64 64c-2.5 2.5-6.8.7-6.8-2.8V192c0-3.5 4.3-5.4 6.8-2.8l64 64c1.6 1.5 1.6 4.1 0 5.6z\"/></svg></a>\n	<a onclick=\"pdf2htmlEX.defaultViewer.fit_height()\" title=\"Fit height\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 192 512\"><path d=\"M160 384h-47V128h47c28.4 0 42.8-34.5 22.6-54.6l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64C-10.7 93.5 3.5 128 32 128h47v256H32c-28.4 0-42.8 34.5-22.6 54.6l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c20-20.1 5.8-54.6-22.7-54.6zM32 100c-3.5 0-5.4-4.3-2.8-6.8l64-64c1.6-1.6 4.1-1.6 5.6 0l64 64c2.5 2.5.7 6.8-2.8 6.8zm130.8 318.8l-64 64c-1.6 1.6-4.1 1.6-5.6 0l-64-64c-2.5-2.5-.7-6.8 2.8-6.8h128c3.5 0 5.3 4.3 2.8 6.8z\"/></svg></a>\n	<a onclick=\"var s=pdf2htmlEX.defaultViewer.scale;pdf2htmlEX.defaultViewer.rescale(Math.min(2,s+0.05))\" title=\"Zoom in\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M319.8 204v8c0 6.6-5.4 12-12 12h-84v84c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-84h-84c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h84v-84c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12zm188.5 293L497 508.3c-4.7 4.7-12.3 4.7-17 0l-129-129c-2.3-2.3-3.5-5.3-3.5-8.5v-8.5C310.6 395.7 261.7 416 208 416 93.8 416 1.5 324.9 0 210.7-1.5 93.7 93.7-1.5 210.7 0 324.9 1.5 416 93.8 416 208c0 53.7-20.3 102.6-53.7 139.5h8.5c3.2 0 6.2 1.3 8.5 3.5l129 129c4.7 4.7 4.7 12.3 0 17zM384 208c0-97.3-78.7-176-176-176S32 110.7 32 208s78.7 176 176 176 176-78.7 176-176z\"/></svg></a>\n	<a onclick=\"var s=pdf2htmlEX.defaultViewer.scale;pdf2htmlEX.defaultViewer.rescale(Math.max(0,s-0.05))\" title=\"Zoom out\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M307.8 223.8h-200c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12zM508.3 497L497 508.3c-4.7 4.7-12.3 4.7-17 0l-129-129c-2.3-2.3-3.5-5.3-3.5-8.5v-8.5C310.6 395.7 261.7 416 208 416 93.8 416 1.5 324.9 0 210.7-1.5 93.7 93.7-1.5 210.7 0 324.9 1.5 416 93.8 416 208c0 53.7-20.3 102.6-53.7 139.5h8.5c3.2 0 6.2 1.3 8.5 3.5l129 129c4.7 4.7 4.7 12.3 0 17zM384 208c0-97.3-78.7-176-176-176S32 110.7 32 208s78.7 176 176 176 176-78.7 176-176z\"/></svg></a>\n	"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"pdflink") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":1},"end":{"line":35,"column":839}}})) != null ? stack1 : "")
    + "\n	<a onclick=\"window.print()\" title=\"Print\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M432 192h-16v-82.75c0-8.49-3.37-16.62-9.37-22.63L329.37 9.37c-6-6-14.14-9.37-22.63-9.37H126.48C109.64 0 96 14.33 96 32v160H80c-44.18 0-80 35.82-80 80v96c0 8.84 7.16 16 16 16h80v112c0 8.84 7.16 16 16 16h288c8.84 0 16-7.16 16-16V384h80c8.84 0 16-7.16 16-16v-96c0-44.18-35.82-80-80-80zM320 45.25L370.75 96H320V45.25zM128.12 32H288v64c0 17.67 14.33 32 32 32h64v64H128.02l.1-160zM384 480H128v-96h256v96zm96-128H32v-80c0-26.47 21.53-48 48-48h352c26.47 0 48 21.53 48 48v80zm-80-88c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24z\"/></svg></a>\n</div>\n<script>\nwindow.addEventListener('DOMContentLoaded',function(){\n	setTimeout(function(){document.getElementById('pdfToolbar').style.opacity=0},1000)\n});\n</script>\n";
},"useData":true});
templates['popovers'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":13,"column":33},"end":{"line":13,"column":42}}}) : helper)))
    + "</header>\n<section class=\"content-types\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"actions") : depth0)) != null ? lookupProperty(stack1,"page") : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":1},"end":{"line":20,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"actions") : depth0)) != null ? lookupProperty(stack1,"interaction") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":1},"end":{"line":26,"column":8}}})) != null ? stack1 : "")
    + "\n</section>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<fieldset class=\"ga-common\">\n	<legend>Pages</legend>\n	"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"actions") : depth0)) != null ? lookupProperty(stack1,"page") : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":1},"end":{"line":18,"column":42}}})) != null ? stack1 : "")
    + "\n	</fieldset>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = ((helper = (helper = lookupProperty(helpers,"icon") || (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"icon","hash":{},"data":data,"loc":{"start":{"line":18,"column":23},"end":{"line":18,"column":33}}}) : helper))) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<fieldset class=\"ga-knowledge\">\n	<legend>Interactions</legend>\n	"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"actions") : depth0)) != null ? lookupProperty(stack1,"interaction") : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":1},"end":{"line":24,"column":49}}})) != null ? stack1 : "")
    + "\n	</legend>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":32,"column":33},"end":{"line":32,"column":42}}}) : helper)))
    + "</header>\n<section>\n	<audio id=\"popover_audioElement\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"audio") || (depth0 != null ? lookupProperty(depth0,"audio") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"audio","hash":{},"data":data,"loc":{"start":{"line":34,"column":39},"end":{"line":34,"column":48}}}) : helper)))
    + "\" controls></audio>\n	<input type=\"file\" id=\"pageAudioUpload\" style=\"display:none\" onchange=\"popover_audioUpload(this.files[0])\" accept=\"audio/*;capture=microphone\" />\n	<div class=\"audio-nav\">\n	    <label for=\"pageAudioNav\">Auto-navigate at end of audio?</label>\n	    <input id=\"pageAudioNav\" type=\"checkbox\" onchange=\"popover_audioNavToggle(this.checked)\"></input>\n    </div>\n	<div>\n		<button data-action=\"record-page-audio\"><i class=\"ninja-mic\"></i>Record</button>\n		<button data-action=\"upload-page-audio\"><i class=\"ninja-upload3\"></i>Upload mp3</button>\n		<button data-action=\"trash-page-audio\"><i class=\"ninja-discard\"></i>Remove</button>\n	</div>\n</section>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":49,"column":33},"end":{"line":49,"column":42}}}) : helper)))
    + "</header>\n<section>\n	<button onclick=\"handleAction();closePopover();\" class=\"positive\"><i class=\"ninja-thumbs-up\"></i>Yes</button>\n	<button onclick=\"closePopover()\"><i class=\"ninja-thumbs-down\"></i>No</button>\n</section>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":57,"column":33},"end":{"line":57,"column":42}}}) : helper)))
    + "</header>\n<section>\n	<button onclick=\"handleAction();closePopover();\" class=\"positive\"><i class='ninja-save-disk'></i>Save</button>\n	<button onclick=\"closePopover()\"><i class='ninja-close'></i>Cancel</button>\n</section>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":65,"column":33},"end":{"line":65,"column":42}}}) : helper)))
    + "</header>\n<section class=\"score_slider_sizing\">\n	<div class='range-wrap'>\n		<input type='range' min='1' max='100' id='range_slider' list='range_list' value='"
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":68,"column":83},"end":{"line":68,"column":92}}}) : helper)))
    + "' oninput='this.nextElementSibling.textContent=this.value;this.nextElementSibling.style.left=this.value+\"%\";'>\n		<output class='bubble'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":69,"column":25},"end":{"line":69,"column":34}}}) : helper)))
    + "</output>\n	</div>\n	<datalist id='range_list'>"
    + ((stack1 = (lookupProperty(helpers,"pips")||(depth0 && lookupProperty(depth0,"pips"))||alias2).call(alias1,100,{"name":"pips","hash":{},"data":data,"loc":{"start":{"line":71,"column":27},"end":{"line":71,"column":41}}})) != null ? stack1 : "")
    + "</datalist>\n	<div>\n		<label><input type='checkbox' value='1' id='score_scrubber' title='Also called Scrubber / Seek bar / Progress bar'> Show video seek bar</label>\n	</div>\n	<button onclick=\"popover_saveRange();\"><i class=\"ninja-save-disk\"></i>Save</button>\n</section>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":80,"column":33},"end":{"line":80,"column":42}}}) : helper)))
    + "</header>\n<section class=\"score_slider_sizing\">\n	<div class='range-wrap'>\n		<input type='range' min='1' max='"
    + alias4(((helper = (helper = lookupProperty(helpers,"valueMax") || (depth0 != null ? lookupProperty(depth0,"valueMax") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"valueMax","hash":{},"data":data,"loc":{"start":{"line":83,"column":35},"end":{"line":83,"column":47}}}) : helper)))
    + "' id='score_slider' list='score_list' value='"
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":83,"column":92},"end":{"line":83,"column":101}}}) : helper)))
    + "' oninput='this.nextElementSibling.textContent=this.value;var p=(((Number(this.value)-Number(this.min))*100) / (Number(this.max) - Number(this.min)));this.nextElementSibling.style.left=p+\"%\";'>\n		<output class='bubble'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":84,"column":25},"end":{"line":84,"column":34}}}) : helper)))
    + "</output>\n	</div>\n	<datalist id='score_list'>"
    + ((stack1 = (lookupProperty(helpers,"pips")||(depth0 && lookupProperty(depth0,"pips"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"valueMax") : depth0),{"name":"pips","hash":{},"data":data,"loc":{"start":{"line":86,"column":27},"end":{"line":86,"column":46}}})) != null ? stack1 : "")
    + "</datalist>\n	<button onclick=\"popover_saveScore();\"><i class=\"ninja-save-disk\"></i>Save</button>\n</section>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":92,"column":33},"end":{"line":92,"column":42}}}) : helper)))
    + "</header>\n<section>\n	<input type='hidden' name='color_value' value='58c3f3'>\n	<button onclick=\"previewPageBackground(this.value)\" value=\"#000000\" class=\"colour-dot black\" title=\"Black\"><i class=\"ninja-format_color_fill\"></i></button>\n	<button onclick=\"previewPageBackground(this.value)\" value=\"#555555\" class=\"colour-dot dgrey\" title=\"Dark grey\"><i class=\"ninja-format_color_fill\"></i></button>\n	<button onclick=\"previewPageBackground(this.value)\" value=\"#bbbbbb\" class=\"colour-dot lgrey\" title=\"Light grey\"><i class=\"ninja-format_color_fill\"></i></button>\n	<button onclick=\"previewPageBackground(this.value)\" value=\"#ffffff\" class=\"colour-dot white\" title=\"White\"><i class=\"ninja-format_color_fill\"></i></button>\n	<input type='color' id='pb_picker' value='#cccccc' oninput=\"previewPageBackground(this.value)\">\n	<button onclick=\"popover_savePageBackground();\" style=\"margin-left:2em\"><i class=\"ninja-save-disk\"></i>Save</button>\n	<div class=\"apply-all\">\n    <label for=\"colourAll\">Apply to all pages</label>\n    <input id=\"colourAll\" type=\"checkbox\"></input>\n    </div>\n</section>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":109,"column":33},"end":{"line":109,"column":42}}}) : helper)))
    + "</header>\n<section>\n	<div class=\"toggle-form\">\n		<div>\n			<input type=\"checkbox\" id=\"mute\" data-action='toggle-mute' checked>\n			<label for=\"mute\"><span></span></label>\n			<label>Interface sounds</label>\n		</div>\n		<div>\n			<input type=\"checkbox\" id=\"autosplit\" data-action='toggle-no-autosplit' checked>\n			<label for=\"autosplit\"><span></span></label>\n			<label>Auto-split documents</label>\n		</div>\n		<div>\n			<input type=\"checkbox\" id=\"autooptimise\" data-action='toggle-no-autoresize' checked>\n			<label for=\"autooptimise\"><span></span></label>\n			<label>Auto-optimise images</label>\n		</div>\n		<div>\n			<input type=\"checkbox\" id=\"autocenter\" data-action='toggle-no-autocenter' checked>\n			<label for=\"autocenter\"><span></span></label>\n			<label>Auto-centre presentations</label>\n		</div>\n		<div>\n			<input type=\"checkbox\" id=\"pdftoolbar\" data-action='toggle-no-pdftoolbar'>\n			<label for=\"pdftoolbar\"><span></span></label>\n			<label>Add PDF toolbar</label>\n		</div>\n		<div>\n			<input type=\"checkbox\" id=\"pdfembed\" data-action='toggle-no-pdfembed'>\n			<label for=\"pdfembed\"><span></span></label>\n			<label>Allow PDF downloading</label>\n		</div>\n	</div>\n</section>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":147,"column":33},"end":{"line":147,"column":42}}}) : helper)))
    + "</header>\n<section>\n	<fieldset class=\"radio-panel\">\n		<legend>Alignment</legend>\n		<div class=\"grid-h grid-2\">\n			<label>\n				<input type=\"radio\" name=\"alignment\" value=\"left\" checked data-action='set-layout' onclick='popover_setLayout(this.value)'>\n				<i class=\"ninja-format_align_left\"></i>\n				<p>Left</p>\n			</label>\n			<label>\n				<input type=\"radio\" name=\"alignment\" value=\"center\" data-action='set-layout' onclick='popover_setLayout(this.value)'>\n				<i class=\"ninja-format_align_center\"></i>\n				<p>Centre</p>\n			</label>\n		</div>\n	</fieldset>\n</section>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":173,"column":33},"end":{"line":173,"column":42}}}) : helper)))
    + "</header>\n<section>\n	<input type=\"file\" id=\"fileAttachUpload\" style=\"display:none\" onchange=\"popover_attachFiles(this.files)\" multiple=\"multiple\" />\n	<div class=\"file-list\" id=\"page-file-attachments\"></div>\n	<div>\n		<button data-action=\"upload-page-attachments\"><i class=\"ninja-upload3\"></i>Attach file</button>\n		<button data-action=\"trash-page-attachments\"><i class=\"ninja-discard\"></i>Remove all</button>\n	</div>\n\n</section>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":198,"column":33},"end":{"line":198,"column":42}}}) : helper)))
    + "</header>\n<section>\n\n	<div>\n		<label for=\"fontstyle\">Font</label>\n		<input type=\"text\" id=\"fontstyle\" placeholder=\"Google font name\">\n	</div>\n\n	<div class='range-wrap'>\n		<label for=\"size_slider\">Font size</label>\n		<input type='range' min='"
    + alias4(((helper = (helper = lookupProperty(helpers,"valueMin") || (depth0 != null ? lookupProperty(depth0,"valueMin") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"valueMin","hash":{},"data":data,"loc":{"start":{"line":208,"column":27},"end":{"line":208,"column":39}}}) : helper)))
    + "' max='"
    + alias4(((helper = (helper = lookupProperty(helpers,"valueMax") || (depth0 != null ? lookupProperty(depth0,"valueMax") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"valueMax","hash":{},"data":data,"loc":{"start":{"line":208,"column":46},"end":{"line":208,"column":58}}}) : helper)))
    + "' id='size_slider' list='size_list' value='"
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":208,"column":101},"end":{"line":208,"column":110}}}) : helper)))
    + "' oninput='this.nextElementSibling.textContent=this.value;var p=(((Number(this.value)-Number(this.min))*100) / (Number(this.max) - Number(this.min)));this.nextElementSibling.style.left=p+\"%\";'>\n		<output class='bubble'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":209,"column":25},"end":{"line":209,"column":34}}}) : helper)))
    + "</output>\n	</div>\n	<datalist id='size_list'>"
    + ((stack1 = (lookupProperty(helpers,"range")||(depth0 && lookupProperty(depth0,"range"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"valueMin") : depth0),(depth0 != null ? lookupProperty(depth0,"valueMax") : depth0),{"name":"range","hash":{},"data":data,"loc":{"start":{"line":211,"column":26},"end":{"line":211,"column":55}}})) != null ? stack1 : "")
    + "</datalist>\n\n	<button onclick=\"popover_saveFontStyle();\"><i class=\"ninja-save-disk\"></i>Apply</button>\n\n</section>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header onclick=\"closePopover()\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":219,"column":33},"end":{"line":219,"column":42}}}) : helper)))
    + "</header>\n<section>\n	<div class=\"label-rows\">\n		<label><input type=\"radio\" name=\"transform-style\" value=\"horizontal-scale\"> Fit width</label>\n		<label><input type=\"radio\" name=\"transform-style\" value=\"fit-viewport\"> Fit height and width</label>\n		<label><input type=\"radio\" name=\"transform-style\" value=\"none\"> No scaling</label>\n	</div>\n\n	<p class=\"h\">Save and apply to:</p>\n	<button onclick=\"popover_saveTransform();\"><i class=\"ninja-save-disk\"></i>This page</button>\n	<button onclick=\"popover_saveTransform(true);\"><i class=\"ninja-save-disk\"></i>All pages in document</button>\n</section>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"addcontent",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":0},"end":{"line":29,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"audio",{"name":"compare","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":0},"end":{"line":46,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"yesno",{"name":"compare","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":0},"end":{"line":54,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"savecancel",{"name":"compare","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":56,"column":0},"end":{"line":62,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"videorange",{"name":"compare","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":0},"end":{"line":77,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"score",{"name":"compare","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":79,"column":0},"end":{"line":89,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"colour",{"name":"compare","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":91,"column":0},"end":{"line":106,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"settings",{"name":"compare","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":108,"column":0},"end":{"line":144,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"layout",{"name":"compare","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":146,"column":0},"end":{"line":170,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"attachments",{"name":"compare","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":172,"column":0},"end":{"line":183,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"fontstyle",{"name":"compare","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":185,"column":0},"end":{"line":216,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"popover") : depth0),"transform",{"name":"compare","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":218,"column":0},"end":{"line":231,"column":12}}})) != null ? stack1 : "");
},"useData":true});
templates['preview-html'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = ((helper = (helper = lookupProperty(helpers,"html") || (depth0 != null ? lookupProperty(depth0,"html") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"html","hash":{},"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10}}}) : helper))) != null ? stack1 : "");
},"useData":true});
templates['preview-image'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n  <html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>Image zoom with mousewheel</title>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <style>\n    html,body {\n    	min-height: 100vh;\n			font-size: 16px;\n    }\n		body {\n		  margin: 1rem;\n		  background-color: #"
    + alias4(((helper = (helper = lookupProperty(helpers,"backgroundColour") || (depth0 != null ? lookupProperty(depth0,"backgroundColour") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColour","hash":{},"data":data,"loc":{"start":{"line":14,"column":23},"end":{"line":14,"column":43}}}) : helper)))
    + ";\n		  text-align: center;\n		}\n		img {\n			max-width: 100%;\n		}\n	</style>\n  </head>\n  <body>\n    <script>\n      function resize(img) {\n      	if (img.naturalWidth < document.body.scrollWidth) img.style.width = img.naturalWidth + 'px';\n      }\n    </script>\n    <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image") || (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data,"loc":{"start":{"line":28,"column":14},"end":{"line":28,"column":23}}}) : helper)))
    + "\" onload=\"resize(this)\">\n  </body>\n</html>";
},"useData":true});
templates['preview-timeline'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"timeline-record\">\n    <button data-action=\"record-page-audio\"><i class=\"ninja-mic\"></i>Audio</button>\n    <button data-action=\"record-page-video\"><i class=\"ninja-video\"></i>Video</button>\n    <button data-action=\"upload-page-audio\"><i class=\"ninja-upload3\"></i>Upload</button>\n</div>\n\n<div class=\"timeline-display\"></div>\n\n<div class=\"timeline-actions\">\n    <div id=\"pageMediaProperties\"></div>\n    <label for=\"pageAudioNav\" title=\"Go to next page after page media ends\" class=\"button-like\"><input id=\"pageAudioNav\" type=\"checkbox\" onchange=\"popover_audioNavToggle(this.checked)\""
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"autoNav") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":184},"end":{"line":12,"column":214}}})) != null ? stack1 : "")
    + "> AutoNav</label>\n    <button data-action=\"trash-page-audio\"><i class=\"ninja-discard\"></i>Remove</button>\n</div>\n\n<video id=\"popover_videoElement\" hidden></video>\n<audio id=\"popover_audioElement\" hidden></audio>\n<input type=\"file\" id=\"pageAudioUpload\" style=\"display:none\" onchange=\"popover_audioUpload(this.files[0])\" accept=\"audio/*;video/*;capture=microphone,camera\" />\n\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " checked";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }, buffer = "";

  stack1 = ((helper = (helper = lookupProperty(helpers,"supportsAudio") || (depth0 != null ? lookupProperty(depth0,"supportsAudio") : depth0)) != null ? helper : container.hooks.helperMissing),(options={"name":"supportsAudio","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":20,"column":18}}}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!lookupProperty(helpers,"supportsAudio")) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['preview-toolbar'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"plugin") : depth0),"Markdown",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":7,"column":14}}})) != null ? stack1 : "")
    + "	";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<button data-fileid=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":5,"column":22},"end":{"line":5,"column":28}}}) : helper)))
    + "\" data-action=\"page-bgcolour\" data-popover=\"colour\" data-label=\"Page background colour\" data-value=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"backgroundColour") : stack1), depth0))
    + "\" data-init=\"jscolor\"><i class=\"ninja-adjust\"></i>BG colour</button>\n	<button data-fileid=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":22},"end":{"line":6,"column":28}}}) : helper)))
    + "\" data-action=\"set-audio\" data-popover=\"audio\" data-label=\"Upload or record audio for this page\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"mp3") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":125},"end":{"line":6,"column":172}}})) != null ? stack1 : "")
    + "><i class=\"ninja-mic\"></i>Audio</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "data-init=\"initaudio\"";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"kind") : depth0),"h5p",{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":9,"column":9},"end":{"line":14,"column":13}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "\n	";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","video,iframe",{"name":"compare","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":11,"column":9},"end":{"line":13,"column":13}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return "";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n	<button data-fileid=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":12,"column":22},"end":{"line":12,"column":28}}}) : helper)))
    + "\" data-action=\"page-bgcolour\" data-popover=\"colour\" data-label=\"Page background colour\" data-value=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"backgroundColour") : stack1), depth0))
    + "\" data-init=\"jscolor\"><i class=\"ninja-adjust\"></i>BG colour</button>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<button data-fileid=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":18,"column":22},"end":{"line":18,"column":28}}}) : helper)))
    + "\" data-action=\"set-score\" data-popover=\"videorange\" data-value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"score") || (depth0 != null ? lookupProperty(depth0,"score") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score","hash":{},"data":data,"loc":{"start":{"line":18,"column":92},"end":{"line":18,"column":101}}}) : helper)))
    + "\" data-init=\"videorange\" data-checked=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"scrub") || (depth0 != null ? lookupProperty(depth0,"scrub") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scrub","hash":{},"data":data,"loc":{"start":{"line":18,"column":140},"end":{"line":18,"column":149}}}) : helper)))
    + "\" data-value-max=\"100\" data-label=\"Complete after percentage viewed ...\"><i class=\"ninja-condition\"></i>Completion rule <output>"
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":18,"column":277},"end":{"line":18,"column":286}}}) : helper)))
    + "</output></button>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<button data-fileid=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":22,"column":22},"end":{"line":22,"column":28}}}) : helper)))
    + "\" data-action=\"set-score\" data-popover=\"score\" data-value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"score") || (depth0 != null ? lookupProperty(depth0,"score") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score","hash":{},"data":data,"loc":{"start":{"line":22,"column":87},"end":{"line":22,"column":96}}}) : helper)))
    + "\" data-value-max=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"total_slides") || (depth0 != null ? lookupProperty(depth0,"total_slides") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"total_slides","hash":{},"data":data,"loc":{"start":{"line":22,"column":114},"end":{"line":22,"column":130}}}) : helper)))
    + "\" data-label=\"Complete after slide number ...\" data-init=\"scoreslider\"><i class=\"ninja-condition\"></i>Completion rule <output>"
    + alias4(((helper = (helper = lookupProperty(helpers,"value") || (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data,"loc":{"start":{"line":22,"column":256},"end":{"line":22,"column":265}}}) : helper)))
    + "</output></button>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","youtube,vimeo,soundcloud,oembed,package,video",{"name":"compare","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":27,"column":1},"end":{"line":34,"column":13}}})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"kind") : depth0),"in","plugin",{"name":"compare","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(22, data, 0),"data":data,"loc":{"start":{"line":28,"column":2},"end":{"line":33,"column":14}}})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"audio","in",(depth0 != null ? lookupProperty(depth0,"supports") : depth0),{"name":"compare","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":2},"end":{"line":29,"column":259}}})) != null ? stack1 : "")
    + "\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":29,"column":57},"end":{"line":29,"column":63}}}) : helper)))
    + "\" data-action=\"set-audio\" data-popover=\"audio\" data-label=\"Upload or record audio for this page\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"mp3") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":160},"end":{"line":29,"column":207}}})) != null ? stack1 : "")
    + "><i class=\"ninja-mic\"></i>Audio</button>";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":31,"column":22},"end":{"line":31,"column":28}}}) : helper)))
    + "\" data-action=\"set-audio\" data-popover=\"audio\" data-label=\"Upload or record audio for this page\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"mp3") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":125},"end":{"line":31,"column":172}}})) != null ? stack1 : "")
    + "><i class=\"ninja-mic\"></i>Audio</button>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":37,"column":66},"end":{"line":37,"column":72}}}) : helper)))
    + "\" data-action=\"content-editable\"><i class=\"ninja-marker\"></i>Edit</button>";
},"26":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":38,"column":55},"end":{"line":38,"column":61}}}) : helper)))
    + "\" data-action=\"plugin-edit\"><i class=\"ninja-marker\"></i>Edit</button>";
},"28":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":39,"column":55},"end":{"line":39,"column":61}}}) : helper)))
    + "\" data-action=\"plugin-view\"><i class=\"ninja-eye\"></i>View</button>";
},"30":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":40,"column":57},"end":{"line":40,"column":63}}}) : helper)))
    + "\" data-action=\"plugin-export\" title=\"Export\"><i class=\"ninja-download3\"></i>Export</button>";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button data-fileid=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":41,"column":57},"end":{"line":41,"column":63}}}) : helper)))
    + "\" data-action=\"plugin-layout\" title=\"Layout options\" data-popover=\"layout\" data-label=\"Layout options\" data-value=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"layout") : stack1), depth0))
    + "\"><i class=\"ninja-layout\"></i></button>";
},"34":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":42,"column":55},"end":{"line":42,"column":61}}}) : helper)))
    + "\" data-action=\"zoom-out\" class=\"icon\"><i class=\"ninja-zoom-out\"></i></button>";
},"36":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":43,"column":55},"end":{"line":43,"column":61}}}) : helper)))
    + "\" data-action=\"zoom-in\" class=\"icon\"><i class=\"ninja-zoom-in\"></i></button>";
},"38":function(container,depth0,helpers,partials,data) {
    return "	<span id=\"image-properties\"></span>\n";
},"40":function(container,depth0,helpers,partials,data) {
    return "	<span id=\"timeTaken\"></span>\n";
},"42":function(container,depth0,helpers,partials,data) {
    return "	<span id=\"pageScore\"></span>\n";
},"44":function(container,depth0,helpers,partials,data) {
    return "	<span id=\"xapiControl\"><button data-action=\"page-xapi\" disabled>Completion via xAPI</button></span>\n";
},"46":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"split") : stack1),{"name":"unless","hash":{},"fn":container.program(47, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":61,"column":26},"end":{"line":63,"column":12}}})) != null ? stack1 : "");
},"47":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n	<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":62,"column":22},"end":{"line":62,"column":28}}}) : helper)))
    + "\" data-action=\"split\"><i class=\"ninja-split\"></i>Split</button>\n	";
},"49":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":66,"column":22},"end":{"line":66,"column":28}}}) : helper)))
    + "\" data-action=\"page-files\" data-popover=\"attachments\" data-label=\"Manage page attachments\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"attachments") : depth0),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":66,"column":119},"end":{"line":66,"column":172}}})) != null ? stack1 : "")
    + "><i class=\"ninja-folder-outline-add\"></i>Files</button>\n";
},"50":function(container,depth0,helpers,partials,data) {
    return "data-init=\"initAttachments\"";
},"52":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<button data-fileid=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":70,"column":22},"end":{"line":70,"column":28}}}) : helper)))
    + "\" data-action=\"page-transform\" data-popover=\"transform\" data-label=\"Page scaling\" data-init=\"select-transform\"><i class=\"ninja-position\"></i>Scaling</button>\n";
},"54":function(container,depth0,helpers,partials,data) {
    return "		&nbsp;\n";
},"56":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"if","hash":{},"fn":container.program(57, data, 0),"inverse":container.program(59, data, 0),"data":data,"loc":{"start":{"line":79,"column":2},"end":{"line":79,"column":47}}})) != null ? stack1 : "")
    + "\n";
},"57":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":79,"column":14},"end":{"line":79,"column":22}}}) : helper)));
},"59":function(container,depth0,helpers,partials,data) {
    return "(untitled)";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<div class=\"pad-left\" data-page-format=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"format") || (depth0 != null ? lookupProperty(depth0,"format") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"format","hash":{},"data":data,"loc":{"start":{"line":1,"column":41},"end":{"line":1,"column":51}}}) : helper)))
    + "\" data-page-kind=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"kind") || (depth0 != null ? lookupProperty(depth0,"kind") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"kind","hash":{},"data":data,"loc":{"start":{"line":1,"column":69},"end":{"line":1,"column":77}}}) : helper)))
    + "\">\n\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"kind") : depth0),"plugin",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":3,"column":1},"end":{"line":15,"column":13}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","youtube,vimeo,soundcloud,oembed,video",{"name":"compare","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":1},"end":{"line":19,"column":13}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","slideshare",{"name":"compare","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":1},"end":{"line":23,"column":13}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,false,{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":0},"end":{"line":35,"column":7}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,"contenteditable","in",(depth0 != null ? lookupProperty(depth0,"supports") : depth0),{"name":"compare","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":1},"end":{"line":37,"column":158}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,"edit","in",(depth0 != null ? lookupProperty(depth0,"supports") : depth0),{"name":"compare","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":1},"end":{"line":38,"column":142}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,"view","in",(depth0 != null ? lookupProperty(depth0,"supports") : depth0),{"name":"compare","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":1},"end":{"line":39,"column":139}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,"export","in",(depth0 != null ? lookupProperty(depth0,"supports") : depth0),{"name":"compare","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":1},"end":{"line":40,"column":166}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,"layout","in",(depth0 != null ? lookupProperty(depth0,"supports") : depth0),{"name":"compare","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":1},"end":{"line":41,"column":247}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,"zoom","in",(depth0 != null ? lookupProperty(depth0,"supports") : depth0),{"name":"compare","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":1},"end":{"line":42,"column":150}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,"zoom","in",(depth0 != null ? lookupProperty(depth0,"supports") : depth0),{"name":"compare","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":1},"end":{"line":43,"column":148}}})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"kind") : depth0),"image",{"name":"compare","hash":{},"fn":container.program(38, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":1},"end":{"line":47,"column":13}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","youtube,vimeo,soundcloud,oembed,video",{"name":"compare","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":49,"column":1},"end":{"line":51,"column":13}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","slideshare",{"name":"compare","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":1},"end":{"line":55,"column":13}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"kind") : depth0),"h5p",{"name":"compare","hash":{},"fn":container.program(44, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":1},"end":{"line":59,"column":13}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"pdf",{"name":"compare","hash":{},"fn":container.program(46, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":61,"column":1},"end":{"line":63,"column":24}}})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"supportsAttachments") : depth0),{"name":"if","hash":{},"fn":container.program(49, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":65,"column":1},"end":{"line":67,"column":8}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"supportsTransform") : depth0),{"name":"if","hash":{},"fn":container.program(52, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":69,"column":1},"end":{"line":71,"column":8}}})) != null ? stack1 : "")
    + "\n	</div>\n\n	<div class=\"dn-flex-1 page-title text-center\">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"foobar") : depth0),{"name":"unless","hash":{},"fn":container.program(54, data, 0),"inverse":container.program(56, data, 0),"data":data,"loc":{"start":{"line":76,"column":2},"end":{"line":80,"column":13}}})) != null ? stack1 : "")
    + "	</div>\n\n	<div class=\"dn-flex-end pad-right\">\n		<button data-fileid=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":84,"column":23},"end":{"line":84,"column":29}}}) : helper)))
    + "\" data-action=\"trash\" data-popover=\"yesno\" data-label=\"Are you sure? (no undo)\"><i class=\"ninja-discard\"></i>Delete page</button>\n	</div>\n\n";
},"useData":true});
templates['scorm12manifest'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<file href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"href","hash":{},"data":data,"loc":{"start":{"line":26,"column":33},"end":{"line":26,"column":41}}}) : helper)))
    + "\" />\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<?xml version=\"1.0\" ?>\r\n<manifest identifier=\"ninja.scormification.document.scorm12.I"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":2,"column":61},"end":{"line":2,"column":74}}}) : helper)))
    + "\" version=\"1\"\r\n       xmlns=\"http://www.imsproject.org/xsd/imscp_rootv1p1p2\"\r\n       xmlns:adlcp=\"http://www.adlnet.org/xsd/adlcp_rootv1p2\"\r\n       xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n       xsi:schemaLocation=\"http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd\r\n                           http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd\r\n                           http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd\">\r\n  <metadata>\r\n    <schema>ADL SCORM</schema>\r\n    <schemaversion>1.2</schemaversion>\r\n  </metadata>\r\n  <organizations default=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":13,"column":27},"end":{"line":13,"column":40}}}) : helper)))
    + "\">\r\n    <organization identifier=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":14,"column":31},"end":{"line":14,"column":44}}}) : helper)))
    + "\">\r\n      <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":15,"column":13},"end":{"line":15,"column":35}}}) : helper)))
    + "</title>\r\n      <item identifier=\"I"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":16,"column":25},"end":{"line":16,"column":38}}}) : helper)))
    + "\" identifierref=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":16,"column":56},"end":{"line":16,"column":69}}}) : helper)))
    + "\" isvisible=\"true\">\r\n        <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":17,"column":15},"end":{"line":17,"column":37}}}) : helper)))
    + "</title>\r\n      </item>\r\n    </organization>\r\n  </organizations>\r\n  <resources>\r\n    <resource identifier=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":22,"column":27},"end":{"line":22,"column":40}}}) : helper)))
    + "\" type=\"webcontent\" adlcp:scormtype=\"sco\" href=\"index.html\">\r\n      <file href=\"index.html\" />\r\n      <file href=\"_package.js\" />\r\n      <file href=\"_package.css\" />\r\n      "
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"pages") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":6},"end":{"line":27,"column":15}}})) != null ? stack1 : "")
    + "    </resource>\r\n  </resources>\r\n</manifest>";
},"useData":true});
templates['scorm2004manifest'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n      <file href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"href","hash":{},"data":data,"loc":{"start":{"line":31,"column":18},"end":{"line":31,"column":26}}}) : helper)))
    + "\" />";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "﻿<?xml version=\"1.0\" standalone=\"no\" ?>\r\n<manifest identifier=\"com.scorm.manifesttemplates.scorm2004.4thEd.nometadata\" version=\"1\"\r\n                  xmlns = \"http://www.imsglobal.org/xsd/imscp_v1p1\"\r\n                  xmlns:adlcp = \"http://www.adlnet.org/xsd/adlcp_v1p3\"\r\n                  xmlns:adlseq = \"http://www.adlnet.org/xsd/adlseq_v1p3\"\r\n                  xmlns:adlnav = \"http://www.adlnet.org/xsd/adlnav_v1p3\"\r\n                  xmlns:imsss = \"http://www.imsglobal.org/xsd/imsss\"\r\n                  xmlns:xsi = \"http://www.w3.org/2001/XMLSchema-instance\"\r\n                  xsi:schemaLocation = \"http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd\r\n                                       http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd\r\n                                       http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd\r\n                                       http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd\r\n                                       http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd\" >\r\n  <metadata>\r\n    <schema>ADL SCORM</schema>\r\n    <schemaversion>2004 4th Edition</schemaversion>\r\n  </metadata>\r\n  <organizations default=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":18,"column":27},"end":{"line":18,"column":40}}}) : helper)))
    + "\">\r\n    <organization identifier=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":19,"column":31},"end":{"line":19,"column":44}}}) : helper)))
    + "\" adlseq:objectivesGlobalToSystem=\"false\">\r\n      <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":20,"column":13},"end":{"line":20,"column":35}}}) : helper)))
    + "</title>\r\n      <item identifier=\"I"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":21,"column":25},"end":{"line":21,"column":38}}}) : helper)))
    + "\" identifierref=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":21,"column":56},"end":{"line":21,"column":69}}}) : helper)))
    + "\" isvisible=\"true\">\r\n        <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":22,"column":15},"end":{"line":22,"column":37}}}) : helper)))
    + "</title>\r\n      </item>\r\n    </organization>\r\n  </organizations>\r\n  <resources>\r\n    <resource identifier=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":27,"column":27},"end":{"line":27,"column":40}}}) : helper)))
    + "\" type=\"webcontent\" adlcp:scormType=\"sco\" href=\"index.html\">\r\n      <file href=\"index.html\" />\r\n      <file href=\"_package.js\" />\r\n      <file href=\"_package.css\" />"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"pages") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":34},"end":{"line":31,"column":39}}})) != null ? stack1 : "")
    + "\r\n    </resource>\r\n  </resources>\r\n</manifest>";
},"useData":true});
templates['script-ga-index'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<script>\n(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\nga('create','"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-ga-id") || (depth0 != null ? lookupProperty(depth0,"option-ga-id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-ga-id","hash":{},"data":data,"loc":{"start":{"line":6,"column":13},"end":{"line":6,"column":29}}}) : helper)))
    + "','auto');ga('set','anonymizeIp',true);\ndocument.addEventListener(\"DOMContentLoaded\",function(dom){document.body.addEventListener('pageview',function(event){\nga('send','event','"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":8,"column":19},"end":{"line":8,"column":41}}}) : helper)))
    + "','page',event.detail,{nonInteraction:true});},false)});\n</script>\n";
},"useData":true});
templates['script-ga'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<script>\n(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\nga('create', '"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"option-ga-id") || (depth0 != null ? lookupProperty(depth0,"option-ga-id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"option-ga-id","hash":{},"data":data,"loc":{"start":{"line":6,"column":14},"end":{"line":6,"column":30}}}) : helper)))
    + "', 'auto'); ga('set','anonymizeIp', true);\nga('send', 'pageview');\n</script>";
},"useData":true});
templates['script-transform-fit-viewport'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\" id=\"transformFitViewport\">\n(function (win, doc, undefined) {\n    const pf = doc.querySelector('.pf'),\n        fitH = true, // true=fit height then width, false = only fit width\n        zoom = 1; // overall zoom factor\n    if (pf) {\n        if (fitH) document.body.style.overflow = 'hidden';\n        function recalc() {\n            const s = Math[fitH ? 'max' : 'min'](pf.clientWidth/win.innerWidth, pf.clientHeight/win.innerHeight);\n            pf.style.transform = 'translate(-50%, 0) scale(' + zoom/s + ')';\n        }\n        win.addEventListener('resize',recalc);\n        win.addEventListener('load',recalc);\n    }\n})(window, document);\n</script>";
},"useData":true});
templates['script-transform-horizontal-scale'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\" id=\"transformHorizontalScale\">\n(function (win, doc, undefined) {\n    var node = doc.querySelector(\".pf\"),\n        w = parseInt(win.getComputedStyle(node,null).getPropertyValue(\"width\"),10),\n        dw =  (win.innerWidth || doc.body.clientWidth),\n        scale = 1,\n        over = \"auto\",\n        pf = doc.querySelectorAll(\".pf\"),\n        container = doc.querySelector(\"#page-container\");\n    function recalc() {\n        scale = 1;\n        dw = (win.innerWidth || doc.body.clientWidth);\n        if (w > dw) {\n            scale = dw / w;\n            over = \"hidden\";\n        } else {\n            over = \"auto\";\n        }\n        Array.prototype.forEach.call(pf, function(el) {\n            el.style.transform = \"translate(-50%, 0%) \" + \"scale(\" + scale + \") \";\n        });\n        container.style.overflowX = over;\n    }\n    win.addEventListener('resize',recalc);\n    win.addEventListener('load',recalc);\n})(window, document);\n</script>";
},"useData":true});
templates['script-transform-scale-center'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\" id=\"transformScaleCenter\">\n(function (win, doc, undefined) {\n    function debounce(b,f,c){var a;return function(){var d=this,e=arguments,g=c&&!a;clearTimeout(a);a=setTimeout(function(){a=null;c||b.apply(d,e)},f);g&&b.apply(d,e)}};\n    var node = doc.querySelector(\"#page-container img.bi\"),\n        w = parseInt(win.getComputedStyle(node,null).getPropertyValue(\"width\"),10),\n        h = parseInt(win.getComputedStyle(node,null).getPropertyValue(\"height\"),10);\n    var scaleFn = function() {\n            var scale = Math.min(\n                    (win.innerWidth || doc.body.clientWidth) / w,\n                    (win.innerHeight || doc.body.clientHeight) / h\n                );\n            Array.prototype.forEach.call(doc.querySelectorAll(\".pf\"), function(el) {\n                el.style.transform = \"translate(-50%, -50%) \" + \"scale(\" + scale + \") \";\n            });\n        },\n        scaleDown = debounce(scaleFn,20);\n    scaleFn();\n    win.addEventListener('resize', scaleDown);\n})(window, document);\n</script>";
},"useData":true});
templates['script-transform-scale'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\" id=\"transformScaleStretch\">\n (function (win, doc, undefined) {\n    function debounce(b,f,c){var a;return function(){var d=this,e=arguments,g=c&&!a;clearTimeout(a);a=setTimeout(function(){a=null;c||b.apply(d,e)},f);g&&b.apply(d,e)}};\n\n    var pagew = parseInt(win.getComputedStyle(doc.getElementsByClassName(\"w0\")[0], null).getPropertyValue(\"width\"),10),\n        pageh = parseInt(win.getComputedStyle(doc.getElementsByClassName(\"h0\")[0], null).getPropertyValue(\"height\"),10),\n        scaled = false;\n\n    doc.body.style.overflowX = \"auto\";\n    Array.prototype.forEach.call(doc.querySelectorAll(\".pf\"), function(elm) {\n        elm.style.transformStyle = \"flat\";\n        elm.style.transformOrigin = \"top left\";\n    });\n\n    var scaleDown = debounce(function() {\n          var docw = (doc.getElementById(\"page-mod-book-view\"))\n                            ? doc.querySelector(\".book_content\").offsetWidth\n                            : Math.max(doc.documentElement.clientWidth, win.innerWidth || 0);\n          if (docw < pagew) {\n            doc.body.style.overflowX = \"none\";\n            var scale = (docw / pagew);\n            Array.prototype.forEach.call(doc.querySelectorAll(\".pf\"), function(el, i) {\n                el.style.transform = [\"scale(\",scale,\",\",scale,\")\"].join(\"\");\n                el.style.marginBottom = \"-\" + (pageh - (pageh * scale)) + \"px\";\n            });\n            scaled = true;\n          } else if (scaled) {\n            Array.prototype.forEach.call(doc.querySelectorAll(\".pf\"), function(el) {\n                el.style.transform = \"scale(1,1)\";\n                el.style.marginBottom = \"unset\";\n            });\n            scaled = false;\n          }\n    }, 250);\n\n    win.addEventListener('resize', scaleDown);\n    scaleDown();\n\n})(window, document, parent);\n</script>\n";
},"useData":true});
templates['style-pdf-bgmod'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "body { margin: 0; "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"backgroundColour") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":18},"end":{"line":2,"column":90}}})) != null ? stack1 : "")
    + " }\n#page-container {\n    position: initial;\n    top: initial;\n    left: initial;\n}\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "background-color: #"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"backgroundColour") || (depth0 != null ? lookupProperty(depth0,"backgroundColour") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"backgroundColour","hash":{},"data":data,"loc":{"start":{"line":2,"column":61},"end":{"line":2,"column":81}}}) : helper)))
    + "; ";
},"4":function(container,depth0,helpers,partials,data) {
    return "transparent !important";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"split") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":11,"column":80},"end":{"line":11,"column":116}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "#fff";
},"9":function(container,depth0,helpers,partials,data) {
    return "#bbb";
},"11":function(container,depth0,helpers,partials,data) {
    return "        bottom: initial;\n        right: initial;\n        overflow: initial;\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "none;";
},"15":function(container,depth0,helpers,partials,data) {
    return "1px 1px 0px #999;";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "@keyframes fadein{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadein{from{opacity:0}to{opacity:1}}@keyframes swing{0%{transform:rotate(0deg)}10%{transform:rotate(0deg)}90%{transform:rotate(720deg)}100%{transform:rotate(720deg)}}@-webkit-keyframes swing{0%{-webkit-transform:rotate(0deg)}10%{-webkit-transform:rotate(0deg)}90%{-webkit-transform:rotate(720deg)}100%{-webkit-transform:rotate(720deg)}}@media screen{#sidebar{background-color:#fff;background-image:none}#outline{font-family:Georgia,Times,\"Times New Roman\",serif;font-size:13px;margin:2em 1em}#outline ul{padding:0}#outline li{list-style-type:none;margin:1em 0}#outline li>ul{margin-left:1em}#outline a,#outline a:visited,#outline a:hover,#outline a:active{line-height:1.2;color:#e8e8e8;text-overflow:ellipsis;white-space:nowrap;text-decoration:none;display:block;overflow:hidden;outline:0}#outline a:hover{color:#0cf}#page-container{background-color:"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"backgroundColor") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":30,"column":916},"end":{"line":30,"column":969}}})) != null ? stack1 : "")
    + ";background-image:none;-webkit-transition:left 500ms;transition:left 500ms}.pf{margin:0;border-collapse:separate;box-shadow:none}.pc{display:block !important;}.pc.opened{-webkit-animation:fadein 100ms;animation:fadein 100ms}.loading-indicator.active{-webkit-animation:swing 1.5s ease-in-out .01s infinite alternate none;animation:swing 1.5s ease-in-out .01s infinite alternate none}}\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "transparent";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"split") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":8,"column":7}}})) != null ? stack1 : "")
    + "@media screen {\n    #page-container {\n        background-color: "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"backgroundColour") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":11,"column":26},"end":{"line":11,"column":123}}})) != null ? stack1 : "")
    + ";\n        background-image: none;\n        -webkit-transition: none;\n        transition: none;\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"split") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":0},"end":{"line":19,"column":7}}})) != null ? stack1 : "")
    + "    }\n    .pf {\n        box-shadow: "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"split") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":22,"column":20},"end":{"line":22,"column":70}}})) != null ? stack1 : "")
    + "\n    }\n    #sidebar {\n        background-image: none !important;\n        background-color: transparent !important;\n    }\n}\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"split") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":0},"end":{"line":31,"column":7}}})) != null ? stack1 : "");
},"useData":true});
templates['style-transform-fit-viewport'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<style id=\"styleTransformFitViewport\">\nbody {\n	margin: 0;\n    position: relative;\n}\n.pf {\n	transform: scale(1,1) translate(-50%, 0);\n	transform-style: flat;\n	transform-origin: top center;\n	position: absolute;\n	top: 0%;\n	left: 50%;\n}\n</style>";
},"useData":true});
templates['style-transform-horizontal-scale'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<style id=\"styleTransformHorizontalScale\">\nbody {\n	margin: 0;\n}\n.pf {\n	transform: scale(1,1) translate(-50%, 0%);\n	transform-style: flat;\n	transform-origin: top center 0px;\n	position: absolute;\n	top: 0%;\n	left: 50%;\n}\n</style>";
},"useData":true});
templates['style-transform-scale-center'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<style id=\"styleTransformScaleCenter\">\nbody {\n	margin: 0;\n}\n.pf {\n	transform: scale(1,1) translate(-50%, -50%);\n	transform-style: flat;\n	transform-origin: center center 0px;\n	position: absolute;\n	top: 50%;\n	left: 50%;\n}\n</style>";
},"useData":true});
templates['theme-preset-details'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<details>\n	<summary>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":10},"end":{"line":2,"column":18}}}) : helper)))
    + "</summary>\n	<textarea class='theme-editor' wrap='off'>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"data") || (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"data","hash":{},"data":data,"loc":{"start":{"line":3,"column":43},"end":{"line":3,"column":53}}}) : helper))) != null ? stack1 : "")
    + "</textarea>\n	<button data-action='update-preset'>Update preview</button><button data-action='store-preset'>Save preset</button> <a class='inline-help' href='#' data-action='pop-help' data-url='/docs/?url=./01.using-the-app/02.choose-design/02.cusomise-presets/docs.md'><i class='ninja-help'></i></a>\n</details>";
},"useData":true});
templates['theme-preset'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href='#' title='"
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":1,"column":19},"end":{"line":1,"column":26}}}) : helper)))
    + "' data-preset='"
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":1,"column":41},"end":{"line":1,"column":48}}}) : helper)))
    + "' data-action='select-preset' data-src='"
    + alias4(((helper = (helper = lookupProperty(helpers,"theme") || (depth0 != null ? lookupProperty(depth0,"theme") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"theme","hash":{},"data":data,"loc":{"start":{"line":1,"column":88},"end":{"line":1,"column":97}}}) : helper)))
    + "'><img src='"
    + alias4(((helper = (helper = lookupProperty(helpers,"image") || (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data,"loc":{"start":{"line":1,"column":109},"end":{"line":1,"column":118}}}) : helper)))
    + "' width='80' height='60' loading='lazy'></a>";
},"useData":true});
templates['wrapper-h5p'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n	<title>H5P Content</title>\n	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n	<script src=\"https://cdn.polyfill.io/v2/polyfill.min.js\"></script>\n	<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:300\">\n	<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css\">\n	<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css\">\n	<style>html,body{margin:0;height:100%;min-height:100%;}body{display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Roboto;font-weight:300}</style>\n</head>\n<body>\n	<svg version=\"1.1\"\n		xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n		xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\"\n		x=\"0px\" y=\"0px\" viewBox=\"0 0 83.6 36.7\" width=\"84\" height=\"36\">\n		<path  d=\"M0.1,18.4V0.1h11.3v15.7h12.2V0.1h9.1l-0.1,0.4c-0.2,0.8-3.5,15.6-3.9,17.4c-0.2,1-0.4,1.9-0.3,2s2.3,0.4,5,0.8\n			l4.9,0.7l0.7-0.9c2.1-2.5,5.7-2.5,7.7-0.1c2.7,3.1,0.4,8.1-3.8,8c-1.5,0-2.7-0.6-3.8-1.7l-0.9-0.9l-4.9,0.7c-2.7,0.4-4.9,0.7-5,0.8\n			c-0.2,0.2,0.8,2.6,1.6,3.9c1.4,2.3,3.2,3.8,5.7,4.9c0.6,0.3,1.2,0.5,1.3,0.6c0,0-2.9,0.1-6.6,0.1h-6.7V23.1H11.4v13.5H0.1L0.1,18.4z\n			\"/>\n		<path d=\"M50.2,36.5c0.1-0.1,0.6-0.3,1.1-0.5c4.4-1.4,7.7-6.8,7.7-12.4c0-3.2-1-5.8-3.1-8c-1.4-1.5-3-2.5-5-3.2\n			c-1.3-0.4-1.7-0.5-4.6-0.5c-2.9,0-3.2,0-4.7,0.5c-0.9,0.3-1.7,0.6-1.9,0.6c-0.2,0.1-0.2,0-0.2-0.1c0-0.1,0.3-1.4,0.7-2.8l0.6-2.5\n			h16.6V0.1l8.5,0.1c8,0.1,8.6,0.1,10,0.5c3.8,1,6,3,7.2,6.5c0.4,1.3,0.5,1.8,0.5,4c0,1.9-0.1,2.9-0.3,3.7c-1,3.9-3.8,6.6-7.8,7.6\n			c-1.5,0.4-4.9,0.6-9.1,0.6l-3.1,0v13.5h-6.6C52.8,36.6,50.1,36.6,50.2,36.5L50.2,36.5z M69.8,15.4c1.3-0.4,2.4-1.5,2.7-2.6\n			c0.6-2.2-0.6-4.3-2.7-4.9c-0.4-0.1-2-0.2-3.6-0.3l-3-0.1v8.5l2.8-0.1C67.7,15.7,69.2,15.5,69.8,15.4L69.8,15.4z\"/>\n	</svg>\n	<div><img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjEuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIKCSBpZD0iTGF5ZXJfMSIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA4My42IDM2LjciCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgODMuNiAzNi43OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDowLjE4MjU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMC4xLDE4LjRWMC4xaDExLjN2MTUuN2gxMi4yVjAuMWg5LjFsLTAuMSwwLjRjLTAuMiwwLjgtMy41LDE1LjYtMy45LDE3LjRjLTAuMiwxLTAuNCwxLjktMC4zLDJzMi4zLDAuNCw1LDAuOAoJbDQuOSwwLjdsMC43LTAuOWMyLjEtMi41LDUuNy0yLjUsNy43LTAuMWMyLjcsMy4xLDAuNCw4LjEtMy44LDhjLTEuNSwwLTIuNy0wLjYtMy44LTEuN2wtMC45LTAuOWwtNC45LDAuN2MtMi43LDAuNC00LjksMC43LTUsMC44CgljLTAuMiwwLjIsMC44LDIuNiwxLjYsMy45YzEuNCwyLjMsMy4yLDMuOCw1LjcsNC45YzAuNiwwLjMsMS4yLDAuNSwxLjMsMC42YzAsMC0yLjksMC4xLTYuNiwwLjFoLTYuN1YyMy4xSDExLjR2MTMuNUgwLjFMMC4xLDE4LjR6CgkiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTUwLjIsMzYuNWMwLjEtMC4xLDAuNi0wLjMsMS4xLTAuNWM0LjQtMS40LDcuNy02LjgsNy43LTEyLjRjMC0zLjItMS01LjgtMy4xLThjLTEuNC0xLjUtMy0yLjUtNS0zLjIKCWMtMS4zLTAuNC0xLjctMC41LTQuNi0wLjVjLTIuOSwwLTMuMiwwLTQuNywwLjVjLTAuOSwwLjMtMS43LDAuNi0xLjksMC42Yy0wLjIsMC4xLTAuMiwwLTAuMi0wLjFjMC0wLjEsMC4zLTEuNCwwLjctMi44bDAuNi0yLjUKCWgxNi42VjAuMWw4LjUsMC4xYzgsMC4xLDguNiwwLjEsMTAsMC41YzMuOCwxLDYsMyw3LjIsNi41YzAuNCwxLjMsMC41LDEuOCwwLjUsNGMwLDEuOS0wLjEsMi45LTAuMywzLjdjLTEsMy45LTMuOCw2LjYtNy44LDcuNgoJYy0xLjUsMC40LTQuOSwwLjYtOS4xLDAuNmwtMy4xLDB2MTMuNWgtNi42QzUyLjgsMzYuNiw1MC4xLDM2LjYsNTAuMiwzNi41TDUwLjIsMzYuNXogTTY5LjgsMTUuNGMxLjMtMC40LDIuNC0xLjUsMi43LTIuNgoJYzAuNi0yLjItMC42LTQuMy0yLjctNC45Yy0wLjQtMC4xLTItMC4yLTMuNi0wLjNsLTMtMC4xdjguNWwyLjgtMC4xQzY3LjcsMTUuNyw2OS4yLDE1LjUsNjkuOCwxNS40TDY5LjgsMTUuNHoiLz4KPC9zdmc+Cg=='></div>\n	<h1>Unable to preview this content</h1>\n	<p>The package ("
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"filename") || (depth0 != null ? lookupProperty(depth0,"filename") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"filename","hash":{},"data":data,"loc":{"start":{"line":30,"column":17},"end":{"line":30,"column":29}}}) : helper)))
    + ") will be embedded during download/publishing.</p>\n</body>\n</html>";
},"useData":true});
templates['wrapper-html5'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css\">";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":5,"column":16}}}) : helper)))
    + "</title>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<style>html,body{margin:0;height:100%;min-height:100%;}</style>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"normalize") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":0},"end":{"line":8,"column":143}}})) != null ? stack1 : "")
    + "\n<script type=\"text/javascript\" src=\"https://polyfill.io/v3/polyfill.min.js\"></script>\n</head>\n<body>\n"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"body") || (depth0 != null ? lookupProperty(depth0,"body") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data,"loc":{"start":{"line":12,"column":0},"end":{"line":12,"column":10}}}) : helper))) != null ? stack1 : "")
    + "\n</body>\n</html>\n";
},"useData":true});
templates['wrapper-iframe'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "auto";
},"3":function(container,depth0,helpers,partials,data) {
    return "hidden";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "background-color:#"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"backgroundColor") : stack1), depth0))
    + ";";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","slideshare",{"name":"compare","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":1},"end":{"line":20,"column":72}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","youtube,vimeo,video",{"name":"compare","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":1},"end":{"line":21,"column":82}}})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","soundcloud",{"name":"compare","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":1},"end":{"line":22,"column":75}}})) != null ? stack1 : "")
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "background-color:gray;";
},"10":function(container,depth0,helpers,partials,data) {
    return "background-color:black;";
},"12":function(container,depth0,helpers,partials,data) {
    return "background-color:#f5f5f5;";
},"14":function(container,depth0,helpers,partials,data) {
    return "#slides{\n	position: absolute;\n	left: 50%;\n	top: 50%;\n	transform: translate(-50%, -50%);\n}\n#slides > img {\n	max-height: 100vh;\n}\n#slides .countSlide b {\n	margin: auto .75em;\n}";
},"16":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\">\n/*! Lazy Load 2.0.0-rc.2 - MIT license - Copyright 2007-2019 Mika Tuupola */\n!function(t,e){\"object\"==typeof exports?module.exports=e(t):\"function\"==typeof define&&define.amd?define([],e):t.LazyLoad=e(t)}(\"undefined\"!=typeof global?global:this.window||this.global,function(t){\"use strict\";function e(t,e){this.settings=s(r,e||{}),this.images=t||document.querySelectorAll(this.settings.selector),this.observer=null,this.init()}\"function\"==typeof define&&define.amd&&(t=window);const r={src:\"data-src\",srcset:\"data-srcset\",selector:\".lazyload\",root:null,rootMargin:\"0px\",threshold:0},s=function(){let t={},e=!1,r=0,o=arguments.length;\"[object Boolean]\"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],r++);for(;r<o;r++)!function(r){for(let o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e&&\"[object Object]\"===Object.prototype.toString.call(r[o])?t[o]=s(!0,t[o],r[o]):t[o]=r[o])}(arguments[r]);return t};if(e.prototype={init:function(){if(!t.IntersectionObserver)return void this.loadImages();let e=this,r={root:this.settings.root,rootMargin:this.settings.rootMargin,threshold:[this.settings.threshold]};this.observer=new IntersectionObserver(function(t){Array.prototype.forEach.call(t,function(t){if(t.isIntersecting){e.observer.unobserve(t.target);let r=t.target.getAttribute(e.settings.src),s=t.target.getAttribute(e.settings.srcset);\"img\"===t.target.tagName.toLowerCase()?(r&&(t.target.src=r),s&&(t.target.srcset=s)):t.target.style.backgroundImage=\"url(\"+r+\")\"}})},r),Array.prototype.forEach.call(this.images,function(t){e.observer.observe(t)})},loadAndDestroy:function(){this.settings&&(this.loadImages(),this.destroy())},loadImages:function(){if(!this.settings)return;let t=this;Array.prototype.forEach.call(this.images,function(e){let r=e.getAttribute(t.settings.src),s=e.getAttribute(t.settings.srcset);\"img\"===e.tagName.toLowerCase()?(r&&(e.src=r),s&&(e.srcset=s)):e.style.backgroundImage=\"url('\"+r+\"')\"})},destroy:function(){this.settings&&(this.observer.disconnect(),this.settings=null)}},t.lazyload=function(t,r){return new e(t,r)},t.jQuery){const r=t.jQuery;r.fn.lazyload=function(t){return t=t||{},t.attribute=t.attribute||\"data-src\",new e(r.makeArray(this),t),this}}return e});\n\n/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license */\n(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p=\"1.9.1\",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/.source,w=/\\S+/g,T=/^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,N=/^(?:(<[\\w\\W]+>)[^>]*|#([\\w-]*))$/,C=/^<(\\w+)\\s*\\/?>(?:<\\/\\1>|)$/,k=/^[\\],:{}\\s]*$/,E=/(?:^|:|,)(?:\\s*\\[)+/g,S=/\\\\(?:[\"\\\\\\/bfnrt]|u[\\da-fA-F]{4})/g,A=/\"[^\"\\\\\\r\\n]*\"|true|false|null|-?(?:\\d+\\.|)\\d+(?:[eE][+-]?\\d+|)/g,j=/^-ms-/,D=/-([\\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||\"load\"===e.type||\"complete\"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener(\"DOMContentLoaded\",H,!1),e.removeEventListener(\"load\",H,!1)):(o.detachEvent(\"onreadystatechange\",H),e.detachEvent(\"onload\",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if(\"string\"==typeof e){if(i=\"<\"===e.charAt(0)&&\">\"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:\"\",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for(\"boolean\"==typeof s&&(c=s,s=arguments[1]||{},u=2),\"object\"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger(\"ready\").off(\"ready\"))}},isFunction:function(e){return\"function\"===b.type(e)},isArray:Array.isArray||function(e){return\"array\"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+\"\":\"object\"==typeof e||\"function\"==typeof e?l[m.call(e)]||\"object\":typeof e},isPlainObject:function(e){if(!e||\"object\"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,\"constructor\")&&!y.call(e.constructor.prototype,\"isPrototypeOf\"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||\"string\"!=typeof e)return null;\"boolean\"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:\"string\"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,\"@\").replace(A,\"]\").replace(E,\"\")))?Function(\"return \"+n)():(b.error(\"Invalid JSON: \"+n),t)},parseXML:function(n){var r,i;if(!n||\"string\"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,\"text/xml\")):(r=new ActiveXObject(\"Microsoft.XMLDOM\"),r.async=\"false\",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName(\"parsererror\").length||b.error(\"Invalid XML: \"+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,\"ms-\").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call(\"\\ufeff\\u00a0\")?function(e){return null==e?\"\":v.call(e)}:function(e){return null==e?\"\":(e+\"\").replace(T,\"\")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,\"string\"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if(\"number\"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return\"string\"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if(\"object\"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),\"complete\"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener(\"DOMContentLoaded\",H,!1),e.addEventListener(\"load\",H,!1);else{o.attachEvent(\"onreadystatechange\",H),e.attachEvent(\"onload\",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll(\"left\")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each(\"Boolean Number String Function Array Date RegExp Object Error\".split(\" \"),function(e,t){l[\"[object \"+t+\"]\"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:\"array\"===n||\"function\"!==n&&(0===t||\"number\"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e=\"string\"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);\"function\"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&\"string\"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[[\"resolve\",\"done\",b.Callbacks(\"once memory\"),\"resolved\"],[\"reject\",\"fail\",b.Callbacks(\"once memory\"),\"rejected\"],[\"notify\",\"progress\",b.Callbacks(\"memory\")]],n=\"pending\",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+\"With\"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+\"With\"](this===i?r:this,arguments),this},i[o[0]+\"With\"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement(\"div\");if(d.setAttribute(\"className\",\"t\"),d.innerHTML=\"  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>\",n=d.getElementsByTagName(\"*\"),r=d.getElementsByTagName(\"a\")[0],!n||!r||!n.length)return{};s=o.createElement(\"select\"),l=s.appendChild(o.createElement(\"option\")),a=d.getElementsByTagName(\"input\")[0],r.style.cssText=\"top:1px;float:left;opacity:.5\",t={getSetAttribute:\"t\"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName(\"tbody\").length,htmlSerialize:!!d.getElementsByTagName(\"link\").length,style:/top/.test(r.getAttribute(\"style\")),hrefNormalized:\"/a\"===r.getAttribute(\"href\"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement(\"form\").enctype,html5Clone:\"<:nav></:nav>\"!==o.createElement(\"nav\").cloneNode(!0).outerHTML,boxModel:\"CSS1Compat\"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement(\"input\"),a.setAttribute(\"value\",\"\"),t.input=\"\"===a.getAttribute(\"value\"),a.value=\"t\",a.setAttribute(\"type\",\"radio\"),t.radioValue=\"t\"===a.value,a.setAttribute(\"checked\",\"t\"),a.setAttribute(\"name\",\"t\"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent(\"onclick\",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c=\"on\"+f,\"t\"),t[f+\"Bubbles\"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip=\"content-box\",d.cloneNode(!0).style.backgroundClip=\"\",t.clearCloneStyle=\"content-box\"===d.style.backgroundClip,b(function(){var n,r,a,s=\"padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;\",u=o.getElementsByTagName(\"body\")[0];u&&(n=o.createElement(\"div\"),n.style.cssText=\"border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px\",u.appendChild(n).appendChild(d),d.innerHTML=\"<table><tr><td></td><td>t</td></tr></table>\",a=d.getElementsByTagName(\"td\"),a[0].style.cssText=\"padding:0;margin:0;border:0;display:none\",p=0===a[0].offsetHeight,a[0].style.display=\"\",a[1].style.display=\"none\",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML=\"\",d.style.cssText=\"box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;\",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition=\"1%\"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable=\"4px\"===(e.getComputedStyle(d,null)||{width:\"4px\"}).width,r=d.appendChild(o.createElement(\"div\")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width=\"0\",d.style.width=\"1px\",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML=\"\",d.style.cssText=s+\"width:1px;padding:1px;display:inline;zoom:1\",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display=\"block\",d.innerHTML=\"<div></div>\",d.firstChild.style.width=\"5px\",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\\{[\\s\\S]*\\}|\\[[\\s\\S]*\\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u=\"string\"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),(\"object\"==typeof n||\"function\"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(\" \"));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:\"jQuery\"+(p+Math.random()).replace(/\\D/g,\"\"),noData:{embed:!0,object:\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute(\"classid\")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,\"parsedAttrs\"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf(\"data-\")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,\"parsedAttrs\",!0)}return s}return\"object\"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i=\"data-\"+n.replace(B,\"-$1\").toLowerCase();if(r=e.getAttribute(i),\"string\"==typeof r){try{r=\"true\"===r?!0:\"false\"===r?!1:\"null\"===r?null:+r+\"\"===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if((\"data\"!==t||!b.isEmptyObject(e[t]))&&\"toJSON\"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||\"fx\")+\"queue\",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||\"fx\";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};\"inprogress\"===i&&(i=n.shift(),r--),o.cur=i,i&&(\"fx\"===t&&n.unshift(\"inprogress\"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+\"queueHooks\";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks(\"once memory\").add(function(){b._removeData(e,t+\"queue\"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return\"string\"!=typeof e&&(n=e,e=\"fx\",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),\"fx\"===e&&\"inprogress\"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||\"fx\",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||\"fx\",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};\"string\"!=typeof e&&(n=e,e=t),e=e||\"fx\";while(s--)r=b._data(a[s],e+\"queueHooks\"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\\t\\r\\n]/g,U=/\\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=\"string\"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||\"\").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(\" \"+n.className+\" \").replace(X,\" \"):\" \")){o=0;while(i=t[o++])0>r.indexOf(\" \"+i+\" \")&&(r+=i+\" \");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||\"string\"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||\"\").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(\" \"+n.className+\" \").replace(X,\" \"):\"\")){o=0;while(i=t[o++])while(r.indexOf(\" \"+i+\" \")>=0)r=r.replace(\" \"+i+\" \",\" \");n.className=e?b.trim(r):\"\"}return this},toggleClass:function(e,t){var n=typeof e,r=\"boolean\"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(\"string\"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?\"addClass\":\"removeClass\"](o)}else(n===i||\"boolean\"===n)&&(this.className&&b._data(this,\"__className__\",this.className),this.className=this.className||e===!1?\"\":b._data(this,\"__className__\")||\"\")})},hasClass:function(e){var t=\" \"+e+\" \",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(\" \"+this[n].className+\" \").replace(X,\" \").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o=\"\":\"number\"==typeof o?o+=\"\":b.isArray(o)&&(o=b.map(o,function(e){return null==e?\"\":e+\"\"})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&\"set\"in r&&r.set(this,o,\"value\")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&\"get\"in r&&(n=r.get(o,\"value\"))!==t?n:(n=o.value,\"string\"==typeof n?n.replace(U,\"\"):null==n?\"\":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o=\"select-one\"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute(\"disabled\"))||n.parentNode.disabled&&b.nodeName(n.parentNode,\"optgroup\"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find(\"option\").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&\"get\"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&\"set\"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+\"\"),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase(\"default-\"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,\"\"),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&\"radio\"===t&&b.nodeName(e,\"input\")){var n=e.value;return e.setAttribute(\"type\",t),n&&(e.value=n),t}}}},propFix:{tabindex:\"tabIndex\",readonly:\"readOnly\",\"for\":\"htmlFor\",\"class\":\"className\",maxlength:\"maxLength\",cellspacing:\"cellSpacing\",cellpadding:\"cellPadding\",rowspan:\"rowSpan\",colspan:\"colSpan\",usemap:\"useMap\",frameborder:\"frameBorder\",contenteditable:\"contentEditable\"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&\"set\"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&\"get\"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode(\"tabindex\");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i=\"boolean\"==typeof r&&e.getAttribute(n),o=\"boolean\"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase(\"default-\"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase(\"default-\"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,\"input\")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,\"input\")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&(\"id\"===n||\"name\"===n||\"coords\"===n?\"\"!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+=\"\",\"value\"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,\"\"===t?!1:t,n)}},b.each([\"width\",\"height\"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return\"\"===r?(e.setAttribute(n,\"auto\"),r):t}})})),b.support.hrefNormalized||(b.each([\"href\",\"src\",\"width\",\"height\"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each([\"href\",\"src\"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+\"\"}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype=\"encoding\"),b.support.checkOn||b.each([\"radio\",\"checkbox\"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute(\"value\")?\"on\":e.value}}}),b.each([\"radio\",\"checkbox\"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||\"\").match(w)||[\"\"],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||\"\").split(\".\").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(\".\")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent(\"on\"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||\"\").match(w)||[\"\"],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||\"\").split(\".\").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp(\"(^|\\\\.)\"+h.join(\"\\\\.(?:.*\\\\.|)\")+\"(\\\\.|$)\"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&(\"**\"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,\"events\"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,\"type\")?n.type:n,m=y.call(n,\"namespace\")?n.namespace.split(\".\"):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(\".\")>=0&&(m=g.split(\".\"),g=m.shift(),m.sort()),u=0>g.indexOf(\":\")&&\"on\"+g,n=n[b.expando]?n:new b.Event(g,\"object\"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join(\".\"),n.namespace_re=n.namespace?RegExp(\"(^|\\\\.)\"+m.join(\"\\\\.(?:.*\\\\.|)\")+\"(\\\\.|$)\"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,\"events\")||{})[n.type]&&b._data(l,\"handle\"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||\"click\"===g&&b.nodeName(i,\"a\")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,\"events\")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||\"click\"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||\"click\"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+\" \",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:\"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which\".split(\" \"),fixHooks:{},keyHooks:{props:\"char charCode key keyCode\".split(\" \"),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:\"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement\".split(\" \"),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,\"input\")&&\"checkbox\"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:\"focusin\"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:\"focusout\"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r=\"on\"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:\"mouseover\",mouseleave:\"mouseout\"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;\nreturn(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,\"form\")?!1:(b.event.add(this,\"click._submit keypress._submit\",function(e){var n=e.target,r=b.nodeName(n,\"input\")||b.nodeName(n,\"button\")?n.form:t;r&&!b._data(r,\"submitBubbles\")&&(b.event.add(r,\"submit._submit\",function(e){e._submit_bubble=!0}),b._data(r,\"submitBubbles\",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate(\"submit\",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,\"form\")?!1:(b.event.remove(this,\"._submit\"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?((\"checkbox\"===this.type||\"radio\"===this.type)&&(b.event.add(this,\"propertychange._change\",function(e){\"checked\"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,\"click._change\",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate(\"change\",this,e,!0)})),!1):(b.event.add(this,\"beforeactivate._change\",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,\"changeBubbles\")&&(b.event.add(t,\"change._change\",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate(\"change\",this.parentNode,e,!0)}),b._data(t,\"changeBubbles\",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||\"radio\"!==n.type&&\"checkbox\"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,\"._change\"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:\"focusin\",blur:\"focusout\"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if(\"object\"==typeof e){\"string\"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&(\"string\"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+\".\"+i.namespace:i.origType,i.selector,i.handler),this;if(\"object\"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||\"function\"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,\"**\"):this.off(t,e||\"**\",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x=\"sizzle\"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_=\"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",F=\"(?:\\\\\\\\.|[\\\\w-]|[^\\\\x00-\\\\xa0])+\",O=F.replace(\"w\",\"w#\"),B=\"([*^$|!~]?=)\",P=\"\\\\[\"+_+\"*(\"+F+\")\"+_+\"*(?:\"+B+_+\"*(?:(['\\\"])((?:\\\\\\\\.|[^\\\\\\\\])*?)\\\\3|(\"+O+\")|)|)\"+_+\"*\\\\]\",R=\":(\"+F+\")(?:\\\\(((['\\\"])((?:\\\\\\\\.|[^\\\\\\\\])*?)\\\\3|((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\"+P.replace(3,8)+\")*)|.*)\\\\)|)\",W=RegExp(\"^\"+_+\"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\"+_+\"+$\",\"g\"),$=RegExp(\"^\"+_+\"*,\"+_+\"*\"),I=RegExp(\"^\"+_+\"*([\\\\x20\\\\t\\\\r\\\\n\\\\f>+~])\"+_+\"*\"),z=RegExp(R),X=RegExp(\"^\"+O+\"$\"),U={ID:RegExp(\"^#(\"+F+\")\"),CLASS:RegExp(\"^\\\\.(\"+F+\")\"),NAME:RegExp(\"^\\\\[name=['\\\"]?(\"+F+\")['\\\"]?\\\\]\"),TAG:RegExp(\"^(\"+F.replace(\"w\",\"w*\")+\")\"),ATTR:RegExp(\"^\"+P),PSEUDO:RegExp(\"^\"+R),CHILD:RegExp(\"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\"+_+\"*(even|odd|(([+-]|)(\\\\d*)n|)\"+_+\"*(?:([+-]|)\"+_+\"*(\\\\d+)|))\"+_+\"*\\\\)|)\",\"i\"),needsContext:RegExp(\"^\"+_+\"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\"+_+\"*((?:-\\\\d)?\\\\d*)\"+_+\"*\\\\)|)(?=[^-]|$)\",\"i\")},V=/[\\x20\\t\\r\\n\\f]*[+~]/,Y=/^[^{]+\\{\\s*\\[native code/,J=/^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\\d$/i,K=/'|\\\\/g,Z=/\\=[\\x20\\t\\r\\n\\f]*([^'\"\\]]*)[\\x20\\t\\r\\n\\f]*\\]/g,et=/\\\\([\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|.)/g,tt=function(e,t){var n=\"0x\"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+\"\")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=\" \")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement(\"div\");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||\"string\"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&\"object\"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute(\"id\"))?g=f.replace(K,\"\\\\$&\"):t.setAttribute(\"id\",g),g=\"[id='\"+g+\"'] \",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(\",\")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute(\"id\")}}}return wt(e.replace(W,\"$1\"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?\"HTML\"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment(\"\")),!e.getElementsByTagName(\"*\").length}),T.attributes=at(function(e){e.innerHTML=\"<select></select>\";var t=typeof e.lastChild.getAttribute(\"multiple\");return\"boolean\"!==t&&\"string\"!==t}),T.getByClassName=at(function(e){return e.innerHTML=\"<div class='hidden e'></div><div class='hidden'></div>\",e.getElementsByClassName&&e.getElementsByClassName(\"e\").length?(e.lastChild.className=\"e\",2===e.getElementsByClassName(\"e\").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML=\"<a name='\"+x+\"'></a><div name='\"+x+\"'></div>\",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML=\"<a href='#'></a>\",e.firstChild&&typeof e.firstChild.getAttribute!==A&&\"#\"===e.firstChild.getAttribute(\"href\")})?{}:{href:function(e){return e.getAttribute(\"href\",2)},type:function(e){return e.getAttribute(\"type\")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute(\"id\")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode(\"id\").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode(\"id\");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if(\"*\"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[\":focus\"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML=\"<select><option selected=''></option></select>\",e.querySelectorAll(\"[selected]\").length||h.push(\"\\\\[\"+_+\"*(?:checked|disabled|ismap|multiple|readonly|selected|value)\"),e.querySelectorAll(\":checked\").length||h.push(\":checked\")}),at(function(e){e.innerHTML=\"<input type='hidden' i=''/>\",e.querySelectorAll(\"[i^='']\").length&&h.push(\"[*^$]=\"+_+\"*(?:\\\"\\\"|'')\"),e.querySelectorAll(\":enabled\").length||h.push(\":enabled\",\":disabled\"),e.querySelectorAll(\"*,:x\"),h.push(\",.*:\")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,\"div\"),m.call(e,\"[s!='']:x\"),g.push(\"!=\",R)}),h=RegExp(h.join(\"|\")),g=RegExp(g.join(\"|\")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,\"='$1']\"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error(\"Syntax error, unrecognized expression: \"+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return\"input\"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return(\"input\"===n||\"button\"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n=\"\",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if(\"string\"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{\">\":{dir:\"parentNode\",first:!0},\" \":{dir:\"parentNode\"},\"+\":{dir:\"previousSibling\",first:!0},\"~\":{dir:\"previousSibling\"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||\"\").replace(et,tt),\"~=\"===e[2]&&(e[3]=\" \"+e[3]+\" \"),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),\"nth\"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*(\"even\"===e[3]||\"odd\"===e[3])),e[5]=+(e[7]+e[8]||\"odd\"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(\")\",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return\"*\"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+\" \"];return t||(t=RegExp(\"(^|\"+_+\")\"+e+\"(\"+_+\"|$)\"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute(\"class\")||\"\")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?\"!=\"===t:t?(i+=\"\",\"=\"===t?i===n:\"!=\"===t?i!==n:\"^=\"===t?n&&0===i.indexOf(n):\"*=\"===t?n&&i.indexOf(n)>-1:\"$=\"===t?n&&i.slice(-n.length)===n:\"~=\"===t?(\" \"+i+\" \").indexOf(n)>-1:\"|=\"===t?i===n||i.slice(0,n.length+1)===n+\"-\":!1):!0}},CHILD:function(e,t,n,r,i){var o=\"nth\"!==e.slice(0,3),a=\"last\"!==e.slice(-4),s=\"of-type\"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?\"nextSibling\":\"previousSibling\",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g=\"only\"===e&&!h&&\"nextSibling\"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error(\"unsupported pseudo: \"+e);return r[x]?r(t):r.length>1?(n=[e,e,\"\",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,\"$1\"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||\"\")||st.error(\"unsupported lang: \"+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute(\"xml:lang\")||t.getAttribute(\"lang\"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+\"-\");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return\"input\"===t&&!!e.checked||\"option\"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>\"@\"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return\"input\"===t&&\"button\"===e.type||\"button\"===t},text:function(e){var t;return\"input\"===e.nodeName.toLowerCase()&&\"text\"===e.type&&(null==(t=e.getAttribute(\"type\"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+\" \"];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W,\" \")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r=\"\";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&\"parentNode\"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+\" \"+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||\"*\",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[\" \"],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,\"$1\"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b=\"0\",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG(\"*\",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+\" \"];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&\"ID\"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[\":\"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\\[\\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if(\"string\"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+\" \":\"\")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&(\"string\"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||\"string\"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?\"string\"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n=\"string\"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,\"parentNode\")},parentsUntil:function(e,t,n){return b.dir(e,\"parentNode\",n)},next:function(e){return pt(e,\"nextSibling\")},prev:function(e){return pt(e,\"previousSibling\")},nextAll:function(e){return b.dir(e,\"nextSibling\")},prevAll:function(e){return b.dir(e,\"previousSibling\")},nextUntil:function(e,t,n){return b.dir(e,\"nextSibling\",n)},prevUntil:function(e,t,n){return b.dir(e,\"previousSibling\",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,\"iframe\")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&\"string\"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=\":not(\"+e+\")\"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if(\"string\"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split(\"|\"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht=\"abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video\",gt=/ jQuery\\d+=\"(?:null|\\d+)\"/g,mt=RegExp(\"<(?:\"+ht+\")[\\\\s/>]\",\"i\"),yt=/^\\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>/gi,bt=/<([\\w:]+)/,xt=/<tbody/i,wt=/<|&#?\\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\\s*(?:[^=]|=\\s*.checked.)/i,kt=/^$|\\/(?:java|ecma)script/i,Et=/^true\\/(.*)/,St=/^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g,At={option:[1,\"<select multiple='multiple'>\",\"</select>\"],legend:[1,\"<fieldset>\",\"</fieldset>\"],area:[1,\"<map>\",\"</map>\"],param:[1,\"<object>\",\"</object>\"],thead:[1,\"<table>\",\"</table>\"],tr:[2,\"<table><tbody>\",\"</tbody></table>\"],col:[2,\"<table><tbody></tbody><colgroup>\",\"</colgroup></table>\"],td:[3,\"<table><tbody><tr>\",\"</tr></tbody></table>\"],_default:b.support.htmlSerialize?[0,\"\",\"\"]:[1,\"X<div>\",\"</div>\"]},jt=dt(o),Dt=jt.appendChild(o.createElement(\"div\"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,\"body\")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,\"script\")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,\"select\")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,\"\"):t;if(!(\"string\"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||[\"\",\"\"])[1].toLowerCase()])){e=e.replace(vt,\"<$1></$2>\");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||\"string\"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||\"string\"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,\"tr\"),s=b.map(Ot(l,\"script\"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,\"script\"))),r.call(n&&b.nodeName(this[c],\"table\")?Lt(this[c],\"tbody\"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||\"\")&&!b._data(o,\"globalEval\")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:\"GET\",dataType:\"script\",async:!1,global:!1,\"throws\":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||\"\").replace(St,\"\")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode(\"type\");return e.type=(t&&t.specified)+\"/\"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute(\"type\"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,\"globalEval\",!t||b._data(t[r],\"globalEval\"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}\"script\"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):\"object\"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):\"input\"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):\"option\"===n?t.defaultSelected=t.selected=e.defaultSelected:(\"input\"===n||\"textarea\"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:\"append\",prependTo:\"prepend\",insertBefore:\"before\",insertAfter:\"after\",replaceAll:\"replaceWith\"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||\"*\"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||\"*\"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test(\"<\"+e.nodeName+\">\")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,\"script\"),r.length>0&&Mt(r,!u&&Ot(e,\"script\")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if(\"object\"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement(\"div\")),u=(bt.exec(o)||[\"\",\"\"])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,\"<$1></$2>\")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o=\"table\"!==u||xt.test(o)?\"<table>\"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],\"tbody\")&&!l.childNodes.length&&o.removeChild(l)\n}b.merge(d,s.childNodes),s.textContent=\"\";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,\"input\"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),\"script\"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||\"\")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\\([^)]*\\)/i,It=/opacity\\s*=\\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp(\"^(\"+x+\")(.*)$\",\"i\"),Yt=RegExp(\"^(\"+x+\")(?!px)[a-z%]+$\",\"i\"),Jt=RegExp(\"^([+-])=(\"+x+\")\",\"i\"),Gt={BODY:\"block\"},Qt={position:\"absolute\",visibility:\"hidden\",display:\"block\"},Kt={letterSpacing:0,fontWeight:400},Zt=[\"Top\",\"Right\",\"Bottom\",\"Left\"],en=[\"Webkit\",\"O\",\"Moz\",\"ms\"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,\"none\"===b.css(e,\"display\")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,\"olddisplay\"),n=r.style.display,t?(o[a]||\"none\"!==n||(r.style.display=\"\"),\"\"===r.style.display&&nn(r)&&(o[a]=b._data(r,\"olddisplay\",un(r.nodeName)))):o[a]||(i=nn(r),(n&&\"none\"!==n||!i)&&b._data(r,\"olddisplay\",i?n:b.css(r,\"display\"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&\"none\"!==r.style.display&&\"\"!==r.style.display||(r.style.display=t?o[a]||\"\":\"none\"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t=\"boolean\"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,\"opacity\");return\"\"===n?\"1\":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{\"float\":b.support.cssFloat?\"cssFloat\":\"styleFloat\"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&\"get\"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,\"string\"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a=\"number\"),!(null==r||\"number\"===a&&isNaN(r)||(\"number\"!==a||b.cssNumber[u]||(r+=\"px\"),b.support.clearCloneStyle||\"\"!==r||0!==n.indexOf(\"background\")||(l[n]=\"inherit\"),s&&\"set\"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&\"get\"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),\"normal\"===a&&n in Kt&&(a=Kt[n]),\"\"===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(\"\"!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left=\"fontSize\"===n?\"1em\":u,u=l.pixelLeft+\"px\",l.left=i,a&&(o.left=a)),\"\"===u?\"auto\":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||\"px\"):t}function an(e,t,n,r,i){var o=n===(r?\"border\":\"content\")?4:\"width\"===t?1:0,a=0;for(;4>o;o+=2)\"margin\"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?(\"content\"===n&&(a-=b.css(e,\"padding\"+Zt[o],!0,i)),\"margin\"!==n&&(a-=b.css(e,\"border\"+Zt[o]+\"Width\",!0,i))):(a+=b.css(e,\"padding\"+Zt[o],!0,i),\"padding\"!==n&&(a+=b.css(e,\"border\"+Zt[o]+\"Width\",!0,i)));return a}function sn(e,t,n){var r=!0,i=\"width\"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&\"border-box\"===b.css(e,\"boxSizing\",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?\"border\":\"content\"),r,o)+\"px\"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),\"none\"!==n&&n||(Pt=(Pt||b(\"<iframe frameborder='0' width='0' height='0'/>\").css(\"cssText\",\"display:block !important\")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write(\"<!doctype html><html><body>\"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],\"display\");return n.remove(),r}b.each([\"height\",\"width\"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,\"display\"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&\"border-box\"===b.css(e,\"boxSizing\",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||\"\")?.01*parseFloat(RegExp.$1)+\"\":t?\"1\":\"\"},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?\"alpha(opacity=\"+100*t+\")\":\"\",o=r&&r.filter||n.filter||\"\";n.zoom=1,(t>=1||\"\"===t)&&\"\"===b.trim(o.replace($t,\"\"))&&n.removeAttribute&&(n.removeAttribute(\"filter\"),\"\"===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+\" \"+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:\"inline-block\"},Wt,[e,\"marginRight\"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each([\"top\",\"left\"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+\"px\":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&\"none\"===(e.style&&e.style.display||b.css(e,\"display\"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:\"\",padding:\"\",border:\"Width\"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o=\"string\"==typeof n?n.split(\" \"):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\\[\\]$/,fn=/\\r?\\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,\"elements\");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(\":disabled\")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,\"\\r\\n\")}}):{name:t.name,value:n.replace(fn,\"\\r\\n\")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?\"\":t,i[i.length]=encodeURIComponent(e)+\"=\"+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join(\"&\").replace(cn,\"+\")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+\"[\"+(\"object\"==typeof i?t:\"\")+\"]\",i,n,r)});else if(n||\"object\"!==b.type(t))r(e,t);else for(i in t)gn(e+\"[\"+i+\"]\",t[i],n,r)}b.each(\"blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu\".split(\" \"),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \\t]*([^\\r\\n]*)\\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\\/\\//,En=/^([\\w.+-]+:)(?:\\/\\/([^\\/?#:]*)(?::(\\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn=\"*/\".concat(\"*\");try{yn=a.href}catch(Ln){yn=o.createElement(\"a\"),yn.href=\"\",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){\"string\"!=typeof t&&(n=t,t=\"*\");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])\"+\"===r[0]?(r=r.slice(1)||\"*\",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return\"string\"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o[\"*\"]&&s(\"*\")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if(\"string\"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(\" \");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&\"object\"==typeof n&&(a=\"POST\"),s.length>0&&b.ajax({url:e,type:a,dataType:\"html\",data:n}).done(function(e){o=arguments,s.html(i?b(\"<div>\").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each([\"ajaxStart\",\"ajaxStop\",\"ajaxComplete\",\"ajaxError\",\"ajaxSuccess\",\"ajaxSend\"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each([\"get\",\"post\"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:\"GET\",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:\"application/x-www-form-urlencoded; charset=UTF-8\",accepts:{\"*\":Dn,text:\"text/plain\",html:\"text/html\",xml:\"application/xml, text/xml\",json:\"application/json, text/javascript\"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:\"responseXML\",text:\"responseText\"},converters:{\"* text\":e.String,\"text html\":!0,\"text json\":b.parseJSON,\"text xml\":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){\"object\"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks(\"once memory\"),m=p.statusCode||{},y={},v={},x=0,T=\"canceled\",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+\"\").replace(xn,\"\").replace(kn,mn[1]+\"//\"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||\"*\").toLowerCase().match(w)||[\"\"],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||(\"http:\"===r[1]?80:443))==(mn[3]||(\"http:\"===mn[1]?80:443)))),p.data&&p.processData&&\"string\"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger(\"ajaxStart\"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?\"&\":\"?\")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,\"$1_=\"+vn++):o+(bn.test(o)?\"&\":\"?\")+\"_=\"+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader(\"If-Modified-Since\",b.lastModified[o]),b.etag[o]&&N.setRequestHeader(\"If-None-Match\",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader(\"Content-Type\",p.contentType),N.setRequestHeader(\"Accept\",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+(\"*\"!==p.dataTypes[0]?\", \"+Dn+\"; q=0.01\":\"\"):p.accepts[\"*\"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T=\"abort\";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger(\"ajaxSend\",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort(\"timeout\")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,\"No Transport\");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||\"\",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader(\"Last-Modified\"),T&&(b.lastModified[o]=T),T=N.getResponseHeader(\"etag\"),T&&(b.etag[o]=T)),204===e?(c=!0,C=\"nocontent\"):304===e?(c=!0,C=\"notmodified\"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C=\"error\",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+\"\",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?\"ajaxSuccess\":\"ajaxError\",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger(\"ajaxComplete\",[N,p]),--b.active||b.event.trigger(\"ajaxStop\")))}return N},getScript:function(e,n){return b.get(e,t,n,\"script\")},getJSON:function(e,t,n){return b.get(e,t,n,\"json\")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while(\"*\"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader(\"Content-Type\"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+\" \"+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if(\"*\"!==r){if(\"*\"!==l&&l!==r){if(i=a[l+\" \"+r]||a[\"* \"+r],!i)for(n in a)if(o=n.split(\" \"),o[1]===r&&(i=a[l+\" \"+o[0]]||a[\"* \"+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e[\"throws\"])t=i(t);else try{t=i(t)}catch(c){return{state:\"parsererror\",error:i?c:\"No conversion from \"+l+\" to \"+r}}}l=r}return{state:\"success\",data:t}}b.ajaxSetup({accepts:{script:\"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript\"},contents:{script:/(?:java|ecma)script/},converters:{\"text script\":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter(\"script\",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type=\"GET\",e.global=!1)}),b.ajaxTransport(\"script\",function(e){if(e.crossDomain){var n,r=o.head||b(\"head\")[0]||o.documentElement;return{send:function(t,i){n=o.createElement(\"script\"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,\"success\"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\\?(?=&|$)|\\?\\?/;b.ajaxSetup({jsonp:\"callback\",jsonpCallback:function(){var e=On.pop()||b.expando+\"_\"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter(\"json jsonp\",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?\"url\":\"string\"==typeof n.data&&!(n.contentType||\"\").indexOf(\"application/x-www-form-urlencoded\")&&Bn.test(n.data)&&\"data\");return u||\"jsonp\"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,\"$1\"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?\"&\":\"?\")+n.jsonp+\"=\"+o),n.converters[\"script json\"]=function(){return s||b.error(o+\" was not called\"),s[0]},n.dataTypes[0]=\"json\",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),\"script\"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject(\"Microsoft.XMLHTTP\")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&\"withCredentials\"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i[\"X-Requested-With\"]||(i[\"X-Requested-With\"]=\"XMLHttpRequest\");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),\"string\"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=\"\"}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp(\"^(?:([+-])=|)(\"+x+\")([a-z%]*)$\",\"i\"),Jn=/queueHooks$/,Gn=[nr],Qn={\"*\":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?\"\":\"px\"),\"px\"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||\".5\",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn[\"*\"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&\"expand\"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=[\"*\"]):e=e.split(\" \");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,\"fx\"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,\"fx\").length||c.empty.fire()})})),1===e.nodeType&&(\"height\"in t||\"width\"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],\"inline\"===b.css(e,\"display\")&&\"none\"===b.css(e,\"float\")&&(b.support.inlineBlockNeedsLayout&&\"inline\"!==un(e.nodeName)?d.zoom=1:d.display=\"inline-block\")),n.overflow&&(d.overflow=\"hidden\",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||\"toggle\"===a,a===(m?\"hide\":\"show\"))continue;g.push(i)}if(o=g.length){s=b._data(e,\"fxshow\")||b._data(e,\"fxshow\",{}),\"hidden\"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,\"fxshow\");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start=\"width\"===r||\"height\"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||\"swing\",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?\"\":\"px\")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,\"\"),t&&\"auto\"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each([\"toggle\",\"show\",\"hide\"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||\"boolean\"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css(\"opacity\",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,\"finish\"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return\"string\"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||\"fx\",[]),this.each(function(){var t=!0,n=null!=e&&e+\"queueHooks\",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||\"fx\"),this.each(function(){var t,n=b._data(this),r=n[e+\"queue\"],i=n[e+\"queueHooks\"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r[\"margin\"+n]=r[\"padding\"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir(\"show\"),slideUp:ir(\"hide\"),slideToggle:ir(\"toggle\"),fadeIn:{opacity:\"show\"},fadeOut:{opacity:\"hide\"},fadeToggle:{opacity:\"toggle\"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&\"object\"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:\"number\"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue=\"fx\"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,\"position\");\"static\"===r&&(e.style.position=\"relative\");var i=b(e),o=i.offset(),a=b.css(e,\"top\"),s=b.css(e,\"left\"),u=(\"absolute\"===r||\"fixed\"===r)&&b.inArray(\"auto\",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),\"using\"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return\"fixed\"===b.css(r,\"position\")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],\"html\")||(n=e.offset()),n.top+=b.css(e[0],\"borderTopWidth\",!0),n.left+=b.css(e[0],\"borderLeftWidth\",!0)),{top:t.top-n.top-b.css(r,\"marginTop\",!0),left:t.left-n.left-b.css(r,\"marginLeft\",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,\"html\")&&\"static\"===b.css(e,\"position\"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:\"pageXOffset\",scrollTop:\"pageYOffset\"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:\"height\",Width:\"width\"},function(e,n){b.each({padding:\"inner\"+e,content:n,\"\":\"outer\"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||\"boolean\"!=typeof i),s=r||(i===!0||o===!0?\"margin\":\"border\");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement[\"client\"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body[\"scroll\"+e],o[\"scroll\"+e],n.body[\"offset\"+e],o[\"offset\"+e],o[\"client\"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,\"function\"==typeof define&&define.amd&&define.amd.jQuery&&define(\"jquery\",[],function(){return b})})(window);\n\n/*! picoSlides v1.1 https://github.com/frumbert/picoSlides | Released under MIT License */\n(function(x,d,p,y){function w(a){var h={\"-webkit-touch-callout\":\"none\",\"-webkit-user-select\":\"none\",\"-khtml-user-select\":\"none\",\"-moz-user-select\":\"none\",\"-ms-user-select\":\"none\",\"user-select\":\"none\"};if(a=a||!1)a.className+=\" containerSlide\",a.style.position=\"relative\",a.style.display=\"inline-block\",a.style.textAlign=\"center\",a.style.lineHeight=0,a.style.color=b.cssFgColor,a.style.background='url(\"'+b.loadingImg+'\") center center no-repeat '+b.cssBgColor,a.style.borderRadius=b.cssRadius,a.style.boxShadow=\nb.cssShadow,d(a).css(h);else{a=d.extend({display:\"block\",position:\"absolute\",width:b.cssButtonSize,height:b.cssButtonSize,opacity:b.cssOpacity,\"background-color\":b.cssBgColor,cursor:\"pointer\",color:\"transparent\",\"line-height\":b.cssButtonSize,\"font-size\":.1,\"text-align\":\"center\",\"border-radius\":b.cssButtonSize,\"box-shadow\":b.cssShadow,border:b.cssBorder,transition:b.cssTransition},h);h=parseInt(b.cssButtonSize,10);var g=h/5;var e={display:\"inline-block\",width:0,height:0,\"border-top\":g+\"px solid transparent\",\n\"border-bottom\":g+\"px solid transparent\",\"vertical-align\":\"middle\"};var m={display:\"inline-block\",width:h/3,height:Math.floor(g)-Math.floor(g)%2,background:b.cssFgColor,\"vertical-align\":\"middle\"};var l={display:\"inline-block\",width:g/3,height:.4*h,background:b.cssFgColor,\"vertical-align\":\"middle\"};var q=p.createElement(\"img\");q.alt=b.altAttr;q.style.width=\"100%\";q.style.height=\"auto\";q.style.borderRadius=b.cssRadius;var t=q.cloneNode(!1);q.className=\"firstSlide\";t.style.position=\"absolute\";t.style.top=\n0;t.style.left=0;t.style.visibility=\"hidden\";t.style.opacity=0;var c=p.createElement(\"span\");c.className=\"countSlide\";c.style.display=\"none\";c.style.position=\"absolute\";c.style.bottom=0;c.style.left=\"25%\";c.style.right=\"25%\";c.style.backgroundColor=\"transparent\";c.style.cursor=\"default\";c.innerHTML=\"<span><span>1</span><b>/</b></span>\";var k=c.firstChild;k.style.border=b.cssBorder;k.style.display=\"inline-block\";k.style.padding=\"0 \"+b.cssPadding;k.style.lineHeight=b.cssLineHeight;k.style.fontSize=\nb.cssFontSize;k.style.fontFamily=b.cssFontFamily;k.style.fontWeight=\"bold\";k.style.borderRadius=b.cssRadius+\" \"+b.cssRadius+\" 0 0\";k.style.opacity=b.cssOpacity;k.style.backgroundColor=b.cssBgColor;n={$skipF:d(\"<span/>\",{\"class\":\"controlSlide hideLastSlide skipFSlide\",css:d.extend({},a,{right:b.cssSeparation,bottom:b.cssSeparation}),html:d(\"<span/>\",{css:d.extend({},e,{\"border-left\":m.width+\"px solid \"+b.cssFgColor})}).add(d(\"<span/>\",{css:l})).add(p.createTextNode(\".\"))}),$skipB:d(\"<span/>\",{\"class\":\"controlSlide hideFirstSlide skipBSlide\",\ncss:d.extend({},a,{left:b.cssSeparation,bottom:b.cssSeparation}),html:d(\"<span/>\",{css:l}).add(d(\"<span/>\",{css:d.extend({},e,{\"border-right\":m.width+\"px solid \"+b.cssFgColor})})).add(p.createTextNode(\".\"))}),$next:d(\"<span/>\",{\"class\":\"controlSlide hideLastSlide nextSlide\",css:d.extend({},a,{display:\"none\",right:b.cssSeparation,top:\"50%\",\"margin-top\":\"-\"+h/2+\"px\"}),html:d(\"<span/>\",{css:m}).add(d(\"<span/>\",{css:d.extend({},e,{\"border-left\":m.width+\"px solid \"+b.cssFgColor})})).add(p.createTextNode(\".\"))}),\n$prev:d(\"<span/>\",{\"class\":\"controlSlide hideFirstSlide prevSlide\",css:d.extend({},a,{left:b.cssSeparation,top:\"50%\",\"margin-top\":\"-\"+h/2+\"px\"}),html:d(\"<span/>\",{css:d.extend({},e,{\"border-right\":m.width+\"px solid \"+b.cssFgColor})}).add(d(\"<span/>\",{css:m})).add(p.createTextNode(\".\"))}),$link:d(\"<a/>\",{\"class\":\"controlSlide linkSlide\",target:\"_blank\",css:d.extend({},a,{right:b.cssSeparation,top:b.cssSeparation,\"border-radius\":b.cssRadius}),html:d(\"<img/>\",{width:\"auto\",height:2*g,css:{\"vertical-align\":\"middle\"}}).add(p.createTextNode(\".\"))}),\ncount:c,first:q,slide:t}}}var u=0,n={},b={altAttr:\"\",lazyAttr:\"data-original\",loadingImg:\"data:image/gif;base64,R0lGODlhKwALAMIEAP///wAAAIKCggAAABRaZhRaZhRaZhRaZiH/C05FVFNDQVBFMi4wAwEAAAAh+QQJMgADACwAAAAAKwALAAADNDiyzPNQtRbhpHfWTCP/mgduYEl+Z8mlGauG1ii+7bzadBejeL64sIfvAtQJR7yioHJsJQAAIfkECTIAAwAsAAAAACsACwAAAz84sMzzcIhJaYQ1q8bBzeAHVh0njtOJlo06uiDrRKhF14K8wNpd6x4fikfSEW0YHPCYEo6WzlBUI7s8albJMAEAIfkECTIAAwAsAAAAACsACwAAAz84sszzcIBJaYQtq6xj/dPFjaRwgZ9YrsuJWhHLui+gyiT93jino7xe4wcKCluemi127ECUS8xqM7o8alaqLwEAIfkEATIAAwAsAAAAACsACwAAA0I4sszzULUWIbgYy0kjn1UmXl8HlU40iuhStUK4YvDbyjNQe7ea671T8PEDomxHX24nTFp+zEd0UNxwKtISljobJAAAOw==\",\ncssButtonSize:\"45px\",cssPadding:\"15px\",cssFontSize:\".9em\",cssLineHeight:\"1.5em\",cssFontFamily:\"sans-serif\",cssBgColor:\"gray\",cssFgColor:\"white\",cssSeparation:\"1.5%\",cssRadius:\"2px\",cssOpacity:.65,cssBorder:\"1px solid rgba(0,0,0,.5)\",cssShadow:\"0 0 5px rgba(0,0,0,.2)\",cssTransition:\"all .3s ease\"};var l=function(a,b){this.elem=a;this.$elem=d(a);this.options=b;this.metadata=this.$elem.data(\"options\");this.sourceUrl=this.$elem.data(\"src\");this.toLoad=-1;this.currentSlide=this.counter=null};l.prototype=\n{defaults:{aspectRatio:.75,imgMaxWidth:0,nextTitle:\"Next\",prevTitle:\"Previous\",skipFTitle:\"Skip to last slide\",skipBTitle:\"Skip to first slide\",fadeDuration:0,seqLoad:!0,lazyLoad:{},linkUrl:0,linkIcon:0,linkTitle:\"View on SlideShare\",linkHides:!0,holderTheme:\"picoSlide\",apiUrl:\"http://www.slideshare.net/api/oembed/2?url=\",loadFirst:function(){},loadAll:function(){},timeoutErr:\"The connection has timed out\",missAttrErr:'Missing expected attribute \"data-src\"',timeout:15E3,afterSlideChange:function(){},\nstartAt:1},init:function(){this.settings=d.extend({},this.defaults,this.options,this.metadata);w(this.elem);this.getCover(this.settings.startAt);this.elem.thisRef=this;return this},loading:function(a){this.elem.style.backgroundImage=a?'url(\"'+b.loadingImg+'\")':\"none\"},onLoadHandler:function(){var a=this.parentNode.thisRef;var b=this.nextSibling;--a.toLoad;0===a.toLoad&&(a.loading(!1),a.settings.loadAll.call(a.$elem),--u,0===u&&(n=null));a.settings.seqLoad&&!this.className.match(/\\blastSlide\\b/)&&\nb.setAttribute(\"src\",b.getAttribute(\"data-src\"));this.onload=null},fadeInSlide:function(a,b){var g=this;a.className.match(/\\bfirstSlide\\b/)?(this.$elem.find(\"span.hideFirstSlide\").hide(),this.$elem.find(\"span.hideLastSlide, a.controlSlide\").show()):a.className.match(/\\blastSlide\\b/)?(this.$elem.find(\"span.hideLastSlide\").hide(),this.$elem.find(\"span.hideFirstSlide, a.controlSlide\").show()):(this.$elem.find(\"span.controlSlide\").show(),this.settings.linkHides&&this.$elem.find(\"a.controlSlide\").hide());\nvar e=d(a).index()+1;this.counter.innerHTML=e;b&&this.$elem.find(\"a.controlSlide\").attr(\"href\",this.settings.linkUrl+e);a.style.visibility=\"visible\";d(a).fadeTo(this.settings.fadeDuration,.99,function(){var a=d(this).closest(\".containerSlide\").find(\".countSlide\").text().split(\"/\");g.settings.afterSlideChange.call(g,g,a)});this.currentSlide.style.visibility=\"hidden\";this.currentSlide.style.opacity=0;this.currentSlide=a},gotoSlide:function(a){(a=this.elem.querySelectorAll(\"img\")[a-1])&&a.hasAttribute(\"data-src\")&&\na.setAttribute(\"src\",a.getAttribute(\"data-src\"));this.fadeInSlide(a,!1)},scaffolding:function(a){var h,g;var e=p.createDocumentFragment();var m=!1;var l=a.slide_image_baseurl_suffix+\"?cb=\"+a.version_no;var q=a.slide_image_baseurl_suffix.split(/[-.]/)[1];var t=Math.round(q*this.settings.aspectRatio);this.toLoad=h=a.total_slides;var c=this;var k=!1;this.loading(!0);this.currentSlide=n.first.cloneNode(!1);this.currentSlide.width=q;this.currentSlide.height=t;this.currentSlide.setAttribute(b.lazyAttr,\na.slide_image_baseurl+\"1\"+l);var r=d(this.currentSlide);e.appendChild(this.currentSlide);if(1<this.settings.startAt){var u=c.settings.seqLoad?\"data-src\":\"src\";for(g=2;g<=h;g+=1){var f=n.slide.cloneNode(!1);f.setAttribute(u,a.slide_image_baseurl+g+l);f.onload=c.onLoadHandler;e.appendChild(f)}k=!0}var v=n.$next[0].cloneNode(!0);v.title=this.settings.nextTitle;e.appendChild(v);this.counter=n.count.cloneNode(!0);this.counter.firstChild.appendChild(p.createTextNode(h));e.appendChild(this.counter);!1!==\nthis.settings.linkUrl&&(0===this.settings.linkUrl&&(this.settings.linkUrl=this.sourceUrl+\"/\",m=!0),0===this.settings.linkIcon&&(this.settings.linkIcon=/^https?:\\/\\/[^\\/]+/.exec(this.settings.linkUrl)+\"/favicon.ico\"),f=n.$link[0].cloneNode(!0),f.title=this.settings.linkTitle,f.href=this.settings.linkUrl,f.firstChild.src=this.settings.linkIcon,e.appendChild(f));this.elem.insertBefore(e,this.elem.firstChild);this.currentSlide.onload=function(){this.className.match(/\\benabled\\b/)?(--c.toLoad,c.loading(!1),\n1<h&&(v.style.display=\"block\",c.counter.style.display=\"block\",c.counter=c.counter.firstChild.firstChild,d(v).one(\"click\",function(){c.loading(!0);e=p.createDocumentFragment();if(!k)for(u=c.settings.seqLoad?\"data-src\":\"src\",g=2;g<=h;g+=1)f=n.slide.cloneNode(!1),f.setAttribute(u,a.slide_image_baseurl+g+l),f.onload=c.onLoadHandler,e.appendChild(f);f.className=\"lastSlide\";f=n.$prev[0].cloneNode(!0);f.title=c.settings.prevTitle;e.appendChild(f);0<c.settings.skipFTitle.length&&(f=n.$skipF[0].cloneNode(!0),\nf.title=c.settings.skipFTitle,e.appendChild(f));0<c.settings.skipBTitle.length&&(f=n.$skipB[0].cloneNode(!0),f.title=c.settings.skipBTitle,e.appendChild(f));c.elem.insertBefore(e,this);c.settings.seqLoad&&(r.next()[0].src=r.next()[0].getAttribute(\"data-src\"));c.$elem.delegate(\".controlSlide\",\"click\",function(){this.className.match(/\\bskipFSlide\\b/)?c.currentSlide.className.match(/\\blastSlide\\b/)||c.fadeInSlide(c.elem.children[h-1],m):this.className.match(/\\bskipBSlide\\b/)?c.currentSlide.className.match(/\\bfirstSlide\\b/)||\nc.fadeInSlide(c.elem.firstChild,m):this.className.match(/\\bnextSlide\\b/)?c.currentSlide.className.match(/\\blastSlide\\b/)||c.fadeInSlide(c.currentSlide.nextSibling,m):this.className.match(/\\bprevSlide\\b/)&&(c.currentSlide.className.match(/\\bfirstSlide\\b/)||c.fadeInSlide(c.currentSlide.previousSibling,m))})})),c.$elem.delegate(\".controlSlide\",{mouseenter:function(){d(this).stop(!1).animate({opacity:.99},c.settings.fadeDuration)},mouseleave:function(){d(this).stop(!1).animate({opacity:b.cssOpacity},\nc.settings.fadeDuration)}}),c.settings.loadFirst.call(c.$elem),this.onload=null):d(this).addClass(\"enabled\")};\"undefined\"!==typeof Holder&&!1!==c.settings.holderTheme&&(r.attr(\"data-src\",\"holder.js/\"+r.width()+\"x\"+Math.round(r.width()*c.settings.aspectRatio)+\"/auto/\"+c.settings.holderTheme),\"picoSlide\"===c.settings.holderTheme&&Holder.add_theme(\"picoSlide\",{background:b.cssBgColor,text:\" \"}),Holder.run({images:r[0]}));d.fn.lazyload&&!1!==c.settings.lazyLoad?r.lazyload(c.settings.lazyLoad):r.addClass(\"enabled\").attr(\"src\",\nr.attr(b.lazyAttr))},getCover:function(){var a=this;if(this.sourceUrl){var b=this.settings.apiUrl+this.sourceUrl+\"&format=jsonp\";this.settings.imgMaxWidth||(this.settings.imgMaxWidth=this.$elem.width());b+=\"&maxwidth=\"+this.settings.imgMaxWidth;d.ajax({type:\"GET\",url:b,dataType:\"jsonp\",timeout:this.settings.timeout}).done(function(b){a.scaffolding(b)}).fail(function(b,d,h){\"timeout\"===d&&a.$elem.html(a.settings.timeoutErr)})}else a.$elem.html(a.settings.missAttrErr)}};d.fn.picoSlides=function(a){if(\"string\"===\ntypeof a&&d(this).data(\"_inst\")&&d(this).data(\"_inst\")[a])return d(this).data(\"_inst\")[a].apply(d(this).data(\"_inst\"),Array.prototype.slice.call(arguments,1));if(\"object\"!==typeof a&&a)d.error(\"Method \"+a+\" does not exist on jQuery.picoSlides\");else return w(),u=this.length,this.each(function(b,g){var e=(new l(this,a)).init();d(g).data({_inst:e});return e})};l.slideDefs=l.prototype.defaults;l.elemDefs=b;x.PicoSlides=l})(window,jQuery,document);\n</script>";
},"18":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\" src=\"https://player.vimeo.com/api/player.js\"></script>";
},"20":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\" src=\"https://www.youtube.com/player_api\"></script>";
},"22":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\" src=\"//w.soundcloud.com/player/api.js\"></script>";
},"24":function(container,depth0,helpers,partials,data) {
    return "<link rel=\"stylesheet\" href=\"https://cdn.plyr.io/3.6.2/plyr.css\" />\n<script src=\"https://cdn.plyr.io/3.6.2/plyr.js\"></script>\n";
},"26":function(container,depth0,helpers,partials,data) {
    return " onunload=\"_poll=!1\" onbeforeunload=\"_poll=!1\"";
},"28":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<video controls crossorigin playsinline id=\"player\">\n	<source src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data,"loc":{"start":{"line":87,"column":14},"end":{"line":87,"column":21}}}) : helper)))
    + "\" type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"mime") || (depth0 != null ? lookupProperty(depth0,"mime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mime","hash":{},"data":data,"loc":{"start":{"line":87,"column":29},"end":{"line":87,"column":37}}}) : helper)))
    + "\" />\n</video>\n";
},"30":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\">\n/*! fluidvids.js v2.4.1 | (c) 2014 @toddmotto | https://github.com/toddmotto/fluidvids; mods to height using resize throttler by tim, plus vertical centering using http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/ */\n(function(e,d){\"function\"===typeof define&&define.amd?define(d):\"object\"===typeof exports?module.exports=d:e.fluidvids=d()})(this,function(){function e(b){return(new RegExp(\"^(https?:)?//(?:\"+c.players.join(\"|\")+\").*$\",\"i\")).test(b)}function d(){var b=document.createElement(\"div\");b.innerHTML=\"<p>x</p><style>\"+h+\"</style>\";k.appendChild(b.childNodes[1])}function l(){var b=document.querySelector(\"body\").offsetHeight;Array.prototype.forEach.call(document.querySelectorAll(\".fluidvids-item\"),function(c,a){c.style.maxHeight=\nb+\"px\"})}var c={selector:[\"iframe\",\"object\"],players:[\"www.youtube.com\",\"player.vimeo.com\"]},h=[\".fluidvids {width: 100%; max-width: 100%; height: 100%; position: relative; }.fluidvids-item {\",\"position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; max-height: \"+document.documentElement.querySelector(\"body\").offsetHeight+\"px\",\"}\"].join(\"\"),k=document.head||document.getElementsByTagName(\"head\")[0];c.render=function(){for(var b=document.querySelectorAll(c.selector.join()),d=b.length;d--;){var a=b[d];\nif((e(a.src)||e(a.data))&&!a.getAttribute(\"data-fluidvids\")){var f=document.createElement(\"div\");a.parentNode.insertBefore(f,a);a.className+=(a.className?\" \":\"\")+\"fluidvids-item\";a.setAttribute(\"data-fluidvids\",\"loaded\");f.className+=\"fluidvids\";var h=f.style,g;g=a.width;g=parseInt(a.height,10)/parseInt(g,10)*100+\"%\";h.paddingTop=g;f.appendChild(a)}}};c.init=function(b){for(var e in b)c[e]=b[e];c.render();d();var a;window.addEventListener(\"resize\",function(){a||(a=setTimeout(function(){a=null;l()},\n66))},!1)};return c});\nfluidvids.init({selector:['iframe']});\n</script>";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<script type=\"text/javascript\">\nvar player, _poll=!1, duration=0, init = (function(){\n	var qs = window.location.search.split(\"?\")[1] ? window.location.search.split(\"?\")[1].split(\",\") : [0,0];\n	return {\n		timestamp: Math.max(0,+qs[0]||0),\n		index: qs[1] ? +qs[1] : -1\n	}\n})(), poll = function () {\n	if (_poll) {\n		parent.dispatchEvent(new CustomEvent(\"statuschange\", {detail:{index: init.index, seconds: player.getCurrentTime(), duration:duration}}));\n		setTimeout(poll,249);\n	}\n};\nwindow.onYouTubeIframeAPIReady = function () {\n	player = new YT.Player('player1', {\n		"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"videoId") : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":119,"column":2},"end":{"line":119,"column":47}}})) != null ? stack1 : "")
    + "\n		origin: location.origin,\n		events: {\n			'onReady':  function (event) {\n				duration = player.getDuration();\n				if (init.timestamp!==0) {\n					player.seekTo(init.timestamp);\n				}\n				player.playVideo();\n			},\n			'onStateChange': function (event) {\n				switch (event.data) {\n					case YT.PlayerState.PAUSED: case YT.PlayerState.ENDED: case YT.PlayerState.BUFFERING: _poll=!1; break;\n					case YT.PlayerState.PLAYING: _poll=1; setTimeout(poll,249); break;\n				}\n			}\n		}\n	});\n};\n</script>\n";
},"33":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "videoId: '"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"videoId") || (depth0 != null ? lookupProperty(depth0,"videoId") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"videoId","hash":{},"data":data,"loc":{"start":{"line":119,"column":27},"end":{"line":119,"column":38}}}) : helper)))
    + "',";
},"35":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\">\nvar init = (function(){\n	var qs = window.location.search.split(\"?\")[1] ? window.location.search.split(\"?\")[1].split(\",\") : [0,0];\n	return {\n		timestamp: Math.max(0,+qs[0]||0),\n		index: qs[1] ? +qs[1] : -1\n	}\n})(),\n	played=!1,\n	duration=0,\n	player=new Vimeo.Player(document.querySelector('#player1'));\n\nplayer.on('timeupdate',function(data) {\n	data[\"index\"] = init.index;\n	// parent.dispatchEvent(new CustomEvent(\"statuschange\", {detail:{index:init.index, seconds:seconds,duration:duration}}));\n	parent.dispatchEvent(new CustomEvent(\"statuschange\", {detail: data}));\n});\nplayer.on('play',function(data) {\n	if (!played && init.timestamp>0) {\n		player.setCurrentTime(init.timestamp);\n	}\n	played=!0;\n});\nplayer.getDuration().then(function(value) {\n	duration = value;\n});\n</script>\n";
},"37":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\">\nvar player,\n	init = (function(){\n	var qs = window.location.search.split(\"?\")[1] ? window.location.search.split(\"?\")[1].split(\",\") : [0,0];\n	return {\n		timestamp: Math.max(0,+qs[0]||0),\n		index: qs[1] ? +qs[1] : -1\n	}\n})();\ndoOnLoad(function () {\n	var widget = SC.Widget(document.getElementById('sc-widget')), duration = 0, played = false;\n	widget.bind(SC.Widget.Events.READY, function() {\n		player = widget;\n		widget.bind(SC.Widget.Events.PLAY, function() {\n			widget.getDuration(function (v) { duration = (v / 1000); });\n			if (init.timestamp!==0 && !played) {widget.seekTo(init.timestamp * 1000)};\n			played = true;\n		});\n		widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(event) {\n			seconds = event.currentPosition / 1000;\n			parent.dispatchEvent(new CustomEvent(\"statuschange\", {detail:{index:init.index, seconds:seconds,duration:duration}}));\n		});\n		widget.play();\n	});\n});\n</script>\n";
},"39":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\">\nvar init = (function(){\n	var qs = window.location.search.split(\"?\")[1] ? window.location.search.split(\"?\")[1].split(\",\") : [0,0];\n	return {\n		timestamp: Math.max(0,+qs[0]||0),\n		index: qs[1] ? +qs[1] : -1\n	}\n})();\ndoOnLoad(function () {\n	var h = document.querySelector(\"body\").offsetHeight,\n		w = (h/3) * 4,\n		p =	$(\"#slides\").picoSlides({\n			imgMaxWidth: w,\n			startAt: init.timestamp,\n			skipBTitle: \"\",\n			skipFTitle: \"\",\n			linkUrl: false,\n			holderTheme: false,\n			apiUrl: \"//www.slideshare.net/api/oembed/2?url=\",\n			afterSlideChange: function (obj, page) {\n				parent.dispatchEvent(new CustomEvent(\"statuschange\", {detail:{index:init.index, slide: page[0], total: page[1]}}));\n			},\n			loadFirst: function (elem) {\n				if (init.timestamp > 2) { // why not 2?\n					p.picoSlides(\"gotoSlide\", init.timestamp);\n				}\n			}\n		});\n});\n</script>\n";
},"41":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\">\nvar init = (function(){\n	var qs = window.location.search.split(\"?\")[1] ? window.location.search.split(\"?\")[1].split(\",\") : [0,0];\n	return {\n		timestamp: Math.max(0,+qs[0]||0),\n		index: qs[1] ? +qs[1] : -1\n	}\n})(),\n	played=!1,\n	duration=0,\n	player=new Plyr('#player');\nplayer.on('timeupdate',function(data) {\n	parent.dispatchEvent(new CustomEvent(\"statuschange\", {detail:{index:init.index, seconds:player.currentTime, duration:duration}}));\n});\nplayer.on('play',function(data) {\n	if (!played && init.timestamp>0) {\n		player.currentTime = init.timestamp;\n	}\n	played=!0;\n});\nplayer.on('loadedmetadata', function () {\n	duration = player.duration;\n});\nplayer.on('ready', function () {\n	duration = player.duration;\n});\n</script>\n";
},"43":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='description'>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"description","hash":{},"data":data,"loc":{"start":{"line":267,"column":49},"end":{"line":267,"column":66}}}) : helper))) != null ? stack1 : "")
    + "</div>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"ninja:renderer\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"format") || (depth0 != null ? lookupProperty(depth0,"format") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"format","hash":{},"data":data,"loc":{"start":{"line":5,"column":37},"end":{"line":5,"column":47}}}) : helper)))
    + "\" >\n<title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":6,"column":7},"end":{"line":6,"column":16}}}) : helper)))
    + "</title>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<link href=\"https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap\" rel=\"stylesheet\">\n<style>\nhtml,body {\n	margin: 0;\n	height: 100%;\n	min-height: 100%\n}\nbody {\n	font-family: 'Source Sans Pro', sans-serif;\n	overflow: "
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","slideshare",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":17,"column":11},"end":{"line":17,"column":78}}})) != null ? stack1 : "")
    + ";\n	position: relative;\n	"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"backgroundColor") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":19,"column":1},"end":{"line":23,"column":8}}})) != null ? stack1 : "")
    + "}\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","slideshare",{"name":"compare","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":0},"end":{"line":37,"column":13}}})) != null ? stack1 : "")
    + "\n</style>\n<script type=\"text/javascript\" src=\"https://polyfill.io/v3/polyfill.min.js\"></script>\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","slideshare",{"name":"compare","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":0},"end":{"line":73,"column":21}}})) != null ? stack1 : "")
    + "\n<script type=\"text/javascript\">function doOnLoad(fn) { if (window.addEventListener) { window.addEventListener('load', fn, false); } else { window.attachEvent('onload', fn); }}</script>\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"vimeo",{"name":"compare","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":75,"column":0},"end":{"line":75,"column":124}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"youtube",{"name":"compare","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":76,"column":0},"end":{"line":76,"column":122}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"soundcloud",{"name":"compare","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":77,"column":0},"end":{"line":77,"column":123}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"video",{"name":"compare","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":78,"column":0},"end":{"line":81,"column":12}}})) != null ? stack1 : "")
    + "</head>\n<body"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"youtube",{"name":"compare","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":83,"column":5},"end":{"line":83,"column":92}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"body") || (depth0 != null ? lookupProperty(depth0,"body") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data,"loc":{"start":{"line":84,"column":0},"end":{"line":84,"column":10}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"video",{"name":"compare","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":85,"column":0},"end":{"line":89,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"in","youtube,vimeo",{"name":"compare","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":91,"column":0},"end":{"line":98,"column":21}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"youtube",{"name":"compare","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":99,"column":0},"end":{"line":139,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"vimeo",{"name":"compare","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":140,"column":0},"end":{"line":177,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"soundcloud",{"name":"compare","hash":{},"fn":container.program(37, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":178,"column":0},"end":{"line":205,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"slideshare",{"name":"compare","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":206,"column":0},"end":{"line":237,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"video",{"name":"compare","hash":{},"fn":container.program(41, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":238,"column":0},"end":{"line":266,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"show_description") : depth0),{"name":"if","hash":{},"fn":container.program(43, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":267,"column":0},"end":{"line":267,"column":79}}})) != null ? stack1 : "")
    + "\n</body>\n</html>\n";
},"useData":true});
templates['wrapper-image'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>Picture</title>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <style>\n    html,body {\n    	min-height: 100vh;\n			font-size: 16px;\n    }\n		body {\n		  margin: 1rem;\n		  background-color: #"
    + alias4(((helper = (helper = lookupProperty(helpers,"backgroundColour") || (depth0 != null ? lookupProperty(depth0,"backgroundColour") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColour","hash":{},"data":data,"loc":{"start":{"line":14,"column":23},"end":{"line":14,"column":43}}}) : helper)))
    + ";\n		  text-align: center;\n		}\n		img {\n			max-width: 100%;\n		}\n	</style>\n  </head>\n  <body>\n    <script>\n      function resize(img) {\n      	if (img.naturalWidth < document.body.scrollWidth) img.style.width = img.naturalWidth + 'px';\n      }\n    </script>\n    <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image") || (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data,"loc":{"start":{"line":28,"column":14},"end":{"line":28,"column":23}}}) : helper)))
    + "\" onload=\"resize(this)\">\n  </body>\n</html>";
},"useData":true});
templates['wrapper-markdown'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n	<meta charset=\"utf-8\">\n	<title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":17}}}) : helper)))
    + "</title>\n	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\" />\n	<link rel=\"preconnect\" href=\"https://polyfill.io\">\n	<link rel=\"preconnect\" href=\"https://cdnjs.cloudflare.com\">\n	<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\">\n	<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css\">\n	<link id=\"gfont\" href=\"https://fonts.googleapis.com/css2?family="
    + alias4((lookupProperty(helpers,"urlencode")||(depth0 && lookupProperty(depth0,"urlencode"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? lookupProperty(stack1,"headerFont") : stack1),{"name":"urlencode","hash":{},"data":data,"loc":{"start":{"line":11,"column":65},"end":{"line":11,"column":93}}}))
    + "&family="
    + alias4((lookupProperty(helpers,"urlencode")||(depth0 && lookupProperty(depth0,"urlencode"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? lookupProperty(stack1,"bodyFont") : stack1),{"name":"urlencode","hash":{},"data":data,"loc":{"start":{"line":11,"column":101},"end":{"line":11,"column":127}}}))
    + "&display=swap\" rel=\"stylesheet\">\n	<style>\n    :root {\n	  --headerFont: '"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? lookupProperty(stack1,"headerFont") : stack1), depth0))
    + "';\n	  --bodyFont: '"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? lookupProperty(stack1,"bodyFont") : stack1), depth0))
    + "';\n	  --color-initial: #fff;\n	  --color-primary: "
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? lookupProperty(stack1,"color-primary") : stack1), depth0))
    + ";\n	  --color-secondary: "
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? lookupProperty(stack1,"color-secondary") : stack1), depth0))
    + ";\n	  --color-header: "
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? lookupProperty(stack1,"color-header") : stack1), depth0))
    + ";\n	  --color-tertiary: #f4f5f6;\n	  --color-quaternary: #d1d1d1;\n	  --color-quinary: #e1e1e1;\n	}\n\n	"
    + ((stack1 = (lookupProperty(helpers,"inject")||(depth0 && lookupProperty(depth0,"inject"))||alias2).call(alias1,"plugins/Markdown/milligram.css",{"name":"inject","hash":{},"data":data,"loc":{"start":{"line":25,"column":1},"end":{"line":25,"column":46}}})) != null ? stack1 : "")
    + "\n\n	body {\n		background-color: #"
    + alias4(((helper = (helper = lookupProperty(helpers,"backgroundColour") || (depth0 != null ? lookupProperty(depth0,"backgroundColour") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColour","hash":{},"data":data,"loc":{"start":{"line":28,"column":21},"end":{"line":28,"column":41}}}) : helper)))
    + ";\n		margin-top: 1rem;\n	}\n	.container {\n		background-color: #ffffff;\n	}\n/*	img {\n		max-width: 100%;\n		display: block;\n		margin: 0 auto;\n	    padding: 0;\n	    box-shadow: 0 .5rem 1rem rgba(0,0,0,.1);\n	}\n*/	</style>\n	<script type=\"text/javascript\" src=\"https://polyfill.io/v3/polyfill.min.js\"></script>\n	<script type=\"text/javascript\">function doOnLoad(fn) { if (window.addEventListener) { window.addEventListener('load', fn, false); } else { window.attachEvent('onload', fn); }}</script>\n	<script type=\"text/javascript\">\n	var init = (function(){\n		var qs = window.location.search.split(\"?\")[1] ? window.location.search.split(\"?\")[1].split(\",\") : [0,0];\n		return {\n			seconds: Math.max(0,+qs[0]||0),\n			index: qs[1] ? +qs[1] : -1\n		}\n	})();\n	function incr() {\n		parent.dispatchEvent(new CustomEvent(\"statuschange\", {detail: init}));\n		init.seconds += 1; // time spent on page, in seconds\n		setTimeout(incr, 1000);\n	}\n	doOnLoad(incr);\n	</script>\n</head>\n<body>\n	<main class=\"wrapper\">\n		<section class=\"container\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"html") || (depth0 != null ? lookupProperty(depth0,"html") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"html","hash":{},"data":data,"loc":{"start":{"line":62,"column":29},"end":{"line":62,"column":39}}}) : helper))) != null ? stack1 : "")
    + "</section>\n	</main>\n</body>\n</html>";
},"useData":true});
templates['wrapper-raw'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = ((helper = (helper = lookupProperty(helpers,"body") || (depth0 != null ? lookupProperty(depth0,"body") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"body","hash":{},"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10}}}) : helper))) != null ? stack1 : "");
},"useData":true});
templates['wrapper-redirect'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":5,"column":16}}}) : helper)))
    + "</title>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<meta http-equiv=\"refresh\" content=\"0;URL='"
    + alias4(((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data,"loc":{"start":{"line":7,"column":43},"end":{"line":7,"column":50}}}) : helper)))
    + "'\" />\n</head>\n<body>\n<p>Loading...</p>\n</body>\n</html>\n";
},"useData":true});
templates['wrapper-video'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "#"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"backgroundColor") : stack1), depth0))
    + ";";
},"3":function(container,depth0,helpers,partials,data) {
    return "black";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"player\" data-plyr-provider=\"youtube\" data-plyr-embed-id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"videoId") || (depth0 != null ? lookupProperty(depth0,"videoId") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"videoId","hash":{},"data":data,"loc":{"start":{"line":35,"column":95},"end":{"line":35,"column":106}}}) : helper)))
    + "\"></div>";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"player\" data-plyr-provider=\"vimeo\" data-plyr-embed-id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"videoId") || (depth0 != null ? lookupProperty(depth0,"videoId") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"videoId","hash":{},"data":data,"loc":{"start":{"line":36,"column":91},"end":{"line":36,"column":102}}}) : helper)))
    + "\"></div>";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<video controls crossorigin playsinline id=\"player\">\n	<source src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data,"loc":{"start":{"line":38,"column":14},"end":{"line":38,"column":21}}}) : helper)))
    + "\" type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"mime") || (depth0 != null ? lookupProperty(depth0,"mime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mime","hash":{},"data":data,"loc":{"start":{"line":38,"column":29},"end":{"line":38,"column":37}}}) : helper)))
    + "\" />\n</video>";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='description'>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"description","hash":{},"data":data,"loc":{"start":{"line":78,"column":49},"end":{"line":78,"column":66}}}) : helper))) != null ? stack1 : "")
    + "</div>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":5,"column":16}}}) : helper)))
    + "</title>\n<meta name=\"ninja:renderer\" content=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"format") || (depth0 != null ? lookupProperty(depth0,"format") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"format","hash":{},"data":data,"loc":{"start":{"line":6,"column":37},"end":{"line":6,"column":47}}}) : helper)))
    + "\" >\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://cdn.plyr.io\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<link href=\"https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap\" rel=\"stylesheet\">\n<link rel=\"stylesheet\" href=\"https://cdn.plyr.io/3.6.2/plyr.css\" />\n<style>\nhtml,body {\n	margin: 0;\n	height: 100%;\n	min-height: 100%\n}\nbody {\n	font-family: 'Source Sans Pro', sans-serif;\n	overflow: hidden;\n	position: relative;\n	background-color:"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"payload") : depth0)) != null ? lookupProperty(stack1,"backgroundColor") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":22,"column":18},"end":{"line":22,"column":98}}})) != null ? stack1 : "")
    + ";\n}\n.plyr--video, .plyr__video-wrapper {\n	background-color: transparent;\n}\nbody.noscrub .plyr__progress { display:none }\n</style>\n<script type=\"text/javascript\" src=\"https://polyfill.io/v3/polyfill.min.js\"></script>\n<script src=\"https://cdn.plyr.io/3.6.2/plyr.js\"></script>\n<script type=\"text/javascript\">function doOnLoad(fn) { if (window.addEventListener) { window.addEventListener('load', fn, false); } else { window.attachEvent('onload', fn); }}</script>\n</head>\n<body>\n"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"body") || (depth0 != null ? lookupProperty(depth0,"body") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data,"loc":{"start":{"line":34,"column":0},"end":{"line":34,"column":10}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"youtube",{"name":"compare","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":0},"end":{"line":35,"column":126}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"vimeo",{"name":"compare","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":0},"end":{"line":36,"column":122}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (lookupProperty(helpers,"compare")||(depth0 && lookupProperty(depth0,"compare"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"format") : depth0),"video",{"name":"compare","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":0},"end":{"line":39,"column":20}}})) != null ? stack1 : "")
    + "\n\n<script type=\"text/javascript\">\nvar init = (function(){\n	var qs = window.location.search.split(\"?\")[1] ? window.location.search.split(\"?\")[1].split(\",\") : [0,0];\n	return {\n		timestamp: Math.max(0,+qs[0]||0),\n		index: qs[1] ? +qs[1] : -1\n	}\n})(),\n	played=!1,\n	duration=0,\n	player=new Plyr('#player');\n\nplayer.on('timeupdate',function(data) {\n	parent.dispatchEvent(new CustomEvent(\"statuschange\", {\n		detail:{\n			index:init.index,\n			seconds:player.currentTime,\n			duration:duration\n		}\n	}));\n});\n\nplayer.on('play',function(data) {\n	if (!played && init.timestamp>0) {\n		player.currentTime = init.timestamp;\n	}\n	played=!0;\n});\n\nplayer.on('loadedmetadata', function () {\n	duration = player.duration;\n});\n\nplayer.on('ready', function () {\n	duration = player.duration;\n});\n</script>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"show_description") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":78,"column":0},"end":{"line":78,"column":79}}})) != null ? stack1 : "")
    + "\n</body>\n</html>\n";
},"useData":true});
templates['xapimanifest'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<file href=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"href","hash":{},"data":data,"loc":{"start":{"line":16,"column":33},"end":{"line":16,"column":41}}}) : helper)))
    + "\" />\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<?xml version=\"1.0\" standalone=\"no\"?>\n<manifest>\n  <organizations default=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":3,"column":27},"end":{"line":3,"column":40}}}) : helper)))
    + "\">\n    <organization identifier=\"O"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":4,"column":31},"end":{"line":4,"column":44}}}) : helper)))
    + "\">\n      <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":5,"column":13},"end":{"line":5,"column":35}}}) : helper)))
    + "</title>\n      <item identifier=\"I"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":6,"column":25},"end":{"line":6,"column":38}}}) : helper)))
    + "\" identifierref=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":6,"column":56},"end":{"line":6,"column":69}}}) : helper)))
    + "\">\n        <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"option-course-name") || (depth0 != null ? lookupProperty(depth0,"option-course-name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option-course-name","hash":{},"data":data,"loc":{"start":{"line":7,"column":15},"end":{"line":7,"column":37}}}) : helper)))
    + "</title>\n      </item>\n    </organization>\n  </organizations>\n  <resources>\n    <resource identifier=\"R"
    + alias4(((helper = (helper = lookupProperty(helpers,"timestamp") || (depth0 != null ? lookupProperty(depth0,"timestamp") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data,"loc":{"start":{"line":12,"column":27},"end":{"line":12,"column":40}}}) : helper)))
    + "\" type=\"webcontent\" adlcp:scormtype=\"sco\" href=\"index.html\">\n      <file href=\"index.html\" />\n      <file href=\"_package.js\" />\n      <file href=\"_package.css\" />\n      "
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"pages") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":6},"end":{"line":17,"column":15}}})) != null ? stack1 : "")
    + "    </resource>\n  </resources>\n</manifest>";
},"useData":true});
})();