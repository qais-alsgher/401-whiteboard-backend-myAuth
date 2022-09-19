`use strict`;

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
    }
});

module.exports = user;
