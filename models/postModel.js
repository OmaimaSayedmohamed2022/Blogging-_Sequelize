// models/Post.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cover_image: {
        type: DataTypes.STRING,
        allowNull: true

    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    unpublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    summary: {
        type: DataTypes.TEXT
    },
    draft: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
   authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categories: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: true 
    }
   
}, {
    tableName: 'posts',
    timestamps: false,
});

Post.associate = models => {
    Post.belongsTo(models.User, { as: 'author' });
};

module.exports = Post;
