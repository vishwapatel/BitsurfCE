$(document).ready(function() {
	console.log("working");

	chrome.storage.local.get('bitcoin_addr', function (data) {
		if (!($.isEmptyObject(data))) {
			window.location.replace("status.html");
		}
	});

    $("#login_button").click( function (e) {
    	console.log($("#bitcoin_addr").val());
    	var callUrl = 'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/login?bitcoin_addr=' + $("#bitcoin_addr").text("#bitcoin_addr").val();

        chrome.runtime.sendMessage({action:'getJSON',url:callUrl}, function(data) {

        	var notifCount;
        	chrome.storage.local.get('notifCount', function (data) {
        		if (!($.isEmptyObject(data))) {
					notifCount = data['notifCount'];
				}
				else {
					notifCount = 0;
				}
				chrome.storage.local.set({"notifCount": (notifCount + 1)}, function(response) {});
        	});

        	chrome.notifications.create(
								  'id' + notifCount,{   
								      type: 'basic', 
								      iconUrl: 'toolbar_icon.png', 
								      title: 'bitSurf', 
								      message: 'Welcome! You just logged in!',
								      priority: 0},
								  function() { /* Error checking goes here */} 

								);

			chrome.storage.local.set({'bitcoin_addr': $("#bitcoin_addr").val(),
                                     'total_earned': data['total_earned']}, function () {
                                        window.location.replace("status.html");
                                     });
        });
        
    });
});