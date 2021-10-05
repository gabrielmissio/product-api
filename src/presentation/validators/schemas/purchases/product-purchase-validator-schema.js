const Joi = require('joi');
const schema = Joi.object({
  product: Joi.object({
    id: Joi.string()
      .required()
  }).required(),
  paymentCondition: Joi.object({
    inputValue: Joi.number()
      .required(),
    numberOfInstallments: Joi.number()
      .required()
  }).required()
});

module.exports = schema;
