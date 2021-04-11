chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === 'complete') {
		clearInterval(readyStateCheckInterval);
    $('.card-listing').each(function(index, element) {
      const link = $(element).find('.card-listing--image').find('a')[0].href
      chrome.runtime.sendMessage({tag: 'fetch_listing_data', url: link}, function(response) {	
        if(response) {
          $(element).find('.card-listing--details').find('.card-listing--values').append(`<li class='xs-inline' style='font-weight: bold'> ${response.type}: ${response.value}</li>`)
        }
      });
    })
	}
	}, 10);
});