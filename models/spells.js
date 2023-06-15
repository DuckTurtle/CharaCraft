const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Spells extends Model {}

Spells.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique:true,
    },
    Damage: {
        type: DataTypes.STRING,
        allowNull: true,
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'spell',
  }
);

module.exports = Spells;