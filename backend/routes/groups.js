const express = require('express');

const Group = require('../models/group');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/get', checkAuth, (req, res, next) => {
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


router.post('/post', checkAuth, (req, res, next) => {

});

module.exports = router;
