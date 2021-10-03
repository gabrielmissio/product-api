const SignupRouter = require('./../../presentation/routers/signup-router');
const SignupValidator = require('./../../presentation/validators/signup-validator');
const CreateUserUseCase = require('./../../domain/usecases/create-user-usecase');
const CreateUserRepository = require('./../../infra/repositories/create-user-repository');
const CreateUserFactory = require('./../../infra/factories/create-user-factory');
const Encrypter = require('./../../utils/helpers/encrypter');

class LoginRouterComposer {
  static compose() {
    const encrypter = new Encrypter();
    const signupValidator = new SignupValidator();
    const createUserRepository = new CreateUserRepository();
    const createUserFactory = new CreateUserFactory({
      encrypter
    });

    const createUserUseCase = new CreateUserUseCase({
      createUserRepository,
      createUserFactory
    });
    return new SignupRouter({
      createUserUseCase,
      requestValidator: signupValidator
    });
  }
};

module.exports = LoginRouterComposer;
