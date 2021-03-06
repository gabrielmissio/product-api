const { MissingParamError } = require('../../../utils/errors');

class AuthUsecase {
  constructor({ loadUserByEmailRepository, encrypter, tokenGenerator, updateAccessTokenRepository } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
    this.encrypter = encrypter;
    this.tokenGenerator = tokenGenerator;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  };

  async auth({ email, password }) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }

    const user = await this.loadUserByEmailRepository.load(email);
    const isValid = user && await this.encrypter.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    const token = await this.tokenGenerator.generate(user._id);
    await this.updateAccessTokenRepository.save(user._id, token);
    return token;
  };
};

module.exports = AuthUsecase;
