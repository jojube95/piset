const request = require('request');

exports = module.exports = function(io){
  io.on('connection', (socket) => {

    function getTasksByGroup(group){
      request('http://localhost:3000/api/tasks/getByGroup' + group._id, function (error, response, body) {
        if (!error) {
          const data = JSON.parse(body);
          io.emit('tasks-by-group', data.tasks);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-tasks-by-group', (group) => {
      getTasksByGroup(group);
    });

    socket.on('add-task-to-group', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/tasks/addToGroup',
        method: 'POST',
        json: data
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          getTasksByGroup(data.group);
        }
        else{
          console.log(error)
        }
      });

    });

    socket.on('update-task', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/tasks/update',
        method: 'POST',
        json: data.task
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          getTasksByGroup(data.group);
        }
        else{
          console.log(error)
        }
      });

    });


    socket.on('delete-task-from-group', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/tasks/deleteFromGroup',
        method: 'DELETE',
        json: data
      };

      request.delete(options, function (error, response, body) {
        if (!error) {
          getTasksByGroup(data.group);
        }
        else{
          console.log(error)
        }
      });

    });


  });
};
