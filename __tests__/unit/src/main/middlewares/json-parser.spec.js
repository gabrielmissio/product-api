const request = require('supertest');
const app = require('./../../../../../src/main/config/app');

describe('Given the JSON Parser Middleware', () => {
  describe('And recive a post request', () => {
    test('Then I expect its parse the request body to JSON', async() => {
      app.post('/test_json_parser', (req, res) => {
        return res.send(req.body);
      });

      await request(app)
        .post('/test_json_parser')
        .send({ any_key: 'any_value' })
        .expect({ any_key: 'any_value' });
    });
  });
});
