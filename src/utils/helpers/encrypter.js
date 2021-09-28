const { MissingParamError } = require('./../errors');
const bcrypt = require('bcrypt');

module.exports = class Encrypter {
  async compare(value, hash) {
    if (!value) {
      throw new MissingParamError('value');
    }

    if (!hash) {
      throw new MissingParamError('hash');
    }

    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  };
};
