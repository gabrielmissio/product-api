const router = require('express').Router();
const loginRoutes = require('./../routes/login-routes');
const productRoutes = require('./../routes/product-routes');

module.exports = app => {
  app.use('/', router);
  loginRoutes(router);
  productRoutes(router);
};
