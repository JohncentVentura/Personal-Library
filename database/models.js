const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    book_title: { type: String, required: true},
    comments: [String],
});
const Book = mongoose.model("Book", BookSchema);

exports.Book = Book;
