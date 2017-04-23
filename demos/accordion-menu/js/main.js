jQuery(document).ready(function(){
	var accordionsMenu = $('.cd-accordion-menu');

	if( accordionsMenu.length > 0 ) {
		
		accordionsMenu.each(function(){
			var accordion = $(this);
			//detect change in the input[type="checkbox"] value
			accordion.on('click', 'input[type="checkbox"]', function(){
				var checkbox = $(this);

				// console.log(checkbox.prop('checked'));

				// checkbox
				// .parent()
				// .siblings('li')
				// .find('ul')
				// .find('input')
				// .each(function(idx, element) {
				// 	$(element).prop('checked', false)
				// });

				// checkbox
				// .parent()
				// .siblings('li')
				// .find('ul')
				// .attr('style', 'display:none;')
				// .slideDown(300);

				// (checkbox.prop('checked')) ?
				// checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300) :
				// checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
			});
		});
	}
});
