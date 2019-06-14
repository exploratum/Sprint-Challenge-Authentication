const axios = require('axios');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user) {

  const payload = {
    subject: user.id, // standard claim = sub
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  const secret = process.env.JWT_SECRET;

  return jwt.sign(payload, secret, options);
}


function generateToken(user) {

  const payload = {
    subject: user.id, // standard claim = sub
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  const secret = process.env.JWT_SECRET;

  return jwt.sign(payload, secret, options);
}
