const { MissingParamError } = require('../../../utils/errors');
const MongoHelper = require('../../helpers/mongo-helper');

class UpdateProductAmountRepository {
  async update(productId, amount) {
    if (!productId) {
      throw new MissingParamError('productId');
    }
    if (!amount) {
      throw new MissingParamError('amount');
    }

    const productModel = await MongoHelper.getCollection('products');
    await productModel.updateOne({
      _id: productId
    }, {
      $set: {
        amount
      }
    });
  };
};

module.exports = UpdateProductAmountRepository;
