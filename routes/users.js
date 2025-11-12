// ---------------------------------------
// Handles user registration and validation
// ---------------------------------------

//Create a new router
const express = require("express");
const router = express.Router();

// Render registration form
router.get("/register", (req, res) => {
  res.render("register.ejs", { shopData: req.app.locals.shopData });
});

// Handle registration
router.post("/registered", (req, res) => {
  const { first, last, email } = req.body;

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!first || !last || !emailRegex.test(email)) {
    return res.send(
      "<h3>Invalid input. Please provide a valid name and email address.</h3>"
    );
  }

  res.send(
    `<h2>Registration successful!</h2>
    <p>Hello ${first} ${last}, you are now registered.</p>
    <p>We’ll contact you at <strong>${email}</strong>.</p>
    <a href="/">Return to home</a>`
  );
});

module.exports = router;
