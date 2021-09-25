const AuthUsecase = require('./../../../../../src/domain/usecases/auth-usecase');
const { MissingParamError } = require('./../../../../../src/domain/helpers/errors');

const makeSut = () => {
  const sut = new AuthUsecase();
  return {
    sut
  };
};

describe('Given the auth usecase', () => {
  describe('And no email is provided', () => {
    test('Then I expect it throws a MissingParamError', async() => {
      const { sut } = makeSut();
      const promise = sut.auth({ password: 'any_password'});
      expect(promise).rejects.toThrow(new MissingParamError('email'));
    });
  });
});