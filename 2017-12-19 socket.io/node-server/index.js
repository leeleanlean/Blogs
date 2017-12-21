var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a new connect...');
	socket.on('refresh', function(){
		console.log('get refresh notice');
		io.sockets.emit('doRefresh');
	});
});

http.listen(3000, function(){
	console.log('listening on http://127.0.0.1:3000');
});