const request = require('supertest');
const app = require('../app');
const model = require('../models/index');

let auth = {};
beforeAll(loginUser(auth));

describe('Test the commands path', () => {
    test('It should give unauthorized request 401 to GET method', async () => {
      const response = await request(app).get('/products')
      expect(response.statusCode).toBe(401);
    });

    test('It should give response to GET method', async () => {
      const response = await request(app).get('/products').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
		});
		
		test('It should give response to GET method with id parameter', async () => {
      const response = await request(app).get('/products/0').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
    });

    test('It should give response to GET method with filters and sorting', async () => {
      const response = await request(app).get(`/products?filter=%7B%22category_id%22%3A0%2C%22q%22%3A%22an%22%2C%22height_gte%22%3A1%2C%22width_lte%22%3A1000%2C%22width_gte%22%3A1%2C%22height_lte%22%3A1000%7D&range=%5B0%2C19%5D&sort=%5B%22id%22%2C%22ASC%22%5D`)
        .set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(200);
    });

    test('It should respond with bad request when no body', async () => {
      const response = await request(app).put('/products/0').set('Authorization', 'bearer ' + auth.token)
      expect(response.statusCode).toBe(400);
    });

    test('It should respond with 404 when no ID', async () => {
      const response = await request(app).put('/products').set('Authorization', 'bearer ' + auth.token);
      expect(response.statusCode).toBe(404);
    });
    
    test('It should respond with 200 when well-formed POST', async () => {
			const response = await request(app).post('/products')
				.set('Authorization', 'bearer ' + auth.token)
				.send({
          "category_id":0,
          "description":"<p>test description</p>",
          "height":"234",
          "image":"test-url",
          "price":"2",
          "reference":"4543545",
          "stock":12,
          "thumbnail":"test-url",
          "width":"3453",
          "category":{
            "id":0,
            "name":"animals",
          }
        });
      const testItem = await model.Product.findOne({ where: { image: "test-url" }})
      expect(response.statusCode).toBe(200);
      expect(response.body.image).toEqual(testItem.image);
    });
    
    test('It should respond with 200 when well-formed PUT', async () => {
			const response = await request(app).put('/products/0')
				.set('Authorization', 'bearer ' + auth.token)
				.send({
          "category_id": 0,
          "description":"<p>test description</p>",
          "height":"234",
          "image":"test-changed",
          "price":"2",
          "reference":"4543545",
          "stock":12,
          "thumbnail":"test-url",
          "width":"3453"
        });
      const testItem = await model.Product.findOne({ where: { id: 0 }})
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
