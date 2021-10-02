const cors = require('./../middlewares/cors');
const jsonParser = require('./../middlewares/json-parser');

module.exports = app => {
  app.use(cors);
  app.use(jsonParser);
};
