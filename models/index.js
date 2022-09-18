`use strict`;
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const Post = require('./post.model');
const Comment = require('./comment.model');
const collection = require('../collections/use-comment-routes');
const POSTGRES_URL = process.env.DATABASE_URL;

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

const sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

const postModel = Post(sequelize, DataTypes);
const commentModel = Comment(sequelize, DataTypes);
// one to many relation one post have many comment 
// to poenter post to have many commment 
postModel.hasMany(commentModel, { foreignKey: 'postId', sourceKey: 'id' });
// to know the connint that related specific post  
commentModel.belongsTo(postModel, { foreignKey: 'postId', targetKey: 'id' });

const postCollection = new collection(postModel);
const commentCllection = new collection(commentModel);


module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCllection,
    commentModel: commentModel
}