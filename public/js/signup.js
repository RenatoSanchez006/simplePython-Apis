$(function () {
	console.log("Here you'll sign up to simplePyton")
});

$("#signupButton").click(function (event) {
	event.preventDefault();
	console.log("click signiup");

	let fName = $('#fName').val()
	let lName = $('#lName').val();
	let name = fName + ' ' + lName;
	let username = $('#username').val().toLowerCase();
	let password = $('#password').val();
	let passwordC = $('#passwordC').val();

	if (fName.length == 0) {
		alert("Enter First Name");
	} else if (lName.length == 0){
		alert("Enter Last Name");
	}else if (username.length == 0) {
		alert("Enter Username");
	} else if(password.length == 0) {
		alert("Enter password");
	}else if (password != passwordC) {
		alert("Password don't match");
	} else {
		let newUser = {
			name: name, 
			username: username,
			password: password
		}
		signup(newUser);
	}
});

function signup(newUser) {
	$.ajax({
		url: `./new-user`,
		method: "POST",
		contentType: 'application/json',
		data: JSON.stringify(newUser),
		dataType: 'json',
		async: false,
		success: responseJson => {
			console.log(responseJson.user);
			console.log(responseJson.user.username);
			login(responseJson.user.username)
		},
		error: err => console.log(err)
	});
	window.location.href = "./dashboard.html";
}
