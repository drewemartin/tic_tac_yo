
$(document).ready(function() {
	var height = $(window).height();	
    $('.main').css('height', height);
    $('.bottom').css('height', height);

    
$('.filtering').slick({
   slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 7000, 
    cssEase: 'ease',
    dots: 'true'
  });

var filtered = false;

$('.js-filter').on('click', function(){
  if(filtered === false) {
    $('.filtering').slickFilter(':even');
    $(this).text('Unfilter Slides');
    filtered = true;
  } else {
    $('.filtering').slickUnfilter();
    $(this).text('Filter Slides');
    filtered = false;
  }
});
  
  var img = $('#search_results').children().children()
  img.on('mouseenter', function(){
    console.log('mouseenter')

    link = $(this).find('.links')
     all_links = $('.links');
     // all_links.slideUp();
     link.slideToggle();
      
      
  });

  img.on('mouseleave', function(){
    console.log('mouseleave')
    link = $(this).find('.links')
     all_links = $('.links');
      // all_links.slideDown(); 
      link.slideUp();

  });
    

				
});