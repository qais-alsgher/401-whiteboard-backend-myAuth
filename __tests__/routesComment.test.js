const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);
jest.setTimeout(10000);


describe('test router get method', () => {
    it('test get all', async () => {
        const res = await request.get('/comment');
        expect(res.status).toEqual(200);
    });

    it('test get one', async () => {
        const res = await request.get('/comment/1');
        expect(res.status).toEqual(200);
    });

});

describe('test router comment method', () => {
    it('test comment to create comment', async () => {
        const newcomment = {
            commentAouthr: 'abdullah',
            commentTitle: "hi",
            commentContent: 'yes'
        };
        const res = await request.post('/comment').send(newcomment);
        expect(res.status).toEqual(201);
    })
});

describe('test router put method', () => {
    it('test put to update comment', async () => {
        const updatecomment = {
            commentContent: 'Hi'
        };
        const res = await request.put('/comment/1').send(updatecomment);
        expect(res.status).toEqual(200);
    })
});

describe('test router delet method', () => {
    it('test delete to delete comment', async () => {
        const res = await request.delete('/comment/12');
        expect(res.status).toEqual(204);
        expect(res.text).toEqual("");
    })
})