`use strict`;
const Post = (sequelize, DataTypes) => sequelize.define('Post', {
    postAouthr: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postContent: {
        type: DataTypes.STRING,
        allowNull: false
    }, postImge: {
        type: DataTypes.STRING,
        allowNull: true
    }, aouthrImage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png"
    }


});

module.exports = Post;