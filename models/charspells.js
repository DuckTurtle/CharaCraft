const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Charspell extends Model { }

Charspell.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    charater_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'charater',
        key: 'id',
        unique: false
      }
    },
    spell_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'spell',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'charspell',
  }
);

module.exports = Charspell;