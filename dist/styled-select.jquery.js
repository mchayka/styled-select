/*!
 * styled-select.js 0.1.0
 * https://github.com/mchayka/styled-select
 * Copyright 2015-2015 Mike Chayka; Licensed MIT
 */

(function($) {
    var css = function() {
        "use strict";
        var css = {
            control: {
                position: "relative",
                opacity: "0",
                zIndex: "1"
            },
            wrapper: {
                position: "relative"
            },
            placeholder: {
                position: "absolute",
                left: "0",
                right: "0",
                top: "0",
                bottom: "0",
                zIndex: "0"
            }
        };
        return css;
    }();
    var html = function() {
        return {
            wrapper: '<span class="styled-select"></span>',
            placeholder: '<span class="ss-placeholder"></span>'
        };
    }();
    var Select = function() {
        "use strict";
        function Select(o) {
            var onChange;
            if (!o.control || !$(o.control).is("select")) {
                $.error("missing select");
            }
            onChange = $.proxy(this._onChange, this);
            this.$node = buildDom(o.control);
            this.$placeholder = this.$node.find(".ss-placeholder");
            this.$control = $(o.control).on("change.ss", onChange);
            this._setDefaultValue(this.getValue());
        }
        Select.prototype = {
            _onChange: function() {
                console.log("change");
                this._setPlaceholderValue(this.getValue());
            },
            _checkChanges: function() {
                this.getValue() === this._getDefaultValue() ? this.$control.removeClass("is-changed") : this.$control.addClass("is-changed");
                this.$control.trigger("changedInput.tt");
            },
            _setDefaultValue: function(value) {
                this._setPlaceholderValue(value);
                this.$control.data("default-value", value);
            },
            _setPlaceholderValue: function(value) {
                this.$placeholder.text(value);
            },
            setValue: function(value) {
                this.$control.val(value);
                this._setPlaceholderValue(value);
            },
            getValue: function() {
                return this.$control.val();
            },
            getDefaultValue: function() {
                return this.$control.data("default-value");
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
            $control.addClass("ss-control");
            return $control.wrap($wrapper).parent().prepend($placeholder);
        }
        function destroyDomStructure($node) {
            var $control = $node.find(".ss-control");
            $control.detach().removeClass("ss-control").insertAfter($node);
            $node.remove();
        }
    }();
    (function() {
        "use strict";
        var old, selectKey, methods;
        old = $.fn.styledSelect;
        selectKey = "ssKey";
        methods = {
            initialize: function initialize(o) {
                o = o || {};
                return this.each(attach);
                function attach() {
                    var $control = $(this), styledSelect;
                    styledSelect = new Select({
                        control: $control
                    });
                    $control.data(selectKey, styledSelect);
                }
            },
            val: function val(newVal) {
                return !arguments.length ? getVal(this.first()) : this.each(setVal);
                function setVal() {
                    var $control = $(this), styledSelect;
                    if (styledSelect = $control.data(selectKey)) {
                        styledSelect.setVal(newVal);
                    }
                }
                function getVal($select) {
                    var $control = $(this), styledSelect, query;
                    if (styledSelect = $control.data(selectKey)) {
                        query = styledSelect.getVal();
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
                        styledSelect.cancelValue();
                    }
                }
            }
        };
        $.fn.styledSelect = function(method) {
            var tts;
            if (methods[method] && method !== "initialize") {
                tts = this.filter(function() {
                    return !!$(this).data(selectKey);
                });
                return methods[method].apply(tts, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.styledSelect.noConflict = function noConflict() {
            $.fn.styledSelect = old;
            return this;
        };
    })();
})(window.jQuery);