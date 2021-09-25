const Joi = require('joi');

const loginValidator = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
});

module.exports = loginValidator;
