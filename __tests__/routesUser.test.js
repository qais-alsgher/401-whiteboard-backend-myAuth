`use strict`;
const server = require('../server').app;
const supertest = require('supertest');
const request = supertest(server);
jest.setTimeout(15000);

describe('test user router', () => {

    it('test get all user ', async () => {
        const res = await request.get('/users');
        expect(res.status).toEqual(200);
    });

    it('test login', async () => {
        const res = await request.post('/login');
        expect(res.status).toEqual(200);
    })

    it('test singup', async () => {
        const newUser = {
            userName: "abdullah",
            email: "abdullah@gmail",
            password: "23222"

        }
        const res = await request.post('/singup').send(newUser);
        expect(res.status).toEqual(201);
    })

})