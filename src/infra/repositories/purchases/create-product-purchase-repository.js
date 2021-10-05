const { MissingParamError } = require('../../../utils/errors');
const MongoHelper = require('../../helpers/mongo-helper');

class CreateProductPurchaseRepository {
  async create(purchaseProduct) {
    if (!purchaseProduct) {
      throw new MissingParamError('purchaseProduct');
    }

    const purchaseModel = await MongoHelper.getCollection('purchases');
    const dbResponse = await purchaseModel.insertOne(purchaseProduct);

    return dbResponse;
  };
};

module.exports = CreateProductPurchaseRepository;
