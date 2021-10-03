class NotFoundError extends Error {
  constructor(data) {
    super(`${data} not found`);
    this.name = 'NotFoundError';
  };
};

module.exports = NotFoundError;
