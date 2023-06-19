const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Other extends Model {}

Other.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "user",
          key: "id",
        },
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'other',
  }
);

module.exports = Other;