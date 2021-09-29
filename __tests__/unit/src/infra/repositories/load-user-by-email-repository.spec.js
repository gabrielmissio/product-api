const { MongoClient } = require('mongodb');

class LoadUserByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    const user = this.userModel.findOne({ email });
    return user;
  };
}

describe('Given the LoadUserByEmail Repository', () => {
  let client, db;

  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db();
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  });

  describe('And provide a non-existent email', () => {
    test('Then I expect it returns null', async() => {
      const userModel = db.collection('users');
      const sut = new LoadUserByEmailRepository(userModel);
      const user = await sut.load('non_existent@email.com');

      expect(user).toBeNull();
    });
  });

  describe('And provide an existing email', () => {
    test('Then I expect it returns a user', async() => {
      const userModel = db.collection('users');
      await userModel.insertOne({
        email: 'valid@mail.com'
      });
      const sut = new LoadUserByEmailRepository(userModel);
      const user = await sut.load('valid@mail.com');

      expect(user.email).toBe('valid@mail.com');
    });
  });
});