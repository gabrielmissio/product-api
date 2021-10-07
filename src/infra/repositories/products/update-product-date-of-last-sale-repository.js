const { MissingParamError } = require('../../../utils/errors');
const MongoHelper = require('../../helpers/mongo-helper');

class UpdateDateOfLastProductSaleRepository {
  async update(productId, dateOfLastSale) {
    if (!productId) {
      throw new MissingParamError('productId');
    }
    if (!dateOfLastSale) {
      throw new MissingParamError('dateOfLastSale');
    }

    const productModel = await MongoHelper.getCollection('products');
    await productModel.updateOne({
      _id: productId
    }, {
      $set: {
        dateOfLastSale
      }
    });
  };
};

module.exports = UpdateDateOfLastProductSaleRepository;
