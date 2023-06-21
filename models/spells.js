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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    Damage: {
        type: DataTypes.STRING(1245),
        allowNull: false,
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