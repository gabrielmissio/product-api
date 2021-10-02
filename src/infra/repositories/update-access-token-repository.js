const { MissingParamError } = require('../../utils/errors');
const MongoHelper = require('./../helpers/mongo-helper');

class UpdateAccessTokenRepository {
  async save(userId, accessToken) {
    if (!userId) {
      throw new MissingParamError('userId');
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken');
    }

    const db = await MongoHelper.getDb();
    await db.collection('users')
      .updateOne({
        _id: userId
      }, {
        $set: {
          accessToken
        }
      });
  };
};

module.exports = UpdateAccessTokenRepository;
