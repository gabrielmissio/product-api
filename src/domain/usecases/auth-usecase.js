const { MissingParamError } = require('./../helpers/errors');

module.exports = class AuthUsecase {
  constructor({ loadUserByEmailRepository, encrypter, tokenGenerator }) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
    this.encrypter = encrypter;
    this.tokenGenerator = tokenGenerator;
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

    if (isValid) {
      const token = await this.tokenGenerator.generate(user.id);
      return token;
    }

    return null;
  };
};
