const MissingParamError = require('./missing-param-error');
const UnauthorizedError = require('./unauthorized-error');

module.exports = class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    };
  };

  static internalError() {
    return {
      statusCode: 500
    };
  };

  static unauthorized() {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    };
  };
};
