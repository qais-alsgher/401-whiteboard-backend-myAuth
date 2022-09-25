`use strict`;

const router = require('express').Router();
const { singup, login, allUser } = require('../controllers/userControllers');
const userAuth = require('../middlewares/userAuth');
const bearerAuth = require('../middlewares/bearer-auth');
const { postModel, db } = require('../models');


router.post('/singup', (userAuth.saveUser), singup);
router.post('/login', login);
router.get('/users', bearerAuth, allUser);
router.get('/userPostComent', getUserPostComment);


async function getUserPostComment(req, res) {
    const userPC = await db.user.findAll({ include: [postModel] });
    res.status(200).json(userPC);
}

module.exports = router;