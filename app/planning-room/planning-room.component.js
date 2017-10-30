angular.module('app').controller('PlanningRoomController', PlanningRoomController);

PlanningRoomController.$inject = ['$uibModal', 'PlanningService', 'PlanningEventConstants', '$scope'];

function PlanningRoomController($uibModal, PlanningService, PlanningEventConstants, $scope) {

	var self = this;

	self.topic = null;
	self.room = null;
	self.topicInprogress = false;
	self.pointingEnabled = false;

	self.showPoints = false;

	//This is the start of Version1 code

	self.leave = function() {
		var r = confirm("Are you sure, you want to leave planning? (All data will be lost)");
		if (r == true) {	
			PlanningService.send(PlanningEventConstants.LEAVE_ROOM);
		} 
	}

	/** REGISTERING SOCKETIO EVENTS */

	//go back to lobby when user left the planning for current user
	PlanningService.listen(PlanningEventConstants.LEFT_PLANNING, function(participant){
		self.joinedPlanning = false;
		self.user = null;
		self.room = null;
	});

	//show a message when user left planning to all users in room
	PlanningService.listen(PlanningEventConstants.USER_LEFT_PLANNING, function(participant) {
		toastr.info(participant + ' left planning');
	});

	//Enable pointing in the planning room when a topic is ready
	PlanningService.listen(PlanningEventConstants.ENABLE_POINTING, function(){
		self.pointingEnabled = true;
	});

	//set topic and topicInProgress when a topic message is received
	PlanningService.listen(PlanningEventConstants.STORY_INPROGRESS, function(topic){
		self.topicInprogress = topic;
	});

	PlanningService.listen(PlanningEventConstants.ROOM_INFO, function(room){
		self.room = room;
	});

	//disable pointing when pointing is disabled
	PlanningService.listen(PlanningEventConstants.DISABLE_POINTING, function(){
		self.pointingEnabled = false;
	});


	PlanningService.listen(PlanningEventConstants.TOPIC_USERS_POINTS, function(topic){
		self.participantUsers = topic.users
	});

	PlanningService.listen(PlanningEventConstants.SHOW_POINTS, function() {
		self.showPoints = true;
	});

	PlanningService.listen(PlanningEventConstants.TOPIC_CLOSED, function() {
		self.showPoints = false;
		self.topicInprogress = false;
	});

}

angular.module('app').component('planningRoom', {
	templateUrl: '/app/planning-room/planning-room.template.html',
	controller: PlanningRoomController,
	controllerAs: 'planningRoomCtrl',
	bindings: {
		joinedPlanning: '=',
		user: '=',
		room: '=',
		participants: '='
	}
});
