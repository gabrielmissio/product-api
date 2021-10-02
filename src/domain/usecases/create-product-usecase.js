const { MissingParamError } = require('./../../utils/errors');

class CreateProductUsecase {
  constructor({ createProductRepository } = {}) {
    this.createProductRepository = createProductRepository;
  };

  async create({ product }) {
    if (!product) {
      throw new MissingParamError('product');
    }

    const newProduct = await this.createProductRepository.create(product);
    return newProduct;
  };
};

module.exports = CreateProductUsecase;
