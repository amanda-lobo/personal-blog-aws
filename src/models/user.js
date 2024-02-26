const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

User.associate = (models) => {
    User.hasMany(models.Posts, {
        foreignKey: 'userId', as: 'posts'
    });
}

module.exports = User;
