const User = require('../models/user-model');

class CreateUserFactory {
  constructor({ encrypter }) {
    this.encrypter = encrypter;
  }

  async create({ email, password }) {
    const hash = await this.encrypter.hash(password);

    return new User({
      email,
      password: hash,
      updatedAt: new Date(),
      insertedAt: new Date()
    });
  };
};

module.exports = CreateUserFactory;
