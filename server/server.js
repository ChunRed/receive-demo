const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('node_modules'));

// setup express router
app.get('/', function (req, res) {
    res.send("server is running.")
});

app.get('/demo', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected, user id: ');
});


// setup socket.io
var userId = 0;
io.on('connection', function (socket) {
    socket.userId = userId++;
    console.log('a user connected, user id: ' + socket.userId);

    socket.on('chat', function (msg) {
        console.log('message from user#' + socket.userId + ": " + msg);
        io.emit('chat', {
            id: socket.userId,
            msg: msg,
        });
    });

    socket.on('getMessage', (msg) => {
        console.log(msg);
    })
});

let PORT = 3000;
http.listen(process.env.PORT || PORT, function() {
    var host = http.address().address
    var port = http.address().port
    console.log('App listening at ', host, port)
});