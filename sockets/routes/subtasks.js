const request = require('request');

exports = module.exports = function(io){
  io.on('connection', (socket) => {

    function getSubtasksByTask(task){
      request('http://localhost:3000/api/subtasks/getByTask' + task._id, function (error, response, body) {
        if (!error) {
          const data = JSON.parse(body);
          io.emit('subtasks-by-task', data.subtasks);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-subtask-by-task', (task) => {
      getSubtasksByTask(task);
    });

    socket.on('add-subtask-to-task', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/subtasks/addToTask',
        method: 'POST',
        json: data
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          getSubtasksByTask(data.task);
        }
        else{
          console.log(error)
        }
      });

    });

    socket.on('update-subtask', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/subtasks/update',
        method: 'POST',
        json: data.subtask
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          getSubtasksByTask(data.task);
        }
        else{
          console.log(error)
        }
      });

    });


    socket.on('delete-subtask', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/subtasks/deleteFromTask',
        method: 'DELETE',
        json: data
      };

      request.delete(options, function (error, response, body) {
        if (!error) {
          getSubtasksByTask(data.task);
        }
        else{
          console.log(error)
        }
      });

    });


  });
};
