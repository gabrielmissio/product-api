const LoginRouter = require('./../../presentation/routers/login-router');
const AuthUseCase = require('./../../domain/usecases/auth-usecase');
const LoginValidator = require('./../../presentation/validators/login-validator');
const LoadUserByEmailRepository = require('./../../infra/repositories/load-user-by-email-repository');
const UpdateAccessTokenRepository = require('./../../infra/repositories/update-access-token-repository');
const Encrypter = require('./../../utils/helpers/encrypter');
const TokenGenerator = require('./../../utils/helpers/token-generator');
const env = require('./../config/env');

const loadUserByEmailRepository = new LoadUserByEmailRepository();
const updateAccessTokenRepository = new UpdateAccessTokenRepository();
const encrypter = new Encrypter();
const tokenGenerator = new TokenGenerator(env.secret);
const loginValidator = new LoginValidator();

const authUseCase = new AuthUseCase({
  loadUserByEmailRepository,
  updateAccessTokenRepository,
  encrypter,
  tokenGenerator
});
const loginRouter = new LoginRouter({
  authUseCase,
  loginValidator
});

module.exports = loginRouter;
