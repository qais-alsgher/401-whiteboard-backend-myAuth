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
