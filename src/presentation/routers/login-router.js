const HttpResponse = require('../helpers/http-response');
const InvalidRequestError = require('./../errors/invalid-request-error');

module.exports = class LoginRouter {
  constructor({ authUseCase, requestValidator } = {}) {
    this.authUseCase = authUseCase;
    this.requestValidator = requestValidator;
  };

  async route(httpRequest) {
    try {
      const errors = this.requestValidator.validate(httpRequest.body);
      if (errors) {
        return HttpResponse.badRequest(new InvalidRequestError(errors));
      }

      const AccessToken = await this.authUseCase.auth(httpRequest.body);
      if (!AccessToken) {
        return HttpResponse.unauthorized();
      }
      return HttpResponse.ok({ AccessToken });
    } catch (error) {
      return HttpResponse.internalError();
    };
  };
};
