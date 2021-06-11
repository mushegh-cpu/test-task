const fs = require('fs');
const path = require('path');
const EasyGraphQLTester = require('easygraphql-tester');
const {describe, it, before} = require('mocha');
const schema = fs.readFileSync(path.join(__dirname, '../', 'src/gql/schemas/schema.graphql'), 'utf8');

describe('GraphQL', () => {
	let tester;
	before(() => {
		tester = new EasyGraphQLTester([schema]);
	});

	it('Register User pass', (done) => {
		const mutation = `mutation registerUser($email: String!, $password: String!) {
   			registerUser(email: $email, password:$password){
    			token
    			}
    		}`;
		tester.test(true, mutation, {
			email: 'a@a.com',
			password: '1231Aas^%d#23'
		}, );
		done();
	});

	it('Register User failed', (done) => {
		const mutation = `mutation registerUser($email: String!, $password: String!) {
   			registerUser(email: $email, password:$password){
    			token
    			}
    		}`;
		tester.test(false, mutation, {
			email: 'a@a.com',
			password: '123456'
		}, );
		done();
	});

	it('User login pass', (done) => {
		const mutation = `mutation authUser($email: String!, $password: String!) {
   			authUser(email: $email, password:$password){
    			token
    			}
    		}`;
		tester.test(true, mutation, {
			email: 'a@a.com',
			password: '1231Aas^%d#23'
		}, );
		done();
	});

	it('User login failed', (done) => {
		const mutation = `mutation authUser($email: String!, $password: String!) {
   			authUser(email: $email, password:$password){
    			token
    			}
    		}`;
		tester.test(false, mutation, {
			email: 'a@a.com',
			password: '123456'
		}, );
		done();
	});
});
