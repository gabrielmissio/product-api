const DetailProductsRouter = require('./../../presentation/routers/detail-products-router');
const DetailProductsUsecase = require('./../../domain/usecases/detail-products-usecase');
const LoadProductDetailsByIdRepository = require('./../../infra/repositories/load-product-details-by-id-repository');
const RequestValidator = require('./../../presentation/validators/request-validator');
const { detailProductValidatorSchema } = require('./../../presentation/validators/schemas');

class DetailProductsRouterComposer {
  static compose() {
    const requestValidator = new RequestValidator(detailProductValidatorSchema);
    const loadProductDetailsByIdRepository = new LoadProductDetailsByIdRepository();

    const detailProductsUseCase = new DetailProductsUsecase({
      loadProductDetailsByIdRepository
    });

    return new DetailProductsRouter({
      detailProductsUseCase,
      requestValidator
    });
  }
};

module.exports = DetailProductsRouterComposer;
