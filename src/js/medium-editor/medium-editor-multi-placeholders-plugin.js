var MediumEditorMultiPlaceholders = MediumEditor.Extension.extend({
  name: 'multi_placeholder',
  init:  function() {
    MediumEditor.Extension.prototype.init.apply(this, arguments);

    this.placeholderElements = [];
    this.initPlaceholders(this.placeholders, this.placeholderElements);
    this.watchChanges();
  },

  initPlaceholders: function (placeholders, elements) {
      this.getEditorElements().forEach(function (editor) {
          this.placeholders.map(function(placeholder) {
            // Create the placeholder element
            var el = document.createElement(placeholder.tag);
            el.appendChild(document.createElement('br'));
            el.setAttribute('data-placeholder', placeholder.text);
            elements.push(el);
            // Append it to Medium Editor element
            editor.appendChild(el);
            this.updatePlaceholder(el);
            el.setAttribute('data-default', placeholder.text);
          }, this);
      }, this);
  },

  destroy: function () {
      this.getEditorElements().forEach(function (editor) {
        editor.querySelectorAll('[data-placeholder]').map(function(el) {
          el.removeAttribute('data-placeholder');
          el.removeAttribute('data-default');
        }, this);
      }, this);
  },

  showPlaceholder: function (el) {
      if (el) {
          el.classList.add('medium-editor-placeholder');
      }
  },

  hidePlaceholder: function (el) {
      if (el) {
          el.classList.remove('medium-editor-placeholder');
      }
  },

  updatePlaceholder: function (el) {
      if (el.textContent === '') {
          return this.showPlaceholder(el);
      }
      this.hidePlaceholder(el);
  },

  updateAllPlaceholders: function() {
    this.placeholderElements.map(function(el){
      this.updatePlaceholder(el);
    }, this);
  },

  handleEnterKey: function(event) {
 // console.dir(MediumEditor);
  console.dir(this.base);
  //     const currentNode = MediumEditor.getFocusedElement();
  // console.dir(currentNode);
  //     if (currentNode.nextElementSibling) {
  //       console.log('has next element');
  //     }

  //     event.preventDefault();
  //     event.stopPropagation();
  //     var editors = this.getEditorElements();
  },

  getContents: function () {
    let content = [];
    this.placeholderElements.map(function(el) {
      content.push({
        tag: el.nodeName.toLowerCase(),
        text: el.textContent == '' ? el.dataset.placeholder : el.innerHTML
      });
    });
    return content;
  },

  watchChanges: function() {
    this.subscribe('editableInput', this.updateAllPlaceholders.bind(this));
    this.subscribe('externalInteraction', this.updateAllPlaceholders.bind(this));
    this.subscribe('editableKeydownEnter', this.handleEnterKey.bind(this));
  }
});
