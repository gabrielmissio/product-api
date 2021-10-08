const { MissingParamError, RequestError } = require('../../../utils/errors');
const { errorMessages: { PRODUCT_NOT_FOUND, PRODUCT_PURCHASE_NOT_FOUND, PRODUCT_PURCHASE_CONFLIC_PROPOSAL } } = require('../../../utils/enums');
const { httpCodes: { NOT_FOUND, CONFLICT }, productPurchaseStatus: { APPROVED, CANCEL_PURCHASE_WITH_APPROVED_STATUS } } = require('../../../utils/enums');

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

    if (status === existingProductPurchase.status) {
      throw new RequestError({
        message: PRODUCT_PURCHASE_CONFLIC_PROPOSAL,
        code: CONFLICT
      });
    }

    if (status === APPROVED) {
      const newAmountValue = existingProduct.amount - 1;
      await this.updateProductAmountRepository.update(existingProduct._id, newAmountValue);
      await this.updateDateOfLastProductSaleRepository.update(existingProduct._id, new Date().toISOString());
    }

    if (status === CANCEL_PURCHASE_WITH_APPROVED_STATUS) {
      const newAmountValue = existingProduct.amount + 1;
      await this.updateProductAmountRepository.update(existingProduct._id, newAmountValue);
    }

    await this.updateProductPurchaseStatusRepository.update(existingProductPurchase._id, status);
    const updatedProductPurchase = await this.loadProductPurchaseDetailsByIdRepository.load(productPurchaseId);

    return updatedProductPurchase;
  };
};

module.exports = UpdateProductPurchaseStatusUseCase;
