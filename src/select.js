/*
* styled-select.js',
* https://github.com/mchayka/styled-select',
* Copyright 2015 Mike Chayka; Licensed MIT',
*/

var Select = (function() {
  'use strict';

  // constructor
  // -----------

  function Select(o) {
    var that;

    that = this;

    if (!o.control || !$(o.control).is('select')) {
      $.error('missing select');
    }

    // bound functions
    // onBlur = _.bind(this._onBlur, this);
    // onFocus = _.bind(this._onFocus, this);
    // onInput = _.bind(this._onInput, this);
    //
    this.$node = buildDom(o.control);
    this.$control = $(o.control);
    this.$placeholder = this.$node.find('.ss-placeholder');
    // .on('blur.tt', onBlur)
    // .on('focus.tt', onFocus);

    // store default value to be able to reset value
    this._setDefaultValue(this.getValue());
  }

  // instance methods
  // ----------------

  Select.prototype = {
    // ### private

    _checkChanges: function() {
      this.getValue() === this._getDefaultValue() ?
      this.$control.removeClass('is-changed') : this.$control.addClass('is-changed');
      this.$control.trigger('changedInput.tt');
    },

    _setDefaultValue: function(value) {
      this.$placeholder.text(value);
      return this.$control.data('default-value', value);
    },

    // ### public

    setValue: function(value) {
      this.$control.val(value);
      this.$placeholder.text(value);
    },

    getValue: function() {
      return this.$control.val();
    },

    getDefaultValue: function() {
      return this.$control.data('default-value');
    },

    reset: function() {
      this.setValue(this.getDefaultValue());
      this._checkChanges();
    },

    destroy: function() {
      destroyDomStructure(this.$node);

      this.$node = null;
    }
  };


  return Select;

  function buildDom(control) {
    var $control, $wrapper, $placeholder;

    $wrapper = $(html.wrapper);
    $control = $(control).css(css.control);
    $placeholder = $(html.placeholder);

    $control.addClass('ss-control');

    return $control
    .wrap($wrapper)
    .parent()
    .prepend($placeholder);
  };

  function destroyDomStructure($node) {
    var $control = $node.find('.ss-control');

    $control
    .detach()
    .removeClass('ss-control')
    .insertAfter($node);

    $node.remove();
  }
})();