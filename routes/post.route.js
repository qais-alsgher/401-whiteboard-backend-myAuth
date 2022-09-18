`use strict`;
const express = require('express');
const router = express.Router();

const { Post, commentModel } = require('../models/index');

// Routes 
router.get('/post', getPost);
router.post('/post', createPost);
router.get('/post/:id', getOnePost);
router.delete('/post/:id', deletePost);
router.put('/post/:id', updatPost);
router.get('/PostComment', getPostComment);

async function getPost(req, res) {
    let post = await Post.read();
    res.status(200).json({
        post
    })
};

async function createPost(req, res) {
    let newpost = req.body;
    const post = await Post.create(newpost);
    res.status(201).json(post);
};

async function getOnePost(req, res) {
    const id = req.params.id;
    const post = await Post.read(id);
    res.status(200).json({ post });
};

async function deletePost(req, res) {
    const id = req.params.id;
    const postDeleted = await Post.delete(id);
    res.status(204).json({
        message: `the deleted post successful for id : ${id}`
    });

};

async function updatPost(req, res) {
    const id = req.params.id;
    const updateData = req.body;
    // first way to put method
    // const post = await Post.findOne({
    //     where: { id: id }
    // });
    // const postUpdate = await post.update(updateData);
    // second way to put method
    const postUpdate = await Post.update(id, updateData);
    res.status(200).json(postUpdate);
}


async function getPostComment(req, res) {

    const PostComment = await Post.readCommitRelatedPost(commentModel);
    res.status(200).json(PostComment);
}

module.exports = router;