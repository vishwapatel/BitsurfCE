console.log("Something happened.");
function onMessage(request, sender, sendResponse) {
  if (request.action == 'getJSON') {
  	console.log("getJSON");
  	$.ajax({url:request.url, 
  		dataType: 'json',
  		success:function(data) {
  			sendResponse(data);
	}})};

	console.log("still running");
	if(request.method != 'send-payment') {
		console.log("I LOVE BAD BITCHES");
	}

	if(request.method == "send-payment") {
				console.log("hey");
                chrome.storage.local.get("bitcoin_addr", function(data) {
                        var callUrl = 'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/send-payment?bitcoin_addr=' + data['bitcoin_addr'] + '&website=' + request.url;
                        console.log(callUrl);
                        onMessage({action:'getJSON',url:callUrl}, null, function (data) {
                                var total_earned = data['total_earned'];
                                alert("YOUR TOTAL IS : "+ total_earned);
                                chrome.storage.local.set({"total_earned": total_earned}, function(response) {});
                                /*chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                                        chrome.tabs.sendMessage(tabs[0].id, {"total_earned": total_earned}, function(response) {
                                                console.log(response);
                                        });
                                });*/
                        });
            });
        }
	
	return true;
};

chrome.runtime.onMessage.addListener(onMessage);