module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/product-api',
  secret: process.env.TOKEN_SECRET || 'secret',
  port: 3000
};
