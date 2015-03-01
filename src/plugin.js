/*
* styled-select.js',
* https://github.com/mchayka/styled-select',
* Copyright 2015 Mike Chayka; Licensed MIT',
*/

(function() {
  'use strict';

  var old, selectKey, methods;

  old = $.fn.styledSelect;

  selectKey = 'ssKey';

  methods = {
    initialize: function initialize(o) {

      o = o || {};

      return this.each(attach);

      function attach() {
        var $control = $(this), styledSelect;

        styledSelect = new Select({
          control: $control,
        });

        $control.data(selectKey, styledSelect);
      }
    },

    val: function val(newVal) {
      // mirror jQuery#val functionality: reads opearte on first match,
      // write operates on all matches
      return !arguments.length ? getVal(this.first()) : this.each(setVal);

      function setVal() {
        var $control = $(this), styledSelect;

        if (styledSelect = $control.data(selectKey)) {
          styledSelect.setValue(newVal);
        }
      }

      function getVal($select) {
        var $control = $(this), styledSelect, query;

        if (styledSelect = $control.data(selectKey)) {
          query = styledSelect.getValue();
        }

        return query;
      }
    },

    destroy: function destroy() {
      return this.each(unattach);

      function unattach() {
        var $control = $(this), styledSelect;

        if (styledSelect = $control.data(selectKey)) {
          styledSelect.destroy();
          $control.removeData(selectKey);
        }
      }
    },

    reset: function cancelValue() {
      return this.each(cancelValue);

      function cancelValue() {
        var $control = $(this), styledSelect;

        if (styledSelect = $control.data(selectKey)) {
          styledSelect.reset();
        }
      }
    }
  };

  $.fn.styledSelect = function(method) {
    var tts;

    // methods that should only act on intialized styledSelects
    if (methods[method] && method !== 'initialize') {
      // filter out non-styledSelect inputs
      tts = this.filter(function() { return !!$(this).data(selectKey); });
      return methods[method].apply(tts, [].slice.call(arguments, 1));
    }

    else {
      return methods.initialize.apply(this, arguments);
    }
  };

  $.fn.styledSelect.noConflict = function noConflict() {
    $.fn.styledSelect = old;
    return this;
  };
})();
