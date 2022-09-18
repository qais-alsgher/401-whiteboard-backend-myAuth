`use strict`;
const Comment = (sequelize, DataTypes) => sequelize.define('comment', {
    commentAuther: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commentContent: {
        type: DataTypes.STRING,
        defaultValue: " ",
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, autherCommentImage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png"
    }


});

module.exports = Comment;