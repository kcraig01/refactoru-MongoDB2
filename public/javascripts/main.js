$(function(){
	$('#application-form').submit(function(e){
		e.preventDefault();
		$.post('/applicant', $(this).serialize(),function(data){
					$('#success-message').text(data.success)
			})
	})

	

});