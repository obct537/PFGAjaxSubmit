(function($) {
	$(document).ready(function() {

		var options = {
			success: 	showResponse,
			error: 		errorResponse, 
			timeout: 	30000, 		
		}

		$("#fg-base-edit").ajaxForm(options);


		// Function for "valid" responses
		function showResponse(responseText, statusText, xhr, $form)  { 

			errorText = "There was a problem submitting your form, please try again.";

			if( statusText == "success" )
			{
			 	// Since validation/response is customized server side, we replace the body
			 	// content to ensure that we display exactly what's expected.
				
				if( $(responseText).find("#content").text() != "" )
				{
					// Assuming the returned page has a #content element,
					// it's safe to say it's coming from Plone
					//
					// We're trying to catch response from anywhere but the Plone site
					// (i.e. error pages from the load balancer, things like that.)
					$("#content").replaceWith($(responseText).find("#content"));
					return 0;
				}
				else 
				{
					// Getting here means we've gotten a "success" reponse,
					// but it wasn't from Plone, but something else
					// This is the main condition we're protecting against.
					alert(errorText);
				}
			}			
			else
			{
				// If (somehow) the AJAX submittion fails
				alert(errorText);
			}
    	} 

    	// Function for handling timeouts or other major failures
    	function errorResponse()
    	{
    		alert(errorText);
    	}

		// Prevents the browser from submitting also
		return false;

	})
})(jQuery);