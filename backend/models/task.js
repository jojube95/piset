const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: {type: String, required: true},
  groupId: {type: String, required: true},
  userId: {type: String, required: false}
});

module.exports = mongoose.model('Task', taskSchema);
