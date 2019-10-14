//public/chat.js
var socket = io.connect("http://localhost:3000");

// get dom elements
var message = document.getElementById("message");
var userName = document.getElementById("userName");
var sendBtn = document.getElementById("send");
var messages = document.getElementById("messages");
var typings = document.getElementById('typing');

// add click listener to our button
sendBtn.addEventListener("click", function() {

// after hitting send emit a “chat” event to our server with data containing our message and userName  
    socket.emit("chat", {
        message: message.value,
        userName: userName.value
    });

    typings.innerHTML = "";
});

message.addEventListener('keypress', () => {
    socket.emit('typing', userName.value);
})

// Listen for “chat” events
socket.on("chat", function(data) {
  // When we receive a “chat” event, display the message to the user
  messages.innerHTML +=
    "<p><strong>" + data.userName + ": </strong>" + data.message + "</p>";
});


socket.on('typing', function(data) {
   typings.innerHTML = data + " is Typing";
});