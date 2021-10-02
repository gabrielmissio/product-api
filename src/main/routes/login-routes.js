const { adapt } = require('./../adapters/express-router-adapter');
const LoginRouterCompose = require('./../composers/login-router-composer');

module.exports = router => {
  router.post('/login', adapt(LoginRouterCompose.compose()));
};
