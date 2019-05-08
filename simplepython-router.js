const express = require('express');
const router = express.Router();
const { listPython } = require('./simplepython-model');
const uuid = require('uuid/v4');

/* -------------------- listPython - LOGIN -------------------- */
// GET user loged in
router.get('/user-login', (req, res, next) => {
	listPython.getUserLogIn()
		.then(user => {
			res.status(200).json({
				message: 'User found',
				status: 200,
				user: user
			});
		})
		.catch(err => {
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		})
});

router.post('/user-login/:id', (req, res, next) => {
	listPython.createUserLogin(req.params.id)
		.then(user => {
			res.status(201).json({
				message: 'User sesion creted',
				status: 201,
				user: user
			});
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

router.delete('/user-login/:id', (req, res, next) => {
	let id = req.params.id;
	if (id) {
		listPython.deleteUserLogin(id)
			.then(user => {
				res.json({
					message: 'Succesfully deleted',
					status: 204,
					user: user
				}).status(204)
			})
			.catch(err => {
				res.status(404).json({
					message: 'User not found',
					status: 404
				});
			})
	} else {
		res.status(406).json({
			message: 'Missing id in parameters',
			status: 406
		});
		next();
	}
})

/* -------------------- listPython - USERS -------------------- */
// GET all users
router.get('/users', (req, res, next) => {
	// Call to the simplepython-model
	listPython.getAllUsers()
		.then(listUsers => {
			res.status(200).json({
				message: 'Succefully sent the users',
				status: 200,
				users: listUsers
			});
		})
		.catch(err => {
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

// GET user with user as path parameter
router.get('/user/:user', (req, res) => {
	let user = req.params.user;
	if (!user) {
		res.status(406).json({
			message: "Missing param 'user'",
			status: 406
		});
	}

	// Call to the simplepython-model
	listPython.getUser(user)
		.then(user => {
			if (user.length != 0) {
				res.status(200).json({
					message: 'User found',
					status: 200,
					user: user
				});
			} else {
				res.status(404).json({
					message: 'User not found',
					status: 404
				});
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

// POST new user
router.post('/new-user', (req, res, next) => {
	// Validate all fields are sent in body
	let reqFields = ['name', 'username', 'password'];
	for (i in reqFields) {
		let currentField = reqFields[i];

		if (!(currentField in req.body)) {
			res.status(406).json({
				message: `Missing field '${currentField}' in body.`,
				status: 406
			});
			next();
		}
	}

	// Create new user to add and push it to db
	let newUser = {
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		score: 0,
		progress: 0,
		usertype: 1
	}

	listPython.createUser(newUser)
		.then(newUser => {
			res.status(201).json({
				message: 'User succesfully creted',
				status: 201,
				user: newUser
			});
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

// DELETE user by username
router.delete('/delete-user/:username', (req, res, next) => {

	if (!('username' in req.body)) {
		res.status(406).json({
			message: 'Missing username field',
			status: 406
		});
	}

	let username = req.params.username;
	if (username) {
		if (username == req.body.username) {
			listPython.deleteUser(username)
				.then(deletedUser => {
					res.json({
						message: 'Succesfully deleted',
						status: 204,
						user: deletedUser
					}).status(204)
				})
				.catch(err => {
					res.status(404).json({
						message: 'User not found',
						status: 404
					});
				})
		} else {
			res.status(400).json({
				message: 'Parameters do not match',
				status: 400
			});
		}
	} else {
		res.status(406).json({
			message: 'Missing username in parameters',
			status: 406
		});
		next();
	}
});

// PUT update user - update
router.put('/update-points/:user', (req, res, next) => {
	let user = req.params.user;
	let newPoints = req.body;

	if (user) {
		if (Object.keys(newPoints).length == 2 && ('score' in newPoints) && ('progress' in newPoints)) {
			listPython.updateScore(user, newPoints.score, newPoints.progress)
				.then(userUpdated => {
					res.status(200).json({
						message: 'User score updated',
						status: 200,
						user: userUpdated
					});
				})
				.catch(err => {
					console.log(err);
					res.status(404).json({
						message: 'User not found',
						status: 404,
						error: err
					});
				})
		} else {
			res.status(404).json({
				message: 'Missing parameters in body',
				status: 404
			});
		}
	} else {
		res.status(406).json({
			message: 'Missing id in parameters',
			status: 406
		});
	}
});

/* -------------------- listPython - EXERCISES -------------------- */
// GET all exercises
router.get('/exercises', (req, res, next) => {
	// Call to the simplepython-model
	listPython.getAllExercises()
		.then(listExercises => {
			res.status(200).json({
				message: 'Succefully sent the exercises',
				status: 200,
				exercises: listExercises
			});
		})
		.catch(err => {
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

// GET exercises count
router.get('/exercise-count', (req, res, next) => {
	listPython.getExerciseCount()
		.then(exerciseCount => {
			res.status(200).json({
				message: 'Succesfully sent count of exercises',
				status: 200,
				exercises: exerciseCount
			})
		})
		.catch(err => {
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

// GET exercise with id as path parameter
router.get('/exercise/:id', (req, res) => {
	let id = req.params.id;
	if (!id) {
		res.status(406).json({
			message: "Missing param 'id'",
			status: 406
		});
	}

	// Call to the simplepython-model
	listPython.getExercise(id)
		.then(exercise => {
			if (exercise.length != 0) {
				res.status(200).json({
					message: 'Exercise found',
					status: 200,
					exercise: exercise
				});
			} else {
				res.status(404).json({
					message: 'Exercise not found',
					status: 404
				});
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

// POST new exercise
router.post('/new-exercise', (req, res, next) => {
	// Validate all fields are sent in body
	let reqFields = ['id', 'answer'];
	for (i in reqFields) {
		let currentField = reqFields[i];

		if (!(currentField in req.body)) {
			res.status(406).json({
				message: `Missing field '${currentField}' in body.`,
				status: 406
			});
			next();
		}
	}

	// Create new user to add and push it to db
	let newExercise = {
		id: req.body.id,
		answer: req.body.answer
	}

	listPython.createExercise(newExercise)
		.then(newExercise => {
			res.status(201).json({
				message: 'Exercise succesfully creted',
				status: 201,
				exercise: newExercise
			});
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

// DELETE user by exercise id
router.delete('/delete-exercise/:id', (req, res, next) => {

	if (!('id' in req.body)) {
		res.status(406).json({
			message: 'Missing username field',
			status: 406
		});
	}

	let id = req.params.id;
	if (id) {
		if (id == req.body.id) {
			listPython.deleteExercise(id)
				.then(deletedExercise => {
					res.json({
						message: 'Succesfully deleted',
						status: 204,
						exercise: deletedExercise
					}).status(204)
				})
				.catch(err => {
					res.status(404).json({
						message: 'Exercise not found',
						status: 404
					});
				})
		} else {
			res.status(400).json({
				message: 'Parameters do not match',
				status: 400
			});
		}
	} else {
		res.status(406).json({
			message: 'Missing id in parameters',
			status: 406
		});
		next();
	}
});

// PUT update/edit exercise - update
router.put('/update-exercise/:id', (req, res, next) => {
	let id = req.params.id;
	let newAnswer = req.body.answer;

	if (id) {
		if (newAnswer) {
			listPython.updateExercise(id, newAnswer)
				.then(exerciseUpdated => {
					res.status(200).json({
						message: 'Exercise score updated',
						status: 200,
						exercise: exerciseUpdated
					});
				})
				.catch(err => {
					console.log(err);
					res.status(404).json({
						message: 'Exercise not found',
						status: 404,
						error: err
					});
				})
		} else {
			res.status(404).json({
				message: 'Missing parameters in body',
				status: 404
			});
		}
	} else {
		res.status(406).json({
			message: 'Missing id in parameters',
			status: 406
		});
	}
});

/* -------------------- FILE UPLOAD -------------------- */
router.get('/info', (req, res, next) => {
	// Call to the simplepython-model
	listPython.getAllInfo()
		.then(info => {
			res.status(200).json({
				message: 'Succefully sent the information',
				status: 200,
				info: info
			});
		})
		.catch(err => {
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

router.post('/info', (req, res, next) => {
	// Validate all fields are sent in body
	let reqFields = ['title', 'info'];
	for (i in reqFields) {
		let currentField = reqFields[i];

		if (!(currentField in req.body)) {
			res.status(406).json({
				message: `Missing field '${currentField}' in body.`,
				status: 406
			});
			next();
		}
	}

	// Create new user to add and push it to db
	let newInfo = {
		title: req.body.title,
		info: req.body.info
	}

	listPython.addInfo(newInfo)
		.then(newInfo => {
			res.status(201).json({
				message: 'Info succesfully creted',
				status: 201,
				info: newInfo
			});
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

// DELETE user by info title
router.delete('/info/:title', (req, res, next) => {

	if (!('title' in req.body)) {
		res.status(406).json({
			message: 'Missing username field',
			status: 406
		});
	}

	let title = req.params.title;
	if (title) {
		if (title == req.body.title) {
			listPython.deleteInfo(title)
				.then(deletedTitle => {
					res.json({
						message: 'Succesfully deleted',
						status: 204,
						info: deletedTitle
					}).status(204)
				})
				.catch(err => {
					res.status(404).json({
						message: 'Title not found',
						status: 404
					});
				})
		} else {
			res.status(400).json({
				message: 'Parameters do not match',
				status: 400
			});
		}
	} else {
		res.status(406).json({
			message: 'Missing id in parameters',
			status: 406
		});
		next();
	}
});

/* -------------------- FILE UPLOAD -------------------- */
// router.post('/uploadFile', function (req, res) {
// 	var form = new formidable.IncomingForm();

// 	form.parse(req);

// 	form.on('fileBegin', function (name, file) {
// 		file.path = __dirname + '/public/img/exercises/' + file.name;
// 	});

// 	form.on('file', function (name, file) {
// 		console.log('Uploaded ' + file.name);
// 	});

// 	// res.sendFile(__dirname + '/index.html');
// });

module.exports = router;