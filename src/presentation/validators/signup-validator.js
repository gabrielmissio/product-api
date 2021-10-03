const Joi = require('joi');
const schema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
});

class SignupValidator {
  validate(params) {
    const { error } = schema.validate(params);
    return error;
  };
};

module.exports = SignupValidator;
