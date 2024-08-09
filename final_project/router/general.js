const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(JSON.stringify(books[isbn])+"\n");
  } else {
    res.send(`No book found for ISBN ${isbn}\n`);
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let booksByAuthor = {};

  Object.keys(books).forEach((k) => {
    if (books[k].author === req.params.author) {
        booksByAuthor[k] = books[k];
    }
  });

  if (booksByAuthor) {
    res.send(JSON.stringify(booksByAuthor)+"\n");
  } else {
    res.send(`No book found for author ${author}\n`);
  }
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let booksByTitle = {};

  Object.keys(books).forEach((k) => {
    if (books[k].title === req.params.title) {
        booksByTitle[k] = books[k];
    }
  });

  res.send(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
