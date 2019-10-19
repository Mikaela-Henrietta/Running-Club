const ctrl = require('./controllers/controller.js');
const path = require('path');

module.exports = (app) => {
  app.get('/api/users', ctrl.authenticationMiddleware, ctrl.getUsers)
  app.post('/api/users', ctrl.checkFields, ctrl.addUser);
  app.delete('/api/users/:userId', ctrl.authenticationMiddleware, ctrl.deleteUser);
  app.patch('/api/users/:userId', ctrl.authenticationMiddleware, ctrl.updateUser);
  app.post('/api/users/:userId/paymonthlyfee', ctrl.authenticationMiddleware, ctrl.userPaysFee);
  app.get('/api/users/:userId', ctrl.authenticationMiddleware, ctrl.getUser);
  app.post('/api/authenticate', ctrl.authenticate);
  app.get('/api/checkToken', ctrl.authenticationMiddleware, (req, res) => {
    res.json({status: 'success', user: req.user})
  });
  app.post('/api/logout',(req, res) => {
    res.clearCookie('token')
    res.json({status: 'success'})
  });
  app.get('*', ctrl.csrfMiddleware, (req,res) => {
    res.sendFile(path.join(__dirname + '/front-end/build/index.html'));
  });
};
