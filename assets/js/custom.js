(function($) {

// prettyPhoto
	jQuery(document).ready(function(){
		jQuery('a[data-gal]').each(function() {
			jQuery(this).attr('rel', jQuery(this).data('gal'));
		});  	
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',theme:'light_square',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
	}); 

})(jQuery);


(function($){
	
// accordion focus	
	$('#accordion').on('shown.bs.collapse', function () {
		var panel = $(this).find('.in');
		$('html, body').animate({
			scrollTop: panel.offset().top
		}, 500);
	});
});
