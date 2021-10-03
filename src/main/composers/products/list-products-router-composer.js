const ListProductsRouter = require('../../../presentation/routers/products/list-products-router');
const ListProductsUseCase = require('../../../domain/usecases/list-products-usecase');
const ListProductsRepository = require('../../../infra/repositories/products/list-products-repository');
const RequestValidator = require('../../../presentation/validators/request-validator');
const { listProductsValidatorSchema } = require('../../../presentation/validators/schemas');

class CreateProductRouterComposer {
  static compose() {
    const requestValidator = new RequestValidator(listProductsValidatorSchema);
    const listProductsRepository = new ListProductsRepository();

    const listProductsUseCase = new ListProductsUseCase({
      listProductsRepository
    });

    return new ListProductsRouter({
      listProductsUseCase,
      requestValidator
    });
  }
};

module.exports = CreateProductRouterComposer;
