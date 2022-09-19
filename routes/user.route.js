`use strict`;

const router = require('express').Router();
const { singup, login, allUser } = require('../controllers/userControllers');
const userAuth = require('../middlewares/userAuth');

router.post('/singup', (userAuth.saveUser), singup);
router.post('/login', login);
router.get('/users', allUser);

module.exports = router;