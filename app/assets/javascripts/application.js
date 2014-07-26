// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= jquery.bxslider.min.js
//= jquery.slick.min.js
//= require turbolinks
//= require animate
//= require_tree .
$(document).on('ready page:load', function(){
	myDataRef = new Firebase('https://scorching-fire-2888.firebaseio.com/');

	$("#notification-div").find(".invitation-button").attr('disabled','disabled')

	myDataRef.on('child_added', function(snapshot) {
        var invitation = snapshot.val();
        if (typeof current_user != 'undefined'){
        showInvitation(invitation, snapshot)
      }
      });

	function showInvitation(invitation, snapshot){
		 this.snapshotUrl = snapshot.ref()
		 if ((invitation.invitee_id === current_user.id) &&(invitation.accepted === false))
		 {
		 	$("#notification-div").html("<a href="+ invitation.game_board_url +"><button class='go-to-game-button btn btn-warning' data-firebase-url="+ this.snapshotUrl +">"+ invitation.invitorName + " invites you for a game" +"</button></a>")
		 }
		 else if ((invitation.invitor_id === current_user.id)&&(invitation.accepted === true))
		 {
		 	 $("#notification-div").html("<a href="+ invitation.game_board_url +"><button class='go-to-game-button btn btn-warning' data-firebase-url="+ this.snapshotUrl +">"+ invitation.inviteeName + " just accepted your invitation" +"</button></a>")
		 }
	};

	$("#notification-div").on("click", ".go-to-game-button", function(){
		var firebaseEntryUrl = $(this).data("firebase-url");
		var entryToRemove = new Firebase(firebaseEntryUrl);
		var snapshotVal;
		entryToRemove.on('value', function(snapshot) {
 			 snapshotVal = snapshot.val();
		});

		console.log(snapshotVal);
		if (snapshotVal.accepted === false)
		{
			myDataRef.push({invitor_id: snapshotVal.invitor_id, invitee_id: snapshotVal.invitee_id, inviteeName: snapshotVal.inviteeName, invitorName: snapshotVal.invitorName, accepted: true, game_board_url: snapshotVal.game_board_url});
		}
		entryToRemove.remove();
		$(this).remove();
	});


});


