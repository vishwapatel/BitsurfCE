$(document).ready(function() {
	$(".alert").alert('close​');
	$("#loginbutton").click( function (e) {
		$.getJSON('ec2-23-22-205-148.comput​e-1.amazonaws.com:8000/login', {'bitcoin_addr': $("#bitcoin_addr").val()}, function (data) {
			chrome.storage.sync.set({'bitcoin_addr': $("#bitcoin_addr").val(),
									 'current_balance': data['current_balance']}, function () {
									 	window.location.replace("status.html");
									 });
		});
	});
});