const { celebrate, Joi } = require('celebrate')

module.exports.commentsBook = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
    book_id: Joi.string().required(),
    comment: Joi.string().required(),
    // user_id: Joi.string().required(),
    // user_name: Joi.string().required(),

    })
})