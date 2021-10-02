const Joi = require('joi');
const schema = Joi.object({});

class ListProductsValidator {
  validate(params) {
    const { error } = schema.validate(params);
    return error;
  };
};

module.exports = ListProductsValidator;
