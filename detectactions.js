var click_count = 0;
var bitsurf_value = 0.0001;
var current_earnings = 0;
var facebook_value =
 
$(document).ready(function() {
    $('body').on('click', '*', function (e) {
        click_count++;
        console.log("counting");
    });
    window.setInterval(function() {
        if(click_count >= 3) {
        	console.log("greater than 3");
            chrome.runtime.sendMessage({method: "send-payment", url: window.location.hostname}, function (response) {
                console.log(response.status);
            });
            console.log("gets here");
            click_count = 0;
        }
    }, 1000);
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