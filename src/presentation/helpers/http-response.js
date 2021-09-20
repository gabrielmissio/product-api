const MissingParamError = require('./missing-param-error');

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
};
