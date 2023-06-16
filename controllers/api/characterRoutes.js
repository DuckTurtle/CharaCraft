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