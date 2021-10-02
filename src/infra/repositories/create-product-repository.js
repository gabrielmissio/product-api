const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('./../helpers/mongo-helper');

class CreateProductRepository {
  async create(product) {
    if (!product) {
      throw new MissingParamError('product');
    }

    const productModel = await MongoHelper.getCollection('products');
    const newProduct = await productModel.insertOne(product);

    return newProduct;
  };
};

module.exports = CreateProductRepository;
