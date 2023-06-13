const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class CharWeapons extends Model { }

CharWeapons.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    character_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'character',
        key: 'id',
        unique: false
      }
    },
    weapon_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'weapon',
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
    modelName: 'charweapon',
  }
);

module.exports = CharWeapons;