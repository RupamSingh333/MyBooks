const { celebrate, Joi } = require('celebrate')

module.exports.createBook = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({

        name: Joi.string().required(),
        lang: Joi.string().optional(),
        author: Joi.string().required(),
        price: Joi.number().required(),
        available: Joi.bool().optional(),
        book_image:Joi.string().optional()
    })
})

module.exports.deleteBooks = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required(),
    })
})


module.exports.deleteBook = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({

        _id: Joi.string().required()
    })
})

module.exports.searchBook = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({

        _id: Joi.string().required()
    })
})

module.exports.updateBook = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        lang: Joi.string().optional(),
        author: Joi.string().required(),
        price: Joi.number().required(),
        available: Joi.bool().optional()

    })
})