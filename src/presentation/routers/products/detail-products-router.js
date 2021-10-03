const HttpResponse = require('../../helpers/http-response');
const InvalidRequestError = require('../../errors/invalid-request-error');

class DetailProductsRouter {
  constructor({ detailProductsUseCase, requestValidator } = {}) {
    this.detailProductsUseCase = detailProductsUseCase;
    this.requestValidator = requestValidator;
  }

  async route(httpRequest) {
    try {
      const errors = this.requestValidator.validate(httpRequest.params);
      if (errors) {
        return HttpResponse.badRequest(new InvalidRequestError(errors));
      }

      const productDetails = await this.detailProductsUseCase.detail(httpRequest.params);

      return HttpResponse.ok(productDetails);
    } catch (error) {
      return HttpResponse.handleError(error);
    };
  };
};

module.exports = DetailProductsRouter;
