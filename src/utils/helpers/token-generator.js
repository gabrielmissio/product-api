const { MissingParamError } = require('./../errors');
const jwt = require('jsonwebtoken');

class TokenGenerator {
  constructor(secret) {
    this.secret = secret;
  }

  async generate(value) {
    if (!this.secret) {
      throw new MissingParamError('secret');
    }

    if (!value) {
      throw new MissingParamError('value');
    }

    return jwt.sign({ _id: value }, this.secret);
  };
};

module.exports = TokenGenerator;
