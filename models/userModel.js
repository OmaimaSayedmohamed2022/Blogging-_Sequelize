const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles: {
        type: DataTypes.ENUM('user', 'author'),
        allowNull: false
    },
    tokens:{
        type: DataTypes.STRING, 
        allowNull: true,
        defaultValue: [], 
    }
}, {
    tableName: 'users',
    timestamps: false,
});

User.associate = models => {
    User.hasMany(models.Post, { as: 'posts' });
};



module.exports = User;
