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
				
				if( $(responseText).find("#content") )
				{
					// Assuming the returned page has a #content element,
					// it's safe to say it's coming from Plone
					//
					// We're trying to catch response from anywhere but the Plone site
					// (i.e. error pages from the load balancer, things like that.)
					$("#content").replaceWith($(responseText).find("#content")
					return 0;
				}
				else 
				{
					// Getting here means we've gotten a "success" reponse,
					// but it wasn't from Plone, but something else
					// This is the main condition we're protecting against.
					alert("There was a problem submitting your form, please try again.");
				}
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