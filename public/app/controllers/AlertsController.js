angular
.module('TravelSensei')
.controller('AlertsCtrl', [
  '$scope',
  'AlertsFactory',
  function($scope, AlertsFactory) {
    $scope.alerts = AlertsFactory.get();
  }
]);