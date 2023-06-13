const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Spells extends Model {}

Spells.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    spells_name: {
      type: DataTypes.STRING,
    },
    spells_dice: {
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