const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Characters extends Model {}

Characters.init(
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

    user_id: {
      type: DataTypes.INTEGER,
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
    modelName: "character",
  }
);

module.exports = Characters;
