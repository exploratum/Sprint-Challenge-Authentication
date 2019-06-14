const axios = require('axios');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('./model');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {

  if(req.body.username && req.body.password) {
    const user = req.body;
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.password = hash;

    try {
      const id = await model.add(user)
      const token = generateToken(user);
      res.status(201).json({message: `new user id: ${id}`, token});
    }

    catch {
      res.status(500).json({"errorMessage": "That was a problem adding the record(s)"})
    }
  }
  else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
}

async function login(req, res) {
  if(req.body.username && req.body.password) {
    let {username, password} = req.body;

    try {
      const user = await model.findBy({username});
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({message:`welcome ${user.username}`, token})
      }
      else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    }
    catch {
      res.status(500).json({"errorMessage": "That was a problem loggin you in"})
    }
  }
  else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
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

/*****************************************************************************/
/*                      Create token for a user                              */
/*************************************************************************** */

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
