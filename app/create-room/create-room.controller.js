angular.module('app').controller('CreateRoomController', CreateRoomController);

CreateRoomController.$inject = ['PlanningService', '$uibModalInstance', '$scope', 'PlanningEventConstants', 'RoomsService'];


function CreateRoomController(PlanningService, $uibModalInstance, $scope, PlanningEventConstants, RoomsService){

	var self = this;
	self.roomAlreadyExists = false;

	self.create = function() {

		//reset error messages
		self.roomAlreadyExists = false;
		self.rooms = [];

		RoomsService.createRoom(self.roomName, self.accessCode)
					.then(function(response){
						self.rooms = response.data.rooms;

						if(response.data.message === 'ADDED') {
							$uibModalInstance.close(self.rooms);
						}
						else if(response.data.message === 'ALREADY_EXISTS') {
							self.roomAlreadyExists = true;
						}
					}, function (error) {
						$uibModalInstance.dismiss(self.rooms);
						console.log('something went wrong with API request: ' + error);
					});


		
	}

	self.cancel = function() {
		$uibModalInstance.dismiss(self.rooms);
	}

}