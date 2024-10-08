const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

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
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(books), 600);
    });

    promise.then((result) => {
        return res.status(200).json({ books: result });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(books[req.params.isbn]), 600);
    });

    let book = await promise;

    if (book) {
        res.send(JSON.stringify(book)+"\n");
    } else {
        res.send(`No book found for ISBN ${isbn}\n`);
    }
    });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    let author = req.params.author;
    let promise = new Promise ((resolve, reject) => {
        setTimeout(() => {
            let findBook=Object.values(books).find(b => b.author===author);
            resolve(findBook);
        }, 600);
    });

    let findBook = await promise;

    if (findBook) {
        let bookDetails = JSON.stringify(findBook);
        res.send(bookDetails + "\n");
    } else {
        res.send(`No book found for author ${author}`) + "\n";}
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    let title = req.params.title;
    let promise = new Promise ((resolve, reject) => {
        setTimeout(() => {
            let findBook=Object.values(books).find(b => b.title===title);
            resolve(findBook);
        }, 600);
    });

    let findBook = await promise;

    if (findBook) {
        let bookDetails = JSON.stringify(findBook);
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
