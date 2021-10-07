const { MissingParamError } = require('../../../utils/errors');

class CreateProductUsecase {
  constructor({ createProductRepository, createProductFactory, loadProductDetailsByIdRepository } = {}) {
    this.createProductRepository = createProductRepository;
    this.createProductFactory = createProductFactory;
    this.loadProductDetailsByIdRepository = loadProductDetailsByIdRepository;
  };

  async create(payload) {
    if (!payload.product) {
      throw new MissingParamError('product');
    }

    const product = this.createProductFactory.create(payload.product);
    const dbResponse = await this.createProductRepository.create(product);

    const createdProduct = await this.loadProductDetailsByIdRepository.load(dbResponse.insertedId);
    return createdProduct;
  };
};

module.exports = CreateProductUsecase;
