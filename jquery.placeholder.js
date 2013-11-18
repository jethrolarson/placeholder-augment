//Author: @jethrolarson
//License: MIT, GPL, or WTFPL
(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery'], function ($) {
            return factory($);
        });
    } else {
        factory(root.jQuery);
    }
}(this, function ($) {
    //id itterator if the inputs don't have ids
    var phid= 0,
        test_input = document.createElement('input'),
        test_textarea = document.createElement('textarea'),
        supported_on_input = 'placeholder' in test_input,
        supported_on_textarea = 'placeholder' in test_textarea,
        WRAPPER_STYLES = ['float'],
        LABEL_STYLES = ['font-size', 'line-height'];

    test_input = null;
    test_textarea = null;

    $.fn.placeholder = function () {
        return this.on({
            focus: function () {
                $(this).parent().addClass('placeholder-focus');
            },blur: function () {
                $(this).parent().removeClass('placeholder-focus');
            },'keyup input change': function () {
                $(this).parent().toggleClass('placeholder-changed',this.value!=='');
            }
        }).each(function () {
                var $this = $(this), tag_name = this.tagName.toLowerCase(), $wrapper, $label;
                //Adds an id to elements if absent
                if(!this.id) this.id='ph_'+(phid++);
                //Create input wrapper with label for placeholder. Also sets the for attribute to the id of the input if it exists.
                $wrapper = $('<span/>', { 'class': 'placeholderWrap placeholderWrap-' + tag_name });
                $label = $('<label/>', { id : this.id, text: $this.attr('placeholder') })
                    .appendTo($wrapper)
                    .on('click', function () { $this.focus(); });
                //Inherit all relevant input styles
                $.each(WRAPPER_STYLES, function (i, prop) {
                    $wrapper.css(prop, $this.css(prop));
                });
                $.each(LABEL_STYLES, function (i, prop) {
                    var val = $this.css(prop), margin_top;
                    if ( prop == 'line-height' && tag_name == 'input' ) {
                        margin_top = -val.slice(0,-2);
                        if ( ! (typeof margin_top == 'number' && margin_top == margin_top) ) {
                            margin_top = -$this.css('font-size').slice(0,-2);
                        }
                        $label.css('margin-top', (margin_top/2) + 'px');
                    }
                    $label.css(prop, val);
                });
                $wrapper.insertAfter($this)
                    .append($this);

                //Disables default placeholder
                $this.attr('placeholder','').keyup();
            });
    };

    $.fn.placeholder.support = {
        input   : supported_on_input,
        textarea: supported_on_textarea
    };

    return function () {
        var $placeheld = $('[placeholder]');
        if ( ! supported_on_input ) {
            $placeheld.filter('input').placeholder();
        }
        if ( ! supported_on_textarea ) {
            $placeheld.filter('textarea').placeholder();
        }
    };
}));
