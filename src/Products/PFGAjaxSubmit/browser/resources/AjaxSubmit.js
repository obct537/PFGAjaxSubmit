(function($) {
	$(document).ready(function() {

		var options = {
			success: 	showResponse,
			error: 		errorResponse,
			timeout: 	3000, 		
		}

		$("#fg-base-edit").ajaxForm(options);


		// Function for "valid" responses
		function showResponse(responseText, statusText, xhr, $form)  { 

			if( statusText == "success" )
			{
			 	// Since validation/response is customized server side, we replace the body
			 	// content to ensure that we display exactly what's expected.
				$("#content").replaceWith($(responseText).find("#content"));
			}			
			else
			{
				// If (somehow) the AJAX submittion fails
				alert("There was a problem submitting your form. \n\n Response state code=" + statusText);
			}
    	} 

    	// Function for handling timeouts or other major failures
    	function errorResponse()
    	{
    		alert("There was a problem submitting your form. \n\n Please try again in a few minutes.\n\n");
    	}

		// Prevents the browser from submitting also
		return false;

	})
})(jQuery);