`use strict`;
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const User = require('../models').db.user;


const singup = async (req, res) => {

    try {
        const { userName, email, password } = req.body;
        const data = {
            userName,
            email,
            // use the bcrypt to make password secure
            password: await bcrypt.hash(password, 10)
        };

        const user = await User.create(data);

        if (user) {
            res.status(201).json(user);
        }

    } catch (err) {
        console.log(err);
    }

}



const login = async (req, res) => {
    const basicHeader = req.header.authoriztion.split(' ');

    // use the base-64 to return password to normal value
    const decodedValue = base64.decode(basicHeader[1]);
    const [email, password] = decodedValue.split(':');
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (user) {
        const isSam = await bcrypt.compare(password, user.password);
        if (isSam) {
            res.status(200).json(user);
        } else {
            res.status(401).send('Username or Password is wrong Please try again')
        }
    } else {
        res.status(401).send('Username or Password is wrong Please try again')
    }

};

const allUser = async (req, res) => {
    const users = await User.findall();
    res.status(200).json(users);
}

module.exports = {
    singup,
    login,
    allUser
};