const Joi = require('joi');
const schema = Joi.object({
  product: Joi.object({
    name: Joi.string()
      .required(),
    valueUnitary: Joi.number()
      .required(),
    amount: Joi.number()
      .required()
  }).required()
});

module.exports = schema;
