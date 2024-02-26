const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const Theme = sequelize.define('Theme', {
    themeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100]
        }
    },
});

Theme.associate = (models) => {
    Theme.hasMany(models.Posts, {
        foreignKey: 'themeId', as: 'posts'
    });
}
module.exports = Theme;
