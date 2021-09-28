const makeSut = () => {
  class TokenGenerator {
    async generate(value) {
      return null
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
      const token = await sut.generate('any_value');

      expect(token).toBeNull();
    });
  });
});
