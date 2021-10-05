const LoginRouter = require('../../../presentation/routers/users/login-router');
const AuthUseCase = require('../../../domain/usecases/users/auth-usecase');
const LoadUserByEmailRepository = require('../../../infra/repositories/users/load-user-by-email-repository');
const UpdateAccessTokenRepository = require('../../../infra/repositories/users/update-access-token-repository');
const Encrypter = require('../../../utils/helpers/encrypter');
const TokenGenerator = require('../../../utils/helpers/token-generator');
const RequestValidator = require('../../../presentation/validators/request-validator');
const { loginValidatorSchema } = require('../../../presentation/validators/schemas');
const env = require('../../config/env');

class LoginRouterComposer {
  static compose() {
    const loadUserByEmailRepository = new LoadUserByEmailRepository();
    const updateAccessTokenRepository = new UpdateAccessTokenRepository();
    const encrypter = new Encrypter();
    const tokenGenerator = new TokenGenerator(env.secret);
    const requestValidator = new RequestValidator(loginValidatorSchema);

    const authUseCase = new AuthUseCase({
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      encrypter,
      tokenGenerator
    });

    return new LoginRouter({
      authUseCase,
      requestValidator
    });
  }
};

module.exports = LoginRouterComposer;
