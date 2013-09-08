$(document).ready(function() {
	console.log("working");

	chrome.storage.local.get('bitcoin_addr', function (data) {
		if (!($.isEmptyObject(data))) {
			window.location.replace("status.html");
		}
	});

	chrome.runtime.sendMessage({action:'getJSON',url:'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/check-site/'}, function(data) {

		chrome.storage.local.set({'sites': data.sites}, function () {});
    });

    $("#login_button").click( function (e) {
    	chrome.runtime.sendMessage({action:'getJSON',url:'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/check-site/'}, function(data) {

		chrome.storage.local.set({'sites': data.sites}, function () {});
    });

    	console.log($("#bitcoin_addr").val());
    	var callUrl = 'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/login?bitcoin_addr=' + $("#bitcoin_addr").text("#bitcoin_addr").val();

        chrome.runtime.sendMessage({action:'getJSON',url:callUrl}, function(data) {

			chrome.storage.local.set({'bitcoin_addr': $("#bitcoin_addr").val(),
                                     'total_earned': data['total_earned']}, function () {
                                        window.location.replace("status.html");
                                     });
        });
        
    });

     $("#make_acct").click( function (e) {

     	chrome.runtime.sendMessage({action:'getJSON',url:'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/check-site/'}, function(data) {

		chrome.storage.local.set({'sites': data.sites}, function () {});
    });
     	
    	var callUrl = 'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/new-user';

        chrome.runtime.sendMessage({action:'post', url:callUrl, email:$("#email").val(), pass:$("#pass").val()}, function(data) {

			chrome.storage.local.set({'bitcoin_addr': $("#bitcoin_addr").val(),
                                     'total_earned': data['total_earned']}, function () {
                                        window.location.replace("status.html");
                                     });
        });
        
    });
});