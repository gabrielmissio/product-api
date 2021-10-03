const { adapt } = require('./../adapters/express-router-adapter');
const LoginRouterComposer = require('./../composers/login-router-composer');
const SignupRouterComposer = require('./../composers/signup-router-composer');

module.exports = router => {
  router.post('/login', adapt(LoginRouterComposer.compose()));
  router.post('/signup', adapt(SignupRouterComposer.compose()));
};
