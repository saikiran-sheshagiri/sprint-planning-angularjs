
function PlanningTableController() {
	console.log('PlanningTableController loaded');	
}

angular.module('app').component('planningTable', {
	templateUrl: '/app/planning-table/planning-table.template.html',
	controller: PlanningTableController,
	bindings: {
		topicEnabled: '=',
		topic: '=',
		isHost: '=',
		participants: '=',
		showPoints: '='
	}
});
