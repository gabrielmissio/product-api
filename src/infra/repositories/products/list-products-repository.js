const MongoHelper = require('../../helpers/mongo-helper');

class ListProductsRepository {
  async load() {
    const productModel = await MongoHelper.getCollection('products');

    return productModel.find().toArray();
  };
};

module.exports = ListProductsRepository;
