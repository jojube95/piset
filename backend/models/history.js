const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    subtaskId: {type: String, required: true},
    subtaskName: {type: String, required: true},
    subtaskPenalty: {type: String, required: true},
    subtaskDone: {type: Boolean, required: true},
    userId: {type: String, required: true},
<<<<<<< HEAD
=======
    userName: {type: String, required: true},
    groupId: {type: String, required: true},
    groupName: {type: String, required: true},
>>>>>>> dev
    dateIni: {type: Date, required: true},
    dateFin: {type: Date, required: true}
});

module.exports = mongoose.model('History', historySchema);
