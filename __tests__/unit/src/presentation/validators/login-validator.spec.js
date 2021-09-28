const LoginValidator = require('../../../../../src/presentation/validators/login-validator');

const makeSut = () => {
  const sut = new LoginValidator();
  
  return {
    sut
  };
};

describe('Given the LoginValidator', () => {
  describe('And Joi does not return any error', () => {
    test('Then I expect it returns undefined', async() => {
      const { sut } = makeSut();
      const erros = sut.validate({
        email: 'valid@mail.com',
        password: 'valid_password.com'
      });

      expect(erros).toBeUndefined();
    });
  });
});