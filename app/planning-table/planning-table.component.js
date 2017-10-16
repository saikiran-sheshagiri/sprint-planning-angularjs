PlanningTableController.$inject = ['PlanningService', 'PlanningEventConstants'];

function PlanningTableController(PlanningService, PlanningEventConstants) {
	var self = this;


}

angular.module('app').component('planningTable', {
	templateUrl: '/app/planning-table/planning-table.template.html',
	controller: PlanningTableController,
	bindings: {
		topic: '=',
		topicInprogress: '=',
		isHost: '=',
		participants: '=',
		showPoints: '='
	}
});
