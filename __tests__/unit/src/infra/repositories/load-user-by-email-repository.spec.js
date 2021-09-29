const makeSut = () => {
  class LoadUserByEmailRepository {
    async load(email) {
      return null;
    };
  }
  const sut = new LoadUserByEmailRepository();

  return{
    sut
  };
};

describe('Given the LoadUserByEmail Repository', () => {
  describe('And no user is found', () => {
    test('Then I expect it returns null', async() => {
      const { sut } = makeSut();
      const user = await sut.load('any@mail.com');

      expect(user).toBeNull();
    });
  });
});