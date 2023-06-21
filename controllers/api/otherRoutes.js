const router = require("express").Router();
const { Other } = require("../../models");

router.post("/", async (req, res) => {
    try {
            await Other.sync().then(function() {
            Other.findOrCreate({
                where: {
                    id: req.body.id,
                    name: req.body.wName.trim(),
                    damage: req.body.sDec.trim(),
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
    catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router;