const { adapt } = require('./../adapters/express-router-adapter');
const ProductPurchaseRouterComposer = require('./../composers/purchases/product-purchase-router-composer');

module.exports = router => {
  router.post('/purchase', adapt(ProductPurchaseRouterComposer.compose()));
};
