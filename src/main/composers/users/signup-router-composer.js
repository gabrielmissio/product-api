const SignupRouter = require('../../../presentation/routers/users/signup-router');
const CreateUserUseCase = require('../../../domain/usecases/users/create-user-usecase');
const CreateUserRepository = require('../../../infra/repositories/users/create-user-repository');
const CreateUserFactory = require('../../../infra/factories/create-user-factory');
const LoadUserByEmailRepository = require('../../../infra/repositories/users/load-user-by-email-repository');
const Encrypter = require('../../../utils/helpers/encrypter');
const RequestValidator = require('../../../presentation/validators/request-validator');
const { signupValidatorSchema } = require('../../../presentation/validators/schemas');

class LoginRouterComposer {
  static compose() {
    const encrypter = new Encrypter();
    const requestValidator = new RequestValidator(signupValidatorSchema);
    const createUserRepository = new CreateUserRepository();
    const loadUserByEmailRepository = new LoadUserByEmailRepository();
    const createUserFactory = new CreateUserFactory({
      encrypter
    });

    const createUserUseCase = new CreateUserUseCase({
      createUserRepository,
      createUserFactory,
      loadUserByEmailRepository
    });

    return new SignupRouter({
      createUserUseCase,
      requestValidator
    });
  }
};

module.exports = LoginRouterComposer;
