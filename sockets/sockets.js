'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
//let groups = require('./routes/groups')(io);
let groups = require('./routes/groups')(io.of('groups'));
let users = require('./routes/users')(io.of('users'));
let tasks = require('./routes/tasks')(io.of('tasks'));
let subtasks = require('./routes/subtasks')(io.of('subtasks'));
let penalties = require('./routes/penalties')(io.of('penalties'));


http.listen(5000, () => {
  console.log('started on port 5000');
});
