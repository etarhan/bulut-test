const request = require('supertest');
const app = require('../app');

describe('Test the login path', () => {
      test('It should respond with success with valid credentials', async () => {
				const response = await request(app).post('/login').send({
                username: 'bulut',
                password: 'bulut'
              });
				expect(response.statusCode).toBe(200);
    });
    test('It should respond with 401 for an invalid password', async () => {
				const response = await request(app).post('/login').send({
                username: 'bulut',
                password: 'wrongpassword'
              });
				expect(response.statusCode).toBe(401);
    });

    test('It should respond with 401 for an invalid username', async () => {
				const response = await request(app).post('/login').send({
                username: 'wronguser',
                password: 'bulut'
              });
				expect(response.statusCode).toBe(401);
    });

    test('It should respond with 401 for an invalid username', async () => {
				const response = await request(app).post('/login').send({
                username: 'wronguser',
                password: 'bulut'
              });
				expect(response.statusCode).toBe(401);
    });

    test('It should respond with 401 for invalid credentials', async () => {
				const response = await request(app).post('/login').send({
                username: 'wronguser',
                password: 'bulut'
              });
				expect(response.statusCode).toBe(401);
    });
});
