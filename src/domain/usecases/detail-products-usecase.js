const { MissingParamError, RequestError } = require('./../../utils/errors');
const { errorMessages: { PRODUCT_NOT_FOUND } } = require('./../../utils/enums');
const { httpCodes: { NOT_FOUND } } = require('./../../utils/enums');

class DetailProductsUsecase {
  constructor({ loadProductDetailsByIdRepository } = {}) {
    this.loadProductDetailsByIdRepository = loadProductDetailsByIdRepository;
  };

  async detail({ productsId }) {
    if (!productsId) {
      throw new MissingParamError('productsId');
    }

    const productDetails = await this.loadProductDetailsByIdRepository.load(productsId);
    if (!productDetails) {
      throw new RequestError({
        message: PRODUCT_NOT_FOUND,
        code: NOT_FOUND
      });
    }

    return productDetails;
  };
};

module.exports = DetailProductsUsecase;
