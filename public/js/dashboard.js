let username;
let exerciseCount; 

$(function () {
	username = getUser();
	countExercise();
	getUserInfo(username);
});

function countExercise() {
	$.ajax({
		url: './exercise-count',
		method: "GET", 
		dataType: "json", 
		async: false,
		success: responseJson =>{ exerciseCount = responseJson.exercises;},
		error: err => console.log(err)
	});
	console.log(exerciseCount); 
}

function getUserInfo(username) {
	$.ajax({
		url: `./user/${username}`,
		method: "GET",
		dataType: 'json',
		async: false,
		success: responseJson => displayName(responseJson.user),
		error: err => console.log(err)
	});
}

function displayName(user) {
	$('#namePerson').append(`Welcome ${user.name}!`);

	let sc = (user.score * 100)/exerciseCount;
	console.log(user.score, sc);
	$('#score').progress({
		text: {
			active: `Done ${user.score} of ${exerciseCount} problems correctly`,
			success: `All problems done Correctly!`
		},
		percent: sc
	})

	let prog = user.progress * 100;
	$('#advancement').progress({
		text: {
			active: `Done ${prog}%`,
			success: `All problems done!`
		},
		percent: prog
	});
}

$("#dashboard").click(function () {
	window.location.href = "./dashboard.html";
});

$("#logout").click(function () {
	console.log('im login out ' + username);
	logout(username);
	window.location.href = "./index.html";
});

$("#learn").click(function () {
	window.location.href = "./learn.html";
});

$("#practice").click(function () {
	window.location.href = "./practice.html";
});
