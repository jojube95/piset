const mongoose = require('mongoose');
const userSchema = require ('../models/user').schema;

const groupSchema = mongoose.Schema({
  name: {type: String, required: true}
});

module.exports = mongoose.model('Group', groupSchema);
