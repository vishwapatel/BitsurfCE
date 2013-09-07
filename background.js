console.log("Something happened.");
function onRequest(request, sender, callback) {
  if (request.action == 'getJSON') {
  	console.log("successfully received");
    $.getJSON(request.url, callback);
  }
}

chrome.extension.onRequest.addListener(onRequest);