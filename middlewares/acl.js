`use strict`;
const { Post } = require('../models/index');

const acl = async (req, res, next) => {
    const id = req.params.id;

    const postFind = await Post.read(id);
    try {

        if (postFind.dataValues.postAouthr === req.user.userName) {
            next();
        } else if (!req.user.capabilities.includes('update')) {

            next('You Are Not Authorize!!!');
        } else {
            next();
        }

    } catch (err) {
        console.log(err.message);
        next(err.message);
    }


};

module.exports = acl;