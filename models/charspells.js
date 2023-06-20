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
    character_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'character',
        key: 'id',
        unique: false
      }
    },
    spell_name: {
      type: DataTypes.INTEGER,
      references: {
        model: 'spell',
        key: 'name',
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