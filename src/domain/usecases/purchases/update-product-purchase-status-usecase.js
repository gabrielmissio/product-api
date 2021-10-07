const { MissingParamError, RequestError } = require('../../../utils/errors');
const { errorMessages: { PRODUCT_NOT_FOUND, PRODUCT_PURCHASE_NOT_FOUND } } = require('../../../utils/enums');
const { httpCodes: { NOT_FOUND } } = require('../../../utils/enums');

class UpdateProductPurchaseStatusUseCase {
  constructor({
    loadProductPurchaseDetailsByIdRepository,
    loadProductDetailsByIdRepository,
    updateProductPurchaseStatusRepository,
    updateProductAmountRepository,
    updateDateOfLastProductSaleRepository
  } = {}) {
    this.loadProductPurchaseDetailsByIdRepository = loadProductPurchaseDetailsByIdRepository;
    this.loadProductDetailsByIdRepository = loadProductDetailsByIdRepository;
    this.updateProductPurchaseStatusRepository = updateProductPurchaseStatusRepository;
    this.updateProductAmountRepository = updateProductAmountRepository;
    this.updateDateOfLastProductSaleRepository = updateDateOfLastProductSaleRepository;
  };

  async update({ productPurchaseId, status }) {
    if (!productPurchaseId) {
      throw new MissingParamError('product');
    }
    if (!status) {
      throw new MissingParamError('paymentConditionInput');
    }

    const existingProductPurchase = await this.loadProductPurchaseDetailsByIdRepository.load(productPurchaseId);
    if (!existingProductPurchase) {
      throw new RequestError({
        message: PRODUCT_PURCHASE_NOT_FOUND,
        code: NOT_FOUND
      });
    }

    const existingProduct = await this.loadProductDetailsByIdRepository.load(existingProductPurchase.product.id);
    if (!existingProduct) {
      throw new RequestError({
        message: PRODUCT_NOT_FOUND,
        code: NOT_FOUND
      });
    }

    const newAmountValue = existingProduct.amount - 1;// TODO: get newAmountValue dynamically at update time
    await this.updateProductAmountRepository.update(existingProduct._id, newAmountValue);// TODO: pass operation in place of newAmountValue
    await this.updateProductPurchaseStatusRepository.update(existingProductPurchase._id, status);
    await this.updateDateOfLastProductSaleRepository.update(existingProduct._id, new Date().toISOString());

    const updatedProductPurchase = await this.loadProductPurchaseDetailsByIdRepository.load(productPurchaseId);
    return updatedProductPurchase;
  };
};

module.exports = UpdateProductPurchaseStatusUseCase;
