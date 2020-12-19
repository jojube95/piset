const express = require('express');
const router = express.Router();

const { exec } = require("child_process");

module.exports = function(io) {
  return router;
};


router.get('/restoreDatabase', (req, res, next) => {
  const mongoose = req.app.get('mongoose');

  let restoreProcess = 'mongorestore --archive=database/test --drop';

  exec(restoreProcess, (error, stdout, stderr) => {
    if (error) {
      console.log('error: ' + error.message);
      return;
    }
    if (stderr) {
      console.log('stderr: ' + stderr);
      return;
    }
    console.log('stdout: ' + stdout);
  });

});

router.get('/backupDatabase', (req, res, next) => {
  const mongoose = req.app.get('mongoose');

  let backupProcess = 'mongodump --db=test --archive=database/test';

  exec(backupProcess, (error, stdout, stderr) => {
    if (error) {
      console.log('error: ' + error.message);
      return;
    }
    if (stderr) {
      console.log('stderr: ' + stderr);
      return;
    }
    console.log('stdout: ' + stdout);
  });

});

module.exports = router;
