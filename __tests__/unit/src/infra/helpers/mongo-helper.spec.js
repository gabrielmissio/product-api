const MongoHelper = require('./../../../../../src/infra/helpers/mongo-helper');

describe('Given the mongo helper', () => {
  describe('And the db is disconnected', () => {
    test('Then I reconnect when getDb() is invoked', async() => {
      const sut = MongoHelper;

      await sut.connect(process.env.MONGO_URL)
      expect(sut.db).toBeTruthy();

      await sut.disconnect();
      expect(sut.db).toBeFalsy();

      await sut.getDb();
      expect(sut.db).toBeTruthy();
    });
  });
});