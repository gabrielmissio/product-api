const { MissingParamError } = require('../../../utils/errors');

class CreateProductUsecase {
  constructor({ createProductRepository, createProductFactory } = {}) {
    this.createProductRepository = createProductRepository;
    this.createProductFactory = createProductFactory;
  };

  async create(payload) {
    if (!payload.product) {
      throw new MissingParamError('product');
    }

    const product = this.createProductFactory.create(payload.product);
    const dbResponse = await this.createProductRepository.create(product);

    return dbResponse;
  };
};

module.exports = CreateProductUsecase;
