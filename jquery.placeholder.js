(function($){
	//id itterator if the inputs don't have ids
	var phid=0;
	$.fn.placeholder = function(){
		return this.bind({
			focus:function(){
				$(this).parent().addClass('placeholder-focus');
			},blur: function(){
				$(this).parent().removeClass('placeholder-focus');
			},'keyup input': function(){
				$(this).parent().toggleClass('placeholder-changed',this.value!=='');
			}
		}).each(function(){
			var $this = $(this),$copy; 
			//Adds an id to elements if absent
			if(!this.id) this.id='ph_'+(phid++);
			//Makes Copy for off-DOM modification
			$copy = $this.clone(true);
			//Create input wrapper with label for placeholder. Also sets the for attribute to the id of the input if it exists.
			$('<span class="placeholderWrap"><label for="'+$copy[0].id+'">'+$copy.attr('placeholder')+'</label></span>')
				.append($copy.attr('placeholder','')) //Disables default placeholder
				.insertAfter($this);//Put the whole thing after the original input
			$this.remove();//remove Original
		});
	};
	
	//Default plugin invocation 
	$(function(){
		$('input[placeholder]').placeholder();
	});
})(jQuery);