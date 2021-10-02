const Joi = require('joi');
const schema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
});

class LoginValidator {
  validate(params) {
    const { error } = schema.validate(params);
    return error;
  };
};

module.exports = LoginValidator;
