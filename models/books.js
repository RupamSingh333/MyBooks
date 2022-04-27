const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

    "_id": { type: String, text: true },
    "name": { type: String, text: true },
    "lang": { type: String },
    "author": { type: String },
    "price": { type: Number },
    "available": { type: Boolean },
    "date":{type:Date,default: Date.now},
    "book_image":{type:String}

})

module.exports = mongoose.model('book', bookSchema)