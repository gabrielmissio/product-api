class ConflictError extends Error {
  constructor(data) {
    super(`ConflictError: ${data}`);
    this.name = 'ConflictError';
  }
};

module.exports = ConflictError;
