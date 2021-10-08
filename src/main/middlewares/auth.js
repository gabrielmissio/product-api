const jwt = require('jsonwebtoken');
const { secret } = require('./../config/env');
const { httpCodes: { UNAUTHORIZED }, errorMessages: { AUTHORIZATION_HEADER_IS_REQUIRED, TOKEN_MALFORMED, INVALID_TOKEN } } = require('./../../utils/enums');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(UNAUTHORIZED).json({ error: AUTHORIZATION_HEADER_IS_REQUIRED });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(UNAUTHORIZED).json({ error: TOKEN_MALFORMED });
  }

  const [schema, token] = parts;
  if (schema !== 'Bearer') {
    return res.status(UNAUTHORIZED).json({ error: TOKEN_MALFORMED });
  }

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.status(UNAUTHORIZED).json({ error: INVALID_TOKEN });
    }

    req.userId = data.id;
    return next();
  });
};
