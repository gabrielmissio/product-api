const MongoHelper = require('./../../../../../src/infra/helpers/mongo-helper');
const { MissingParamError } = require('./../../../../../src/utils/errors');
const UpdateAccessTokenRepository = require('./../../../../../src/infra/repositories/update-access-token-repository');
let db;

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new UpdateAccessTokenRepository(userModel);

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
      expect(updatedFakeUser.accessToken).toBe('valid_token');
    });
  });
  
  describe('And no userModel is provided', () => {
    test('Then I expect it returns a MissingParamError', async() => {
      const sut = new UpdateAccessTokenRepository();
      const promise = sut.save('any_id', 'valid_token');

      expect(promise).rejects.toThrow(new MissingParamError('userModel'));
    });
  });

  describe('And no access token is provided', () => {
    test('Then I expect it returns a MissingParamError', async() => {
      const { sut } = makeSut();
      const promise = sut.save('any_id');

      expect(promise).rejects.toThrow(new MissingParamError('accessToken'));
    });
  });

  describe('And no userId is provided', () => {
    test('Then I expect it returns a MissingParamError', async() => {
      const { sut } = makeSut();
      const promise = sut.save();

      expect(promise).rejects.toThrow(new MissingParamError('userId'));
    });
  });
});