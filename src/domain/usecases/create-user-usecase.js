class CreateUserUsecase {
  constructor({ createUserRepository, createUserFactory } = {}) {
    this.createUserRepository = createUserRepository;
    this.createUserFactory = createUserFactory;
  };

  async create({ email, password }) {
    const user = await this.createUserFactory.create({ email, password });

    const dbResponse = await this.createUserRepository.create(user);
    return dbResponse;
  };
};

module.exports = CreateUserUsecase;
