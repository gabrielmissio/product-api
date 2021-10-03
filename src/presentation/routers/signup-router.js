const HttpResponse = require('../helpers/http-response');
const InvalidRequestError = require('./../errors/invalid-request-error');

class SignRouter {
  constructor({ createUserUseCase, requestValidator } = {}) {
    this.createUserUseCase = createUserUseCase;
    this.requestValidator = requestValidator;
  }

  async route(httpRequest) {
    try {
      const errors = this.requestValidator.validate(httpRequest.body);
      if (errors) {
        return HttpResponse.badRequest(new InvalidRequestError(errors));
      }

      const user = await this.createUserUseCase.create(httpRequest.body);

      return HttpResponse.created(user);
    } catch (error) {
      return HttpResponse.handleError(error);
    };
  };
};

module.exports = SignRouter;
