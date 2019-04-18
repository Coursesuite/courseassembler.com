(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.FontPicker = factory());
}(this, function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function getFontId(fontFamily) {
        return fontFamily.replace(/\s+/g, "-").toLowerCase();
    }

    function get(url) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.overrideMimeType("application/json");
            request.open("GET", url, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status !== 200) {
                        reject(new Error("Response has status code " + request.status));
                    }
                    else {
                        resolve(request.responseText);
                    }
                }
            };
            request.send();
        });
    }

    var LIST_BASE_URL = "https://www.googleapis.com/webfonts/v1";
    function getFontList(apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, json, fontsOriginal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = LIST_BASE_URL + "/webfonts?sort=popularity&key=" + apiKey;
                        return [4, get(url)];
                    case 1:
                        response = _a.sent();
                        json = JSON.parse(response);
                        fontsOriginal = json.items;
                        return [2, fontsOriginal.map(function (fontOriginal) {
                                var family = fontOriginal.family, subsets = fontOriginal.subsets, others = __rest(fontOriginal, ["family", "subsets"]);
                                return __assign({}, others, { family: family, id: getFontId(family), scripts: subsets });
                            })];
                }
            });
        });
    }

    function getMatches(regex, str) {
        var matches = [];
        var match;
        do {
            match = regex.exec(str);
            if (match) {
                matches.push(match[1]);
            }
        } while (match);
        return matches;
    }

    var FONT_FACE_REGEX = /@font-face {([\s\S]*?)}/gm;
    var FONT_FAMILY_REGEX = /font-family: ['"](.*?)['"]/gm;
    function extractFontStyles(allFontStyles) {
        var rules = getMatches(FONT_FACE_REGEX, allFontStyles);
        var fontStyles = {};
        rules.forEach(function (rule) {
            var fontFamily = getMatches(FONT_FAMILY_REGEX, rule)[0];
            var fontId = getFontId(fontFamily);
            if (!(fontId in fontStyles)) {
                fontStyles[fontId] = "";
            }
            fontStyles[fontId] += "@font-face {\n" + rule + "\n}\n\n";
        });
        return fontStyles;
    }

    var FONT_BASE_URL = "https://fonts.googleapis.com/css";
    function getStylesheet(fonts, scripts, variants, previewsOnly) {
        return __awaiter(this, void 0, void 0, function () {
            var variantsEnc, familiesEnc, query, familyNamesConcat, downloadChars, url;
            return __generator(this, function (_a) {
                variantsEnc = variants.join(",");
                familiesEnc = fonts.map(function (font) { return encodeURIComponent(font.family) + ":" + variantsEnc; });
                query = "?family=" + familiesEnc.join("|");
                query += "&subset=" + scripts.join(",");
                if (previewsOnly) {
                    familyNamesConcat = fonts.map(function (font) { return font.family; }).join("");
                    downloadChars = familyNamesConcat
                        .split("")
                        .filter(function (char, pos, self) { return self.indexOf(char) === pos; })
                        .join("");
                    query += "&text=" + downloadChars;
                }
                url = "" + FONT_BASE_URL + query;
                return [2, get(url)];
            });
        });
    }

    var activeFontStylesheet = document.createElement("style");
    var previewFontsStylesheet = document.createElement("style");
    document.head.appendChild(activeFontStylesheet);
    document.head.appendChild(previewFontsStylesheet);
    function applyFontPreview(previewFont, selectorSuffix) {
        var fontId = getFontId(previewFont.family);
        var style = "\n\t\t\t#font-button-" + fontId + selectorSuffix + " {\n\t\t\t\tfont-family: \"" + previewFont.family + "\";\n\t\t\t}\n\t\t";
        previewFontsStylesheet.appendChild(document.createTextNode(style));
    }
    function applyActiveFont(activeFont, previousFontFamily, selectorSuffix) {
        var style = "\n\t\t.apply-font" + selectorSuffix + " {\n\t\t\tfont-family: \"" + activeFont.family + "\"" + (previousFontFamily ? ", \"" + previousFontFamily + "\"" : "") + ";\n\t\t}\n\t";
        var styleNode = document.createTextNode(style);
        if (activeFontStylesheet.childNodes.length === 0) {
            activeFontStylesheet.appendChild(styleNode);
        }
        else {
            activeFontStylesheet.replaceChild(styleNode, activeFontStylesheet.childNodes[0]);
        }
    }

    var PREVIEW_ATTRIBUTE_NAME = "data-is-preview";
    function getStylesheetId(fontId) {
        return "font-" + fontId;
    }
    function stylesheetExists(fontId, isPreview) {
        var stylesheetNode = document.getElementById(getStylesheetId(fontId));
        return (stylesheetNode && stylesheetNode.getAttribute(PREVIEW_ATTRIBUTE_NAME) === isPreview.toString());
    }
    function createStylesheet(fontId, content, isPreview) {
        var stylesheetNode = document.createElement("style");
        stylesheetNode.textContent = content;
        stylesheetNode.id = getStylesheetId(fontId);
        stylesheetNode.setAttribute(PREVIEW_ATTRIBUTE_NAME, isPreview.toString());
        document.head.appendChild(stylesheetNode);
    }
    function deleteStylesheet(fontId) {
        var stylesheetNode = document.getElementById(getStylesheetId(fontId));
        if (stylesheetNode && stylesheetNode.parentNode) {
            stylesheetNode.parentNode.removeChild(stylesheetNode);
        }
    }

    function loadFontPreviews(fonts, scripts, variants, selectorSuffix) {
        return __awaiter(this, void 0, void 0, function () {
            var fontsArray, fontsToFetch, response, fontStyles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fontsArray = Array.from(fonts.values());
                        fontsToFetch = fontsArray
                            .map(function (font) { return font.id; })
                            .filter(function (fontId) { return !stylesheetExists(fontId, false) && !stylesheetExists(fontId, true); });
                        return [4, getStylesheet(fontsArray, scripts, variants, true)];
                    case 1:
                        response = _a.sent();
                        fontStyles = extractFontStyles(response);
                        fontsArray.forEach(function (font) {
                            applyFontPreview(font, selectorSuffix);
                            if (fontsToFetch.includes(font.id)) {
                                if (!(font.id in fontStyles)) {
                                    console.error("Missing styles for font \"" + font.family + "\" (fontId \"" + font.id + "\") in Google Fonts response");
                                    return;
                                }
                                createStylesheet(font.id, fontStyles[font.id], true);
                            }
                        });
                        return [2];
                }
            });
        });
    }
    function loadActiveFont(font, previousFontFamily, scripts, variants, selectorSuffix) {
        return __awaiter(this, void 0, void 0, function () {
            var fontStyle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!stylesheetExists(font.id, false)) return [3, 1];
                        applyActiveFont(font, previousFontFamily, selectorSuffix);
                        return [3, 3];
                    case 1: return [4, getStylesheet([font], scripts, variants, false)];
                    case 2:
                        fontStyle = _a.sent();
                        if (stylesheetExists(font.id, true)) {
                            deleteStylesheet(font.id);
                        }
                        applyActiveFont(font, previousFontFamily, selectorSuffix);
                        createStylesheet(font.id, fontStyle, false);
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    }

    function validatePickerId(pickerId) {
        if (pickerId.match(/[^0-9a-z]/i)) {
            throw Error("The `pickerId` parameter may only contain letters and digits");
        }
    }

    var FontManager = (function () {
        function FontManager(apiKey, defaultFamily, _a, onChange) {
            if (defaultFamily === void 0) { defaultFamily = "Open Sans"; }
            var _b = _a.pickerId, pickerId = _b === void 0 ? "" : _b, _c = _a.families, families = _c === void 0 ? [] : _c, _d = _a.categories, categories = _d === void 0 ? [] : _d, _e = _a.scripts, scripts = _e === void 0 ? ["latin"] : _e, _f = _a.variants, variants = _f === void 0 ? ["regular"] : _f, _g = _a.limit, limit = _g === void 0 ? 50 : _g;
            if (onChange === void 0) { onChange = function () { }; }
            this.fonts = new Map();
            validatePickerId(pickerId);
            this.selectorSuffix = pickerId ? "-" + pickerId : "";
            this.apiKey = apiKey;
            this.options = {
                pickerId: pickerId,
                families: families,
                categories: categories,
                scripts: scripts,
                variants: variants,
                limit: limit,
            };
            this.onChange = onChange;
            this.addFont(defaultFamily, false);
            this.setActiveFont(defaultFamily, false);
        }
        FontManager.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var fonts, _loop_1, this_1, i, state_1, fontsToLoad;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, getFontList(this.apiKey)];
                        case 1:
                            fonts = _a.sent();
                            _loop_1 = function (i) {
                                var font = fonts[i];
                                if (this_1.fonts.size >= this_1.options.limit) {
                                    return "break";
                                }
                                if (!this_1.fonts.has(font.family) &&
                                    (this_1.options.families.length === 0 || this_1.options.families.includes(font.family)) &&
                                    (this_1.options.categories.length === 0 || this_1.options.categories.includes(font.category)) &&
                                    this_1.options.scripts.every(function (script) { return font.scripts.includes(script); }) &&
                                    this_1.options.variants.every(function (variant) { return font.variants.includes(variant); })) {
                                    this_1.fonts.set(font.family, font);
                                }
                            };
                            this_1 = this;
                            for (i = 0; i < fonts.length; i += 1) {
                                state_1 = _loop_1(i);
                                if (state_1 === "break")
                                    break;
                            }
                            fontsToLoad = new Map(this.fonts);
                            fontsToLoad.delete(this.activeFontFamily);
                            loadFontPreviews(fontsToLoad, this.options.scripts, this.options.variants, this.selectorSuffix);
                            return [2, this.fonts];
                    }
                });
            });
        };
        FontManager.prototype.getFonts = function () {
            return this.fonts;
        };
        FontManager.prototype.addFont = function (fontFamily, downloadPreview) {
            if (downloadPreview === void 0) { downloadPreview = true; }
            var font = {
                family: fontFamily,
                id: getFontId(fontFamily),
            };
            this.fonts.set(fontFamily, font);
            if (downloadPreview) {
                var fontMap = new Map();
                fontMap.set(fontFamily, font);
                loadFontPreviews(fontMap, this.options.scripts, this.options.variants, this.selectorSuffix);
            }
        };
        FontManager.prototype.removeFont = function (fontFamily) {
            this.fonts.delete(fontFamily);
        };
        FontManager.prototype.getActiveFont = function () {
            return this.fonts.get(this.activeFontFamily);
        };
        FontManager.prototype.setActiveFont = function (fontFamily, runOnChange) {
            var _this = this;
            if (runOnChange === void 0) { runOnChange = true; }
            if (!this.fonts.has(fontFamily)) {
                console.error("Cannot update active font: \"" + fontFamily + "\" is not in the font list");
                return;
            }
            var previousFontFamily = this.activeFontFamily;
            var activeFont = this.fonts.get(fontFamily);
            this.activeFontFamily = fontFamily;
            loadActiveFont(activeFont, previousFontFamily, this.options.scripts, this.options.variants, this.selectorSuffix).then(function () {
                if (runOnChange) {
                    _this.onChange(activeFont);
                }
            });
        };
        return FontManager;
    }());

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css = "@charset \"UTF-8\";\ndiv[id^=\"font-picker\"] {\n  position: relative;\n  display: inline-block;\n  width: 200px;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); }\n  div[id^=\"font-picker\"] * {\n    box-sizing: border-box; }\n  div[id^=\"font-picker\"] p {\n    margin: 0;\n    padding: 0; }\n  div[id^=\"font-picker\"] button {\n    color: inherit;\n    font-size: inherit;\n    background: none;\n    border: 0;\n    outline: none;\n    cursor: pointer; }\n  div[id^=\"font-picker\"] .dropdown-button {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    width: 100%;\n    height: 35px;\n    padding: 0 10px;\n    background: #cbcbcb; }\n    div[id^=\"font-picker\"] .dropdown-button:hover, div[id^=\"font-picker\"] .dropdown-button:focus {\n      background: #bebebe; }\n    div[id^=\"font-picker\"] .dropdown-button .dropdown-font-name {\n      overflow: hidden;\n      white-space: nowrap; }\n  div[id^=\"font-picker\"] .dropdown-icon {\n    margin-left: 10px; }\n\n@-webkit-keyframes spinner {\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes spinner {\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n    div[id^=\"font-picker\"] .dropdown-icon.loading::before {\n      display: block;\n      width: 10px;\n      height: 10px;\n      border: 2px solid #b2b2b2;\n      border-top-color: #000000;\n      border-radius: 50%;\n      -webkit-animation: spinner 0.6s linear infinite;\n              animation: spinner 0.6s linear infinite;\n      content: \"\"; }\n    div[id^=\"font-picker\"] .dropdown-icon.finished::before {\n      display: block;\n      width: 0;\n      height: 0;\n      margin: 0 2px;\n      border-top: 6px solid #000000;\n      border-right: 5px solid transparent;\n      border-left: 5px solid transparent;\n      transition: -webkit-transform 0.3s;\n      transition: transform 0.3s;\n      transition: transform 0.3s, -webkit-transform 0.3s;\n      content: \"\"; }\n    div[id^=\"font-picker\"] .dropdown-icon.error::before {\n      content: \"⚠\"; }\n  div[id^=\"font-picker\"].expanded .dropdown-icon.finished::before {\n    -webkit-transform: rotate(-180deg);\n            transform: rotate(-180deg); }\n  div[id^=\"font-picker\"].expanded ul {\n    max-height: 200px; }\n  div[id^=\"font-picker\"] ul {\n    position: absolute;\n    z-index: 1;\n    width: 100%;\n    max-height: 0;\n    margin: 0;\n    padding: 0;\n    overflow-x: hidden;\n    overflow-y: auto;\n    background: #eaeaea;\n    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);\n    transition: 0.3s;\n    -webkit-overflow-scrolling: touch; }\n    div[id^=\"font-picker\"] ul li {\n      height: 35px;\n      list-style: none; }\n      div[id^=\"font-picker\"] ul li button {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n        padding: 0 10px;\n        white-space: nowrap; }\n        div[id^=\"font-picker\"] ul li button:hover, div[id^=\"font-picker\"] ul li button:focus {\n          background: #dddddd; }\n        div[id^=\"font-picker\"] ul li button.active-font {\n          background: #d1d1d1; }\n";
    styleInject(css);

    var FontPicker = (function () {
        function FontPicker(apiKey, defaultFamily, _a, onChange) {
            if (defaultFamily === void 0) { defaultFamily = "Open Sans"; }
            var _b = _a.pickerId, pickerId = _b === void 0 ? "" : _b, _c = _a.families, families = _c === void 0 ? [] : _c, _d = _a.categories, categories = _d === void 0 ? [] : _d, _e = _a.scripts, scripts = _e === void 0 ? ["latin"] : _e, _f = _a.variants, variants = _f === void 0 ? ["regular"] : _f, _g = _a.limit, limit = _g === void 0 ? 50 : _g, _h = _a.sort, sort = _h === void 0 ? "alphabet" : _h;
            if (onChange === void 0) { onChange = function () { }; }
            this.expanded = false;
            var options = {
                pickerId: pickerId,
                families: families,
                categories: categories,
                scripts: scripts,
                variants: variants,
                limit: limit,
            };
            this.fontManager = new FontManager(apiKey, defaultFamily, options, onChange);
            this.generateUI(sort);
            this.closeEventListener = this.closeEventListener.bind(this);
        }
        FontPicker.prototype.generateUI = function (sort) {
            var _this = this;
            var selectorSuffix = this.fontManager.selectorSuffix;
            var pickerId = "font-picker" + selectorSuffix;
            this.fontPickerDiv = document.getElementById(pickerId);
            if (!this.fontPickerDiv) {
                throw Error("Missing div with id=\"" + pickerId + "\"");
            }
            this.dropdownButton = document.createElement("button");
            this.dropdownButton.classList.add("dropdown-button");
            this.dropdownButton.onclick = function () { return _this.toggleExpanded(); };
            this.dropdownButton.onkeypress = function () { return _this.toggleExpanded(); };
            this.dropdownButton.type = "button";
            this.fontPickerDiv.appendChild(this.dropdownButton);
            this.dropdownFamily = document.createElement("p");
            this.dropdownFamily.textContent = this.fontManager.getActiveFont().family;
            this.dropdownFamily.classList.add("dropdown-font-family");
            this.dropdownButton.appendChild(this.dropdownFamily);
            var dropdownIcon = document.createElement("p");
            dropdownIcon.classList.add("dropdown-icon", "loading");
            this.dropdownButton.appendChild(dropdownIcon);
            this.fontManager
                .init()
                .then(function (fontMap) {
                var fonts = Array.from(fontMap.values());
                if (sort === "alphabet") {
                    fonts.sort(function (font1, font2) { return font1.family.localeCompare(font2.family); });
                }
                _this.generateFontList(fonts);
                dropdownIcon.classList.replace("loading", "finished");
            })
                .catch(function (err) {
                dropdownIcon.classList.replace("loading", "error");
                console.error("Error trying to fetch the list of available fonts");
                console.error(err);
            });
        };
        FontPicker.prototype.generateFontList = function (fonts) {
            var _this = this;
            this.ul = document.createElement("ul");
            fonts.forEach(function (font) {
                _this.addFontLi(font);
            });
            this.fontPickerDiv.appendChild(this.ul);
        };
        FontPicker.prototype.addFontLi = function (font, listIndex) {
            var _this = this;
            var fontId = getFontId(font.family);
            var li = document.createElement("li");
            var fontButton = document.createElement("button");
            fontButton.type = "button";
            fontButton.id = "font-button-" + fontId + this.fontManager.selectorSuffix;
            fontButton.textContent = font.family;
            var onActivate = function () {
                _this.toggleExpanded();
                _this.setActiveFont(font.family);
            };
            fontButton.onclick = onActivate;
            fontButton.onkeypress = onActivate;
            li.appendChild(fontButton);
            if (font.family === this.fontManager.getActiveFont().family) {
                fontButton.classList.add("active-font");
                this.activeFontButton = fontButton;
            }
            if (listIndex) {
                this.ul.insertBefore(li, this.ul.children[listIndex]);
            }
            else {
                this.ul.appendChild(li);
            }
        };
        FontPicker.prototype.closeEventListener = function (e) {
            var targetElement = e.target;
            do {
                if (targetElement === document.getElementById("font-picker" + this.fontManager.selectorSuffix)) {
                    return;
                }
                targetElement = targetElement.parentNode;
            } while (targetElement);
            this.toggleExpanded();
        };
        FontPicker.prototype.toggleExpanded = function () {
            if (this.expanded) {
                this.expanded = false;
                this.fontPickerDiv.classList.remove("expanded");
                document.removeEventListener("click", this.closeEventListener);
            }
            else {
                this.expanded = true;
                this.fontPickerDiv.classList.add("expanded");
                document.addEventListener("click", this.closeEventListener);
            }
        };
        FontPicker.prototype.getFonts = function () {
            return this.fontManager.getFonts();
        };
        FontPicker.prototype.addFont = function (fontFamily, index) {
            if (Array.from(this.fontManager.getFonts().keys()).includes(fontFamily)) {
                throw Error("Did not add font to font picker: Font family \"" + fontFamily + "\" is already in the list");
            }
            this.fontManager.addFont(fontFamily, true);
            this.addFontLi(this.fontManager.getFonts().get(fontFamily), index);
        };
        FontPicker.prototype.removeFont = function (fontFamily) {
            this.fontManager.removeFont(fontFamily);
            var fontId = getFontId(fontFamily);
            var fontButton = document.getElementById("font-button-" + fontId + this.fontManager.selectorSuffix);
            if (fontButton) {
                var fontLi = fontButton.parentElement;
                fontButton.remove();
                fontLi.remove();
            }
            else {
                throw Error("Could not remove font from font picker: Font family \"" + fontFamily + "\" is not in the list");
            }
        };
        FontPicker.prototype.getActiveFont = function () {
            return this.fontManager.getActiveFont();
        };
        FontPicker.prototype.setActiveFont = function (fontFamily) {
            this.fontManager.setActiveFont(fontFamily);
            var fontId = getFontId(fontFamily);
            this.dropdownFamily.textContent = fontFamily;
            this.activeFontButton.classList.remove("active-font");
            this.activeFontButton = document.getElementById("font-button-" + fontId + this.fontManager.selectorSuffix);
            this.activeFontButton.classList.add("active-font");
        };
        return FontPicker;
    }());
    window.FontPicker = FontPicker;

    return FontPicker;

}));
