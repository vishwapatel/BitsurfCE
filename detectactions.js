var click_count = 0;
var bitsurf_value = 0.0001;
var current_earnings = 0;
var facebook_value = 

$(document).ready(function() {
    $('body').on('click', '*', function (e) {
        click_count++;
    });
    window.setInterval(function() {
        if(click_count >= 3) {
            chrome.extension.sendRequest({method: "send-payment", url: window.location.hostname}, function (response) {
                console.log(response.status);
            });
            click_count = 0;
        }
    }, 30000);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
});
