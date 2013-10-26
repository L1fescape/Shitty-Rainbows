var 

  // expressjs
  express = require('express'),
  app = express(),

  // http server
  http = require('http'),
  httpServer = http.createServer(app),
  
  // settings
  port = 3000


// configure the server
app.configure(function() {
  app.use(express.static(__dirname + '/app'));
});

// run http server
httpServer.listen(port);

console.log("Listening on port", port);
