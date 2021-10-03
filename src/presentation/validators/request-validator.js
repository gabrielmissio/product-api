class RequestValidator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(params) {
    const { error } = this.schema.validate(params);
    return error;
  };
};

module.exports = RequestValidator;
