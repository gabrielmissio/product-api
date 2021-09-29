module.exports = {
  token: 'any_token',

  sign(value, secret) {
    this.value = value;

    return this.token;
  }
};
