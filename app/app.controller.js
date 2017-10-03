angular.module('app').controller('AppController', AppController);

AppController.$inject = ['$uibModal', 'PlanningService', 'PlanningEventConstants', '$scope'];

function AppController($uibModal, PlanningService, PlanningEventConstants, $scope) {

	var self = this;

	self.participants = [];

	self.participantPoints = [];

	self.topic = null;

	self.topicInProgress = false;

	self.pointingEnabled = false;

	self.showPoints = false;

	self.init = _init;


	function _init() {
		var loginModalInstance = $uibModal.open({
			templateUrl: '/app/login/login.template.html',
			controller: 'LoginController as loginCtrl',
			keyboard: false,
			backdrop: 'static'
		});

		loginModalInstance.result.then(function (user) {
			self.userName = user.user_name;
			self.isHost = user.isHost;
		  }, function (error) {
			console.info('Modal dismissed at: ' + new Date());
		  });
	}

	$scope.$on('reset-topic', function(event, data) {
		self.topicInProgress = false;
		
	});

	PlanningService.listen(PlanningEventConstants.PARTICIPANT_LIST, function(participants){
		self.participants = participants;
	});

	PlanningService.listen(PlanningEventConstants.PARTCIPANT_JOINED, function(participant){
		toastr.info(participant.user_name + ' joined the planning');
	});

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
}