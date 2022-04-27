const httpStatus = require('http-status-codes');
const responseManagement = require('../lib/responseManagement');
const messages = require('../helpers/message.json');
const Book = require('../models/books');
const comments = require('../models/comments');

module.exports.insertBook = async (req, res) => {
   const  imagename = req.file.destination+`/`+req.file.filename;
//    console.log(bookcreate);
// if(req.file){

// }else{
    
//     res.send(req.file);
// }
   
   try {

    // Generate id 
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

        let book = await Book.findOne({ name: req.body.name })

        // return 0
        
        if (book) {
            
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.already_exsists)
            
        } else {
            const data = {     
                "_id": makeid(20),     
                "name":req.body.name,
                "lang":req.body.lang, 
                "author":req.body.author,
                "price":req.body.price,
                "available":req.body.available,
                "book_image":imagename
            }
            
            const bookcreate = await Book.create(data)
        }
        responseManagement.sendResponse(res, httpStatus.OK, messages.insert_success_book)

    } catch (error) {
        console.log(error)        
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)
    }


}

module.exports.removeBook = async (req, res) => {

    try {
        let book = await Book.findOne(req.query)
        if (!book) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.delete_fail)
        } else {
            await Book.deleteOne(req.query)
        }
        responseManagement.sendResponse(res, httpStatus.OK, messages.delete_success)

    } catch (error) {

        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)
    }
}

module.exports.deleteBook = async (req, res) => {

    try {
        // console.log(req.body)
        let book = await Book.findOne({ _id: req.body._id })
        if (!book) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.delete_fail)
        } else {
            await Book.deleteOne(req.query)
        }
        responseManagement.sendResponse(res, httpStatus.OK, messages.delete_success)

    } catch (error) {

        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)
    }
}

module.exports.searchBook = async (req, res) => {

    try {
        //console.log(req.query)
        let book = await Book.findOne(req.query);
        if (!book) {

            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.messages.search_not_found)
        } else {
            console.log(book)
            responseManagement.sendResponse(res, httpStatus.OK, messages.search_success, book)
        }


    } catch (error) {
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)
    }

}

module.exports.updateBook = async (req, res) => {
    try {

        let book = await Book.findOne({ _id: req.body._id })
        // console.log(book)

        if (!book) {

            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, messages.messages.search_not_found)
        } else {
            // console.log(req.body)

            await Book.updateOne({ _id: req.body._id }, req.body)
            responseManagement.sendResponse(res, httpStatus.OK, messages.book_update, book)
        }

    } catch (error) {

    }


}

module.exports.viewAll = async (req, res) => {
    try {

        let book = await Book.aggregate([
            {
                $lookup:
                {
                    from: "comments",
                    localField: "_id",
                    foreignField: "book_id",
                    as: "Book Comments"
                }
            }
        ]);

        // console.log(book.length)

        if (book.length == 0) {
            responseManagement.sendResponse(res, httpStatus.NOT_FOUND, messages.book_fail, null)
        } else {
            responseManagement.sendResponse(res, httpStatus.OK, messages.book_success, book)
        }

    } catch (error) {
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, messages.internal_server_error)

    }
}