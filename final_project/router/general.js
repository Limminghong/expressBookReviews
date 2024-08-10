const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
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
    let author = req.params.author;
    let booksList=Object.values(books)
    let book = booksList.find(b => b.author===author);

    if (book) {
        let bookDetails = JSON.stringify(book);
        res.send(bookDetails + "\n");
    } else {
        res.send(`No book found for author ${author}`) + "\n";}
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let booksList=Object.values(books)
    let book = booksList.find(b => b.title===title);

    if (book) {
        let bookDetails = JSON.stringify(book);
        res.send(bookDetails + "\n");
    } else {
        res.send(`No book found for title ${title}`) + "\n";}
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.send(JSON.stringify(books[isbn].reviews)+"\n");
    } else {
        res.send(`No book review found for ISBN ${isbn}\n`);
    }
});

module.exports.general = public_users;
