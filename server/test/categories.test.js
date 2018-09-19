const request = require('supertest');
const app = require('../app');
const model = require('../models/index');

let auth = {};
beforeAll(loginUser(auth));

describe('Test the commands path', () => {
    test('It should give unauthorized request 401 to GET method', async () => {
      const response = await request(app).get('/categories')
      expect(response.statusCode).toBe(401);
    });

    test('It should give response to GET method', async () => {
      const response = await request(app).get('/categories').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
    });

    test('It should give response to GET method with id parameter', async () => {
      const response = await request(app).get('/categories/0').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
    });



    test('It should respond with bad request when no body', async () => {
				const response = await request(app).put('/categories/0').set('Authorization', 'bearer ' + auth.token)
				expect(response.statusCode).toBe(400);
    });

    test('It should respond with 404 when no ID', async () => {
				const response = await request(app).put('/categories').set('Authorization', 'bearer ' + auth.token);
				expect(response.statusCode).toBe(404);
    });

    test('It should respond with 200 when well-formed PUT', async () => {
				const response = await request(app).put('/categories/0')
					.set('Authorization', 'bearer ' + auth.token)
					.send({  
            "name": "test_replacement"
          });
        const testItem = await model.Category.findOne({ where: { id: 0 }})
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual(testItem.name);
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
