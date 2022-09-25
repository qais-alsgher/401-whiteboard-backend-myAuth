
`use strict`;

const acl = (req, res, next) => {
    if (!req.user.capabilities.includes('update')) {
        next('You Are Not Authorize!!!');
    }

    next();

};

module.exports = acl;