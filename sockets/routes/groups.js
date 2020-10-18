const request = require('request');


exports = module.exports = function(io){
  function sendGroups(){
    request('http://localhost:3000/api/groups/get', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //Send the data to socket
        console.log('gorups sended');
        let data = JSON.parse(body).groups;
        io.emit("groups", data);
      }
      else{
        console.log(error)
      }
    });
  }

  function sendUsersWithoutGroup(){
    request('http://localhost:3000/api/users/getWithoutGroup', function (error, response, body) {
      if (!error) {
        //Send the data to socket
        let data = JSON.parse(body);
        io.emit('users-without-group', data.users);
      }
      else{
        console.log(error)
      }
    });
  }

  io.on('connection', (socket) => {
    console.log('user connected to socket Groups');



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
          sendGroups();
        }
      });
    });

    socket.on('group-delete', (groupId) => {
      //Delete group
      request.post('http://localhost:3000/api/groups/delete', {
        json: {
          groupId: groupId
        }
      }, (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
        else{
          //Emmit data from groups socket
          console.log('group deleted');
          sendGroups();
          sendUsersWithoutGroup();
        }
      });
    });

    //Emit groups to everyone connected to socker
    sendGroups();

    //Emmit the users without group to everyone connected to socker
    sendUsersWithoutGroup();

  });
};
