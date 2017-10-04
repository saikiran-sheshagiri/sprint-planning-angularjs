const _ = require('lodash');

const ROOMS = [];	//room:{'name': 'room1', 'access_code': '1234'}


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
			secret: accessCode
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

function roomExists(roomName) {
	return _.some(ROOMS, (room) => { return room.name === roomName});
}
