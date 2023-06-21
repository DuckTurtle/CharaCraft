const router = require("express").Router();
const { Spells } = require("../../models");

router.post("/", async (req, res) => {
    try {
          const newSpell = await Spells.sync({alter: true}).then(() => {
            console.log(req.body);
            Spells.findOrCreate({
                where: {name: req.body.sName.trim()},
                defaults: {
                    id: req.body.id,
                    name: req.body.sName.trim(),
                    Damage: req.body.sDec.trim(),
                }
            })
            .then((data) => {
                console.log(data)
                console.log(newSpell);
                res.status(200).json(newSpell);
            })
        });
        
        
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get('/them', async (req, res) => {
    // find all products
    // be sure to include its associated Category and Tag data
    try {
      const prodData = await Spells.findAll();
      res.status(200).json(prodData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;