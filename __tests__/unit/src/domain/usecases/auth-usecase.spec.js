const AuthUsecase = require('./../../../../../src/domain/usecases/auth-usecase');
const { MissingParamError } = require('./../../../../../src/utils/errors');

const makeSut = () => {
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy()
  const encrypterSpy = makeEncrypterSpy();
  const tokenGeneratorSpy = makeTokenGeneratorSpy();
  const updateAccessTokenRepositorySpy = makeupdateAccessTokenRepositorySpy();
  const sut = new AuthUsecase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    encrypter: encrypterSpy,
    tokenGenerator: tokenGeneratorSpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy
  });
  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy
  };
};

const makeupdateAccessTokenRepositorySpy = () => {
  class updateAccessTokenRepositorySpy{
    async save(userId, AccessToken) {
      this.userId = userId;
      this.AccessToken = AccessToken;
    };
  }

  return new updateAccessTokenRepositorySpy();
};

const makeupdateAccessTokenRepositorySpyWithError = () => {
  class updateAccessTokenRepositorySpyWithError{
    async save() {
      throw new Error('any_error');
    };
  }

  return new updateAccessTokenRepositorySpyWithError();
};

const makeTokenGeneratorSpy = () => {
  class TokenGeneratorSpy{
    async generate(userId) {
      this.userId = userId;
      return this.AccessToken;
    };
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy();
  tokenGeneratorSpy.AccessToken = 'acess_token';

  return tokenGeneratorSpy;
};

const makeTokenGeneratorSpyWithError = () => {
  class TokenGeneratorSpyWithError{
    async generate() {
      throw new Error('any_error');
    };
  }

  return new TokenGeneratorSpyWithError();
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

const makeEncrypterSpyWithError = () => {
  class EncrypterSpyWithError{
    async compare() {
      throw new Error('any_error');
    };
  }

  return new EncrypterSpyWithError;
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

const makeLoadUserByEmailRepositorySpyWithError = () => {
  class LoadUserByEmailRepositorySpyWithError {
    async load() {
      throw new Error('any_error');
    };
  }
  
  return new LoadUserByEmailRepositorySpyWithError();
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
      const AccessToken = await sut.auth({email: 'ant@mail.com', password: 'any_password'});

      expect(AccessToken).toBeNull();
    });
  });

  describe('And correct credentials are provided', () => {
    test('Then I expect it returns an acess token', async() => {
      const { sut, tokenGeneratorSpy } = makeSut();
      const AccessToken = await sut.auth({email: 'valid@mail.com', password: 'valid_password'});

      expect(AccessToken).toBe(tokenGeneratorSpy.AccessToken);
      expect(AccessToken).toBeTruthy();
    });
  });

  describe('And no dependency is provided', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase();
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });
  
  describe('And no LoadUserByEmailRepository is provided', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({});
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And LoadUserByEmailRepository has no load method', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({LoadUserByEmailRepository: {}});
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And LoadUserByEmailRepository throws', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpyWithError(),
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And call LoadUserByEmailRepository with valid params', () => {
    test('Then I expect it calls load method from loadUserByEmailRepository with the expected params', async() => {
      const { sut, loadUserByEmailRepositorySpy } = makeSut();
      await sut.auth({email: 'valid@mail.com', password: 'any_password'});

      expect(loadUserByEmailRepositorySpy.email).toBe('valid@mail.com');
    });
  });

  describe('And no Encrypter is provided', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy()
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And Encrypter has no compare method', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
        encrypter: {}
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And Encrypter throws', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
        encrypter: makeEncrypterSpyWithError(),
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And call Encrypter with valid params', () => {
    test('Then I expect it calls compare method with the expected params', async() => {
      const { sut, encrypterSpy, loadUserByEmailRepositorySpy } = makeSut();
      await sut.auth({email: 'valid@mail.com', password: 'any_password'});

      expect(encrypterSpy.password).toBe('any_password');
      expect(encrypterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password);
    });
  });

  describe('And no TokenGenerator is provided', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
        encrypter: makeEncrypterSpy()
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And TokenGenerator has no generate method', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
        encrypter: makeEncrypterSpy(),
        tokenGenerator: {}
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And TokenGenerator throws', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
        encrypter: makeEncrypterSpy(),
        tokenGenerator: makeTokenGeneratorSpyWithError()
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And call TokenGenerator with valid params', () => {
    test('Then I expect it calls generate method with the expected params', async() => {
      const { sut, tokenGeneratorSpy, loadUserByEmailRepositorySpy } = makeSut();
      await sut.auth({email: 'valid@mail.com', password: 'any_password'});

      expect(tokenGeneratorSpy.userId).toBe(loadUserByEmailRepositorySpy.user._id);
    });
  });

  describe('And updateAccessTokenRepository is not provided', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
        encrypter: makeEncrypterSpy(),
        tokenGenerator: makeTokenGeneratorSpy(),
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And updateAccessTokenRepository has no save method', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
        encrypter: makeEncrypterSpy(),
        tokenGenerator: makeTokenGeneratorSpy(),
        updateAccessTokenRepository: {}
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And updateAccessTokenRepository throws', () => {
    test('Then I expect it throws an Error', async() => {
      const sut = new AuthUsecase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositorySpy(),
        encrypter: makeEncrypterSpy(),
        tokenGenerator: makeTokenGeneratorSpy(),
        updateAccessTokenRepository: makeupdateAccessTokenRepositorySpyWithError()
      });
      const promise = sut.auth({email: 'any@mail.com', password: 'any_password'});

      expect(promise).rejects.toThrow();
    });
  });

  describe('And call updateAccessTokenRepository with valid params', () => {
    test('Then I expect it calls save method with the expected params', async() => {
      const { sut, tokenGeneratorSpy, loadUserByEmailRepositorySpy, updateAccessTokenRepositorySpy } = makeSut();
      await sut.auth({email: 'valid@mail.com', password: 'any_password'});

      expect(updateAccessTokenRepositorySpy.userId).toBe(loadUserByEmailRepositorySpy.user._id);
      expect(updateAccessTokenRepositorySpy.AccessToken).toBe(tokenGeneratorSpy.AccessToken);
    });
  });
});
