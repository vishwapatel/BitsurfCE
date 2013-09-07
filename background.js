console.log("Something happened.");
function onMessage(request, sender, sendResponse) {
  if (request.action == 'getJSON') {
  	$.ajax({url:request.url, 
  		dataType: 'json',
  		success:function(data) {
  			sendResponse(data);
	}});
	
	return true;
}};

chrome.runtime.onMessage.addListener(onMessage);

chrome.extension.onRequest.addListener(function(resquest, sender, sendResponse) {
        if(request.method == "send-payment") {
                chrome.storage.local.get("bitcoin_addr", function(data) {
                        var callUrl = 'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/send-payment?bitcoin_addr=' + data + '&website=' + request.url;
                        chrome.extension.sendRequest({action:'getJSON',url:callUrl}, function (data) {
                                var total_earned = data['total_earned'];
                                alert("YOUR TOTAL IS : "+ total_earned);
                                chrome.storage.local.set({"total_earned": total_earned}, function(response) {});
                                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                                        chrome.tabs.sendMessage(tabs[0].id, {"total_earned": total_earned}, function(response) {
                                                console.log(response);
                                        });
                                });
                        });
            });
        }
});