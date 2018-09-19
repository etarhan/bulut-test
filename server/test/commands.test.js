const request = require('supertest');
const app = require('../app');
const model = require('../models/index');

let auth = {};
beforeAll(loginUser(auth));

describe('Test the commands path', () => {
    test('It should give unauthorized request 401 to GET method', async () => {
				const response = await request(app).get('/commands')
				expect(response.statusCode).toBe(401);
    });

    test('It should give response to GET method', async () => {
				const response = await request(app).get('/commands').set('Authorization', 'bearer ' + auth.token)
				expect(response.statusCode).toBe(200);
    });

    test('It should give response to GET method with id parameter', async () => {
      const response = await request(app).get('/commands/0').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
    });

    test('It should respond with bad request when no body', async () => {
				const response = await request(app).put('/commands/0').set('Authorization', 'bearer ' + auth.token)
				expect(response.statusCode).toBe(400);
    });

    test('It should respond with 404 when no ID', async () => {
				const response = await request(app).put('/commands').set('Authorization', 'bearer ' + auth.token);
				expect(response.statusCode).toBe(404);
    });

    test('It should respond with 200 when well-formed PUT', async () => {
				const response = await request(app).put('/commands/' + 1)
					.set('Authorization', 'bearer ' + auth.token)
					.send({  
            "customer_id":903,
            "date":"2018-09-26T00:00:00.000Z",
            "delivery_fees":"3.82",
            "reference":"YPNBUM",
            "returned":false,
            "status":"ordered",
            "tax_rate":"0.17",
            "taxes":"49.41",
            "total":"340.03",
            "total_ex_taxes":"286.79999999999995",
            "created_at":"2018-09-19T15:12:19.089Z",
            "updated_at":"2018-09-19T19:48:53.412Z",
            "basket":[]
          });
        const testItem = await model.Command.findOne({ where: { id: 1 }})
        expect(response.statusCode).toBe(200);
        expect(response.body.customer_id).toEqual(testItem.customer_id);
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
