const errorMessages = {
  USER_ALREADY_EXISTS: 'user already exists',
  PRODUCT_NOT_FOUND: 'product not found',
  PRODUCT_PURCHASE_NOT_FOUND: 'product purchase not found',
  INTERNAL_SERVER_ERROR: 'internal server error',
  PRODUCT_PURCHASE_CONFLIC_PROPOSAL: 'the purchase status of the product is already the same as the proposal'
};

module.exports = Object.freeze(errorMessages);
