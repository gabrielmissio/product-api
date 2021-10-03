const DetailProductsRouter = require('../../../presentation/routers/products/detail-products-router');
const DetailProductsUsecase = require('../../../domain/usecases/products/detail-products-usecase');
const LoadProductDetailsByIdRepository = require('../../../infra/repositories/products/load-product-details-by-id-repository');
const RequestValidator = require('../../../presentation/validators/request-validator');
const { detailProductValidatorSchema } = require('../../../presentation/validators/schemas');

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
