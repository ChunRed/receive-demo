const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');

// const  https = require('https').Server(
//     {
//         key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//         cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//     },
// );
const http = require('http').Server(app);

const io = require('socket.io')(http);

let list=[];

app.use(express.static('node_modules'));

// setup express router
app.get('/', function (req, res) {
    res.send("server is running.")
});

app.get('/demo', function (req, res) {
    res.sendFile(__dirname + '/index.html');
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

        if(list.length > 10){
            list = [];
        }
        else{
            list.unshift(msg);
        }

        io.emit('getMessage', list);
    })
});

let PORT = 3000;


http.listen(process.env.PORT || PORT, function() {
    var host = http.address().address
    var port = http.address().port
    console.log('App listening at ', host, port)
});
