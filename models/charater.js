const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Charaters extends Model {}

Charaters.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      charater_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      campain_name: {
        type: DataTypes.STRING,
      },
      carater_stats:{
        class: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
          },
          Race: {
            type: DataTypes.STRING,
            allowNull: false,
          }
      },
      stats: {
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
        proficiency_bonus: {
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
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'charater',
    }
  );
  
  module.exports = Charaters;