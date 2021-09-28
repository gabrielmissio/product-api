const jwt = require('jsonwebtoken');

const makeSut = () => {
  class TokenGenerator {
    async generate(value) {
      return jwt.sign(value, 'secret');
    };
  }
  const sut = new TokenGenerator();

  return {
    sut
  };
};

describe('Given the TokenGenerator', () => {
  describe('And JWT returns null', () => {
    test('Then I expect it returns null', async() => {
      const { sut } = makeSut();
      jwt.token = null;
      const token = await sut.generate('any_value');

      expect(token).toBeNull();
    });
  });
});

describe('Given the TokenGenerator', () => {
  describe('And JWT returns a token', () => {
    test('Then I expect it returns a token', async() => {
      const { sut } = makeSut();
      const token = await sut.generate('any_value');

      expect(token).toBe(jwt.token);
    });
  });
});
