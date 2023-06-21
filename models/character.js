const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Characters extends Model {}

Characters.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
  armor_class: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
  initiative: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
  speed: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
  strength: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
  dexterity: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
  },
  constitution: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
  intelligence: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
  wisdom: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
    },
  charisma: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "10",
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
    modelName: "character",
  }
);

module.exports = Characters;
