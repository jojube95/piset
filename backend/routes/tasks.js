const express = require('express');

const MODEL_PATH = '../models/';
const Task = require(MODEL_PATH + 'task');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

module.exports = function(io) {
  return router;
};

router.get('/getByGroup:id', (req, res, next) => {
  Task.find({ groupId: req.params.id }).then(result =>{
    res.status(200).json({
      message: "Success",
      tasks: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});

router.post('/addToGroup', (req, res, next) => {
  const task = new Task({
    name: req.body.task.name,
    groupId: req.body.group._id
  });

  task.save().then(result => {
    res.status(201).json({
      message: 'Task added to group successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.delete('/deleteFromGroup', (req, res, next) => {
  Task.deleteOne({'_id': req.body.task._id}).then(result => {
    res.status(201).json({
      message: 'Task deleted from group successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.post('/update', (req, res, next) => {
  Task.updateOne({'_id': req.body._id}, {
    name: req.body.name,
    groupId: req.body.groupId || null
  }).then(result => {
    res.status(201).json({
      message: 'Task updated successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });

});


module.exports = router;
