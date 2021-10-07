const { MissingParamError } = require('../../../utils/errors');
const MongoHelper = require('../../helpers/mongo-helper');

class UpdateProductPurchaseStatusRepository {
  async update(productPurchaseId, status) {
    if (!productPurchaseId) {
      throw new MissingParamError('productPurchaseId');
    }
    if (!status) {
      throw new MissingParamError('status');
    }

    const productPurchaseModel = await MongoHelper.getCollection('purchases');
    const dbResponse = await productPurchaseModel.updateOne({
      _id: productPurchaseId
    }, {
      $set: {
        status
      }
    });

    return dbResponse;
  };
};

module.exports = UpdateProductPurchaseStatusRepository;
