const mongoose = require('mongoose');
// const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  }
});

schema.virtual('password').set(function(password) {
  this.hash = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function(password) {
  return bcrypt.compareSync(password, this.hash);
});

module.exports = mongoose.model('User', schema);
