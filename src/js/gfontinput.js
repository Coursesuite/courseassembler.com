(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  gFontInput = {
    fonts: "Alegreya,Archivo,Arvo,B612,Cairo,Cardo,Concert One,Cormorant,Crimson Text,Exo 2,Fira Sans,Fjalla One,Frank Ruhl Libre,Karla,Lato,Lora,Merriweather,Montserrat,Muli,Noto Sans,Nunito,Old Standard TT,Open Sans,Oswald,Oxygen,Playfair Display,Poppins,PT Sans,PT Serif,Rakkas,Roboto,Rubik,Source Sans Pro,Source Sans,Spectral,Titillium Web,Ubuntu,Varela,Vollkorn,Work Sans,Yatra One",
    css: `
    .gfont-input+.gfont-input-box{display:none;}
    .gfont-input.gfont-input-dropdown+.gfont-input-box{display:block;}
    .gfont-input-box { height: 10rem; position: relative; box-shadow: 0 0 1px black; font-size: 1.25rem; }
    .gfont-input-scroll { position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: auto; background-color: white }
    .gfont-input-scroll div { padding: .25rem; cursor: pointer; }
    .gfont-input-scroll div:nth-of-type(even) { background-color:#f8f8f8; }
    `,
    html:'<div class="gfont-input-box"><div class="gfont-input-scroll"></div></div>',
    cache: {},
    classname: 'gfont-input',
    el: undefined,
    container: undefined,
    head: undefined,
    focusDelay: 500,

    injectStyle: function(css) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      this.head.appendChild(style);
    },

    loadFont: function(family) {
      if (!family || this.cache[family]) return;
      this.injectStyle('@import url("https://fonts.googleapis.com/css?display=swap&family=' + family.replace(/\s/gi,'+') + '");');
      this.cache[family] = 1;
    },

    // callback happens outside the scope of this object, so we call the gFontInput methods directly
    callback: function(entries, observer) {
      [].forEach.call(entries, function(entry) {
        if (entry.isIntersecting) {
          window.requestIdleCallback(function(){gFontInput.loadFont(entry.target.textContent)},{timeout:100});
          entry.target.addEventListener('click', gFontInput.clickHandler);
        } else {
          entry.target.removeEventListener('click', gFontInput.clickHandler);
        }
      });
    },

    // clickHandler occurs outside the scope of this object, so we have to find the input element for this event
    clickHandler: function(event) {
      var input = event.target.closest("div.gfont-input-box").previousElementSibling;
      input.style.fontFamily = event.target.textContent;
      input.value = event.target.textContent;
      var e = new Event('change');
      input.dispatchEvent(e);
      input.classList.remove('gfont-input-dropdown');
    },

    create: function(input) {
      if(typeof input === 'string') input = document.querySelector('#'+input);
      if (!input) return;
      this.el = input;
      this.el.classList.add('gfont-input');
      this.el.insertAdjacentHTML('afterend', this.html);
      this.container = this.el.parentNode.querySelector('.gfont-input-scroll');
      this.el.addEventListener('focus', function(elm) {
          elm.target.parentNode.querySelector(".gfont-input-box").style.width = elm.target.offsetWidth;
          elm.target.classList.add('gfont-input-dropdown');
      });
      this.el.addEventListener('blur', function(elm) {
        setTimeout(function() {elm.target.classList.remove('gfont-input-dropdown')}, gFontInput.focusDelay);
      });

      this.head = document.head || document.getElementsByTagName('head')[0];
      this.injectStyle(this.css);

      this.container.innerHTML = this.fonts.split(",").map(function(v) {
        return '<div style="font-family:\''+v+'\'">'+v+'</div>';
      }).join("\n");

      var observer = new IntersectionObserver(this.callback, {
        root: this.container,
        rootMargin: '0px',
        threshold: 0.5
      });

      [].forEach.call(this.container.querySelectorAll('div'), function(node) {
        observer.observe(node);
      });

    },
    destroy: function(input) {
      this.el.classList.remove('gfont-input');
      this.container.parentNode.removeChild(this.container);
    }
  }

  return gFontInput;
}));