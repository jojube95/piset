const request = require('request');

exports = module.exports = function(io){
  io.on('connection', (socket) => {

    function getPenaltiesByGroupUser(group, user){
      request('http://localhost:3000/api/penalties/getByGroup' + group._id + user._id, function (error, response, body) {
        if (!error) {
          const data = JSON.parse(body);
          io.emit('penalties-by-group-user', data.penalties);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-penalties-by-group-user', (data) => {
      getPenaltiesByGroupUser(data.group, data.user);
    });

    socket.on('add-penalty', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/subtasks/addToTask',
        method: 'POST',
        json: data
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          getPenaltiesByGroupUser(data.group, data.user);
        }
        else{
          console.log(error)
        }
      });

    });

  });
};
