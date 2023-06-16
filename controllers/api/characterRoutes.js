const router = require('express').Router();
const { User,
    Characters,
    Weapon,
    Spells,
    CharWeapon,
    Charspell,
    CharOther,
    Other } = require('../../models');
    const checkAuth = require('../../utils/auth');

    router.get('/userPortal', checkAuth, async (req, res) => {
        try {
          // Get all projects and JOIN with user data
          const characterData = await Characters.findAll({
            where: {
                user_id:req.session.user_id 
            }
          });
      
          // Serialize data so the template can read it
          const character = characterData.map((char) => char.get({ plain: true }));
      
          // Pass serialized data and session flag into template
          res.render('characterSheet', { 
            character, 
            logged_in: req.session.logged_in 
          });
        } catch (err) {
          res.status(500).json(err);
        }
      });

router.get('/character', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const characterData = await Characters.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model:Spells,
            through: Charspell,
          },
          {
            model: Other,
            through: CharOther,
          },
          {
            model: Weapon,
            through: CharWeapon,
          }
        ],
      });
  
      // Serialize data so the template can read it
      const character = characterData.map((char) => char.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('characterSheet', { 
        character, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.POST('/character', checkAuth, async (req, res, next) => {
    try {
      const oldChar = await Characters.findByPk(req.body.id);
      if(oldChar){
        Characters.destroy({
          where: {
            id:req.params.id,
            user_id: req.session.user_id,
          }
        });
      } else {
        next();
      }
      const newProject = await Characters.create({
        where: {
          id:req.body.id,
          name: req.body.name,
          campaign_name:req.body.campaign_name,
          class:req.body.class,
          level:req.body.level,
          race:req.body.race,
          hp:req.body.hp,
          armor_class:req.body.armor_class,
          initiative:req.body.initiative,
          speed:req.body.speed,
          strength:req.body.strength,
          dexterity:req.body.dexterity,
          constitution:req.body.constitution,
          intelligence:req.body.intelligence,
          wisdom:req.body.wisdom,
          charisma:req.body.charisma,
          spells_name: [],
          weapon_name: [],
          otherIds: [],
        user_id: req.session.user_id,
        }
      });
  
      res.status(200).json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  module.exports = router;