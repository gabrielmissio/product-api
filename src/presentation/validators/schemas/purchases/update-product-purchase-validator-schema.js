const Joi = require('joi');
const schema = Joi.object({
  productPurchaseId: Joi.string()
    .required(),
  status: Joi.string()
    .required()
});

module.exports = schema;
