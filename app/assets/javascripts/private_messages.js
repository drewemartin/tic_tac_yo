$(document).on('ready page:load', function(){
  $(".ajax-delete-private-message").click(function(event){
			event.preventDefault();
			event.stopPropagation();
			var yes = confirm("Are you sure?")
			if (yes === true){
			_this = $(this)
			$.ajax({
				url: $(this).attr('href'),
				type: "DELETE",
				dataType: 'json'
			}).done(function(data){
				_this.closest(".message-tr").remove();
			});
		}
  });
  $("#recipient_select").change(function(){
  	$("#private_message_recipient_id").val($(this).val());
  });
});
