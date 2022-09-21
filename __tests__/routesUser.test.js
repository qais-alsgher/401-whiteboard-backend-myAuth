`use strict`;
const server = require('../server').app;
const supertest = require('supertest');
const request = supertest(server);
jest.setTimeout(15000);

describe('test user router', () => {

    it('test get all user without token ', async () => {
        const res = await request.get('/users');
        expect(res.status).toEqual(404);
    });

    it('test login without header', async () => {
        const res = await request.post('/login');
        expect(res.status).toEqual(404);
    })

    it('test singup for exist user', async () => {
        const newUser = {
            userName: "abdullah",
            email: "abdullah@gmail",
            password: "23222"

        }
        const res = await request.post('/singup').send(newUser);
        expect(res.status).toEqual(409);
    })

})