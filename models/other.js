const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Other extends Model {}

Other.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    other_name: {
      type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'other',
  }
);

module.exports = Other;