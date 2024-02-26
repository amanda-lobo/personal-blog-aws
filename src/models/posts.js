const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const Posts = sequelize.define('Posts', {
    postsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 30]
        }
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 100]
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
});

Posts.associate = models => {
    Posts.belongsTo(models.User, {
        foreignKey: 'userId', as: 'user'
    });

    Posts.belongsTo(models.Theme, {
        foreignKey: 'themeId', as: 'theme'
    });
}

module.exports = Posts;
