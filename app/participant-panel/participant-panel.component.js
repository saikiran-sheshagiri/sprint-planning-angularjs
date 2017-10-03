
ParticipantPanelController.$inject = ['$scope', 'PlanningService', 'PlanningEventConstants'];

function ParticipantPanelController($scope, PlanningService, PlanningEventConstants) {
	var self = this;
	
	self.sendPoints = _sendPoints;

	function _sendPoints(points) {

		if(self.pointingEnabled) {
			var r = confirm("Confirm your points - " + points);
			if (r) {
				PlanningService.send(PlanningEventConstants.SEND_POINTS, {
					socket_id: PlanningService.socket.id,
					topic: self.topic.name,
					points: points
				});

			}
		}
	}
}

angular.module('app').component('participantPanel', {
	templateUrl: '/app/participant-panel/participant-panel.template.html',
	controller: ParticipantPanelController,
	bindings: {
		topic: '=',
		pointingEnabled: '='
	}
});
