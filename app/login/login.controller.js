angular.module('app').controller('LoginController', LoginController);

LoginController.$inject = ['PlanningService', '$uibModalInstance', '$scope', 'PlanningEventConstants'];

function LoginController(PlanningService, $uibModalInstance, $scope, PlanningEventConstants){
	var self = this;
	self.isHost = false;
	self.hostAlreadyJoined = false;
	
	PlanningService.listen(PlanningEventConstants.HOST_ALREADY_JOINED, function() {
		self.hostAlreadyJoined = true;
	});

	PlanningService.listen(PlanningEventConstants.WELCOME_USER, function(user){
		$uibModalInstance.close(user);
	});

	self.join = function() {

		PlanningService.send(PlanningEventConstants.JOIN_PLANNING, {
			name: self.userName,
			host: self.isHost
		});

	}
}