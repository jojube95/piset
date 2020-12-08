const express = require('express');

const MODEL_PATH = '../models/';
const Penalty = require(MODEL_PATH + 'penalty');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

module.exports = function(io) {
  return router;
};

router.get('/getByGroup:id', (req, res, next) => {
  Penalty.find({ groupId: req.params.id }).then(result =>{
    res.status(200).json({
        message: "Success",
        penalties: result
      });
    }).catch(err => {
      res.status(500).json({
        error : err
      })
    });

});

router.post('/addPenalty', (req, res, next) => {
  const penalty = new Penalty({
    date: req.body.penalty.date,
    amount: req.body.penalty.amount,
    groupId: req.body.penalty.groupId,
    userId: req.body.penalty.userId,
    userName: req.body.penalty.userName,
    subtaskId: req.body.penalty.subtaskId,
    subtaskName: req.body.penalty.subtaskName
  });

  penalty.save().then(result => {
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
