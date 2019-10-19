const {User} = require('../models/db');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'mySecret';

let controller = {
  authenticationMiddleware(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
      res.status(401).send('Unauthorized: No token provided');
    } else {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          res.status(401).send('Unauthorized: Invalid token');
        } else {
          let {username, role, _id} = decoded
          req.user = {username, role, _id}
          next();
        }
      });
    }
  },
  csrfMiddleware(req, res, next) {
    res.cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, { sameSite: true, httpOnly: true });
    next()
  },
  authenticate(req, res) {
    let { username, password, api } = req.body;
    username = req.sanitize(username)
    password = req.sanitize(password)
    api = req.sanitize(api)
    User.findOne({ username }, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401).json({
            error: 'Incorrect username or password'
          });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(500).json({ error: 'Internal error please try again' });
          } else if (!result) {
            res.status(401).json({ error: 'Incorrect username or password' });
          } else {
            // Issue token
            const payload = { username: user.username, role: user.role || 'user', _id: user._id };
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
              res.json({success: true, user})
            
          }
        })
      }
    });
  },
  checkFields: [
    check('password').isLength({ min: 5 }),
    check('username').isLength({ min: 5 })
  ],
  addUser(req, res) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send('validation errors!')
    } else {
      let {username, password, api, redirect} = req.body
      username = req.sanitize(username)
      password = req.sanitize(password)
      api = req.sanitize(api)
      redirect = req.sanitize(redirect)

      bcrypt.hash(password, saltRounds, function(err, hash) {
        const user = new User({ username, password: hash, role: 'user' }); 
        user.save(function (err, user) {
          if (err) {
            res.status(400).send('Cannot save')
          } else {
            if (api === 'false') {
              if (redirect === 'home') {
                controller.authenticate(req, res)
              } else {
                let url = req.header('Referer') || '/';
                res.redirect(url)
              }
            } else {
              res.json({success: true, user})
            }
          }
        });
      });
    }
  },
  getUser(req, res) {
    let {userId} = req.params
    userId = req.sanitize(userId)
    User.findById(userId, (err, user) => {
      if(err) {
        res.status(400).send('Cannot Find user!')
      } else {
        res.json(user)
      }
    })
  },
  getUsers(req, res) {
    User.find({}, (err, users) => {
      if(err) {
        res.status(400).send('Cannot Find users!')
      } else {
        let noAdmin = users.filter(user => user.username !== 'admin')
        let usersMapped = noAdmin.map(({username, role, _id, monthlyFees}) => ({username, role, _id, monthlyFees}))
        res.json({users: usersMapped})
      }
    })
  },

  userPaysFee(req, res) {
    let currentUser = req.user
    let { userId } = req.params
    let { creditCardNumber, api } = req.body
    userId = req.sanitize(userId)
    api = req.sanitize(api)
    creditCardNumber = req.sanitize(creditCardNumber) 
    if (creditCardNumber !== '1234-1234') {
      res.status(402).send('Invalid Credit card number')
    } else if (currentUser._id !== userId) {
      res.status(401).send('Unauthorized')
    } else {
      User.findById(userId, (err, user) => {
        if(err) {
          res.status(500).send('Cannot find user!')
        } else {
          user.monthlyFees.push({month: new Date().getMonth()})
          user.save((err, user) => {
            if (err) {
              res.status(400).send('Cannot save')
            } else {
              res.json({success: true, user})
            }
          });
        }
      })
    }
  },
  deleteUser(req, res) {
    let {userId } = req.params
    let { api, redirect } = req.body
    userId = req.sanitize(userId)
    api = req.sanitize(api)
    redirect = req.sanitize(redirect)
    if (req.user.role === 'admin' || req.user._id === userId) {
      User.findById(userId, (err, user) => {
        if(err) {
          res.status(400).send('Could not delete user with id: ' + userId)
        } else {
          user.remove(() => {
              res.json({status: 'success'})
          })
        }
      });
    } else {
      res.status(401).send('not authenticate')
    }
  },
  updateUser(req, res) {
    let {userId} = req.params // url params
    let { api } = req.body
    userId = req.sanitize(userId)
    api = req.sanitize(api)
    let {user} = req.body
    if (api === 'false') {
      user = req.body
    }
    User.findById(userId, (err, oldUser) => {
      if(err) {
        res.status(400).send('Something broke!')
      } else {
        if (user.username) {
          oldUser.username = req.sanitize(user.username)
        }

        if (req.user.role === 'admin') {
          oldUser.role = user.role
        }
        if (user.password) {
          bcrypt.hash(user.password, saltRounds, function(err, hash) {
            oldUser.password = hash
            oldUser.save(function (err) {
              if (err) {
                res.status(400).send('Something broke!')
              } else {
                if (api === 'false') {
                  let backURL = req.header('Referer') || '/';
                  res.redirect(backURL)
                } else {
                  res.json({status: 'success', user: oldUser})
                }
              }
            });
          });
        } else {
          oldUser.save((err, user) => {
            if (err) {
              res.status(500).send('Cannot update user!')
            } else {
              if (api === 'false') {
                let backURL = req.header('Referer') || '/';
                res.redirect(backURL)
              } else {
                res.json({status: 'success', user})
              }
            } 
          })
        }
      }
    })
  }
};

module.exports = controller;
