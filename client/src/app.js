import angular from 'angular'
import 'angular-ui-router'

angular.module('openfaces', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/sets')

  $stateProvider

  	.state('new', {
      url: '/new-set',
      templateUrl: 'templates/new-set.html'
     })

    .state('sets', {
      url: '/sets',
      templateUrl: 'templates/sets-nav.html'
     })

    .state('sets.subjects', {
      url: '/:setName',
      templateUrl: 'templates/set-subjects.html'
     })

    .state('sets.origin', {
      url: '/:setName/origin/:origin',
      templateUrl: 'templates/set-subjects-origin.html'
     })

    .state('sets.gender', {
      url: '/:setName/gender/:gender',
      templateUrl: 'templates/set-subjects-gender.html'
     })

    .state('sets.age', {
      url: '/:setName/age/:range',
      templateUrl: 'templates/set-subjects-age.html'
     })

    .state('sets.name', {
      url: '/:setName/name/:query',
      templateUrl: 'templates/set-subjects-name.html'
     })
 
 })

//controllers
.controller('setsController', function($http){

 
  $http.get('sets').then((response) => {
  	this.sets = response.data;
  });

  //Test Data this.sets =["LFW","IMDB-WIKI"]; 

})




.controller('setController', function($http){

  //create set specific path
  var url = window.location.href;
  var set = url.split('/').pop();
  var path ='sets/' + set;
  this.setName = set;

  //TO DO: Add Error handling
  $http.get(path).then((response) => {
  	this.subjects = response.data;
  });


})


.controller('originController', function($http){

  //create set specific path
	var url = window.location.href;

	var parts = url.split('/');
	var lastindex = parts.length-1;
	  var set = parts[lastindex -2];
	  var origin = parts[lastindex];
	  //var origin = url.split('/').pop();
	  var path ='sets/' + set + '/origin/' + origin;

	  //CLEAN PATH
	   path = path.replace(/(\r\n|\n|\r)/gm,"");

	  this.setName = set;
	  this.originName = origin;

	  //TO DO: Add Error handling
	  $http.get(path).then((response) => {
	  	this.subjects = response.data;
	  });


})



.controller('genderController', function($http){

  //create set specific path
	var url = window.location.href;

	var parts = url.split('/');
	var lastindex = parts.length-1;
	  var set = parts[lastindex -2];
	  var gender = parts[lastindex];
	  //var origin = url.split('/').pop();
	  var path ='sets/' + set + '/gender/' + gender;

	  //CLEAN PATH
	   path = path.replace(/(\r\n|\n|\r)/gm,"");

	  this.setName = set;
	  this.gender = gender;

	  //TO DO: Add Error handling
	  $http.get(path).then((response) => {
	  	this.subjects = response.data;
	  });



})


.controller('ageController', function($http){

  //create set specific path
	var url = window.location.href;

	var parts = url.split('/');
	var lastindex = parts.length-1;
	var set = parts[lastindex -2];
	

	var query = parts[lastindex];
	var range = query.split('-');
	var min = range[0];
	var max = range[1];

	
	//var origin = url.split('/').pop();
	var path ='sets/' + set + '/age/' + query;

	
	 //CLEAN PATH
	 path = path.replace(/(\r\n|\n|\r)/gm,"");


	 this.setName = set;
	 this.ageMin = min;
	 this.ageMax = max;

	 //TO DO: Add Error handling
	 $http.get(path).then((response) => {
	  	this.subjects = response.data;
	  });


})


.controller('nameController', function($http){

  //create set specific path
	var url = window.location.href;

	var parts = url.split('/');
	var lastindex = parts.length-1;
	  var set = parts[lastindex -2];
	  var query = parts[lastindex];
	  //var origin = url.split('/').pop();
	  var path ='sets/' + set + '/name/' + query;

	  //CLEAN PATH
	   path = path.replace(/(\r\n|\n|\r)/gm,"");

	  this.setName = set;
	  this.query = query;

	  //TO DO: Add Error handling
	  $http.get(path).then((response) => {
	  	this.subjects = response.data;
	  });


})
