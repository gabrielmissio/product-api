class RequestError extends Error {
  constructor({ message, code }) {
    super(`RequestError: ${message}`);
    this.name = 'RequestError';
    this.code = code;
  }
};

module.exports = RequestError;
