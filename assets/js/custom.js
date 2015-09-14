(function($) {

// prettyPhoto
	jQuery(document).ready(function(){
		jQuery('a[data-gal]').each(function() {
			jQuery(this).attr('rel', jQuery(this).data('gal'));
		});
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',theme:'light_square',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
	});
})(jQuery);

function addJobs() {
  // ID of the Google Spreadsheet
  var spreadsheetID = "1K4wmxiI76qtdne3rqAwqulDCSaWqg5MhHOXP6Yt45VU";

  // Make sure it is public or set to Anyone with link can view
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  $.getJSON(url, function(data) {
    var entry = data.feed.entry;
    $(entry).each(function(){
      $('#jobs').append('<p><a href="'+this.gsx$link.$t+'" target="_blank">'+this.gsx$position.$t+' - '+this.gsx$employer.$t+'</a></p>');
    });
  });

}
