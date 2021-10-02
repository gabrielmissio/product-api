const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('./../helpers/mongo-helper');

module.exports = class LoadUserByEmailRepository {
  async load(email) {
    if (!email) {
      throw new MissingParamError('email');
    }

    const userModel = await MongoHelper.getCollection('users');
    const projection = {
      password: 1
    };

    const user = await userModel.findOne({ email }, projection);

    return user;
  };
};
