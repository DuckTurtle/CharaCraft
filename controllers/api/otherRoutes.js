const router = require("express").Router();
const { Other } = require("../../models");

router.post("/other", async (req, res) => {
    try {
        const loadNewOther = async () =>{
            await Other.sync().then(function() {
            Other.findOrCreate({
                where: {
                    id: req.body.id,
                    name: req.body.name.trim(),
                    damage: req.body.damage.trim(),
                    user_id: req.session.user_id,
                }
            })
            .then(function(result) {
                var other = result[0], 
                  created = result[1]; 
          
                if (!created) { // false if weapon already exists and was not created.
                  console.log('spell already exists');
                }
            })
        })
        }
        const otherData = req.body.map()
            .forEach(loadNewOther);       
    }
    catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router;