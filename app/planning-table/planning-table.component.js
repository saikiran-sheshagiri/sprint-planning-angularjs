
function PlanningTableController() {
	var self = this;

	self.topicEnabled = !!self.topic;
}

angular.module('app').component('planningTable', {
	templateUrl: '/app/planning-table/planning-table.template.html',
	controller: PlanningTableController,
	bindings: {
		topic: '=',
		isHost: '=',
		participants: '=',
		showPoints: '='
	}
});
