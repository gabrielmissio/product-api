const ProductPurchase = require('../models/product-purchase-model');
const { productPurchaseStatus: { WAITING_CONFIRMATION } } = require('./../../utils/enums');

class CreateProductPurchaseFactory {
  create({ product, paymentCondition }) {
    return new ProductPurchase({
      product,
      paymentCondition,
      status: WAITING_CONFIRMATION,
      saleValue: paymentCondition.value,
      updatedAt: new Date(),
      insertedAt: new Date()
    });
  };
};

module.exports = CreateProductPurchaseFactory;
