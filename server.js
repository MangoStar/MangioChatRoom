let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
let users = [];
let connectIndex = 0;

// Use public directory for hrefs
app.use(express.static(__dirname + '/public'));

// Creates a listener on port 3000
server.listen(3000);
console.log(__dirname);
console.log("Server is running! ...");

// Get file index.html
app.get('/public', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// When connection is available
io.sockets.on('connection', function(socket) {
    
    // On event add user, add username to users and emit new event to local side
    socket.on('add user', function(data) {
        users.push(data);
        io.sockets.emit('user added', users);
        console.log('User connected: ' + data);
    });

    // On event send message, emit even 'new message' to local
    socket.on('send message', function(data) {
        io.sockets.emit('new message', data);
    });
});