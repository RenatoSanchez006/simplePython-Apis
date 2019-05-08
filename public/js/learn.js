let username;

$(function() {
	username = getUser();
	if (username != null) {
		getUserInfo(username);
		$('#dashboard').show();
		$('#practice').show();
		$('#logout').show();
		$('#home').hide();
		$('#about').hide();
	}
	
});

function getUserInfo(username) {
	$.ajax({
		url: `./user/${username}`,
		method: "GET",
		dataType: 'json',
		async: false,
		success: responseJson => authenticate(responseJson.user),
		error: err => console.log(err)
	});
}

function authenticate(user) {
	if( user.usertype == 0){
		$('.admin-section').show();
	}
}

$("#dashboard").click(function () {
	window.location.href = "./dashboard.html";
});

$("#home").click(function(){
  window.location.href = "./index.html";
});

$("#learn").click(function () {
	window.location.href = "./learn.html";
});

$("#practice").click(function(){
  window.location.href = "./practice.html";
});

$("#about").click(function(){
  window.location.href = "./aboutUs.html";
});

$("#logout").click(function () {
	console.log('im login out ' + username);
	logout(username);
	window.location.href = "./index.html";
});