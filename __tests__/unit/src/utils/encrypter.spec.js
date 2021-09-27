const bcrypt = require('bcrypt');

const makeSut = () => {
  class Encrypter{
    async compare(password, hashedPassword) {
      const isValid = await bcrypt.compare(password, hashedPassword);
      return isValid;
    };
  }
  const sut = new Encrypter();

  return {
    sut
  };
};

describe('Given the encrypter', () => {
  describe('And bcrypt returns true', () => {
    test('Then I expect it returns true', async() => {
      const { sut } = makeSut();
      const isValid = await sut.compare('any_password', 'any_hashed_password');

      expect(isValid).toBe(true);
    });
  });

  describe('And bcrypt returns false', () => {
    test('Then I expect it returns false', async() => {
      const { sut } = makeSut();
      bcrypt.isValid = false;
      const isValid = await sut.compare('any_password', 'any_hashed_password');

      expect(isValid).toBe(false);
    });
  });
});