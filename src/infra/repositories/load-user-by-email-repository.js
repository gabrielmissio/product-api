const { MissingParamError } = require('../../utils/errors');

module.exports = class LoadUserByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    if (!this.userModel) {
      throw new MissingParamError('userModel');
    }

    const projection = {
      password: 1
    };

    const user = this.userModel.findOne({ email }, projection);
    return user;
  };
};
