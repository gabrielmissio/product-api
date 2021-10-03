const HttpResponse = require('../../helpers/http-response');
const InvalidRequestError = require('../../errors/invalid-request-error');

class ListProductsRouter {
  constructor({ listProductsUseCase, requestValidator } = {}) {
    this.listProductsUseCase = listProductsUseCase;
    this.requestValidator = requestValidator;
  }

  async route(httpRequest) {
    try {
      const errors = this.requestValidator.validate(httpRequest.query);
      if (errors) {
        return HttpResponse.badRequest(new InvalidRequestError(errors));
      }

      const listProducts = await this.listProductsUseCase.load();

      return HttpResponse.ok(listProducts);
    } catch (error) {
      return HttpResponse.internalError();
    };
  };
};

module.exports = ListProductsRouter;
