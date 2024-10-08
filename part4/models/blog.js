const mongoose = require("mongoose");

const mongoUrl = 'mongodb+srv://nicobrandoni98:123qwe@part4ejer.tbgiu.mongodb.net/?retryWrites=true&w=majority&appName=Part4Ejer'
console.log("Connecting to", mongoUrl);


mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  mongoose.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
  
  module.exports = mongoose.model("Blog", blogSchema);