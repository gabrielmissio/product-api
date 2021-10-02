const UnauthorizedError = require('../errors/unauthorized-error');
const InternalError = require('../errors/internal-error');

module.exports = class HttpResponse {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    };
  };

  static internalError() {
    return {
      statusCode: 500,
      body: {
        error: new InternalError().message
      }
    };
  };

  static unauthorized() {
    return {
      statusCode: 401,
      body: {
        error: new UnauthorizedError().message
      }
    };
  };

  static ok(data) {
    return {
      statusCode: 200,
      body: data
    };
  };
};
