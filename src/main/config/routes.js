const router = require('express').Router();
const loginRoutes = require('./../routes/login-routes');
const productRoutes = require('./../routes/product-routes');
const purchasesRoutes = require('./../routes/purchases-routes');
const authMiddleware = require('./../middlewares/auth');

module.exports = app => {
  app.use('/', router);
  loginRoutes(router);

  router.use(authMiddleware);
  productRoutes(router);
  purchasesRoutes(router);
};
