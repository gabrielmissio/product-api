class InvalidRequestError extends Error {
  constructor(erros) {
    super(`Invalid request: ${erros}`);
    this.name = 'InvalidRequestError';
  };
};

module.exports = InvalidRequestError;
