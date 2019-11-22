const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

//DB before implements mongoo
const users = [
  {"_id":{"$oid":"5dd2d1d21c9d440000dbb773"},"admin":true,"mail":"admin@admin.com","name":"Admin","secondName":"Admin","password":"admin"},
  {"_id":{"$oid":"5dd2d2291c9d440000dbb775"},"admin":false,"mail":"test@test.com","name":"Test","secondName":"Test","password":"test"}
];

router.get('/get', (req, res, next) => {

  res.status(200).json({
    message: "Success",
    users: users
  });

});

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = {
      '_id': 2432153245234,
      'admin': false,
      'mail': req.body.mail,
      'name': req.body.name,
      'secondName': req.body.secondName,
      'password': req.body.password
    };
    //This should be mongoo query
    users.push(user);
  });

});

router.post('/signin', (req, res, next) => {
  let exists = false;
  let userAux = null;
  let auth = false;

  //This should be maongoo query
  users.forEach((user) => {
    if(user.mail == req.body.mail){
      exists = true;
      userAux = user;
    }
  });

  if(!exists){
    auth = false;
  }
  else{
    bcrypt.compare(req.body.password, userAux.password).then(result =>{
      if(!result){
        return res.status(401).json({
          message: 'Failed auth'
        });
      }
      else{
        const token = jwt.sign({email: userAux.mail, userId: userAux.id}, 'secret_this_should_be_longer', {expiresIn: '1h'});
        res.stat(200).json({
          token: token
        });
      }
    });
  }





});

module.exports = router;


