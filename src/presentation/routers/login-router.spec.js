class LoginRouter {
  async route (httpRequest) {
    const { email, password } = httpRequest;
    if (!email || !password) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Given the login routes', () => {
  describe('And no email is provided', () => {
    test('Then I expect it returns 400', async() => {
      const sut = new LoginRouter();
      const httpRequest = {
        body: {
          password: 'any_password'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
    });
  });

  describe('And no password is provided', () => {
    test('Then I expect it returns 400', async() => {
      const sut = new LoginRouter();
      const httpRequest = {
        body: {
          email: 'any_email'
        }
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
    });
  });
});
