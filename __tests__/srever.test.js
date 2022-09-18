`use strict`;
const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('test server', () => {
    it('test server life for home page', async () => {
        const res = await request.get('/');
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('{"message":"hello word"}');
    });
});