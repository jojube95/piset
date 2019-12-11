const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const groupsRoutes = require('./routes/groups');
const tasksRoutes = require('./routes/tasks');
const io = require('socket.io-client');

const app  = express();

mongoose.connect('mongodb+srv://root:root@cluster0-53xnf.mongodb.net/piset', {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
  console.log('Connected to database!');
}).catch(() => {
  console.log('Connection to database failed!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

const socketServer = io('http://localhost:5000');

app.use(function(req, res, next) {
  req.socketServer = socketServer;
  next();
});


app.use('/api/users', usersRoutes);

app.use('/api/groups', groupsRoutes);

app.use('/api/tasks', tasksRoutes);

module.exports = app;


