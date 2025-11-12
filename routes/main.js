//---------------------------------------
// Main site pages: home, about
// ---------------------------------------

//Create a new router
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.ejs", { shopData: req.app.locals.shopData });
});

router.get("/about", (req, res) => {
  res.render("about.ejs", { shopData: req.app.locals.shopData });
});

module.exports = router;
