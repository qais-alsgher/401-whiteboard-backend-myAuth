
`use strict`;
const { Post } = require('../models');

const acl = async (req, res, next) => {
    const id = req.params.id;
    const userName = req.user.userName
    const postFind = await Post.read(id);

    if (postFind.postAouthr === userName) {
        next();
    }


    if (!req.user.capabilities.includes('update')) {
        next('You Are Not Authorize!!!');
    }

    next();

};

module.exports = acl;