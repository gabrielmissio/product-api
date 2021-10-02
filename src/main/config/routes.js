const router = require('express').Router();

module.exports = app => {
  require('./../routes/login-routes')(router);
};
