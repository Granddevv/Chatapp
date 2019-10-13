// index.js
// Get our dependencies
var express = require("express");
var socket = require("socket.io");

// initialize our express app
var app = express();

var port = 3000;

// have our app start listening
var server = app.listen(port, function() {
  console.log("Listening at http://localhost: " + port);
});

// Specify a directory to serve static files
app.use(express.static("public"));

// initialize our socket by passing in our express server
var sock = socket(server);

// respond to initial connection with our server
sock.on("connection", function(socket) {
  console.log("made connection with socket " + socket.id);

  // when the server receives a chat event
  socket.on("chat", function(data) {
    // use emit to send the “chat” event to everybody that is connected, including the sender
    sock.sockets.emit("chat", data);
  });
});