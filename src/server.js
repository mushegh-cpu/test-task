'use strict';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { enviromentVariablesConfig } = require('./config/appConfig');
const { logger, endLogger } = require('./utils/logger');
const { requestDevLogger } = require('./utils/requestDevLogger');

mongoose.connect(enviromentVariablesConfig.MONGO_STRING);

const db = mongoose.connection;
db.on('error', (err) => {
	logger.error(`Connection error with database. ${err}`);
});

db.once('open', () => {
	if (enviromentVariablesConfig.enviroment !== 'development') {
		logger.info('Connected with MongoDB service (production mode)');
	} else {
		logger.info('Connected with MongoDB service development');
	}

	initApplication();
});

const initApplication = () => {
	const express = require('express');
	const favicon = require('serve-favicon');
	const path = require('path');
	const cors = require('cors');
	const { ApolloServer } = require('apollo-server-express');
	const { setContext } = require('./gql/auth/context');
	const typeDefs = require('./gql/schemas/index');
	const resolvers = require('./gql/resolvers/index');

	const { getListOfIPV4Address } = require('./utils/utils');
	const routesManager = require('./routes/routesManager');

	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.text({ type: 'application/graphql' }));
	app.use(cors({ credentials: true }));
	app.use('', routesManager);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: setContext,
		introspection: (enviromentVariablesConfig.enviroment === 'production') ? false : true, // Set to "true" only in development mode
		playground: (enviromentVariablesConfig.enviroment === 'production') ? false : true, // Set to "true" only in development mode
		plugins: (enviromentVariablesConfig.enviroment === 'production') ? [] : [requestDevLogger], // Log all querys and their responses (do not use in production)
	});

	server.applyMiddleware({app});

	app.use((req, res) => {
		res.status(404).send('404'); // eslint-disable-line no-magic-numbers
	});

	app.listen(enviromentVariablesConfig.port, () => {
		getListOfIPV4Address().forEach(ip => {
			logger.info(`Application running on: http://${ip}:${enviromentVariablesConfig.port}`);
			if (enviromentVariablesConfig.enviroment !== 'production') {
				logger.info(`GraphQL Playground running on: http://${ip}:${enviromentVariablesConfig.port}${server.graphqlPath}`);
			}
		});
	});

	// Managing application shutdown
	process.on('SIGINT', () => {
		logger.info('Stopping application...');
		endLogger();
		process.exit();
	});
};
