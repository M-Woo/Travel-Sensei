angular
.module('TravelSensei')
.controller('CityCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'YelpFactory',
  'AlertsFactory',
  'FlightFactory',
  function($scope, $state, $stateParams, YelpFactory, AlertsFactory, FlightFactory) {

    // PUBLIC VARIABLES & FUNCTIONS
    // Call yelp api on page load
    getCityData();
    getFlightData();

    $scope.city = $stateParams.id;
    $scope.getFlightData = getFlightData;
    $scope.loading = true;
    $scope.loadingFlights = true;
    //toggle sidebar
    $scope.showme = false;
    

    // PRIVATE VARIABLES & FUNCTIONS
    function getFlightData() {
      FlightFactory.getCity($scope.city)
      .then(function(res){
        $scope.loadingFlights = false;
        $scope.flights = res.data;
        $scope.flights.airObj.price = $scope.flights.airObj.price.replace('USD', '$');
      })
      .catch(function(err){
        $scope.loadingFlights = false;
        AlertsFactory.add('error', err.data.message);
      })
    }

    function getCityData() { 
      YelpFactory.getCity($scope.city)
      .then(function(res) {
        $scope.topFood = res.data.yelpFoodArr;
        $scope.topLocal = res.data.yelpLocalArr;
        $scope.loading = false;
      })
      .catch(function(err) {
        AlertsFactory.add('error', err.data.message);
        $scope.loading = false;
      })
    }
  }
]);