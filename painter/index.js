var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/painter.html');
});

io.on('connection',function(socket){

	socket.on('begin event', function(data){
		socket.broadcast.emit('begin event', data);
	});
	socket.on('paint event', function(data){
		socket.broadcast.emit('paint event', data);
	});

	socket.on('end event', function(data){
		socket.broadcast.emit('end event',data);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});