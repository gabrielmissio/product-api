const { adapt } = require('./../adapters/express-router-adapter');
const CreateProductRouterCompose = require('./../composers/create-product-router-composer');

module.exports = router => {
  router.post('/products', adapt(CreateProductRouterCompose.compose()));
};
