module.exports = class LoadUserByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    const projection = {
      password: 1
    };

    const user = this.userModel.findOne({ email }, projection);
    return user;
  };
};
