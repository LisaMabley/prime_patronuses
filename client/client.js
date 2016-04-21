var app = angular.module('patronusApp', []);

app.controller('MainController', ['$http', function($http) {
  var controller = this;

  controller.peopleList = [];
  controller.patList = [];

  controller.getPats = function() {
    $http.get('/patronus').then(function(response) {
      controller.patList = response.data;
    });
  }

  controller.getPeople = function() {
    $http.get('/people').then(function(response) {
      controller.peopleList = response.data;
    });
  }

  controller.addPatronus = function(){
    $http.post('/patronus', {name: controller.patName}).then(controller.getPats());
  }

  controller.addPerson = function(){
    $http.post('/people', {first_name: controller.personFirst, last_name: controller.personLast}).then(controller.getPeople());
  }

  controller.getPats();
  controller.getPeople();
}]);
