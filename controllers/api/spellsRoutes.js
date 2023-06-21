const router = require("express").Router();
const { Spells } = require("../../models");

router.post("/", async (req, res) => {
    try {
            await Spells.sync().then(function() {
            Spells.findOrCreate({
                where: {
                    name: req.body.wName.trim(),
                    damage: req.body.sDec.trim(),
                }
            })
            .then(function(result) {
                var spell = result[0], 
                  created = result[1]; 
                console.log(req.body);
                if (!created) { // false if weapon already exists and was not created.
                  console.log('spell already exists');
                }
            })
        })
        

    }
    catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router;