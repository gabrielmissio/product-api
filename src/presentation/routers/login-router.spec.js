const LoginRouter = require('./login-router');
const MissingParamError = require('./../helpers/missing-param-error');
const UnauthorizedError = require('./../helpers/unauthorized-error');
const InternalError = require('./../helpers/internal-error');
const InvalidParamError = require('./../helpers/invalid-param-error');

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCaseSpy();
  const emailValidator = makeEmailValidatorSpy();
  const sut = new LoginRouter(authUseCaseSpy, emailValidator);
  authUseCaseSpy.acessToken = 'valid_acess_token';
  emailValidator.validateResponse = true;
  return {
    sut,
    authUseCaseSpy,
    emailValidator
  };
};

const makeEmailValidatorSpy = () => {
  class EmailValidator {
    isValid(email) {
      return this.validateResponse;
    };
  };

  return new EmailValidator();
};

const makeAuthUseCaseSpy = () => {
  class AuthUseCaseSpy {
    async auth(email, password) {
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
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });
  });

  describe('And no password is provided', () => {
    test('Then I expect it returns 400', async() => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          email: 'any_email'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('password'));
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
    test('Then I expect it calls auth from authUseCaseSpy with the same params', async() => {
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
      const { sut, emailValidator } = makeSut();
      emailValidator.validateResponse = false;
      const httpRequest = {
        body: {
          email: 'invalid@mail.com',
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new InvalidParamError('email'));
    });
  });
});
