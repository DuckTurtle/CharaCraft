const router = require("express").Router();
const {
  Characters,
  CharWeapon,
  Charspell,
  CharOther,
} = require("../../models");
//updates older character data
router.post("/updatecharacter", async (req, res) => {
  try {
    console.log(req.body);
    //updated the information
    const newchare = await Characters.create({
        id: req.body.charID,
        name: req.body.cname,
        campaign_name: req.body.campaignName,
        class: req.body.cclass,
        level: req.body.cLevel,
        race: req.body.crace,
        hp: req.body.hb,
        armor_class: req.body.armorClass,
        initiative: req.body.cinitiative,
        speed: req.body.cspeed,
        strength: req.body.cstrength,
        dexterity: req.body.cdexterity,
        constitution: req.body.cconstitution,
        intelligence: req.body.cintelligence,
        wisdom: req.body.cwisdom,
        charisma: req.body.ccharisma,
        spellNames: req.body.currentSpells,
        weaponName: req.body.currentWeapons,
        otherId: req.body.currentOther,
        user_id: req.session.user_id,
      
    }).then(character => {
      //links spells to charater
      if (req.body.currentSpells.length) {
        const charSpellIdArr = req.body.currentSpells.map((spell_id) => {
          return {
            character_id: character.id,
            spell_id,
          };
        });
         Charspell.bulkCreate(charSpellIdArr);
      }
      //links weapons to charater
      if (req.body.currentWeapons.length) {
        const charWeaponIdArr = req.body.currentWeapons.map((weapon_id) => {
          return {
            character_id: character.id,
            weapon_id,
          };
        });
         CharWeapon.bulkCreate(charWeaponIdArr);
      }
      // links other to character
      if (req.body.currentOther.length) {
        const charOtherIdArr = req.body.currentOther.map((other_id) => {
          return {
            character_id: character.id,
            other_id,
          };
        });
         CharOther.bulkCreate(charOtherIdArr);
      }
    })
    .then((charOtherIdArr) => res.status(200).json(charOtherIdArr))
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//adds new charater to db
router.post("/newcharacter", async (req, res) => {
  try {
    console.log(req.body);
    const newCharacterData = await Characters.create({
      id: req.body.cid,
      name: req.body.cname,
      campaign_name: req.body.campaignName,
      class: req.body.cclass,
      level: req.body.cLevel,
      race: req.body.crace,
      hp: req.body.chp,
      armor_class: req.body.armorClass,
      initiative: req.body.cinitiative,
      speed: req.body.cspeed,
      strength: req.body.cstrength,
      dexterity: req.body.cdexterity,
      constitution: req.body.cconstitution,
      intelligence: req.body.cintelligence,
      wisdom: req.body.cwisdom,
      charisma: req.body.ccharisma,
      spellNames: req.body.currentSpells,
      weaponName: req.body.currentWeapons,
      otherId: req.body.currentOther,
      user_id: req.session.user_id,
    }).then(character => {
    //links spells to charater
    if (req.body.currentSpells.length) {
      const charSpellIdArr = req.body.currentSpells.map((spell_id) => {
        return {
          character_id: character.id,
          spell_id,
        };
      });
       Charspell.bulkCreate(charSpellIdArr);
    }
  
  
    //links weapons to charater
    if (req.body.currentWeapons.length) {
      const charWeaponIdArr = req.body.currentWeapons.map((weapon_id) => {
        return {
          character_id: character.id,
          weapon_id,
        };
      });
       CharWeapon.bulkCreate(charWeaponIdArr);
    }
    // links other to character
    if (req.body.currentOther.length) {
      console.log(req.body.currentOther)
      const charOtherIdArr = req.body.currentOther.map((other_id) => {
        return {
          character_id: character.id,
          other_id,
        };
      });
       CharOther.bulkCreate(charOtherIdArr);
    }
    
  })
  .then((charOtherIdArr) => res.status(200).json(charOtherIdArr))
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.delete('/delChar/:id', async (req, res) => {
  console.log({id: req.params.id,
    user_id: req.session.user_id,})
  try {
    const goneData = await Characters.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })
    .then((TheGone) => {
      if (!TheGone) {
        res.status(404).json({ message: 'No character found with this id!' });
        return;
      }
  
      res.status(200).json(TheGone);
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
