//Author: @jethrolarson
//License: MIT, GPL, or WTFPL
(function($, global){
	//id itterator if the inputs don't have ids
	var phid = 0;
	$.fn.placeholder = function(){
		return this.bind({
			focus: function(){
				$(this).parent().addClass('placeholder-focus');
			},blur: function(){
				$(this).parent().removeClass('placeholder-focus');
			},'keyup input change': function(){
				$(this).parent().toggleClass('placeholder-changed', !!this.value);
			}
		}).each(function(){
			var $this = $(this);
			var id = this.id || 'ph_' + (phid++)
			
			//Create input wrapper with label for placeholder. Also sets the for attribute to the id of the input if it exists.
			var $wrapper = $('<span class="placeholderWrap"><label for="' + id + '">' + $this.attr('placeholder') + '</label></span>');
			
			//Disables default placeholder
			$this.attr('placeholder', '').keyup();
			
			//Adds an id to elements if absent
			this.id = id; 
			$wrapper.insertAfter($this).append($this);
		});
	};
	
	//Default plugin invocation 
	global.initPlaceholder = global.initPlaceholder || function(){
		$(function(){
			$('input[placeholder]').placeholder();
		});
	};
})(jQuery, this);
