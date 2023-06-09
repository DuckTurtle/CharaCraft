const User = require('./user');
const Charaters = require('./charater');
const Charspell = require('./charspells');
const CharWeapon = require('./charweapons');
const Spells = require('./spells');
const Weapon = require('./weapon');


User.hasMany(Charaters, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

  Charaters.belongsTo(User, {
    foreignKey: 'user_id'
  });
  Charaters.belongsToMany(Spells,{
    through: {
      model: Charspell,
      unique: false
    },
  });
  Spells.belongsToMany(Charaters,{
    through: {
      model: Charspell,
      unique: false
    },
  });
  Weapon.belongsToMany(Charaters,{
    through: {
      model: CharWeapon,
      unique: false
    },
  });
  Charaters.belongsToMany(Weapon,{
    through: {
      model: CharWeapon,
      unique: false
    },
  });

module.exports = { 
    User,
    Charaters,
    Weapon,
    Spells,
    CharWeapon,
    Charspell };