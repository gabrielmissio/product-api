const Joi = require('joi');
const schema = Joi.object({
  productsId: Joi.string()
    .required()
});

module.exports = schema;
