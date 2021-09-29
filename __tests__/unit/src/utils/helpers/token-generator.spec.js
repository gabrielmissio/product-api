const jwt = require('jsonwebtoken');
const TokenGenerator = require('./../../../../../src/utils/helpers/token-generator');
const { MissingParamError } = require('../../../../../src/utils/errors');

const makeSut = () => {
  const sut = new TokenGenerator('secret');

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

  describe('And JWT returns a token', () => {
    test('Then I expect it returns a token', async() => {
      const { sut } = makeSut();
      const token = await sut.generate('any_value');

      expect(token).toBe(jwt.token);
    });
  });

  describe('And calls sign method', () => {
    test('Then I expect it calls sign method with expected params', async() => {
      const { sut } = makeSut();
      await sut.generate('any_value');

      expect(jwt.value).toBe('any_value');
      expect(jwt.secret).toBe(sut.secret);
    });
  });

  describe('And no secret is provided', () => {
    test('Then I expect it throws an MissingParamError', async() => {
      const sut = new TokenGenerator();
      const promise = sut.generate('any_value');

      expect(promise).rejects.toThrow(new MissingParamError('secret'));
      
    });
  });
});
