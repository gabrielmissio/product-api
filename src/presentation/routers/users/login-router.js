const HttpResponse = require('../../helpers/http-response');
const InvalidRequestError = require('../../errors/invalid-request-error');

class LoginRouter {
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

      const accessToken = await this.authUseCase.auth(httpRequest.body);
      if (!accessToken) {
        return HttpResponse.unauthorized();
      }
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      return HttpResponse.handleError(error);
    };
  };
};

module.exports = LoginRouter;
