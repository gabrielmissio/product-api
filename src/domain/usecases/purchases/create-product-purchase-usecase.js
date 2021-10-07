const { MissingParamError, RequestError } = require('../../../utils/errors');
const { errorMessages: { PRODUCT_NOT_FOUND, INTERNAL_SERVER_ERROR } } = require('../../../utils/enums');
const { httpCodes: { NOT_FOUND } } = require('../../../utils/enums');

class CreateProductPurchaseUseCase {
  constructor({
    loadProductDetailsByIdRepository,
    createProductPurchaseRepository,
    createProductPurchaseFactory,
    getpaymentConditionsFactory,
    loadProductPurchaseDetailsByIdRepository
  } = {}) {
    this.loadProductDetailsByIdRepository = loadProductDetailsByIdRepository;
    this.createProductPurchaseRepository = createProductPurchaseRepository;
    this.createProductPurchaseFactory = createProductPurchaseFactory;
    this.getpaymentConditionsFactory = getpaymentConditionsFactory;
    this.loadProductPurchaseDetailsByIdRepository = loadProductPurchaseDetailsByIdRepository;
  };

  async buy({ product, paymentCondition: paymentConditionInput }) {
    if (!product) {
      throw new MissingParamError('product');
    }
    if (!paymentConditionInput) {
      throw new MissingParamError('paymentConditionInput');
    }

    const existingProduct = await this.loadProductDetailsByIdRepository.load(product.id);
    if (!existingProduct) {
      throw new RequestError({
        message: PRODUCT_NOT_FOUND,
        code: NOT_FOUND
      });
    }

    const paymentCondition = await this.getpaymentConditionsFactory.get(paymentConditionInput);
    if (!paymentCondition) {
      throw new Error(INTERNAL_SERVER_ERROR);
    }

    const productPurchase = this.createProductPurchaseFactory.create({ product, paymentCondition });
    const dbResponse = await this.createProductPurchaseRepository.create(productPurchase);

    const createdProductPurchase = await this.loadProductPurchaseDetailsByIdRepository.load(dbResponse.insertedId);
    return createdProductPurchase;
  };
};

module.exports = CreateProductPurchaseUseCase;
