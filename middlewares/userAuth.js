`use strict`;
const User = require('../models').db.user;

const saveUser = async (req, res, next) => {


    try {
        const username = await User.findOne({
            where: {
                userName: req.body.userName
            }
        });

        if (username) {

            return res.status(409).send('The Username alrady token');

        } else {

            const email = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (email) {
                return res.status(409).send('The Email alrady token');
            }

            next();
        }
    } catch (err) {
        console.log(err);

    }

}


module.exports = { saveUser };