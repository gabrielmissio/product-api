const createProductValidatorSchema = require('./products/create-product-validator-schema');
const listProductsValidatorSchema = require('./products/list-products-validator-schema');
const loginValidatorSchema = require('./users/login-validator-schema');
const signupValidatorSchema = require('./users/signup-validator-schema');
const detailProductValidatorSchema = require('./products/detail-product-validator-schema');
const productPurchaseValidatorSchema = require('./purchases/product-purchase-validator-schema');
const updateProductPurchaseValidatorSchema = require('./purchases/update-product-purchase-validator-schema');

module.exports = {
  createProductValidatorSchema,
  listProductsValidatorSchema,
  loginValidatorSchema,
  signupValidatorSchema,
  detailProductValidatorSchema,
  productPurchaseValidatorSchema,
  updateProductPurchaseValidatorSchema
};
