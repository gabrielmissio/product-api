const { MissingParamError, ConflictError } = require('./../../utils/errors');
const { ALREADY_EXISTS } = require('./../helpers/error-message');

class CreateUserUsecase {
  constructor({ createUserRepository, createUserFactory, loadUserByEmailRepository } = {}) {
    this.createUserRepository = createUserRepository;
    this.createUserFactory = createUserFactory;
    this.loadUserByEmailRepository = loadUserByEmailRepository;
  };

  async create({ email, password }) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }

    const existingUser = await this.loadUserByEmailRepository.load(email);
    if (existingUser) {
      throw new ConflictError(ALREADY_EXISTS('user'));
    }

    const user = await this.createUserFactory.create({ email, password });

    const dbResponse = await this.createUserRepository.create(user);
    return dbResponse;
  };
};

module.exports = CreateUserUsecase;
