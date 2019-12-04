'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let groups = require('./routes/groups')(io);



http.listen(5000, () => {
  console.log('started on port 5000');
});
