const { MissingParamError } = require('./../errors');
const bcrypt = require('bcrypt');

class Encrypter {
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

  async hash(value) {
    if (!value) {
      throw new MissingParamError('value');
    }
    const saltRounds = 10;

    const hashedValue = await bcrypt.hash(value, saltRounds);
    return hashedValue;
  }
};

module.exports = Encrypter;
