const CreateProductRouter = require('./../../presentation/routers/create-product-router');
const CreateProductUseCase = require('./../../domain/usecases/create-product-usecase');
const CreateProductRepository = require('./../../infra/repositories/products/create-product-repository');
const CreateProductFactory = require('./../../infra/factories/create-product-factory');
const RequestValidator = require('./../../presentation/validators/request-validator');
const { createProductValidatorSchema } = require('../../presentation/validators/schemas');

class CreateProductRouterComposer {
  static compose() {
    const createProductFactory = new CreateProductFactory();
    const createProductRepository = new CreateProductRepository();
    const requestValidator = new RequestValidator(createProductValidatorSchema);

    const createProductUseCase = new CreateProductUseCase({
      createProductRepository,
      createProductFactory
    });

    return new CreateProductRouter({
      createProductUseCase,
      requestValidator
    });
  }
};

module.exports = CreateProductRouterComposer;
