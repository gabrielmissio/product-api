const { MissingParamError } = require('../../utils/errors');

module.exports = class LoadUserByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    if (!this.userModel) {
      throw new MissingParamError('userModel');
    }
    if (!email) {
      throw new MissingParamError('email');
    }

    const projection = {
      password: 1
    };

    const user = this.userModel.findOne({ email }, projection);
    return user;
  };
};
