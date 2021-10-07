const CreateProductRouter = require('../../../presentation/routers/products/create-product-router');
const CreateProductUseCase = require('../../../domain/usecases/products/create-product-usecase');
const CreateProductRepository = require('../../../infra/repositories/products/create-product-repository');
const CreateProductFactory = require('../../../infra/factories/create-product-factory');
const LoadProductDetailsByIdRepository = require('../../../infra/repositories/products/load-product-details-by-id-repository');
const RequestValidator = require('../../../presentation/validators/request-validator');
const { createProductValidatorSchema } = require('../../../presentation/validators/schemas');

class CreateProductRouterComposer {
  static compose() {
    const createProductFactory = new CreateProductFactory();
    const createProductRepository = new CreateProductRepository();
    const loadProductDetailsByIdRepository = new LoadProductDetailsByIdRepository();
    const requestValidator = new RequestValidator(createProductValidatorSchema);

    const createProductUseCase = new CreateProductUseCase({
      createProductRepository,
      createProductFactory,
      loadProductDetailsByIdRepository
    });

    return new CreateProductRouter({
      createProductUseCase,
      requestValidator
    });
  }
};

module.exports = CreateProductRouterComposer;
