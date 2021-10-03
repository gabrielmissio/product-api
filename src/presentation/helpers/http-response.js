const UnauthorizedError = require('../errors/unauthorized-error');
const InternalError = require('../errors/internal-error');
const NotFoundError = require('../errors/not-found-error');

class HttpResponse {
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

  static created(data) {
    return {
      statusCode: 201,
      body: data
    };
  };

  static notFound(data) {
    return {
      statusCode: 404,
      body: {
        error: new NotFoundError(data).message
      }
    };
  };

  static handleError(error) {
    const code = error.code || 500;
    const message = error.message || new InternalError().message;

    return {
      statusCode: code,
      body: {
        error: message
      }
    };
  };
};

module.exports = HttpResponse;
