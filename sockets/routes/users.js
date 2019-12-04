const request = require('request');

exports = module.exports = function(io){
  io.on('connection', (socket) => {

    function getUsers(group){
      console.log(group);
      request('http://localhost:3000/api/users/get', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //Send the data to socket
          const data = JSON.parse(body);
          console.log(data);
          io.emit('users', data);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-users', (group) => {
      getUsers(group);
    });

  });
};
