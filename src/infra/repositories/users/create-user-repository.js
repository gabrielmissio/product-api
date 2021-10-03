const { MissingParamError } = require('../../../utils/errors');
const MongoHelper = require('../../helpers/mongo-helper');

class CreateUserRepository {
  async create(user) {
    if (!user) {
      throw new MissingParamError('user');
    }

    const userModel = await MongoHelper.getCollection('users');
    const dbResponse = await userModel.insertOne(user);

    return dbResponse;
  };
};

module.exports = CreateUserRepository;
