let username; 
let userInfo;

$(function () {
	console.log("Hello Practice");
	username = getUser();
	console.log('username')
	if (username) {
		console.log(username);
	} else {
		console.log('very false');
	}
	getUserInfo(username);
	getAllExercises();
});

function getUserInfo(username) {
	$.ajax({
		url: `./user/${username}`,
		method: "GET",
		dataType: 'json',
		async: false,
		success: responseJson => 
		{
			userInfo = responseJson.user;
			console.log(userInfo);
			authenticate(responseJson.user)
		},
		error: err => console.log(err)
	});
}

function getAllExercises() {
	$.ajax({
		url: './exercises',
		method: "GET",
		dataType: 'json',
		async: false,
		success: responseJson => displayExercises(responseJson.exercises),
		error: err => console.log(err)
	});
}

$('#editButton').click(function (event) {
	event.preventDefault();
	console.log('Editing problem');

	let id = $('#editId').val();
	let newAnswer = $('#editAnswer').val();
	if (id.length == 0 || newAnswer.length == 0) {
		alert("Missing fields");
		return;
	};

	let answerToUpdate = { answer: newAnswer }
	$.ajax({
		url: `./update-exercise/${id}`,
		method: "PUT",
		contentType: 'application/json',
		data: JSON.stringify(answerToUpdate),
		dataType: 'json',
		async: false,
		success: responseJson => {
			console.log(responseJson.exercise);
		},
		error: err => alert("Exercise not found")
	});
	$('#editId').val('');
	$('#editAnswer').val('')
});

$('#deleteProblem').click(function (event) {
	event.preventDefault();
	console.log('Deleting problem');

	let id = $('#deleteId').val();
	let exerciseToDelete = {
		id: id
	}
	$.ajax({
		url: `./delete-exercise/${id}`,
		method: "DELETE",
		contentType: 'application/json',
		data: JSON.stringify(exerciseToDelete),
		dataType: 'json',
		async: false,
		success: responseJson => {
			console.log(responseJson.exercise);
			getAllExercises();
		},
		error: err => alert("Exercise not found")
	});
	$('#deleteId').val('');
});

$(document).on('click', '.submitExButton', function () {
	let dbAnswer;
	let answer = $(this).prev().val();
	let id = $(this).closest(".ui.segment").attr("id");

	$.ajax({
		url: `./exercise/${id}`,
		method: "GET",
		dataType: 'json',
		async: false,
		success: responseJson => {
			dbAnswer = responseJson.exercise.answer
		},
		error: err => console.log(err)
	});

	if(dbAnswer == answer) {
		alert('Success');
		updateUserInfo();
	} else {
		alert('Failure, try again');
	}
	$(this).prev().val('');

});

function updateUserInfo() {
	console.log(username);
	console.log(userInfo);
	let newScore = 1 + userInfo.score;
	let newPoints = {
		score: newScore, 
		progress: userInfo.progress
	}
	$.ajax({
		url: `./update-points/${username}`,
		method: "PUT",
		contentType: 'application/json',
		data: JSON.stringify(newPoints),
		dataType: 'json',
		async: false,
		success: responseJson => {
			console.log(responseJson.user);
		},
		error: err => alert("Exercise not found")
	});
}

function displayExercises(exercises) {
	console.log(exercises);
	$('.listOfExercises').empty();
	exercises.forEach(element => {
		$('.listOfExercises').append(`
			<div class="ui segment" id="${element.id}">
					<div class="ui container ">
						<h4 class="ui dividing header">${element.id}</h4>
						<div class="sixteen wide column">
							<div class="ui two column stackable grid">
								<div class="ten wide column">
									<div class="ui fluid image">
										<img class="ui big bordered rounded image" src="${element.path}">
									</div>
								</div>
								<div class="six wide column centered">
									<label>What does this code print?</label>
									<div class="ui small action input">
										<input class="submitAnswer" name="answer" type="text" placeholder="Answer...">
										<button class="ui button submitExButton">Submit</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		`);
	});
}


function authenticate(user) {
	if (user.usertype == 0) {
		$('.admin-section').show();
	}
}

$("#practice").click(function () {
	window.location.href = "./practice.html";
});

$("#learn").click(function () {
	window.location.href = "./learn.html";
});

$("#dashboard").click(function () {
	window.location.href = "./dashboard.html";
});

$("#about").click(function () {
	window.location.href = "./aboutUs.html";
});

$("#logout").click(function () {
	console.log('im login out ' + username);
	logout(username);
	window.location.href = "./index.html";
});