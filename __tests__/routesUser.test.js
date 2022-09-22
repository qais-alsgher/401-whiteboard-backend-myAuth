`use strict`;
const server = require('../server').app;
const supertest = require('supertest');
const request = supertest(server);


xdescribe('test user router', () => {

    xit('test get all user without token ', async () => {
        const res = await request.get('/users');
        expect(res.status).toEqual(404);
    });

    xit('test login without header', async () => {
        const res = await request.post('/login');
        expect(res.status).toEqual(404);
    })

    xit('test singup for exist user', async () => {
        const newUser = {
            userName: "abdullah",
            email: "abdullah@gmail",
            password: "23222"

        }
        const res = await request.post('/singup').send(newUser);
        expect(res.status).toEqual(409);
    })

})