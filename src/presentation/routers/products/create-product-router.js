const HttpResponse = require('../../helpers/http-response');
const InvalidRequestError = require('../../errors/invalid-request-error');

class CreateProductRouter {
  constructor({ createProductUseCase, requestValidator } = {}) {
    this.createProductUseCase = createProductUseCase;
    this.requestValidator = requestValidator;
  }

  async route(httpRequest) {
    try {
      const errors = this.requestValidator.validate(httpRequest.body);
      if (errors) {
        return HttpResponse.badRequest(new InvalidRequestError(errors));
      }

      const product = await this.createProductUseCase.create(httpRequest.body);

      return HttpResponse.created(product);
    } catch (error) {
      return HttpResponse.internalError();
    };
  };
};

module.exports = CreateProductRouter;
