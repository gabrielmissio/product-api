const AuthUsecase = require('./../../../../../src/domain/usecases/auth-usecase');
const { MissingParamError, InvalidParamError } = require('./../../../../../src/domain/helpers/errors');

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email;
      return this.user;
    };
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  loadUserByEmailRepositorySpy.user = {};
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

  describe('And a nonexistent email is provided', () => {
    test('Then I expect it returns null', async() => {
      const { sut, loadUserByEmailRepositorySpy } = makeSut();
      loadUserByEmailRepositorySpy.user = null;
      const response = await sut.auth({email: 'ant@mail.com', password: 'any_password'});

      expect(response).toBeNull();
    });
  });

  describe('And an incorrect password is provided', () => {
    test('Then I expect it returns null', async() => {
      const { sut } = makeSut();
      const response = await sut.auth({email: 'ant@mail.com', password: 'any_password'});

      expect(response).toBeNull();
    });
  });
});
