/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const BookModel = require("../database/models.js").Book;

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      try {
        let books = [];
        let bookModel = await BookModel.find({});
        for (let book of bookModel) {
          books.push({
            _id: book._id,
            title: book.book_title,
            commentcount: book.comments.length,
          });
        }
        res.json(books);
      } catch (err) {
        res.json({ error: "could not retrieve books" });
      }
    })

    .post(async (req, res) => {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      if (!title) {
        res.json("missing required field title");
        return;
      }

      try {
        let bookModel = new BookModel({
          book_title: title,
          comments: [],
        });

        bookModel = await bookModel.save();
        res.json({ _id: bookModel._id, title: bookModel.book_title });
      } catch (err) {
        res.json({ error: "could not create new book" });
      }
    })

    .delete(async (req, res) => {
      //if successful response will be 'complete delete successful'

      try {
        let bookModel = await BookModel.deleteMany({});
        res.json("complete delete successful");
      } catch (err) {
        res.json({ error: "could not delete all books" });
      }
    });

  app
    .route("/api/books/:id")
    .get(async (req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      if (!bookid) {
        res.json("no bookid exists");
        return;
      }

      try {
        let bookModel = await BookModel.findById(bookid);

        if (!bookModel) {
          res.json("no book exists");
          return;
        }

        res.json({
          _id: bookModel._id,
          title: bookModel.book_title,
          comments: bookModel.comments,
        });
      } catch (err) {
        res.json({ error: "could not retrieve book" });
      }
    })

    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if(!bookid){
        res.json("missing required field title")
        return;
      }

      if(!comment){
        res.json("missing required field comment");
        return;
      }

      try {
        let bookModel = await BookModel.findById(bookid);

        if (!bookModel) {
          res.json("no book exists");
          return;
        }

        bookModel.comments.push(comment);
        bookModel = await bookModel.save();

        res.json({
          _id: bookModel._id,
          title: bookModel.book_title,
          comments: bookModel.comments,
        });
      } catch (err) {
        res.json({ error: "could not create new book" });
      }
    })

    .delete(async (req, res) => {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'

      if(!bookid){
        res.json("no book exist");
        return;
      }

      try {
        let bookModel = await BookModel.findById(bookid);

        if (!bookModel) {
          res.json("no book exists");
          return;
        }

        bookModel = await BookModel.findByIdAndDelete(bookid);
        res.json("delete successful");
      } catch (err) {
        res.json({ error: "could not delete book" });
      }
    });
};
