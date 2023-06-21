const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Weapon extends Model {}

Weapon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    damage: {
      type: DataTypes.STRING(1245),
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