const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class CharOther extends Model { }

CharOther.init(
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
    other_id: {
      type: DataTypes.UUID,
      references: {
        model: 'other',
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
    modelName: 'charother',
  }
);

module.exports = CharOther;