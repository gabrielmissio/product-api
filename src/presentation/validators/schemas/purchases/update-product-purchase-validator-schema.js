const Joi = require('joi');
const { allowedProductPurchaseStatus } = require('./../../../../utils/enums');

const schema = Joi.object({
  productPurchaseId: Joi.string()
    .required(),
  status: Joi.string()
    .valid(...allowedProductPurchaseStatus)
    .required()
});

module.exports = schema;
