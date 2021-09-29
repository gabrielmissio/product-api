const UnauthorizedError = require('../errors/unauthorized-error');
const InternalError = require('../errors/internal-error');

module.exports = class HttpResponse {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: error
    };
  };

  static internalError() {
    return {
      statusCode: 500,
      body: new InternalError()
    };
  };

  static unauthorized() {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    };
  };

  static ok(data) {
    return {
      statusCode: 200,
      body: data
    };
  };
};
