angular.module('app').controller('PlanningRoomController', PlanningRoomController);

PlanningRoomController.$inject = ['$uibModal', 'PlanningService', 'PlanningEventConstants', '$scope'];

function PlanningRoomController($uibModal, PlanningService, PlanningEventConstants, $scope) {

	var self = this;

	self.topic = null;

	self.topicInProgress = false;

	self.pointingEnabled = false;

	self.showPoints = false;
	
	// $scope.$on('reset-topic', function(event, data) {
	// 	self.topicInProgress = false;
		
	// });

	PlanningService.listen(PlanningEventConstants.STORY_INPROGRESS, function(topic){
		self.topic = topic;

		if (topic === null) {
			//self.participantPoints = [];
			//self.topicInProgress = false;
			self.showPoints = false;
		}
		else {
			//self.participantPoints = planning.clients;
			//self.topicInProgress = true;	
		}
	});

	/**

	PlanningService.listen(PlanningEventConstants.ENABLE_POINTING, function(){
		self.pointingEnabled = true;
	});

	PlanningService.listen(PlanningEventConstants.DISABLE_POINTING, function(){
		self.pointingEnabled = false;
	});

	PlanningService.listen(PlanningEventConstants.SHOW_POINTS, function() {
		self.showPoints = true;
	});
	*/

///END OF OLD CODE

//This is the start of Version1 code

	self.leave = function() {
		PlanningService.send(PlanningEventConstants.LEAVE_ROOM);
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
