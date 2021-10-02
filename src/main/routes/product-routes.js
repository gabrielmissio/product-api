const { adapt } = require('./../adapters/express-router-adapter');
const CreateProductRouterCompose = require('./../composers/create-product-router-composer');
const CreateProductRouterComposer = require('./../composers/list-products-router-composer');

module.exports = router => {
  router.post('/products', adapt(CreateProductRouterCompose.compose()));
  router.get('/products', adapt(CreateProductRouterComposer.compose()));
};
