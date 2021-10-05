const ProductPurchaseRouter = require('./../../../presentation/routers/purchases/product-purchase-router');
const ProductPurchaseUseCase = require('../../../domain/usecases/purchases/create-product-purchase-usecase');
const LoadProductDetailsByIdRepository = require('./../../../infra/repositories/products/load-product-details-by-id-repository');
const CreateProductPurchaseRepository = require('./../../../infra/repositories/purchases/create-product-purchase-repository');
const CreateProductPurchaseFactory = require('../../../infra/factories/product-purchase-factory');
const GetpaymentConditionsFactory = require('./../../../infra/factories/get-payment-condictions-factory');
const RequestValidator = require('./../../../presentation/validators/request-validator');
const { productPurchaseValidatorSchema } = require('./../../../presentation/validators/schemas');

class ProductPurchaseRouterComposer {
  static compose() {
    const loadProductDetailsByIdRepository = new LoadProductDetailsByIdRepository();
    const createProductPurchaseRepository = new CreateProductPurchaseRepository();
    const createProductPurchaseFactory = new CreateProductPurchaseFactory();
    const getpaymentConditionsFactory = new GetpaymentConditionsFactory();
    const requestValidator = new RequestValidator(productPurchaseValidatorSchema);

    const productPurchaseUseCase = new ProductPurchaseUseCase({
      loadProductDetailsByIdRepository,
      createProductPurchaseRepository,
      createProductPurchaseFactory,
      getpaymentConditionsFactory
    });

    return new ProductPurchaseRouter({
      productPurchaseUseCase,
      requestValidator
    });
  };
};

module.exports = ProductPurchaseRouterComposer;
