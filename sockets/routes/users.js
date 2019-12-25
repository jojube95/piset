const request = require('request');

exports = module.exports = function(io){
  io.on('connection', (socket) => {
    console.log('user connected to socket Users');

    function getUsersByGroup(groupId){
      request('http://localhost:3000/api/users/getByGroup' + groupId, function (error, response, body) {
        if (!error) {
          //Send the data to socket
          const data = JSON.parse(body);
          io.emit('users-by-group', data.users);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-users-by-group', (groupId) => {
      getUsersByGroup(groupId);
    });

    function getUsersWithoutGroup(){
      request('http://localhost:3000/api/users/getWithoutGroup', function (error, response, body) {
        if (!error) {
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



    socket.on('add-user-to-group', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/users/addUserToGroup',
        method: 'POST',
        json: data
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          getUsersByGroup(data.groupId);
          getUsersWithoutGroup();
        }
        else{
          console.log(error)
        }
      });

    });

    socket.on('delete-user-from-group', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/users/deleteUserFromGroup',
        method: 'DELETE',
        json: data
      };

      request.delete(options, function (error, response, body) {
        if (!error) {
          getUsersByGroup(data.groupId);
          getUsersWithoutGroup();
        }
        else{
          console.log(error)
        }
      });

    });


  });
};
