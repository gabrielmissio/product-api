const LoginRouter = require('../../../../../src/presentation/routers/login-router');
const UnauthorizedError = require('../../../../../src/presentation/helpers/errors/unauthorized-error');
const InternalError = require('../../../../../src/presentation/helpers/errors/internal-error');
const InvalidRequestError = require('../../../../../src/presentation/helpers/errors/invalid-request-error');

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCaseSpy();
  const requestValidatorSpy = makeRequestValidatorSpy();
  const sut = new LoginRouter(authUseCaseSpy, requestValidatorSpy);
  authUseCaseSpy.acessToken = 'valid_acess_token';
  return {
    sut,
    authUseCaseSpy,
    requestValidatorSpy
  };
};

const makeRequestValidatorSpy = () => {
  class RequestValidator {
    validate(payload) {
      this.payload = payload;
      return this.error;
    };
  };
  const requestValidatorSpy = new RequestValidator();
  requestValidatorSpy.error = null;
  return requestValidatorSpy;
};

const makeRequestValidatorSpyWithError = () => {
  class RequestValidator {
    validate(payload) {
      throw new Error('any_error');
    };
  };

  return new RequestValidator();
};

const makeAuthUseCaseSpy = () => {
  class AuthUseCaseSpy {
    async auth({ email, password }) {
      this.email = email;
      this.password = password;
      return this.acessToken;
    }
  }

  return new AuthUseCaseSpy();
};

const makeAuthUseCaseSpyWithError = () => {
  class AuthUseCaseSpy {
    async auth(email, password) {
      throw new Error('any_error');
    }
  }

  return new AuthUseCaseSpy();
};

describe('Given the login routes', () => {
  describe('And no email is provided', () => {
    test('Then I expect it returns 400', async() => {
      const { sut,requestValidatorSpy } = makeSut();
      requestValidatorSpy.error = 'ValidationError: "email" is required';
      const httpRequest = {
        body: {
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new InvalidRequestError('ValidationError: "email" is required'));
    });
  });

  describe('And no password is provided', () => {
    test('Then I expect it returns 400', async() => {
      const { sut, requestValidatorSpy } = makeSut();
      requestValidatorSpy.error = 'ValidationError: "password" is required';
      const httpRequest = {
        body: {
          email: 'any_email'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new InvalidRequestError('ValidationError: "password" is required'));
    });
  });

  describe('And no httpRequest is provided', () => {
    test('Then I expect it returns 500', async() => {
      const { sut } = makeSut();
      const httpResponse = await sut.route();
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new InternalError());
    });
  });

  describe('And the httpRequest has no body', () => {
    test('Then I expect it returns 500', async() => {
      const { sut } = makeSut();
      const httpResponse = await sut.route();
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new InternalError());
    });
  });

  describe('And pass valid credentials', () => {
    test('Then I expect it calls auth from authUseCase with the expected params', async() => {
      const { sut, authUseCaseSpy } = makeSut();
      const httpRequest = {
        body: {
          email: 'valid@mail.com',
          password: 'validPassword'
        }
      };
      await sut.route(httpRequest);
      expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    });

    test('Then I expect it calls validate from requestValidator with the expected params', async() => {
      const { sut, requestValidatorSpy } = makeSut();
      const httpRequest = {
        body: {
          email: 'valid@mail.com',
          password: 'validPassword'
        }
      };
      await sut.route(httpRequest);
      expect(requestValidatorSpy.payload).toBe(httpRequest.body);
    });

    test('Then I expect it returns 200 and an acess token', async() => {
      const { sut, authUseCaseSpy } = makeSut();
      const httpRequest = {
        body: {
          email: 'valid@mail.com',
          password: 'validPassword'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(200);
      expect(httpResponse.body.acessToken).toEqual(authUseCaseSpy.acessToken);
    });
  });

  describe('And pass invalid credentials', () => {
    test('Then I expect it returns 401', async() => {
      const { sut, authUseCaseSpy } = makeSut();
      authUseCaseSpy.acessToken = null;
      const httpRequest = {
        body: {
          email: 'valid@mail.com',
          password: 'validPassword'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(401);
      expect(httpResponse.body).toEqual(new UnauthorizedError());
    });
  });

  describe('And no AuthUseCase is provided', () => {
    test('Then I expect it returns 500', async() => {
      const sut = new LoginRouter();
      const httpRequest = {
        body: {
          email: 'any@mail.com',
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new InternalError());
    });
  });

  describe('And AuthUseCase has no auth method', () => {
    test('Then I expect it returns 500', async() => {
      const sut = new LoginRouter({});
      const httpRequest = {
        body: {
          email: 'any@mail.com',
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new InternalError());
    });
  });

  describe('And AuthUseCase throws an error', () => {
    test('Then I expect it returns 500', async() => {
      const authUseCase = makeAuthUseCaseSpyWithError();
      const sut = new LoginRouter(authUseCase);
      const httpRequest = {
        body: {
          email: 'any@mail.com',
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new InternalError());
    });
  });

  describe('And httpRequest body has an invalid email', () => {
    test('Then I expect it returns 400', async() => {
      const { sut, requestValidatorSpy } = makeSut();
      requestValidatorSpy.error = 'ValidationError: "email" is required';
      const httpRequest = {
        body: {
          email: 'invalid@mail.com',
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new InvalidRequestError('ValidationError: "email" is required'));
    });
  });

  describe('And requestValidator is not provided', () => {
    test('Then I expect it returns 500', async() => {
      const { authUseCaseSpy } = makeSut();
      const sut = new LoginRouter(authUseCaseSpy);
      const httpRequest = {
        body: {
          email: 'any@mail.com',
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new InternalError());
    });
  });

  describe('And requestValidator has no validate method', () => {
    test('Then I expect it returns 500', async() => {
      const { authUseCaseSpy } = makeSut();
      const sut = new LoginRouter(authUseCaseSpy, {});
      const httpRequest = {
        body: {
          email: 'any@mail.com',
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new InternalError());
    });
  });

  describe('And requestValidator  throws an error', () => {
    test('Then I expect it returns 500', async() => {
      const { authUseCaseSpy } = makeSut();
      const requestValidator = makeRequestValidatorSpyWithError();
      const sut = new LoginRouter(authUseCaseSpy, requestValidator);
      const httpRequest = {
        body: {
          email: 'any@mail.com',
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new InternalError());
    });
  });
});
