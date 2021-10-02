const request = require('supertest');
const app = require('./../../../../../src/main/config/app');

describe('Given the App Setup', () => {
  describe('And access-control-allow-origin header value si checked', () => {
    test('Then I expect its value is *', async() => {
      app.get('/test_cors', (req, res) => {
        return res.send('');
      });

      const res = await request(app).get('/test_cors');
      expect(res.headers['access-control-allow-origin']).toBe('*');
    });
  });
});
