const createProductValidatorSchema = require('./products/create-product-validator-schema');
const listProductsValidatorSchema = require('./products/list-products-validator-schema');
const loginValidatorSchema = require('./users/login-validator-schema');
const signupValidatorSchema = require('./users/signup-validator-schema');

module.exports = {
  createProductValidatorSchema,
  listProductsValidatorSchema,
  loginValidatorSchema,
  signupValidatorSchema
};
