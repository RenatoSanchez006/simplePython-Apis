function getUser() {
	let usernameToReturn;
	$.ajax({
		url: `./user-login`,
		method: "GET",
		dataType: 'json',
		async: false,
		success: responseJson => {
			usernameToReturn = responseJson.user.username;
		},
		error: err => console.log(err)
	});
	if (usernameToReturn) {
		return usernameToReturn;
	} else {
		console.log(null);
		return null;
	}
}

function login(user) {
	let usernameToReturn;
	console.log('login in');
	$.ajax({
		url: `./user-login/${user}`,
		method: "POST",
		dataType: 'json',
		async: false,
		success: responseJson => {
			usernameToReturn = responseJson.user.username;
		},
		error: err => console.log(err)
	});
}

function logout(user) {
	let usernameToReturn;
	$.ajax({
		url: `./user-login/${user}`,
		method: "DELETE",
		dataType: 'json',
		async: false,
		success: responseJson => {
			usernameToReturn = responseJson.user.username;
		},
		error: err => console.log(err)
	});
}