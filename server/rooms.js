const _ = require('lodash');

const ROOMS = [];	

/** Sample data of rooms */
//room:{'name': 'room1', 'access_code': '1234', 'users': [{'name': 'Jack', isHost: false, isChicken: false}]}


exports.addRoom = (roomName, accessCode) => {
	if(roomExists(roomName)){
		return {
			message: 'ALREADY_EXISTS',
			rooms: ROOMS
		}
	}
	else {
		ROOMS.push({
			name: roomName,
			secret: accessCode,
			users: []
		});
		return {
			message: 'ADDED',
			rooms: ROOMS
		}
	}
}

exports.deleteRoom = (roomName) => {
	if(roomExists(roomName)) {
		_.remove(ROOMS, (room) => { return room.name === roomName});
		return {
			message: 'DELETED',
			rooms: ROOMS
		}
	}
	else {
		return {
			message: 'INVALID_ROOM',
			rooms: ROOMS
		}
	}
}

exports.getRooms = () => {
	return ROOMS;
}

exports.addUser = (userName, isHost, isChicken, roomName) => {
	let user = {
		name: userName,
		isHost: isHost,
		isChicken: isChicken,
	},
	message;

	let room = getRoom(roomName);

	if(room !== undefined) {
		room.users.push(user);
		message = 'USER ADDED';
	} else {
		message = 'ROOM NOT FOUND';
	}
	
	return {
		message: message,
		user: user,
		room: room
	}
}

function roomExists(roomName) {
	return _.some(ROOMS, (room) => { return room.name === roomName});
}

function getRoom(roomName) {
	return _.find(ROOMS, { 'name': roomName });
}