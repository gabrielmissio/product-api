const MongoHelper = require('./../../../../../src/infra/helpers/mongo-helper');
const { MissingParamError } = require('./../../../../../src/utils/errors');
let db;

class updateAccessTokenRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async save(userId, AccessToken) {
    await this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        AccessToken
      }
    });
  };
};

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new updateAccessTokenRepository(userModel);

  return {
    sut,
    userModel
  };
};

describe('Given the LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    db = await MongoHelper.getDb();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  });

  describe('And calls the save() method', () => {
    test('Then I expect update the user AccessToken', async() => {
      const { sut, userModel } = makeSut();
      const fakeUser = await userModel.insertOne({
        email: 'valid@email.com',
        name: 'any_name',
        password: 'any_hashed_password'
      });

      const _id = fakeUser.insertedId;
      await sut.save(_id, 'valid_token');
      const updatedFakeUser = await userModel.findOne({ _id });
      expect(updatedFakeUser.AccessToken).toBe('valid_token');
    });
  });  
});