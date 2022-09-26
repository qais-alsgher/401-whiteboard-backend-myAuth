`use strict`;
const express = require('express');
const router = express.Router();
const { Comment } = require('../models/index');
const bearerAuth = require('../middlewares/bearer-auth');


// Routes 
router.get('/comment', bearerAuth, getComment);
router.post('/comment', bearerAuth, createComment);
router.get('/comment/:id', getOneComment);
router.delete('/comment/:id', bearerAuth, deleteComment);
router.put('/comment/:id', bearerAuth, updatComment);
router.get('/comment/:postId/:userId', getUserComent);

async function getComment(req, res) {
    let comment = await Comment.read();
    res.status(200).json({
        comment
    })
};

async function createComment(req, res) {
    let newComment = req.body;
    const comment = await Comment.create(newComment);
    res.status(201).json(comment);
};

async function getOneComment(req, res) {
    const id = req.params.id;
    const comment = await Comment.read(id);
    res.status(200).json({ comment });
};

async function deleteComment(req, res) {
    const id = req.params.id;
    const commentDeleted = await Comment.delete(id);
    res.status(204).json({
        message: `the deleted comment successful for id : ${id}`
    });

};

async function updatComment(req, res) {
    const id = req.params.id;
    const updateData = req.body;

    const commentUpdate = await Comment.update(id, updateData);
    res.status(200).json(commentUpdate);
}

async function getUserComent(req, res) {

    const { postId, userId } = req.params;
    const comentUser = await Comment.readTow(postId, userId);
    res.status(200).json(comentUser);
}



module.exports = router;