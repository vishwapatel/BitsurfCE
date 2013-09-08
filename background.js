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
                		if (!($.isEmptyObject(data))) {
	                        var callUrl = 'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/send-payment?bitcoin_addr=' + data['bitcoin_addr'] + '&website=' + request.url;
	                        console.log(callUrl);
	                        onMessage({action:'getJSON',url:callUrl}, null, function (data2) {
	                                var total_earned = data2['total_earned'];
	                                chrome.storage.local.set({"total_earned": total_earned}, function(response) {});

	                                //chrome.storage.local.get({"total_earned": total_earned}, function(response) {});

	                                var notifCount;
						        	chrome.storage.local.get('notifCount', function (data3) {
						        		if (!($.isEmptyObject(data3))) {
											notifCount = data3['notifCount'];
										}
										else {
											console.log("else");
											notifCount = 0;
										}
										chrome.storage.local.set({'notifCount': (notifCount + 1)}, function(response) {});
										console.log(notifCount);
						        	});
						        	var newId = 'id' + notifCount; 
									chrome.notifications.create(
									  newId,{   
									      type: 'basic', 
									      iconUrl: 'toolbar_icon.png', 
									      title: 'bitSurf', 
									      message: 'You now have ' + data2['total_earned'] + ' BTC',
									      priority: 0},
									  function() { /* Error checking goes here */} 

									);
	                                /*chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
	                                        chrome.tabs.sendMessage(tabs[0].id, {"total_earned": total_earned}, function(response) {
	                                                console.log(response);
	                                        });
	                                });*/
	                        });
					}
            });
        }
	
	return true;
};

chrome.runtime.onMessage.addListener(onMessage);