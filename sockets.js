'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const request = require('request');

io.on('connection', (socket) => {
  console.log('user connected');

  function getGroups(){
    request('http://localhost:3000/api/groups/get', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //Send the data to socket
        const data = JSON.parse(body).groups;
        io.emit('groups', data);
      }
      else{
        console.log(error)
      }
    });
  }

  socket.on('get-groups', (message) => {
    getGroups();
  });

  socket.on('group-add', (group) => {
    //Save group
    request.post('http://localhost:3000/api/groups/add', {
      json: {
        group: group
      }
    }, (error, res, body) => {
      if (error) {
        console.error(error)
        return
      }
      else{
        //Emmit data from groups socket
        console.log('group Added');
        getGroups();
      }
    });
  });

  socket.on('group-delete', (group) => {
    //Delete group
    request.post('http://localhost:3000/api/groups/delete', {
      json: {
        group: group
      }
    }, (error, res, body) => {
      if (error) {
        console.error(error)
        return
      }
      else{
        //Emmit data from groups socket
        console.log('group deleted');
        getGroups();
      }
    });
  });
});

http.listen(5000, () => {
  console.log('started on port 5000');
});
