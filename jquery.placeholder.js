(function($){
	//id itterator if the inputs don't have ids
	var phid=0;
	$.fn.placeholder = function(){
		return this.bind({
			focus: function(){
				$(this).parent().addClass('placeholder-focus');
			},blur: function(){
				$(this).parent().removeClass('placeholder-focus');
			},'keyup input': function(){
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
		});
	};
	
	//Default plugin invocation 
	$(function(){
		$('input[placeholder]').placeholder();
	});
})(jQuery);