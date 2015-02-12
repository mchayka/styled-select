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
    var onChange;

    if (!o.control || !$(o.control).is('select')) {
      $.error('missing select');
    }

    // bound functions
    onChange = $.proxy(this._onChange, this);

    this.$node = buildDom(o.control);
    this.$placeholder = this.$node.find('.ss-placeholder');
    this.$control = $(o.control)
    .on('change.ss', onChange);

    // store default value to be able to reset the value
    this._setDefaultValue(this.getValue());
  }

  // instance methods
  // ----------------

  Select.prototype = {
    // ### private

    _onChange: function() {
      this._updatePlaceholder();
    },

    _checkChanges: function() {
      this.getValue() === this.getDefaultValue() ?
      this.$control.removeClass('is-changed') : this.$control.addClass('is-changed');
      this.$control.trigger('changedInput.tt');
    },

    _setDefaultValue: function(value) {
      this._updatePlaceholder();
      this.$control.data('default-value', value);
    },

    _updatePlaceholder: function() {
      this.$placeholder.text($(this.$control).find(':selected').text());
    },

    // ### public

    setValue: function(value) {
      this.$control.val(value);
      this._updatePlaceholder();
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

    $wrapper = $(html.wrapper).css(css.wrapper);
    $control = $(control).css(css.control);
    $placeholder = $(html.placeholder).css(css.placeholder);

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
