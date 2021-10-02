const ListProductsRouter = require('../../presentation/routers/list-products-router');
const ListProductsUseCase = require('./../../domain/usecases/list-products-usecase');
const ListProductsRepository = require('./../../infra/repositories/list-products-repository');
const ListProductsValidator = require('./../../presentation/validators/list-products-validator');

class CreateProductRouterComposer {
  static compose() {
    const listProductsValidator = new ListProductsValidator();
    const listProductsRepository = new ListProductsRepository();

    const listProductsUseCase = new ListProductsUseCase({
      listProductsRepository
    });
    return new ListProductsRouter({
      listProductsUseCase,
      requestValidator: listProductsValidator
    });
  }
};

module.exports = CreateProductRouterComposer;
