const express = require('express');

const MODEL_PATH = '../models/';
const Penalty = require(MODEL_PATH + 'penalty');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

module.exports = function(io) {
  return router;
};

router.get('/getByGroup:groupId:userId', (req, res, next) => {
  Penalty.find({ groupId: req.params.groupId, userId: req.params.userId }).then(result =>{
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

router.post('/addToTask', (req, res, next) => {
  const subtask = new Subtask({
    name: req.body.subtask.name,
    description: req.body.subtask.description,
    penalty: req.body.subtask.penalty,
    taskId: req.body.task._id,
    groupId: req.body.group._id,
    userId: req.body.subtask.userId || null
  });

  subtask.save().then(result => {
    res.status(201).json({
      message: 'Penalty added successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
