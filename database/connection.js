const mongoose = require("mongoose");

const uri = process.env.DB;
const db = mongoose.connect(uri);

if (db) {
  console.log("Connected to database");
} else {
  console.error("Failed to connect to database");
}

module.exports = db; //require in server.js