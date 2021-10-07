const UpdateProductPurchaseRouter = require('./../../../presentation/routers/purchases/update-product-purchase-router');
const UpdateProductPurchaseStatusUseCase = require('./../../../domain/usecases/purchases/update-product-purchase-status-usecase');
const LoadProductPurchaseDetailsByIdRepository = require('./../../../infra/repositories/purchases/load-product-purchase-details-by-id-repository');
const LoadProductDetailsByIdRepository = require('./../../../infra/repositories/products/load-product-details-by-id-repository');
const UpdateProductPurchaseStatusRepository = require('./../../../infra/repositories/purchases/update-product-purchase-status-repository');
const UpdateProductAmountRepository = require('./../../../infra/repositories/products/update-product-amount-repository');
const UpdateDateOfLastProductSaleRepository = require('./../../../infra/repositories/products/update-product-date-of-last-sale-repository');

const RequestValidator = require('./../../../presentation/validators/request-validator');
const { updateProductPurchaseValidatorSchema } = require('./../../../presentation/validators/schemas');

class UpdateProductPurchaseRouterComposer {
  static compose() {
    const loadProductPurchaseDetailsByIdRepository = new LoadProductPurchaseDetailsByIdRepository();
    const loadProductDetailsByIdRepository = new LoadProductDetailsByIdRepository();
    const updateProductPurchaseStatusRepository = new UpdateProductPurchaseStatusRepository();
    const updateProductAmountRepository = new UpdateProductAmountRepository();
    const updateDateOfLastProductSaleRepository = new UpdateDateOfLastProductSaleRepository();
    const requestValidator = new RequestValidator(updateProductPurchaseValidatorSchema);

    const updateProductPurchaseStatusUseCase = new UpdateProductPurchaseStatusUseCase({
      loadProductPurchaseDetailsByIdRepository,
      loadProductDetailsByIdRepository,
      updateProductPurchaseStatusRepository,
      updateProductAmountRepository,
      updateDateOfLastProductSaleRepository
    });

    return new UpdateProductPurchaseRouter({
      updateProductPurchaseStatusUseCase,
      requestValidator
    });
  };
};

module.exports = UpdateProductPurchaseRouterComposer;
