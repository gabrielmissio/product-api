class User {
  constructor(payload) {
    this._id = payload._id;
    this.email = payload.email;
    this.password = payload.password;
  }
}

module.exports = User;
