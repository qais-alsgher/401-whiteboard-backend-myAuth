`use strict`;

const router = require('express').Router();
const { singup, login, allUser } = require('../controllers/userControllers');
const userAuth = require('../middlewares/userAuth');
const bearerAuth = require('../middlewares/bearer-auth');

router.post('/singup', (userAuth.saveUser), singup);
router.get('/login', login);
router.post('/users', bearerAuth, allUser);

module.exports = router;