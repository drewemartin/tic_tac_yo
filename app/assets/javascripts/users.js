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
