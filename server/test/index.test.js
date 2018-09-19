const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
    test('It should get JSON response from the GET method', () => {
        return request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toMatch((/application\/json/i));
            expect(response.body).toMatch(/react admin demo/i)
        })
    });
});