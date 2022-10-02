
`use strict`;
const { Post } = require('../models');

const acl = async (req, res, next) => {
    const id = req.params.id;

    const postFind = await Post.read(id);
    if (postFind.userName === req.body.userName) {
        next();
    }

    if (!req.user.capabilities.includes('update')) {
        next('You Are Not Authorize!!!');
    }

    next();

};

module.exports = acl;