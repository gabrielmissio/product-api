const MongoHelper = require('./../../../../../src/infra/helpers/mongo-helper');
const { MissingParamError } = require('./../../../../../src/utils/errors');
const UpdateAccessTokenRepository = require('./../../../../../src/infra/repositories/update-access-token-repository');
let userModel;

const makeSut = () => {
  return new UpdateAccessTokenRepository();
};

describe('Given the LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    userModel = await MongoHelper.getCollection('users');
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await userModel.deleteMany()
  });

  describe('And calls the save() method', () => {
    test('Then I expect update the user AccessToken', async() => {
      const sut = makeSut();
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
  
  describe('And no access token is provided', () => {
    test('Then I expect it returns a MissingParamError', async() => {
      const sut = makeSut();
      const promise = sut.save('any_id');

      expect(promise).rejects.toThrow(new MissingParamError('accessToken'));
    });
  });

  describe('And no userId is provided', () => {
    test('Then I expect it returns a MissingParamError', async() => {
      const sut = makeSut();
      const promise = sut.save();

      expect(promise).rejects.toThrow(new MissingParamError('userId'));
    });
  });
});