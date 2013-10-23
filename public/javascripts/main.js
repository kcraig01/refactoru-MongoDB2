$(function(){
	$('#application-form').submit(function(e){
		e.preventDefault();
		$.post('/applicant', $(this).serialize(),function(data){
				console.log(data);
				$('#success-message').removeClass('hidden')
			})
	})

	$(document).on('click','.remove', function(){
		console.log('this');
		var el = $(this);
		var removedID = el.attr('data-id');
		console.log(removedID)
		$.get('/deleteapp', {remove: removedID}, function(data){
			el.parent().remove();

		 } )
	})

});