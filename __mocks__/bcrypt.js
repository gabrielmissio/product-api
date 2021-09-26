module.exports = {
  isValid: true,

  async compare(password, hashedPassword) {
    return this.isValid;
  }
};
