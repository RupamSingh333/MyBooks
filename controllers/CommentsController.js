const httpStatus = require('http-status-codes')
const responseManagement = require('../lib/responseManagement')
const messages = require('../helpers/message.json')
const Book = require('../models/books')
const Comment = require('../models/comments')
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("../config/confg.json");


module.exports.insertComment = async(req, res) => {

    try {
        let book = await Book.findOne({ _id: req.body.book_id })

        if (book) {

            if (req.header("Authorization")) {
                const token = req.header("Authorization").replace("Bearer ", "");
                const data = jwt.verify(token, config.secretkey);
                const user = await User.findOne({ _id: data._id });  
                req.body["user_name"] = user.first_name+' '+user.last_name;    
                req.body["user_id"] = user.id;
                req.body["book_name"] = book.name;

                // console.log(req.body); return 0;          
                if (user) {
                } else {
                  throw new Error();
                }
              } else {
                throw new Error();
              }
            await Comment.create(req.body)

        } else {
            
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.search_not_found)

        }

        responseManagement.sendResponse(res, httpStatus.OK, messages.insert_comment_success)

    } catch (error) {

        console.log(error)

        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)

    }


}