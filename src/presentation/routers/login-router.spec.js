const LoginRouter = require('./login-router');
const MissingParamError = require('./../helpers/missing-param-error');

const makeSut = () => {
  const sut = new LoginRouter();
  return {
    sut
  };
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
    });
  });

  describe('And the httpRequest has no body', () => {
    test('Then I expect it returns 500', async() => {
      const { sut } = makeSut();
      const httpResponse = await sut.route();
      expect(httpResponse.statusCode).toBe(500);
    });
  });
});
