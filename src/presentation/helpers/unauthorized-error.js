module.exports = class MissingParamError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  };
};
