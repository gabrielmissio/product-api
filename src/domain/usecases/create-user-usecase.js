const { MissingParamError, RequestError } = require('./../../utils/errors');
const { errorMessages: { USER_ALREADY_EXISTS } } = require('./../../utils/enums');
const { httpCodes: { CONFLICT } } = require('./../../utils/enums');

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
      throw new RequestError({
        message: USER_ALREADY_EXISTS,
        code: CONFLICT
      });
    }

    const user = await this.createUserFactory.create({ email, password });

    const dbResponse = await this.createUserRepository.create(user);
    return dbResponse;
  };
};

module.exports = CreateUserUsecase;
