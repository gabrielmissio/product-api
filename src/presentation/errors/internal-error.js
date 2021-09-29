module.exports = class InternalError extends Error {
  constructor() {
    super('INTERNAL_SERVER_ERROR');
    this.name = 'InternalError';
  };
};
