module.exports = class AuthUsecase {
  async auth({ email, password }) {
    if (!email) {
      return null;
    }
  }
};
