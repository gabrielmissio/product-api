const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('./../helpers/mongo-helper');

module.exports = class CreateProductRepository {
  async create(product) {
    if (!product) {
      throw new MissingParamError('product');
    }

    const productModel = await MongoHelper.getCollection('users');
    const newProduct = await productModel.insertOne(product);

    return newProduct;
  };
};
