`use strict`;
const user = require('../models/user.model');
const users = require('../models').db.user;

const bearerAuth = async (req, res, next) => {
    if (!req.headers.authorization)
        next("you are not authorized");

    const token = req.headers.authorization.split(' ').pop();

    try {
        const validUser = user.authenticateToke(token);

        const userInfoExist = await users.findOne({ where: { userName: validUser.userName } });
        if (userInfoExist) {
            req.user = userInfoExist;
            req.token = userInfoExist.token;
            // console.log(userInfoExist);
            next();
        } else {

            next("you are not authorized");
        }

    } catch (e) {
        next(e.message || e);
    }
}


module.exports = bearerAuth;