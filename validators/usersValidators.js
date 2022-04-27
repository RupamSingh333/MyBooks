const { celebrate, Joi } = require('celebrate')

module.exports.createUser = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({

        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        user_type: Joi.string().optional()

    })
})

module.exports.loginUser = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required(),

    })
})

