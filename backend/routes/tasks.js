const express = require('express');

const MODEL_PATH = '../models/';
const Task = require(MODEL_PATH + 'task');
const Subtask = require(MODEL_PATH + 'subtask');
const User = require(MODEL_PATH + 'user');
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
    groupId: req.body.groupId
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

router.post('/deleteFromGroup', (req, res, next) => {
  Task.deleteOne({'_id': req.body.taskId}).then(result => {
    Subtask.deleteMany({ taskId: req.body.taskId});
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
  if(req.body.groupId != null){
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
  }
});

router.post('/reasign', async (req, res, next) => {
  let users = await User.find({ groupId: req.body.groupId });
  let tasks = await Task.find({ groupId: req.body.groupId });

  //Complete tasks array to users.length
  if(tasks.length < users.length){
    let i = users.length - tasks.length;

    for (i; i >= 0; i--){
      tasks.push(null);
    }

  }

  //Get week number
  let weekNumber = getWeekNumber();
  //Loop the users array
  users.forEach(async (currentValue, index) => {
    //find the task using function findTask(weekNumber%users.length, currentUserIndex, arrayTaks);
    let taskAux = await findTask(weekNumber, index, tasks);

    //Update the searched task userId on current user loop id
    await Task.updateOne({'_id': taskAux._id}, { $set: { userId: currentValue._id}});
  });
});

function findTask(ciclo, userArrayIndex, tareas) {
  let remainder = (ciclo + userArrayIndex) % tareas.length;
  return tareas[remainder === 0 ? tareas.length - 1 : remainder - 1];
}

function getWeekNumber() {
  let d = new Date();
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks to nearest Thursday
  let weekNo = Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
  // Return array of year and week number
  return weekNo;
}


module.exports = router;
