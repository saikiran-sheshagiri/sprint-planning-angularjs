angular.module('app').controller('PlanningRoomController', PlanningRoomController);

PlanningRoomController.$inject = ['$uibModal', 'PlanningService', 'PlanningEventConstants', '$scope', '$state'];

function PlanningRoomController($uibModal, PlanningService, PlanningEventConstants, $scope, $state) {

	var self = this;

	self.participants = [];

	self.participantPoints = [];

	self.topic = null;

	self.topicInProgress = false;

	self.pointingEnabled = false;

	self.showPoints = false;
	console.log('planning room loaded');
	
	$scope.$on('reset-topic', function(event, data) {
		self.topicInProgress = false;
		
	});

	//user name
	self.user = $state.params.user;
	//particiapnt list
	
	self.participants = $state.params.room.users;
	$scope.$on(PlanningEventConstants.PARTICIPANT_LIST, function(event, participants){
		self.participants = participants;
	});

	/** 
	PlanningService.listen(PlanningEventConstants.LEFT_PLANNING, function(participant){
		toastr.info(participant.user_name + ' left planning');
	});

	PlanningService.listen(PlanningEventConstants.STORY_INPROGRESS, function(planning){
		if (planning.topic === null) {
			self.participantPoints = [];
			self.topic = planning.topic;
			self.topicInProgress = false;
			self.showPoints = false;
		}
		else {
			self.participantPoints = planning.clients;
			self.topic = planning.topic;
			self.topicInProgress = true;	
		}
	});

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
}