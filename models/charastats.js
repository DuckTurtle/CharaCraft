const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class CharStats extends Model { }

CharStats.init(
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
    stat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'stats',
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
    modelName: 'charstats',
  }
);

module.exports = CharStats;