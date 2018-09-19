const request = require('supertest');
const app = require('../app');

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

    test('It should respond with bad request when no body', async () => {
				const response = await request(app).put('/customers/1').set('Authorization', 'bearer ' + auth.token)
				expect(response.statusCode).toBe(400);
    });

    test('It should respond with 404 when no ID', async () => {
				const response = await request(app).put('/customers').set('Authorization', 'bearer ' + auth.token);
				expect(response.statusCode).toBe(404);
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
