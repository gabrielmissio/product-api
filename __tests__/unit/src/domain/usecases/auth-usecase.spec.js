const AuthUsecase = require('./../../../../../src/domain/usecases/auth-usecase');
const { MissingParamError, InvalidParamError } = require('./../../../../../src/domain/helpers/errors');

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email;
    };
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new AuthUsecase(loadUserByEmailRepositorySpy);
  return {
    sut,
    loadUserByEmailRepositorySpy
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

  describe('And no password is provided', () => {
    test('Then I expect it throws a MissingParamError', async() => {
      const { sut } = makeSut();
      const promise = sut.auth({ email: 'valid@mail.com'});
      expect(promise).rejects.toThrow(new MissingParamError('password'));
    });
  });

  describe('And call LoadUserByEmailRepository', () => {
    test('Then I expect it calls load method from loadUserByEmailRepository with the expected params', async() => {
      const { sut, loadUserByEmailRepositorySpy } = makeSut();
      await sut.auth({email: 'valid@mail.com', password: 'any_password'});

      expect(loadUserByEmailRepositorySpy.email).toBe('valid@mail.com');
    });
  });

  describe('And no LoadUserByEmailRepository is provided', () => {
    test('Then I expect it throws an MissingParamError', async() => {
      const sut = new AuthUsecase();
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'));
    });
  });

  describe('And LoadUserByEmailRepository has no load method', () => {
    test('Then I expect it throws an MissingParamError', async() => {
      const sut = new AuthUsecase({});
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'));
    });
  });
});
