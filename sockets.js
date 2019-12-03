'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const request = require('request');

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('caca', function(){
    console.log('caca');
  });

  socket.on('groups', (message) => {
    //Retrieve groups from database
    request('http://localhost:3000/api/groups/get', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //Send the data to socket
        const data = JSON.parse(body).groups;
        console.log(data);
        io.emit('groups', data);
      }
      else{
        console.log(error)
      }
    });


  });
});

http.listen(5000, () => {
  console.log('started on port 5000');
});
