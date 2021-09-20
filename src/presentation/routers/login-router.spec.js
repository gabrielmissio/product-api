class LoginRouter {
  async route (httpRequest) {
    if (!httpRequest.body.email) {
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
});
