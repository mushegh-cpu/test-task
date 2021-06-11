'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/**
 * Users schema
 * @constructor Users model constructor
 * @classdesc User have interesting properties. Some of them are isAdmin (false by default), isActive (true by default. Useful for removing login permission to the registered users), uuid (random and unique token. Created to provided a random identifier token for every user different than _id native MongoDB value)
 */
const UsersSchema = new Schema({
	uuid: {
		type: String,
		required: true,
		unique: true,
		default: uuidv4
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true
	},

	registrationDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	lastLogin: {
		type: Date,
		required: true,
		default: Date.now
	}
});

/**
 * Hash the password of user before save on database
 */
UsersSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.genSalt((err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			this.password = hash;
			next();
		});
	});
});

module.exports = UsersSchema;
