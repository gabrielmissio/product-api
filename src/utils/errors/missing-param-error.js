class MissingParamError extends Error {
  constructor(paramName) {
    super(`Missing param: ${paramName}`);
    this.name = 'MissingParamError';
  }
};

module.exports = MissingParamError;
