const jwt = require('jsonwebtoken');

module.exports = class TokenGenerator {
  constructor(secret) {
    this.secret = secret;
  }

  async generate(value) {
    return jwt.sign(value, this.secret);
  };
};
