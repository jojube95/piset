const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Penaly = require('../models/penalty');

const router = express.Router();

router.get('/get', (req, res, next) => {
  User.find().then(result =>{
    res.status(200).json({
      message: "Success",
      users: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});

router.get('/getWithoutGroup', (req, res, next) => {
  User.find({ groupId: null }).then(result =>{
    res.status(200).json({
      message: "Success",
      users: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});

router.get('/getByGroup:id', (req, res, next) => {
  User.find({ groupId: req.params.id }).then(result =>{
    res.status(200).json({
      message: "Success",
      users: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});

router.post('/addUserToGroup', (req, res, next) => {
  User.updateOne({'_id': req.body.user._id}, {
    mail: req.body.user.mail,
    password: req.body.user.password,
    name: req.body.user.name,
    secondName: req.body.user.secondName,
    admin: req.body.user.admin,
    groupId: req.body.group._id
  }).then(result => {
    res.status(201).json({
      message: 'User addet to group successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err

    });

  });

});

router.post('/update', async (req, res, next) => {
  let result = await User.updateOne({'_id': req.body._id}, {
    mail: req.body.mail,
    password: req.body.password,
    name: req.body.name,
    secondName: req.body.secondName,
    admin: req.body.admin,
    groupId: req.body.groupId || null
  });

  if(result){
    console.log('User updated successfully');
    //Update penaltys name too
    let resultPenalty = await Penaly.updateMany({'userId': req.body._id}, {'$set':{'userName': req.body.name}});

    if(resultPenalty){
      console.log('Penalty user data updated successfully');
      res.status(201).json({
        message: 'User updated successfully',
        result: result
      });
    }
    else{
      res.status(500).json({
        error: err
      });
    }
  }
  else{
    res.status(500).json({
      error: err
    });
  }

});

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      'mail': req.body.mail,
      'password': hash,
      'name': req.body.name,
      'secondName': req.body.secondName,
      'admin': false
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User registered successfully',
        result: result
      });
    }).catch(err => {
      res.status(500).json({
        error: err

      });

    });

  });
});

router.post('/signin', (req, res, next) => {
  let fetchedUser;

  User.findOne({mail: req.body.mail}).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    else {
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    }

  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    else {
      const token = jwt.sign({
        mail: fetchedUser.mail,
        userId: fetchedUser._id
      }, 'secret_this_should_be_longer', {expiresIn: '1h'});
      res.status(200).json({
        token: token,
        user: fetchedUser
      });
    }
  }).catch(err => {
    return res.status(401).json({
      message: 'Auth failed'
    });
  });
});

module.exports = router;



