$(document).ready(function() {

    var bitcoin_addr;
    var total_earned;    
    var callUrl = 'http://ec2-23-22-205-148.compute-1.amazonaws.com:8000/login?bitcoin_addr=' + bitcoin_addr;

    chrome.storage.local.get('bitcoin_addr', function (data) {
        console.log(data);
        if (!($.isEmptyObject(data))) {
            console.log(data['bitcoin_addr']);
            bitcoin_addr = data['bitcoin_addr'];

            chrome.runtime.sendMessage({action:'getJSON',url:callUrl}, function(data) {
                chrome.storage.local.set({'total_earned': data['total_earned']}, function () {
                                            console.log(data);
                                            total_earned = data['total_earned'];
                                            $('#acct_bal').html("$" + total_earned + '<span class="light">in bitSurf</span>');
                                         });
            });
        }
    });

     $("#logout").click( function (e) {
        chrome.storage.local.remove('bitcoin_addr');
        window.location.replace("welcome.html");
    });
			
});