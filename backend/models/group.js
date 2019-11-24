const mongoose = require('mongoose');
const userSchema = require ('../models/user').schema;

const groupSchema = mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  users: [{type: userSchema, required: false}]
});

module.exports = mongoose.model('Group', groupSchema);
