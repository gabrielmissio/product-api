const HttpResponse = require('../../helpers/http-response');
const InvalidRequestError = require('../../errors/invalid-request-error');

class ProductPurchaseRouter {
  constructor({ productPurchaseUseCase, requestValidator } = {}) {
    this.productPurchaseUseCase = productPurchaseUseCase;
    this.requestValidator = requestValidator;
  }

  async route(httpRequest) {
    try {
      const errors = this.requestValidator.validate(httpRequest.body);
      if (errors) {
        return HttpResponse.badRequest(new InvalidRequestError(errors));
      }

      const productPurchase = await this.productPurchaseUseCase.buy(httpRequest.body);

      return HttpResponse.created(productPurchase);
    } catch (error) {
      return HttpResponse.internalError();
    };
  };
};

module.exports = ProductPurchaseRouter;
