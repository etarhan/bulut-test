const request = require('supertest');
const app = require('../app');

describe('Test the customers path', () => {
    test('It should give response to GET method', () => {
        request(app).get('/customers').then((response) => {
            expect(response.statusCode).toBe(200);
        });
    });
});
