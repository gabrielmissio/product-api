const { MissingParamError } = require('./../helpers/errors');

module.exports = class AuthUsecase {
  async auth({ email, password }) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }
  }
};
