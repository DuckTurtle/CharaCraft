const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Weapon extends Model {}

Weapon.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique:true,
    },
    damage: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'weapon',
  }
);

module.exports = Weapon;