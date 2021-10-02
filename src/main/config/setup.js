const cors = require('./../middlewares/cors');

module.exports = app => {
  app.use(cors);
};
