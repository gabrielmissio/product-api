const { MissingParamError } = require('../../../utils/errors');
const MongoHelper = require('../../helpers/mongo-helper');

class LoadProductPurchaseDetailsByIdRepository {
  async load(id) {
    if (!id) {
      throw new MissingParamError('id');
    }

    const productModel = await MongoHelper.getCollection('purchases');
    const query = {
      _id: MongoHelper.getObjectId(id)
    };
    const projection = {
      _id: 1,
      product: 1,
      paymentCondition: 1,
      status: 1,
      saleValue: 1,
      updatedAt: 1,
      insertedAt: 1
    };

    const productDetails = await productModel.findOne(query, { projection });
    return productDetails;
  };
};

module.exports = LoadProductPurchaseDetailsByIdRepository;
