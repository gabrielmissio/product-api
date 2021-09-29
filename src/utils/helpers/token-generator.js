const { MissingParamError } = require('./../errors');
const jwt = require('jsonwebtoken');

module.exports = class TokenGenerator {
  constructor(secret) {
    this.secret = secret;
  }

  async generate(value) {
    if (!this.secret) {
      throw new MissingParamError('secret');
    }

    return jwt.sign(value, this.secret);
  };
};
