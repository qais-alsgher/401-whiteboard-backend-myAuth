`use strict`;
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const Post = require('./post.model');
const Comment = require('./comment.model');
const collection = require('../collections/use-comment-routes');

// const POSTGRES_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';
const POSTGRES_URL = 'postgres://localhost:5432/postgres';

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

// const sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);
const sequelize = new Sequelize(POSTGRES_URL);

sequelize.authenticate().then(() => {
    console.log('Database is conection to postgres');
}).catch((err) => {
    console.log(err);
})


const postModel = Post(sequelize, DataTypes);
const commentModel = Comment(sequelize, DataTypes);
// one to many relation one post have many comment 
// to poenter post to have many commment 
postModel.hasMany(commentModel, { foreignKey: 'postId', sourceKey: 'id' });
// to know the connint that related specific post  
commentModel.belongsTo(postModel, { foreignKey: 'postId', targetKey: 'id' });

db = {};
db.sequelize = sequelize;
db.user = require('./user.model')(sequelize, DataTypes);

// for give user your posts
db.user.hasMany(postModel, { foreignKey: 'userId', sourceKey: 'id' });
postModel.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });

// to give ispesfic comment 
db.user.hasMany(commentModel, { foreignKey: 'userId', sourceKey: 'id' });
commentModel.belongsTo(db.user, { foreignKey: 'userId', sourceKey: 'id' });

const postCollection = new collection(postModel);
const commentCllection = new collection(commentModel);



module.exports = {
    db: db,
    Post: postCollection,
    Comment: commentCllection,
    commentModel: commentModel,
    postModel: postModel
}