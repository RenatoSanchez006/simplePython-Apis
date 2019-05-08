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
	
	getAllInfo();
});

function getAllInfo(){
	$.ajax({
		url: './info',
		method: "GET",
		dataType: 'json',
		async: false,
		success: responseJson => displayInfo(responseJson.info),
		error: err => console.log(err)
	});
}

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

$('#addButton').click(function (event) {
	event.preventDefault();

	let newTitle = $('#newSection').val().toLowerCase();
	let newInfo = $('#newInfo').val();
	if (newTitle.length == 0 || newInfo.length == 0) {
		alert("Missing fields");
		return;
	};

	let data = {
		title : newTitle,
		info : newInfo
	}
	$.ajax({
		url: `./info`,
		method: "POST",
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType: 'json',
		async: false,
		success: responseJson => {
			console.log(responseJson.info);
			getAllInfo();
		},
		error: err => alert("Info not added")
	});

	$('#newSection').val('');
	$('#newInfo').val('');
});

$('#deleteSection').click(function (event) {
	event.preventDefault();
	
	let title = $('#deleteId').val().toLowerCase().trim();
	console.log(title);
	let titleToDelete = {
		title: title
	}
	$.ajax({
		url: `./info/${title}`,
		method: "DELETE",
		contentType: 'application/json',
		data: JSON.stringify(titleToDelete),
		dataType: 'json',
		async: false,
		success: responseJson => {
			console.log(responseJson.info);
			getAllInfo();
		},
		error: err => alert("Exercise not found")
	});
	$('#deleteId').val('');
});

function displayInfo(info) {
	console.log(info);
	$('#listOfTopics').empty();
	info.forEach(element => {
		$('#listOfTopics').append(`
			<div class="section" id="${element.title}">
			<h2 class="ui dividing header">${element.title.toUpperCase()}</h2>
			<div>${element.info}</div>
		</div>
		`);
	});
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