const { MissingParamError } = require('./../../utils/errors');

class DetailProductsUsecase {
  constructor({ loadProductDetailsByIdRepository } = {}) {
    this.loadProductDetailsByIdRepository = loadProductDetailsByIdRepository;
  };

  async detail({ productsId }) {
    if (!productsId) {
      throw new MissingParamError('productsId');
    }

    const productDetails = await this.loadProductDetailsByIdRepository.load(productsId);
    return productDetails;
  };
};

module.exports = DetailProductsUsecase;
