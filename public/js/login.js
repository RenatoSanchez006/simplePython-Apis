let username;

$(function () {
	console.log('Hello im loggin in');
});

$("#loginButton").click(function (event) {
	event.preventDefault();
	console.log("click login");

	let username = $('#username').val().toLowerCase();
	let password = $('#password').val();

	initiateSession(username, password);
});

function initiateSession(user, password){
	let dbUsername, dbPassword;
	$.ajax({
		url: `./user/${user}`,
		method: "GET",
		dataType: 'json',
		async: false,
		success: responseJson => {
			dbUsername = responseJson.user.username;
			dbPassword = responseJson.user.password;
		},
		error: err => console.log(err)
	});

	if(user == dbUsername && password == dbPassword) {
		login(user);
		window.location.href = "./dashboard.html";
	} else {
		alert("The username and password you entered did not match our records. Please double-check and try again.")
	}
} 