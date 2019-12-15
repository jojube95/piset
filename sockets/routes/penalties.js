const request = require('request');

exports = module.exports = function(io){
  io.on('connection', (socket) => {

    function getPenaltiesByGroup(group){
      request('http://localhost:3000/api/penalties/getByGroup' + group._id, function (error, response, body) {
        if (!error) {
          const data = JSON.parse(body);
          io.emit('penalties-filtered', data.penalties);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-penalties-filtered', (data) => {
      getPenaltiesByGroup(data);
    });

    socket.on('add-penalty', (data) => {
      console.log(data);
      var options = {
        uri: 'http://localhost:3000/api/penalties/addPenalty',
        method: 'POST',
        json: data.penalty
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          getPenaltiesByGroup(data.group);
        }
        else{
          console.log(error)
        }
      });

    });

  });
};
