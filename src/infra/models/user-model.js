class User {
  constructor(payload) {
    this._id = payload._id;
    this.email = payload.email;
    this.password = payload.password;
    this.updatedAt = payload.updatedAt;
    this.insertedAt = payload.insertedAt;
  };
};

module.exports = User;
