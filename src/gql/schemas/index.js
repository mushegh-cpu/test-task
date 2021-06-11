'use strict';

const { importSchema } = require('graphql-import');

const typeDefs = importSchema('src/gql/schemas/schema.graphql');

module.exports = typeDefs;
