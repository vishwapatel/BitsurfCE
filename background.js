console.log("Something happened.");
function onRequest(request, sender, callback) {
  if (request.action == 'getJSON') {
  	console.log("successfully received");
    $.getJSON(request.url, callback);
    console.log(request.url);
  }
}

chrome.extension.onRequest.addListener(onRequest);