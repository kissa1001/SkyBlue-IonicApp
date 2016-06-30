// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('AppCtrl', ['$scope', 'Weather', function($scope, Weather){
  L.mapbox.accessToken = 'pk.eyJ1Ijoia2lzc2ExMDAxIiwiYSI6ImNpcTFvMWNueTAwMW1nN200ZGJwdzBvbHUifQ.pNdhJQbxmLbjLhC4-gl4wA';
  
  $scope.findMe = function(){
    navigator.geolocation.getCurrentPosition(function(pos){
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      var location = latitude + ',' + longitude;
      var map = L.mapbox.map('map', 'mapbox.streets').setView([latitude, longitude], 12);
      Weather.find(location)
      .then(function(result){
        console.log(result);
        $scope.name = result.location.name;
        $scope.result = true;
        $scope.feelC = result.current.feelslike_c;
        $scope.feelF = result.current.feelslike_f;
      })
    });

  }
}])
.factory("Weather", ['$http', function($http){
  var getWeather = function(location){
    var key = '2ad97e687d664bb5ba520448163006';
    var Url = 'http://api.apixu.com/v1/current.json?key=' + key + '&q=' + location;
    return $http.get(Url)
    .then(function(anything){
      return anything.data;
    });
  };
return {
  find: function(location){
    return getWeather(location);
  }
}
}])