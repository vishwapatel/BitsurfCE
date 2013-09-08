
$(document).ready(function() {
	console.log("working");

	chrome.storage.local.get('bitcoin_addr', function (data) {
		if (!($.isEmptyObject(data))) {
			window.location.replace("status.html");
		}
	});

    $("#login_button").click( function (e) {
    	console.log($("#bitcoin_addr").val());
    	var callUrl = 'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/login?bitcoin_addr=' + $("#bitcoin_addr").val();

        chrome.runtime.sendMessage({action:'getJSON',url:callUrl}, function(data) {
			chrome.storage.local.set({'bitcoin_addr': $("#bitcoin_addr").val(),
                                     'current_balance': data['current_balance']}, function () {
                                        window.location.replace("status.html");
                                     });
        });
        
    });
});