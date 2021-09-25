const HttpResponse = require('../helpers/utilis/http-response');
const InvalidRequestError = require('./../helpers/errors/invalid-request-error');

module.exports = class LoginRouter {
  constructor(authUseCase, requestValidator) {
    this.authUseCase = authUseCase;
    this.requestValidator = requestValidator;
  };

  async route(httpRequest) {
    try {
      const errors = this.requestValidator.validate(httpRequest.body);
      if (errors) {
        return HttpResponse.badRequest(new InvalidRequestError(errors));
      }

      const acessToken = await this.authUseCase.auth(httpRequest.body);
      if (!acessToken) {
        return HttpResponse.unauthorized();
      }
      return HttpResponse.ok({ acessToken });
    } catch (error) {
      return HttpResponse.internalError();
    };
  };
};
