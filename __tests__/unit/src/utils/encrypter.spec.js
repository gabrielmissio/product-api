const bcrypt = require('bcrypt');
const Encrypter = require('../../../../src/utils/helpers/encrypter');

const makeSut = () => {
  const sut = new Encrypter();

  return {
    sut
  };
};

describe('Given the encrypter', () => {
  describe('And bcrypt returns true', () => {
    test('Then I expect it returns true', async() => {
      const { sut } = makeSut();
      const isValid = await sut.compare('any_value', 'any_hashed_value');

      expect(isValid).toBe(true);
    });
  });

  describe('And bcrypt returns false', () => {
    test('Then I expect it returns false', async() => {
      const { sut } = makeSut();
      bcrypt.isValid = false;
      const isValid = await sut.compare('any_value', 'any_hashed_value');

      expect(isValid).toBe(false);
    });
  });

  describe('And calls compare method from bcrypt', () => {
    test('Then I expect it calls bcrypt with expected params', async() => {
      const { sut } = makeSut();
      await sut.compare('any_value', 'any_hashed_value');

      expect(bcrypt.value).toBe('any_value');
      expect(bcrypt.hash).toBe('any_hashed_value');
    });
  });
});