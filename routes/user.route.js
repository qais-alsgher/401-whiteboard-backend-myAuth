`use strict`;

const router = require('express').Router();
const { singup, login, allUser } = require('../controllers/userControllers');
const userAuth = require('../middlewares/userAuth');

router.put('/singup', userAuth.saveUser, singup);
router.get('/login', login);
router.get('/users', allUser);

module.exports = router;