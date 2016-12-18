// we have a controller and a service. Service is destined to provide user's current location and it should work in a way that allows controller to first pass cached data to controller (if any cached data is available) and then check if user's location has changed pass it once again, so that controller can update the view. If no cached data available - retrieve user's position and pass it to controller.

(function(angular){
  'use strict';

  var exampleApp = angular.module('app', []);

  exampleApp.factory( 'mediator', function( $rootScope ) {
    return $rootScope.$new( true ); 
  });

  exampleApp.controller('mainCtrl', ['$scope', 'coords', 'mediator', function($scope, coords, mediator){
    // $scope.coords = coords;
    //_______________________________
    // var position;
    // $scope.$watch("currentCoords", function (newValue) {
    //   position = newValue; 
    // });
    //_______________________________
    var position;
    mediator.$on( 'my:changeCoords', function( event, data ) {
      position=data;
      });
    coords.get()
    .then(function (position) {
      $scope.position = position;
    });
  }]);

  exampleApp.factory('coords', ['$q', function($q){
    var lastKnownPosition;

    return {
      get: get
    };

    function get () {
      var defer = $q.defer();

      if (lastKnownPosition) {
        defer.resolve(lastKnownPosition);

        navigator.geolocation.getCurrentPosition(function (position) {
          if (lastKnownPosition - position > 'some value') {
            lastKnownPosition = position;
            // notify mainCtrl that the position has changed
            // $scope.$apply(function () {
            //   $scope.get;
            // });
            mediator.$emit( 'my:changeCoords', lastKnownPosition );
          }
        });
      } else {
        navigator.geolocation.getCurrentPosition(function (position) {
          lastKnownPosition = position;
          defer.resolve(lastKnownPosition);
        });
      }

      return defer.promise;
    }
  }]);

}(angular));