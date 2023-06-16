const router = require("express").Router();
const { Prebuilts } = require("../models");

router.get("/", async (req, res) => {
  try {
    const prebuiltData = await Prebuilts.findAll();

    const prebuilts = prebuiltData.map((prebuilt) =>
      prebuilt.get({ plain: true })
    );

    res.render("landing", {
      prebuilts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
