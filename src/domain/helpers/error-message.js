class ErrorMessage {
  static ALREADY_EXISTS(data) {
    return `${data} already exists`;
  }
};

module.exports = ErrorMessage;
