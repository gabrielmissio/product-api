const AuthUsecase = require('./../../../../../src/domain/usecases/auth-usecase');
const { MissingParamError, InvalidParamError } = require('./../../../../../src/domain/helpers/errors');

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy()
  const encrypterSpy = makeEncrypterSpy();
  const tokenGeneratorSpy = makeTokenGeneratorSpy();
  const sut = new AuthUsecase(loadUserByEmailRepositorySpy, encrypterSpy, tokenGeneratorSpy);
  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGeneratorSpy
  };
};

const makeTokenGeneratorSpy = () => {
  class TokenGeneratorSpy{
    async generate(userId) {
      this.userId = userId;
      return this.acessToken;
    };
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy();
  tokenGeneratorSpy.acessToken = 'acess_token';

  return tokenGeneratorSpy;
};

const makeEncrypterSpy = () => {
  class EncrypterSpy{
    async compare(password, hashedPassword) {
      this.password = password;
      this.hashedPassword = hashedPassword;
      return this.isValid;
    };
  }
  const encrypterSpy = new EncrypterSpy();
  encrypterSpy.isValid = true;
  return encrypterSpy;
};

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email;
      return this.user;
    };
  }
  
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  loadUserByEmailRepositorySpy.user = { id: 'valid_id', password: 'hashed_password' };

  return loadUserByEmailRepositorySpy;
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
      const { sut, encrypterSpy } = makeSut();
      encrypterSpy.isValid = false;
      const acessToken = await sut.auth({email: 'ant@mail.com', password: 'any_password'});

      expect(acessToken).toBeNull();
    });
  });

  describe('And call Encrypter', () => {
    test('Then I expect it calls compare method with the expected params', async() => {
      const { sut, encrypterSpy, loadUserByEmailRepositorySpy } = makeSut();
      await sut.auth({email: 'valid@mail.com', password: 'any_password'});

      expect(encrypterSpy.password).toBe('any_password');
      expect(encrypterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password);
    });
  });

  describe('And call TokenGenerator', () => {
    test('Then I expect it calls generate method with the expected params', async() => {
      const { sut, tokenGeneratorSpy, loadUserByEmailRepositorySpy } = makeSut();
      await sut.auth({email: 'valid@mail.com', password: 'any_password'});

      expect(tokenGeneratorSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id);
    });
  });

  describe('And correct credentials are provided', () => {
    test('Then I expect it returns an acess token', async() => {
      const { sut, tokenGeneratorSpy } = makeSut();
      const acessToken = await sut.auth({email: 'valid@mail.com', password: 'valid_password'});

      expect(acessToken).toBe(tokenGeneratorSpy.acessToken);
      expect(acessToken).toBeTruthy();
    });
  });
});
