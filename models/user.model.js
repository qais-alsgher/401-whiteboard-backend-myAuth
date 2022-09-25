`use strict`;
const jwt = require('jsonwebtoken');

const user = (sequelize, DataTypes) => sequelize.define('user', {
    userName: {
        type: DataTypes.STRING,
        allowNll: false
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNll: false
    },
    token: {
        type: DataTypes.VIRTUAL,
        get: function () {
            return jwt.sign({
                id: this.id,
                userName: this.userName
            }, process.env.JWT_SECRET_KEY)
        }, set(tokenObj) {
            return jwt.sign(tokenObj, process.env.JWT_SECRET_KEY)
        }
    },
    role: {
        type: DataTypes.ENUM('admin', "user"),
        allowNull: false,
        defaultValue: "user"
    },
    capabilities: {
        type: DataTypes.VIRTUAL,
        get: function () {
            const acl = {
                user: ['read', 'create'],
                admin: ['read', 'create', 'update', 'delete']
            }
            return acl[this.role];
        }
    }
});

user.authenticateToke = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
            return err;
        } else {
            return decode
        }
    })

}

module.exports = user;
