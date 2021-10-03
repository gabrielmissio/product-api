const { adapt } = require('./../adapters/express-router-adapter');
const CreateProductRouterComposer = require('./../composers/products/create-product-router-composer');
const ListProductsRouterComposer = require('./../composers/products/list-products-router-composer');
const DetailProductsRouterComposer = require('./../composers/products/detail-products-router-composer');

module.exports = router => {
  router.post('/products', adapt(CreateProductRouterComposer.compose()));
  router.get('/products', adapt(ListProductsRouterComposer.compose()));
  router.get('/products/:productsId', adapt(DetailProductsRouterComposer.compose()));
};
