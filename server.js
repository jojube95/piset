const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const mongoose = require('mongoose');

const normalizePort = val => {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const uris = {
  "desa": "mongodb://127.0.0.1:27017/desa",
  "test": "mongodb://127.0.0.1:27017/test",
  "prod": "mongodb+srv://root:root@cluster0-53xnf.mongodb.net/piset"
};

let database;

switch (process.argv[2]){
  case 'desa':
    database = uris.desa;
    app.set('database', uris.desa);
    break;

  case 'test':
    database = uris.test;
    break;

  case 'prod':
    database = uris.prod;
    break;

  default:
    database = uris.desa;
    break;
}


mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
  console.log('Connected to database!');
  app.set('mongoose', mongoose);
}).catch((err) => {
  console.log(err);
  console.log('Connection to database failed!');
});

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
