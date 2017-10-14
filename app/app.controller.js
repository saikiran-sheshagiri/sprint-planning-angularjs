angular.module('app').controller('AppController', AppController);

AppController.$inject = ['PlanningService', 'PlanningEventConstants', '$rootScope'];

function AppController(PlanningService, PlanningEventConstants, $rootScope) {

	//currently using this for registering socket io listners at global level
	console.log('app controller loaded');
	//As soon as user joined the room show a welcome message
	PlanningService.listen(PlanningEventConstants.WELCOME_USER, function(participant){
		toastr.info(participant.name.toUpperCase() + ' joined the planning');
	});


	PlanningService.listen(PlanningEventConstants.PARTCIPANT_JOINED, function(participant){
		toastr.info(participant.name.toUpperCase() + ' joined the planning');
	});

	
	PlanningService.listen(PlanningEventConstants.PARTICIPANT_LIST, function(participants){
		$rootScope.$broadcast(PlanningEventConstants.PARTICIPANT_LIST, participants);
	});
}