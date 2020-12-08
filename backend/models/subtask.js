const mongoose = require('mongoose');

const subtaskSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  penalty: {type: Number, required: true},
  taskId: {type: String, required: true},
  groupId: {type: String, required: true},
  userId: {type: String, required: false}
});

module.exports = mongoose.model('Subtask', subtaskSchema);
