

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

// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$(document).on('ready page:load', function(){
	$("#invitation-div").on("click",".invitation-button", function(){
		var invitorId = window.current_user.id;
		var invitorName = window.current_user.username;
		var inviteeId = $("#user-info").data("user-id")
		var game_invitation_url = $(this).data("url")
		var inviteeName = $("#user-info").data("username")

		window.myDataRef.push({invitor_id: invitorId, invitee_id: inviteeId, inviteeName: inviteeName, invitorName: invitorName, accepted: false, game_board_url: game_invitation_url});
		$(this).attr("disabled","disabled")
	})
});

