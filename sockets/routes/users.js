const request = require('request');

exports = module.exports = function(io){
  io.on('connection', (socket) => {

    function getUsersByGroup(group){
      request('http://localhost:3000/api/users/getByGroup' + group._id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //Send the data to socket
          const data = JSON.parse(body);
          console.log(data);
          io.emit('users-by-group', data.users);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-users-by-group', (group) => {
      getUsersByGroup(group);
    });

    function getUsersWithoutGroup(){
      request('http://localhost:3000/api/users/getWithoutGroup', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //Send the data to socket
          const data = JSON.parse(body);
          io.emit('users-without-group', data.users);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-users-without-group', () => {
      getUsersWithoutGroup();
    });

  });
};
