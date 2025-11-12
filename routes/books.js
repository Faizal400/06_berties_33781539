// ---------------------------------------
// Handles book-related routes for Bertie’s Books
// ---------------------------------------

const express = require("express");
const router = express.Router();

//Route: Search page
router.get("/search", (req, res) => {
  res.render("search.ejs", { shopData: req.app.locals.shopData });
});

//Route: Handle search query
router.get("/search_result", (req, res, next) => {
  const keyword = req.query.search_text;
  if (!keyword || keyword.trim() === "") {
    return res.send("<h2>Please enter a valid search term.</h2>");
  }

  const sqlquery = "SELECT * FROM books WHERE name LIKE ?";
  db.query(sqlquery, [`%${keyword}%`], (err, result) => {
    if (err) return next(err);
    res.render("list.ejs", {
      shopData: req.app.locals.shopData,
      availableBooks: result,
      message: `Search results for "${keyword}"`,
    });
  });
});

//Route: Display all books
router.get("/list", (req, res, next) => {
  const sqlquery = "SELECT * FROM books ORDER BY name ASC";
  db.query(sqlquery, (err, result) => {
    if (err) return next(err);
    res.render("list.ejs", {
      shopData: req.app.locals.shopData,
      availableBooks: result,
      message: "All Available Books",
    });
  });
});

//Route: Display Add Book form
router.get("/addbook", (req, res) => {
  res.render("addbook.ejs", { shopData: req.app.locals.shopData });
});

//Route: Add a new book (POST)
router.post("/bookadded", (req, res, next) => {
  const { name, price } = req.body;

  //Basic validation
  if (!name || !price || isNaN(price)) {
    return res.send("<h3>Please enter a valid book name and price.</h3>");
  }

  const sqlquery = "INSERT INTO books (name, price) VALUES (?, ?)";
  db.query(sqlquery, [name.trim(), parseFloat(price)], (err) => {
    if (err) return next(err);
    res.send(
      `<h2>Book successfully added!</h2><p>Name: ${name}</p><p>Price: £${price}</p><a href="/books/list">View all books</a>`
    );
  });
});

//Error Handling Middleware
router.use((err, req, res, next) => {
  console.error("Database error:", err.message);
  res.status(500).send("<h2>Something went wrong! Please try again later.</h2>");
});

module.exports = router;
