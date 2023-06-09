const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Stats extends Model {}

Stats.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    stat_name: {
      type: DataTypes.STRING,
    },
    stat_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'stats',
  }
);

module.exports = Stats;