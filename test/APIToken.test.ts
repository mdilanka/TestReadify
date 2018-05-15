import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get API/Token', () => {

	it('must return my readify token', () => {
		return chai.request(app).get('/api/Token')
			.then(res => {
				expect(res.body.myToken).to.eql('e4ea52d3-32ee-4947-bca2-4213ce5b09eb');
			});
	});
});