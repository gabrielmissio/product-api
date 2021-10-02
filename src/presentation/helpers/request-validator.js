class RequestValidator {
  constructor(schema) {
    this.schema = schema;
  };

  validate(payload) {
    const { error } = this.schema.validate(payload, { abortEarly: false });
    return error;
  };
};

module.exports = RequestValidator;
