const request = require('supertest');
const app = require('../app');
const model = require('../models/index');

let auth = {};
beforeAll(loginUser(auth));

describe('Test the commands path', () => {
test('It should give unauthorized request 401 to GET method', async () => {
      const response = await request(app).get('/reviews')
      expect(response.statusCode).toBe(401);
    });

    test('It should give response to GET method', async () => {
      const response = await request(app).get('/reviews').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
		});
		
		test('It should give response to GET method with id parameter', async () => {
      const response = await request(app).get('/reviews/0').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
    });

    test('It should give response to GET method with filters and sorting', async () => {
      const response = await request(app).get(`/reviews?filter=%7B%22status%22%3A%22accepted%22%2C%22date_gte%22%3A%222000-03-02%22%2C%22q%22%3A%22d%22%7D&range=%5B0%2C24%5D&sort=%5B%22date%22%2C%22DESC%22%5D`)
        .set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
    });

    test('It should respond with bad request when no body', async () => {
      const response = await request(app).put('/reviews/0').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(400);
    });

    test('It should respond with 404 when no ID', async () => {
      const response = await request(app).put('/reviews').set('Authorization', 'bearer ' + auth.token);
      expect(response.statusCode).toBe(404);
    });

    test('It should respond with 200 when well-formed PUT', async () => {
			const response = await request(app).put('/reviews/0')
				.set('Authorization', 'bearer ' + auth.token)
				.send({
          "command_id":433,
          "customer_id":52,
          "comment":"Quidem et repudiandae fuga quibusdam quia reiciendis at. Reprehenderit exercitationem ratione tempora impedit saepe aut voluptatem alias. Excepturi occaecati molestias corrupti ratione quo. Dolores nihil quasi aut ex. Facere neque quia enim est aut autem at quaerat. Et deleniti est voluptatem autem.\n \rVoluptates cum officia tenetur. Vel voluptatem similique voluptas voluptatem reiciendis cum ad. Tenetur odit accusantium modi ullam provident consequatur. Dolorum consequatur voluptas quis.",
          "date":"2018-09-19T15:10:52.796Z",
          "product_id":67,
          "rating":4,
          "status":"pending",
        });
      const testItem = await model.Review.findOne({ where: { id: 0 }})
      expect(response.statusCode).toBe(200);
      expect(response.body.image).toEqual(testItem.image);
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
