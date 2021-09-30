const MongoHelper = require('./../../../../../src/infra/helpers/mongo-helper');
const LoadUserByEmailRepository = require('./../../../../../src/infra/repositories/load-user-by-email-repository');
let db;

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new LoadUserByEmailRepository(userModel);

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

  describe('And provide a non-existent email', () => {
    test('Then I expect it returns null', async() => {
      const { sut } = makeSut();
      const user = await sut.load('non_existent@email.com');

      expect(user).toBeNull();
    });
  });

  describe('And provide an existing email', () => {
    test('Then I expect it returns a user', async() => {
      const { sut, userModel } = makeSut();
      await userModel.insertOne({
        email: 'valid@mail.com'
      });
      const user = await sut.load('valid@mail.com');

      expect(user.email).toBe('valid@mail.com');
    });
  });
});