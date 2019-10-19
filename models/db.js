const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost/:27017',{ useNewUrlParser: true });

const userSchema = new mongoose.Schema({ 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  monthlyFees: {
    type: Array
  }
});

const User = conn.model('User', userSchema);


const bcrypt = require('bcryptjs');

const initialUsers = [
  {
    username: 'admin',
    password: 'admin',
    role: 'admin'
  }, {
    username: 'Liisa Kirmaaja',
    password: '12345'
  }, {
    username: 'Matti Juoksija',
    password: '12345'
  }, {
    username: 'Petteri Suunnistaja',
    password: '12345'
  }
]
const addInitialUser = ({username, role = 'user', password}) => {
  User.findOne({username}, (err, user) => {
    if (err || !user) {
      bcrypt.hash(password, 10, function(err, hash) {
        const user = new User({ username, password: hash, role}); 
        user.save();
      });
    }
  })
}

const seedUsers = () => {
  initialUsers.forEach(addInitialUser) 
}

module.exports = {User, seedUsers}