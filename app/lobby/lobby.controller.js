angular.module('app').controller('LobbyController', LobbyController);

LobbyController.$inject = ['$scope', '$uibModal', 'PlanningEventConstants', 'PlanningService']

function LobbyController($scope, $uibModal, PlanningEventConstants, PlanningService) {

	var self = this;
	self.rooms = [];

	self.create = _create;


	function _create() {
		var createRoomModalInstance = $uibModal.open({
			templateUrl: '/app/create-room/create-room.template.html',
			controller: 'CreateRoomController as createRoomCtrl',
			keyboard: false,
			backdrop: 'static'
		});

		createRoomModalInstance.result.then(function (rooms) {
			console.log('closed');
		  }, function (error) {
			console.info('Modal dismissed at: ' + new Date());
		  });
	}

	PlanningService.listen(PlanningEventConstants.EXISTING_ROOMS, function(rooms) {
		self.rooms = rooms;
	});

	console.log('Lobby controller loaded');
}

