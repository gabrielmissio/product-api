const request = require('supertest');
const app = require('./../../../../../src/main/config/app');

describe('Given the CORS Middleware', () => {
  describe('And the cors settings is checked', () => {
    test('Then I expect its value is *', async() => {
      app.get('/test_cors', (req, res) => {
        return res.send('');
      });

      const res = await request(app).get('/test_cors');
      expect(res.headers['access-control-allow-origin']).toBe('*');
      expect(res.headers['access-control-allow-methods']).toBe('*');
      expect(res.headers['access-control-allow-headers']).toBe('*');
    });
  });
});
