const express = require('express');

const Group = require('../models/group');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

module.exports = function(io) {
  console.log(io);

  return router;
}


router.get('/get', (req, res, next) => {
  req.socketServer.emit('caca', 'mensaje');

  Group.find().then(result =>{
    res.status(200).json({
      message: "Success",
      groups: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});


router.post('/post', (req, res, next) => {

});

module.exports = router;
