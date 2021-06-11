'use strict';

require('dotenv').config();

/* Home doc */
/**
 * @file Enviroment variables configuration for the application
 * @see module:appConfig
 */

/* Module doc */
/**
 * Enviroment variables configuration for the application
 * @module appConfig
 */

const serverPortByDefault = 4000;
const limitOfUsersRegistered = 0;

/**
 * Enviroment variables configuration
 * @type {object}
 */
const enviromentVariablesConfig = Object.freeze({
	MONGO_STRING: process.env.MONGO_STRING || 'mongodb+srv://nest:E23yxfdTLgvGAZlM@nest-m9qni.gcp.mongodb.net/test?retryWrites=true&w=majority',
	enviroment: process.env.ENVIROMENT || 'development',
	port: Number(process.env.PORT) || serverPortByDefault
});

/**
 * Security variables configuration
 * @type {object}
 */
const securityVariablesConfig = Object.freeze({
	secret: process.env.SECRET || 'yoursecret',
	timeExpiration: process.env.DURATION || '8h'
});

/**
 * Global variables configuration
 * @type {object}
 */
const globalVariablesConfig = Object.freeze({
	limitOfUsersRegistered: Number(process.env.LIMIT_USERS_REGISTERED) || limitOfUsersRegistered
});

/** Variables configuration */
module.exports = { enviromentVariablesConfig, securityVariablesConfig, globalVariablesConfig };
