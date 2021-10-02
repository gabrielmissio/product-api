const MongoHelper = require('./../../../../../src/infra/helpers/mongo-helper');

describe('Given the mongo helper', () => {
  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('And the db is disconnected', () => {
    test('Then I expect that its reconnect when getCollection() is invoked', async() => {
      const sut = MongoHelper;

      await sut.connect(process.env.MONGO_URL)
      expect(sut.db).toBeTruthy();

      await sut.disconnect();
      expect(sut.db).toBeFalsy();

      await sut.getCollection('any_collection');
      expect(sut.db).toBeTruthy();
    });
  });
});