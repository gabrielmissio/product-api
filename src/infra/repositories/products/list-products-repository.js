const MongoHelper = require('../../helpers/mongo-helper');

class ListProductsRepository {
  async load() {
    const productModel = await MongoHelper.getCollection('products');
    const projection = {
      _id: 0
    };

    return productModel.find().project(projection).toArray();
  };
};

module.exports = ListProductsRepository;
