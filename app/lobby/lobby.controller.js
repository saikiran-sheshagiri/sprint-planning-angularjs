angular.module('app').controller('LobbyController', LobbyController);

LobbyController.$inject = ['$scope', '$uibModal', 'PlanningEventConstants', 'PlanningService']

function LobbyController($scope, $uibModal, PlanningEventConstants, PlanningService) {

	var self = this;
	self.rooms = [];

	self.create = _create;
	self.join = _join;

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

	function _join(room) {
		var loginModalInstance = $uibModal.open({
			templateUrl: '/app/login/login.template.html',
			controller: 'LoginController as loginCtrl',				
			keyboard: false,
			backdrop: 'static',
			resolve: {
				room: function(){
					return room;
				}
			}
		});
	
		loginModalInstance.result.then(function (user) {
			console.log(new Date() + ' :: LOGIN MODAL INSTANCE - CLOSED');
		  }, function (error) {
			console.info('Modal dismissed at: ' + new Date());
		  });
		
		console.log('Join the meeting: ' + room.name);
	}

	PlanningService.listen(PlanningEventConstants.EXISTING_ROOMS, function(rooms) {
		self.rooms = rooms;
	});

	console.log('Lobby controller loaded');
}

