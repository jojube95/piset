const request = require('request');

exports = module.exports = function(io){
  io.on('connection', (socket) => {
    console.log('user connected to socket Penalties');

    function getPenaltiesByGroup(groupId){
      request('http://localhost:3000/api/penalties/getByGroup' + groupId, function (error, response, body) {
        if (!error) {
          const data = JSON.parse(body);
          io.emit('penalties-filtered', data.penalties);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-penalties-filtered', (groupId) => {
      getPenaltiesByGroup(groupId);
    });

    socket.on('add-penalty', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/penalties/addPenalty',
        method: 'POST',
        json: data.penalty
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          getPenaltiesByGroup(data.groupId);
        }
        else{
          console.log(error)
        }
      });

    });

  });
};
