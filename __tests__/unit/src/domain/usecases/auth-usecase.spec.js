const AuthUsecase = require('./../../../../../src/domain/usecases/auth-usecase');

const makeSut = () => {
  const sut = new AuthUsecase();
  return {
    sut
  };
};

describe('Given the auth usecase', () => {
  describe('And no email is provided', () => {
    test('Then I expect it returns null', async() => {
      const { sut } = makeSut();
      const authResponse = await sut.auth({ password: 'any_password'});
      expect(authResponse).toBeNull();
    });
  });
});