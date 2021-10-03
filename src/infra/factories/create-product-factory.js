const Product = require('../models/product-model');

class CreateProductFactory {
  create({ name, valueUnitary, amount }) {
    return new Product({
      name,
      valueUnitary,
      amount,
      updatedAt: new Date(),
      insertedAt: new Date()
    });
  };
};

module.exports = CreateProductFactory;
