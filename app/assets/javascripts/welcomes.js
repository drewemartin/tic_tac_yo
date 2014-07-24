$( document ).ready(function() {
	var height = $(window).height();	
    $('.hero-inner').css('height', height);

  $('#slider1, #slider2, #slider3').bxSlider({
	  mode: 'fade',
	  auto: true,
	  controls: false,
	  pager: false,
	  autoControls: false,
  	 pause: 3000
   });
				
});
