const express = require('express');

const MODEL_PATH = '../models/';
const Subtask = require(MODEL_PATH + 'subtask');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

module.exports = function(io) {
  return router;
};

router.get('/getByTask:id', (req, res, next) => {
  Subtask.find({ taskId: req.params.id }).then(result =>{
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
      message: 'Subtask added to task successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.delete('/deleteFromTask', (req, res, next) => {
  console.log(req.body);
  Subtask.deleteOne({'_id': req.body._id}).then(result => {
    res.status(201).json({
      message: 'Subtask successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.post('/update', (req, res, next) => {
  Subtask.updateOne({'_id': req.body._id}, {
    name: req.body.name,
    description: req.body.description,
    penalty: req.body.penalty,
    taskId: req.body.taskId,
    groupId: req.body.groupId,
    userId: req.body.userId || null
  }).then(result => {
    res.status(201).json({
      message: 'Subtask updated successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });

});


module.exports = router;
