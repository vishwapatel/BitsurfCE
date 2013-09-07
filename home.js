$(document).ready(function() {
	$(".alert").alert('close​');
	$("#loginbutton").click( function (e) {
		$(.getJSON('/login/' + $("#bitcoin_addr").val(), function (data) {
			chrome.storage.sync.set({'bitcoin_addr': $("#bitcoin_addr").val(),
									 'current_balance': data['current_balance']}, function () {
									 	window.location.replace("status.html");
									 });
		});
	});
});