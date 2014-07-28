$(document).on('ready page:load', function(){
  $(".delete-btn").click(function(event){
			event.preventDefault();
			event.stopPropagation();
			_this = $(this)
			$.ajax({
				url: $(this).attr('href'),
				type: "DELETE",
				dataType: 'json'
			}).done(function(data){
				_this.closest(".message-tr").remove();
			});
  });
});
