function getListingData(request, sender, sendResponse) {
	$.get(request.url, function(outterData){
		var strataFee = $($($.parseHTML(outterData)).find('.section-listing-content')).find("dt:contains('Strata Fees')").next().text()
    var maintenanceFee = $($($.parseHTML(outterData)).find('.section-listing-content')).find("h4:contains('Fees')").next().find("div:contains('Maintenance Fee')").next().text()
		sendResponse(
      strataFee
        ? {type: 'Strata', value: strataFee}
        : maintenanceFee
          ? {type: 'Maint.', value: maintenanceFee}
          : undefined)
		
	}).fail(function(){
		sendResponse(null)
	})
}
//Listener, waiting for a request from the injected script.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	//Check if the request is from the ijnect script and wants the ajax data.
    if (request.tag == 'fetch_listing_data') {
    	//Call the function that handles the gets.
      	getListingData(request, sender, sendResponse)
      	//This return true prevents the dialogue between the message sender and receiver from breaking down during the lul in AJAX requests.
      	return true;
    } else {
    	sendResponse();
    }
  });