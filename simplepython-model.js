const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let userSchema = mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	score: { type: Number, required: true },
	progress: { type: Number, required: true },
	usertype: { type: Number, required: true }
});

let exercisesSchema = mongoose.Schema({
	id: { type: String, required: true, unique: true },
	answer: { type: String, required: true }
});

let loginSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true }
});

let infoSchema = mongoose.Schema({
	title: {type: String, required: true, unique: true}, 
	info: {type: String, required: true}
})

let Users = mongoose.model('users', userSchema);
let Exercises = mongoose.model('exercises', exercisesSchema);
let Login = mongoose.model('logs', loginSchema);
let Info = mongoose.model('info', infoSchema);

const listPython = {
	getUserLogIn: function () {
		return Login.findOne()
			.then(user => {
				if (user) {
					return user;
				}
				throw new Error("User not found");
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	createUserLogin: function (user) {
		return Login.create({ username: user })
			.then(user => {
				return user;
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	deleteUserLogin: function (id) {
		return Login.findOneAndRemove({ username: id })
			.then(user => {
				if (user) {
					return user;
				}
				throw new Error("Exercise not found");
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	getAllUsers: function () {
		return Users.find()
			.then(users => {
				return users;
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	getUser: function (user) {
		return Users.findOne({ username: user })
			.then(user => {
				return user;
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	createUser: function (newUser) {
		return Users.create(newUser)
			.then(newUser => {
				return newUser;
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	deleteUser: function (username) {
		return Users.findOneAndRemove({ username: username })
			.then(deletedUser => {
				if (deletedUser) {
					return deletedUser;
				}
				throw new Error("User not found");
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	updateScore: function (username, newScore, newProgress) {
		return Users.findOneAndUpdate({ username: username }, { $set: { score: newScore, progress: newProgress } })
			.then(oldData => {
				return oldData;
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	getAllExercises: function () {
		return Exercises.find().sort({ id: 1 })
			.then(exercises => {
				return exercises;
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	getExerciseCount: function () {
		return Exercises.count()
			.then(count => {
				return count;
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	getExercise: function (exercise) {
		return Exercises.findOne({ id: exercise })
			.then(exercise => {
				return exercise;
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	createExercise: function (newExercise) {
		return Exercises.create(newExercise)
			.then(newExercise => {
				return newExercise;
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	deleteExercise: function (id) {
		return Exercises.findOneAndRemove({ id: id })
			.then(deletedExercise => {
				if (deletedExercise) {
					return deletedExercise;
				}
				throw new Error("Exercise not found");
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	updateExercise: function (id, newAnswer) {
		return Exercises.findOneAndUpdate({ id: id }, { $set: { answer: newAnswer } })
			.then(oldData => {
				if (oldData) {
					return oldData;
				}
				throw new Error("Exercise not found");
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	getAllInfo: function () {
		return Info.find()
			.then(info => {
				return info;
			})
			.catch(err => {
				throw new Error(err);
			})
	},
	addInfo: function (newInfo) {
		return Info.create(newInfo)
		.then(newInfo => {
			return newInfo;
		})
		.catch(err => {
			throw new Error(err);
		})
	},
	deleteInfo: function (title) {
		return Info.findOneAndRemove({ title: title })
			.then(deletedInfo => {
				if (deletedInfo) {
					return deletedInfo;
				}
				throw new Error("Info not found");
			})
			.catch(err => {
				throw new Error(err);
			});
	}
}

module.exports = { listPython }