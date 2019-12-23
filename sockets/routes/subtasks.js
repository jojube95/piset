const request = require('request');

exports = module.exports = function(io){
  io.on('connection', (socket) => {

    function getSubtasksByTask(taskId){
      request('http://localhost:3000/api/subtasks/getByTask' + taskId, function (error, response, body) {
        if (!error) {
          const data = JSON.parse(body);
          io.emit('subtasks-by-task', data.subtasks);
        }
        else{
          console.log(error)
        }
      });
    }

    function getSubtasksByGroup(groupId){
      request('http://localhost:3000/api/subtasks/getByGroup' + groupId, function (error, response, body) {
        if (!error) {
          const data = JSON.parse(body);
          io.emit('subtasks-by-group', data.subtasks);
        }
        else{
          console.log(error)
        }
      });
    }
    
    function getSubtasksByUser(userId){
      request('http://localhost:3000/api/subtasks/getByUser' + userId, function (error, response, body) {
        if (!error) {
          const data = JSON.parse(body);
          io.emit('subtasks-by-user', data.subtasks);
        }
        else{
          console.log(error)
        }
      });
    }

    socket.on('get-subtask-by-task', (taskId) => {
      getSubtasksByTask(taskId);
    });

    socket.on('get-subtasks-by-group', (groupId) => {
      getSubtasksByGroup(groupId);
    });
    
    socket.on('get-subtasks-by-user', (userId) => {
      getSubtasksByUser(userId);
    });


    socket.on('add-subtask-to-task', (data) => {
      var options = {
        uri: 'http://localhost:3000/api/subtasks/addToTask',
        method: 'POST',
        json: data
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          getSubtasksByTask(data.taskId);
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
          getSubtasksByTask(data.taskId);
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
        json: data.subtaskId
      };

      request.delete(options, function (error, response, body) {
        if (!error) {
          getSubtasksByTask(data.taskId);
        }
        else{
          console.log(error)
        }
      });

    });


  });
};
