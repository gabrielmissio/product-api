const HttpResponse = require('../../helpers/http-response');
const InvalidRequestError = require('../../errors/invalid-request-error');

class UpdateProductPurchaseRouter {
  constructor({ updateProductPurchaseStatusUseCase, requestValidator } = {}) {
    this.updateProductPurchaseStatusUseCase = updateProductPurchaseStatusUseCase;
    this.requestValidator = requestValidator;
  }

  async route(httpRequest) {
    try {
      const errors = this.requestValidator.validate(httpRequest.body);
      if (errors) {
        return HttpResponse.badRequest(new InvalidRequestError(errors));
      }

      const productPurchase = await this.updateProductPurchaseStatusUseCase.update(httpRequest.body);

      return HttpResponse.created(productPurchase);
    } catch (error) {
      return HttpResponse.handleError(error);
    };
  };
};

module.exports = UpdateProductPurchaseRouter;
