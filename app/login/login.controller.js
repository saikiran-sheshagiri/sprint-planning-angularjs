angular.module('app').controller('LoginController', LoginController);

LoginController.$inject = ['PlanningService', '$uibModalInstance', '$scope', 'PlanningEventConstants', 'room'];

function LoginController(PlanningService, $uibModalInstance, $scope, PlanningEventConstants, room){
	var self = this;
	self.isHost = false;
	self.isChicken = false;
	self.hostAlreadyJoined = false;
	
	PlanningService.listen(PlanningEventConstants.HOST_ALREADY_JOINED, function() {
		self.hostAlreadyJoined = true;
	});

	PlanningService.listen(PlanningEventConstants.USER_ADDED_ROOM, function(response){
		$uibModalInstance.close(response);
	});

	self.join = function() {
		PlanningService.send(PlanningEventConstants.JOIN_ROOM, {
			name: self.userName,
			isHost: self.isHost,
			isChicken: self.isChicken,
			roomName: room.name
		});
	}

	self.cancel = function() {
		$uibModalInstance.dismiss();
	}
}