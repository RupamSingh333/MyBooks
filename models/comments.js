const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({

    "user_id": { type: String },
    "comment": { type: String },
    "book_id": { type: String },
    "user_name": { type: String },
    "book_name": { type: String },
    "date":{type:Date,default: Date.now}


})

module.exports = mongoose.model('comments', commentsSchema)