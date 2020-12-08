const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  mail: { type: String, required: true},
  password: { type: String, required: true},
  name: { type: String, required: true},
  secondName: { type: String, required: true},
  admin:  {type: Boolean, required: true},
  groupAdmin:  {type: Boolean, required: true},
  groupId:  {type: String, required: false}
});

module.exports = mongoose.model('User', userSchema);
