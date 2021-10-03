const MongoHelper = require('./../helpers/mongo-helper');

class LoadProductDetailsById {
  async load(id) {
    const productModel = await MongoHelper.getCollection('products');
    const query = {
      _id: MongoHelper.getObjectId(id)
    };
    const projection = {
      _id: 0,
      name: 1,
      valueUnitary: 1,
      amount: 1,
      dateOfLastSale: 1,
      lastSaleValue: 1
    };

    const productDetails = await productModel.findOne(query, { projection });
    return productDetails;
  };
};

module.exports = LoadProductDetailsById;
