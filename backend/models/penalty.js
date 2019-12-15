const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  date: {type: Date, required: true},
  amount: {type: Number, required: true},
  groupId: {type: String, required: true},
  userId: {type: String, required: true},
  userName: {type: String, required: true},
  subtaskId: {type: String, required: true},
  subtaskName: {type: String, required: true}
});

module.exports = mongoose.model('Penalty', userSchema);
