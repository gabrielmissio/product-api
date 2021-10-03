const CreateProductRouter = require('./../../presentation/routers/create-product-router');
const CreateProductUseCase = require('./../../domain/usecases/create-product-usecase');
const CreateProductValidator = require('./../../presentation/validators/create-product-validator');
const CreateProductRepository = require('./../../infra/repositories/create-product-repository');
const CreateProductFactory = require('./../../infra/factories/create-product-factory');

class CreateProductRouterComposer {
  static compose() {
    const createProductFactory = new CreateProductFactory();
    const createProductRepository = new CreateProductRepository();
    const createProductValidator = new CreateProductValidator();

    const createProductUseCase = new CreateProductUseCase({
      createProductRepository,
      createProductFactory
    });
    return new CreateProductRouter({
      createProductUseCase,
      requestValidator: createProductValidator
    });
  }
};

module.exports = CreateProductRouterComposer;
