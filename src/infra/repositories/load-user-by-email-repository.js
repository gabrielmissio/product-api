const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('./../helpers/mongo-helper');

module.exports = class LoadUserByEmailRepository {
  async load(email) {
    if (!email) {
      throw new MissingParamError('email');
    }

    const db = await MongoHelper.getDb();
    const projection = {
      password: 1
    };

    const user = await db.collection('users')
      .findOne({ email }, projection);

    return user;
  };
};
