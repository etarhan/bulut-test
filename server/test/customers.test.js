const request = require('supertest');
const app = require('../app');
const model = require('../models/index');

let auth = {};
beforeAll(loginUser(auth));

describe('Test the customers path', () => {
    test('It should give unauthorized request 401 to GET method', async () => {
				const response = await request(app).get('/customers')
				expect(response.statusCode).toBe(401);
    });

    test('It should give response to GET method', async () => {
				const response = await request(app).get('/customers').set('Authorization', 'bearer ' + auth.token)
				expect(response.statusCode).toBe(200);
		});
		
		test('It should give response to GET method with id parameter', async () => {
      const response = await request(app).get('/customers/0').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
		});
		
		test('It should give response to GET method with filters and sorting', async () => {
      const response = await request(app).get(`/customers?filter=%7B%22has_newsletter%22%3Atrue%2C%22has_ordered%22%3Atrue%2C%22groups%22%3A%22regular%22%2C%22q%22%3A%22ma%22%7D&range=%5B0%2C24%5D&sort=%5B%22last_seen%22%2C%22DESC%22%5D`)
        .set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
    });

    test('It should respond with bad request when no body', async () => {
				const response = await request(app).put('/customers/1').set('Authorization', 'bearer ' + auth.token)
				expect(response.statusCode).toBe(400);
    });

    test('It should respond with 404 when no ID', async () => {
				const response = await request(app).put('/customers').set('Authorization', 'bearer ' + auth.token);
				expect(response.statusCode).toBe(404);
		});

		test('It should respond with 200 when well-formed POST', async () => {
			const response = await request(app).post('/customers')
				.set('Authorization', 'bearer ' + auth.token)
				.send({
						"first_name":"test_first",
						"last_name":"test_last",
						"email":"test@test.com",
						"birthday":"1995-02-01T00:00:00.000Z",
						"address":"Test address",
						"zipcode":"123456",
						"city":"TestCIty",
						"updated_at":"2018-09-19T19:18:26.847Z",
						"created_at":"2018-09-19T19:18:26.847Z",
						"avatar":null,
						"first_seen":null,
						"last_seen":null,
						"latest_purchase":null,
						"has_ordered":null,
						"has_newsletter":null,
						"nb_commands":null,
						"total_spent":null
				});
			expect(response.statusCode).toBe(200);
		});
		
		test('It should respond with 200 well-formed  PUT', async () => {
				const first_name = 'test_first';
				const testItem = await model.Customer.findOne({ where: { first_name }})
				const testBody = {
					"first_name":"changed_name",
					"last_name":"test_last",
					"email":"test@test.com",
					"birthday":"1995-02-01T00:00:00.000Z",
					"address":"Test address",
					"zipcode":"123456",
					"city":"TestCIty",
					"avatar":null,
					"first_seen":null,
					"last_seen":null,
					"latest_purchase":null,
					"has_ordered":null,
					"has_newsletter":null,
					"nb_commands":null,
					"total_spent":null,
					"groups": []
				};
				const response = await request(app).put('/customers/' + testItem.id)
					.set('Authorization', 'bearer ' + auth.token)
					.send(testBody);
				expect(response.statusCode).toBe(200);
				expect(response.body.first_name).toEqual(testBody.first_name);
    });
});

function loginUser(auth) {
    return function(done) {
        request(app)
            .post('/login')
            .send({
                username: 'bulut',
                password: 'bulut'
            })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}
