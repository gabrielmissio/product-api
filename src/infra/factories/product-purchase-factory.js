const ProductPurchase = require('../models/product-purchase-model');

class CreateProductPurchaseFactory {
  create({ product, paymentCondition }) {
    return new ProductPurchase({
      product,
      paymentCondition,
      status: 'waiting confirmation', // TODO: replace with enum message
      updatedAt: new Date(),
      insertedAt: new Date()
    });
  };
};

module.exports = CreateProductPurchaseFactory;
