const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Prebuilts extends Model {}

Prebuilts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campaign_name: {
      type: DataTypes.STRING,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    armor_class: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    initiative: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    dexterity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    constitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    intelligence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    wisdom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    charisma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "prebuilts",
  }
);

module.exports = Prebuilts;
