var click_count = 0;
var bitsurf_value = 0.0001;
var current_earnings = 0;
var facebook_value = 0;

function isEmpty( obj ) { 
  for ( var prop in obj ) { 
    return false; 
  } 
  return true; 
}
 
$(document).ready(function() {
	var sites;
	chrome.storage.local.get('sites', function (data) {
		sites = data.sites;
		console.log(sites);
	});
    $( document ).on('click', '*', function (e) {
        click_count++;
        console.log("counting");
    });
    $('._2yg').find('button').click( function (e) {
        chrome.runtime.sendMessage({method: "send-payment", url: window.location.hostname}, function (response) {
            console.log("YOU GOT PAID FOR POSTING THAT COMMENT!!!!");
        });
    });
    window.setInterval(function() {
        if(click_count >= 3) {
        	console.log(window.location.href);
        	var matches = new Array();
        	chrome.runtime.sendMessage({action:'getJSON',url:'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/check-site/'}, function(data) {
        		console.log(data);
				sites = data;
				for (var site in sites) {
        		console.log(site);
        		if (window.location.href.indexOf(site) != -1) {
        			matches.push(site);
        		}
        	}

        	if (matches.length > 0) {
        		var largestLength = 0;
        		var match;

        		for (var i=0; i<matches.length; i++) {
        			if (matches[i].length > largestLength) {
        				largestLength = matches[i].length;
        				match = matches[i];
        			}
        		}

        		console.log(match);

        		chrome.runtime.sendMessage({method: "send-payment", url: match}, function (response) {
	                console.log(response.status);
	            });
	            console.log("gets here");
        	}
            
            click_count = 0;
		    });
        	
        }
    }, 15000);
});
 
 /*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
 
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
});*/
