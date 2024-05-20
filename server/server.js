const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http').Server(app);

const io = require('socket.io')(http);

let list=[[0,''],[1,''],[2,''],[3,''],[4,''],[5,''],[6,''],[7,''],[8,''],[9,'']];
let id = 89;




// setup express router
const engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static('src'));
app.use(express.static('node_modules'));
app.use(express.static('node_modules/typed.js/dist'))

app.get('/', function (req, res) {
    res.send("server is running.")
});

app.get('/demo', function (req, res) {
    res.render('demo');
});



// setup socket.io
var userId = 0;
io.on('connection', function (socket) {
    socket.userId = userId++;
    console.log('a user connected, user id: ' + socket.userId);

    socket.emit('start', "hello, user" + userId);



    socket.on('getMessage', (msg) => {
        console.log(msg);

        id > 99 ? id = 0 : id += 1;

        list.unshift([ id, msg[1] ]);
        list.pop();

        io.emit('getMessage', list);
        io.emit('display', msg);
    })
});

let PORT = 3000;


http.listen(process.env.PORT || PORT, function() {
    var host = http.address().address
    var port = http.address().port
    console.log('App listening at ', host, port)
});
