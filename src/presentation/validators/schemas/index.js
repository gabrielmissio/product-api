const createProductValidatorSchema = require('./create-product-validator-schema');
const listProductsValidatorSchema = require('./list-products-validator-schema');
const loginValidatorSchema = require('./login-validator-schema');
const signupValidatorSchema = require('./signup-validator-schema');

module.exports = {
  createProductValidatorSchema,
  listProductsValidatorSchema,
  loginValidatorSchema,
  signupValidatorSchema
};
