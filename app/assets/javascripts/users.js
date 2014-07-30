// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$(document).on('ready page:load', function(){

  var height = $(window).height();  
      $('.main').css('height', height);
      $('.bottom').css('height', height);

  window.initializeSlider = function() {
    $('.filtering').unslick();
    $('.filtering').slick({
     slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 7000, 
      cssEase: 'ease',
      dots: 'true'
    });
  }

  initializeSlider(); 



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
    link = $(this).find('.links')
     all_links = $('.links');
     // all_links.slideUp();
     link.slideToggle();
          
  });

  img.on('mouseleave', function(){
    link = $(this).find('.links')
     all_links = $('.links');
      // all_links.slideDown(); 
      link.slideUp();
  });
    

	$(".invitation-button").on("click", function(ev){
    // ev.preventDefault();
    // $(this).off('click');
    // ev.stopPropagation();
    $(this).attr("disabled","disabled");
    console.log("in invitation button click");

		var invitorId = window.current_user.id;
		var invitorName = window.current_user.username;
		var inviteeId = $("#user-info").data("user-id");
		var game_invitation_url = $(this).data("url");
		var inviteeName = $("#user-info").data("username");

		window.myDataRef.push({invitor_id: invitorId, invitee_id: inviteeId, inviteeName: inviteeName, invitorName: invitorName, game_state: 'pending', game_board_url: game_invitation_url});
		
    return false;
	});

	//handle event "add the user to the favorite list"
	$(".add-to-favorite").submit(function(event){
		event.preventDefault();
		event.stopPropagation();
		_this = $(this)
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'script',
			data: $(this).serialize()
		}).done(function(data){
		    console.log(data);
			 // $("#user-show-notification").html("you just added " + data.first_name + " " + data.last_name + " to your favorite list");
		// 	  // _this.remove();
		// 	  // $("#block-div").empty();
		// 	  // $('.invitation-button').show();
		// 	   //$('#favorite-div').html(data);
		});
	});	

	//handle event "remove the user from the favorite list"
	$(".remove-from-favorite").submit(function(event){
		event.preventDefault();
		event.stopPropagation();
		_this = $(this)
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'script',
			data: $(this).serialize()
		}).done(function(data){
			  console.log(data);
			  // $("#user-show-notification").html("you just remove " + data.first_name + " " + data.last_name + " from your favorite list");
			  //_this.remove();
			  //$('favorite-div').append(data);
		});
	});	

	//handle event "add the user to the block list"
		$(".add-to-block").submit(function(event){
		event.preventDefault();
		event.stopPropagation();
		_this = $(this)
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'script',
			data: $(this).serialize()
		}).done(function(data){
			  // $("#user-show-notification").html("you just added " + data.first_name + " " + data.last_name + " to your block list");
			  // _this.remove();
			  // $("#favorite-div").empty();
			  //$('#invitation-div').hide();
		});
	});	

 //handle event "remove the user from the block list"
 	$(".remove-from-block").submit(function(event){
		event.preventDefault();
		event.stopPropagation();
		_this = $(this)
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			dataType: 'script',
			data: $(this).serialize()
		}).done(function(data){
			  // $("#user-show-notification").html("you just remove " + data.first_name + " " + data.last_name + " from your block list");
			  // _this.remove();
			  //$('#invitation-div').show();
		});
	});

$("input[name=gender]").change(function(){
    $(this).closest('div').find('.summary').text($(this).siblings('label').text());
});

$("input[name=age]").change(function(){
    $(this).closest('div').find('.summary').text($(this).siblings('label').text());
});

$("input[name=city]").change(function(){
    $(this).closest('div').find('.summary').text($(this).siblings('label').text());
});


 	$(".search-tools").on("click", "#search-button",function(){
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

 	var Filter = (function() {
  function Filter(element) {
    this._element = $(element);
    this._optionsContainer = this._element.find(this.constructor.optionsContainerSelector);
  }

  Filter.selector = '.filter';
  Filter.optionsContainerSelector = '> div';
  Filter.hideOptionsClass = 'hide-options';

  Filter.enhance = function() {
    var klass = this;

    return $(klass.selector).each(function() {
      return new klass(this).enhance();
    });
  };

  Filter.prototype.enhance = function() {
    this._buildUI();
    this._bindEvents();
  };

  Filter.prototype._buildUI = function() {
    this._summaryElement = $('<label></label>').
      addClass('summary').
      attr('data-role', 'summary').
      prependTo(this._optionsContainer);

    this._clearSelectionButton = $('<button></button>').
      text('Clear').
      attr('type', 'button').
      insertAfter(this._summaryElement);

    this._optionsContainer.addClass(this.constructor.hideOptionsClass);
    this._updateSummary();
  };

  Filter.prototype._bindEvents = function() {
    var self = this;

    this._summaryElement.click(function() {
      self._toggleOptions();
    });

    this._clearSelectionButton.click(function() {
      self._clearSelection();
    });

    this._checkboxes().change(function() {
      self._updateSummary();
    });

    $('body').click(function(e) {
      var inFilter = $(e.target).closest(self.constructor.selector).length > 0;

      if (!inFilter) {
        self._allOptionsContainers().addClass(self.constructor.hideOptionsClass);
      }
    });
  };

  Filter.prototype._toggleOptions = function() {
    this._allOptionsContainers().
      not(this._optionsContainer).
      addClass(this.constructor.hideOptionsClass);

    this._optionsContainer.toggleClass(this.constructor.hideOptionsClass);
  };

  Filter.prototype._updateSummary = function() {
    var summary = 'All';
    var checked = this._checkboxes().filter(':checked');

    if (checked.length > 0) {
      summary = this._labelsFor(checked).join(', ');
    }

    this._summaryElement.text(summary);
  };

  Filter.prototype._clearSelection = function() {
    this._checkboxes().each(function() {
      $(this).prop('checked', false);
    });

    this._updateSummary();
  };

  Filter.prototype._checkboxes = function() {
    return this._element.find(':checkbox');
  };

  Filter.prototype._labelsFor = function(inputs) {
    return inputs.map(function() {
      var id = $(this).attr('id');
      return $("label[for='" + id + "']").text();
    }).get();
  };

  Filter.prototype._allOptionsContainers = function() {
    return $(this.constructor.selector + " " + this.constructor.optionsContainerSelector);
  };

  return Filter;
})();

$(function() {
  Filter.enhance();
});

});

