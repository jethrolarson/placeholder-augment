//Author: @jethrolarson
//License: MIT, GPL, or WTFPL
(function($){
	//id itterator if the inputs don't have ids
	var phid=0;
	$.fn.placeholder = function(){
		return this.bind({
			focus: function(){
				$(this).parent().addClass('placeholder-focus');
			},blur: function(){
				$(this).parent().removeClass('placeholder-focus');
			},'keyup input change': function(){
				$(this).parent().toggleClass('placeholder-changed',this.value!=='');
			}
		}).each(function(){
			var $this = $(this);
			//Adds an id to elements if absent
			if(!this.id) this.id='ph_'+(phid++); 
			//Create input wrapper with label for placeholder. Also sets the for attribute to the id of the input if it exists.
			$('<span class="placeholderWrap"><label for="'+this.id+'">'+$this.attr('placeholder')+'</label></span>')
				.insertAfter($this)
				.append($this); 
			//Disables default placeholder
			$this.attr('placeholder','').keyup();
			
			//fixes lack of event for autocomplete in firefox < 4:'(
			if($.browser.mozilla && $.browser.version.slice(0,3) == "1.9"){
				$this.focus(function(){
					var val = this.value,
					    el = this,
					    $el = $(this);
					$el.data('ph_timer', setInterval(function(){
						if(val != el.value){
							$el.change();
						}
					},100));
				}).blur(function(){
					clearInterval($(this).data('ph_timer'));
				});
			}
		});
	};
	
	//Default plugin invocation 
	$(function(){
		$('input[placeholder]').placeholder();
	});
})(jQuery);
