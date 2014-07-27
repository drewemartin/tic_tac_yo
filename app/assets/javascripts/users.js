

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
	});

	//handle event "add the user to the favorite list"
	$(".add-to-favorite").submit(function(event){
		event.preventDefault();
		_this = $(this)
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'json',
			data: $(this).serialize()
		}).done(function(data){
			  $("#user-show-notification").html("you just added " + data.first_name + " " + data.last_name + " to your favorite list");
			  _this.remove();
			  $("#block-div").empty();
			  $('.invitation-button').show();
		});
	});	

	//handle event "remove the user from the favorite list"
	$(".remove-from-favorite").submit(function(event){
		event.preventDefault();
		_this = $(this)
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'json',
			data: $(this).serialize()
		}).done(function(data){
			  $("#user-show-notification").html("you just remove " + data.first_name + " " + data.last_name + " from your favorite list");
			  _this.remove();
		});
	});	

	//handle event "add the user to the block list"
		$(".add-to-block").submit(function(event){
		event.preventDefault();
		_this = $(this)
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'json',
			data: $(this).serialize()
		}).done(function(data){
			  $("#user-show-notification").html("you just added " + data.first_name + " " + data.last_name + " to your block list");
			  _this.remove();
			  $("#favorite-div").empty();
			  $('.invitation-button').hide();
		});
	});	

 //handle event "remove the user from the block list"
 	$(".remove-from-block").submit(function(event){
		event.preventDefault();
		_this = $(this)
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'json',
			data: $(this).serialize()
		}).done(function(data){
			  $("#user-show-notification").html("you just remove " + data.first_name + " " + data.last_name + " from your block list");
			  _this.remove();
			  $('.invitation-button').show();
		});
	});

 	$("#search-div").on("click", "#search-button",function(){
 		var genderToSearch = $('input[name=gender]:checked').val();
 		console.log(genderToSearch)
 		var ageToSearch = $('input[name=age]:checked').val();
 		console.log(ageToSearch)
 		var cityToSearch = $('input[name=city]:checked').val();
 		console.log(cityToSearch)
 		console.log($(this).data("url"))

 		$.ajax({
 			url: $(this).data("url"),
 			type: 'get',
 			dataType: 'script',
 			data:{gender: genderToSearch, age: ageToSearch, city: cityToSearch, search: true},
 		}).done(function(data){});

 	});


});

