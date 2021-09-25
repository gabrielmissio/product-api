const { MissingParamError } = require('./../helpers/errors');

module.exports = class AuthUsecase {
  constructor(loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
  };

  async auth({ email, password }) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }

    await this.loadUserByEmailRepository.load(email);
  }
};
