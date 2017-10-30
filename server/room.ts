const _ = require('lodash');

import {UserInterface, User} from './user';
import {TopicInterface, Topic} from './topic';

export interface RoomInterface {
	name: String;
	accessCode: String;
	users: UserInterface[];
	topics: TopicInterface[];
	getUser(userName: String);
	userExists(userName: String);
	getUsers();
	addUser(user: UserInterface);
	removeUser(user: UserInterface);
	addTopic(topic: TopicInterface);
	getHost();
	topicInProgress();
}

export class Room implements RoomInterface {
	name: String;
	accessCode: String;
	users: User[];
	topics: Topic[];

	constructor(roomName: String, accessCode: String) {
		this.name = roomName;
		this.accessCode = accessCode;
		this.users = new Array<User>();
		this.topics = new Array<Topic>();
	}

	getUsers() {
		return this.users;
	}

	getUser(userName: String) {
		return _.find(this.users, {'name': userName});
	}

	userExists(userName: String) {
		return _.some(this.users, {'name': userName});
	}

	addUser(user: User) {
		this.users.push(user);
	}

	removeUser(user: User) {
		_.remove(this.users, {'name': user.name});
	}

	addTopic(topic: Topic) {
		this.topics.push(topic);
	}

	getHost() {
		return _.find(this.users, { 'isHost': true });
	}

	topicInProgress() {
		return _.find(this.topics, { 'isActive': true });
	}
}