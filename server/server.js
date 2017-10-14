const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const path = require('path');
const {addRoom, deleteRoom, getRooms, addUser} = require('./rooms');
const bodyParser = require('body-parser')

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);
let port = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/app', express.static(path.join(__dirname, '../app')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//default route to app
app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname, '../index.html'));
});

//create a room
app.post('/rooms', (request, response) => {
	let status = addRoom(request.body.roomName, request.body.accessCode);
	response.json(status);

	if(status.message === 'ADDED') {
		console.log('[INFO] New room added. Available rooms...');
		console.log(status.rooms);
	}
	else if(status.message === 'ALREADY_EXISTS') {
		console.log('[INFO] Invalid room name entered. Available rooms...');
		console.log(status.rooms);
	}
	
	io.emit('planning:rooms', status.rooms);
});

//delete a room
app.delete('/rooms', (request, response) => {
	let status = deleteRoom(request.body.roomName);

	if(status.message === 'DELETED') {
		console.log('[INFO] A room with name ' + request.body.roomName + ' is deleted. Available rooms...');
		console.log(status.rooms);
		response.send('Room deleted');
	}
	else if(status.message === 'INVALID_ROOM') {
		console.log('[INFO] Invalid room name ' + request.body.roomName + ' to be deleted. Available rooms...');
		console.log(status.rooms);
		response.send('Unable to delete room. Invalid room.');
	}

	io.emit('planning:rooms', status.rooms);
});

/** Socket IO implementation - Start */

io.on('connection', (socket) => {
	//Users are by default connection to root/lobby '/' Emit the existing rooms
	io.emit('planning:rooms', getRooms());

	socket.on('planning:join-room', function(data) {
		console.log(data);
		var response = addUser(data.name, data.isHost, data.isChicken, data.roomName);

		switch(response.message) {
			case 'USER ADDED':
				//If a user is successfully added to the room, join the user to room
				socket.join(data.roomName);
				console.log(io.sockets.adapter.rooms);
				//Emit user added succesfully to the socket
				socket.emit('planning:user-added-room', {
					user: response.user,
					room: response.room
				});
				console.log('emit the user added event');
				//emit welcome message to user
				socket.emit('planning:welcome-user', response.user);
				console.log('emit the welcome message to user');
				//Braoadcast user joined to the room
				socket.broadcast.to(response.room.name).emit('planning:user-joined', response.user);
				//send participant list to the room
				io.sockets.to(response.room.name).emit('planning:participant-list', response.room.users);	
				console.log(response.room);			
				console.log('emitting all particiapnts to room' + response.room.name);
				break;
			case 'ROOM NOT FOUND': 
				console.log('room not found');
				break;
			default:
				console.log('Unable to add user');
			
		}
		
		//Emit planning rooms with latest changes
		io.emit('planning:rooms', getRooms());
	});

});

/** Socket IO implementation - End */
server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});