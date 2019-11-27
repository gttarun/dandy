// this file is a module (refrenced in ng-app) and CONTAINS controllers

/* THIS creates an ANGULAR MODULE */
var dandyApp = angular.module('dandyApp', ['ngRoute'])

/* CONTROLLERS */

// before your application runs
dandyApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    
	$routeProvider
        .when('/home', {
			templateUrl: 'views/home.html',
            controller: 'DandyController'
		})
		.when('/spayed', {
			templateUrl: 'views/spayed.html',
            controller: 'DandyController'
		})
        .when('/neutered', {
			templateUrl: 'views/neutered.html',
            controller: 'DandyController'
		})
        .when('/single', {
			templateUrl: 'views/single.html',
            controller: 'DandyController'
		})
        .when('/mixed', {
			templateUrl: 'views/mixed.html',
            controller: 'DandyController'
		})
        .when('/gender', {
			templateUrl: 'views/gender.html',
			controller: 'DandyController'
		})
        .when('/completed', {
			templateUrl: 'views/completed.html',
			controller: 'DandyController'
		})
		.when('/select', {
			templateUrl: 'views/select.html',
			controller: 'DandyController'
		}).otherwise({
			redirectTo: '/home'
		})
    
        $locationProvider.html5Mode(true);
}]);


// this controller will control 'NinjaController' part of the app
dandyApp.controller('DandyController', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http){
    
    $scope.filteredChoices = [];
    $rootScope.inputFields = [{"breed":'',"mixed":'', isVisible: {"suggestions": false}}];
    $scope.addb = true;
    $scope.isVisible = {
        suggestions: false
    };
    $scope.max = 2;
    $scope.hide = false;
    $scope.only = false;
    $scope.actualnext = false;
    $scope.notfound = false;
    
    $scope.go = function ( path ) {
        $location.path( path );
    };
    
//    $scope.setName = function() {
//        $http({
//            method: 'POST',
//            url: 'http://127.0.0.1:5000/newdog',
//            data: {'name': $scope.dogname}
//            }).then(function (response){
//                $location.path('/select');
//            },function (error){
//                console.log(error)
//        });
//    };
    
    $scope.genderpage = function () {
        $location.path("/gender")
    }
    
    $scope.setName = function(){
        $rootScope.dogName = $scope.dogname
        $location.path("/select")
    }
    
    $scope.addbr = function(){
        $rootScope.mixed = "single"
        if ($scope.actualnext){
            if ($rootScope.mainbreed == 'Unknown') {
                $location.path("/gender")
            } else if ($rootScope.inputFields.length > 1) {
                $rootScope.mixed = "mixed"
                $rootScope.mainbreed = $rootScope.inputFields[0].breed + " " + $rootScope.inputFields[1].breed
                $location.path("/mixed")
            } else {
                if (!$rootScope.mainbreed){
                    $rootScope.mainbreed = $rootScope.inputFields[0].breed
                    $rootScope.inputFields[0].mixed = "other"
                    $location.path("/gender")
                } else {
                    $location.path("/single")
                }
            }
        }
    }
    
    $scope.newdog = function(){
        $scope.filteredChoices = [];
        $rootScope.inputFields = [{"breed":'',"mixed":'', isVisible: {"suggestions": false}}];
        $scope.addb = true;
        $scope.isVisible = {
            suggestions: false
        };
        $scope.max = 2;
        $scope.hide = false;
        $scope.only = false;
        $scope.actualnext = false;
        $scope.notfound = false;
        
        $rootScope.dogName = ""
        $rootScope.gender = ""
        $rootScope.mixed = ""
        $rootScope.fixed = ""
        $rootScope.mainbreed = ""
        
        $location.path("/home")
    
    }
    
    $scope.submitToDatabaseA = function() {
        if ($scope.spayed){
            $rootScope.fixed = "True"
        } else {
            $rootScope.fixed = "False"
        }
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:5000/newdog',
            data: {'name': $rootScope.dogName, 'gender': $rootScope.gender, 'mixed': $rootScope.mixed, 'fixed': $rootScope.fixed, 'breed':$rootScope.mainbreed}
            }).then(function (response){
                $location.path('/completed');
            },function (error){
                console.log(error)
        });
        $location.path("/completed")
    }
    
    $scope.submitToDatabaseB = function() {
        if ($scope.neutered){
            $rootScope.fixed = "True"
        } else {
            $rootScope.fixed = "False"
        }
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:5000/newdog',
            data: {'name': $rootScope.dogName, 'gender': $rootScope.gender, 'mixed':$rootScope.mixed, 'fixed': $rootScope.fixed, 'breed':$rootScope.mainbreed}
            }).then(function (response){
                $location.path('/completed');
            },function (error){
                console.log(error)
        });
        $location.path("/completed")
    }
    
    $scope.addgender = function() {
        $rootScope.gender = $scope.gender;
        if ($scope.gender == 'male'){
            $location.path('/neutered')
        } else {
            $location.path('/spayed')
        }
    }
  
    $scope.filterItems = function (enteredtext) {
        $scope.filteredChoices = []
        if(enteredtext.length > 0) {
            $scope.filteredChoices = querySearch(enteredtext.toLowerCase()); 
            if ($scope.filteredChoices.length > 0){
                $scope.notfound = false;
            }
            f(enteredtext, $scope.filteredChoices.length > 0 ? true : false);
            $scope.addb = false;
            
        }
        else {
//            f(enteredtext, false);
            var i;
            for (i = 0; i < $rootScope.inputFields.length ; i++) {
                $rootScope.inputFields[i].isVisible.suggestions = false;
            }
            $scope.addb = true;
            $scope.notfound = false;
        } 
    };
  
    $scope.selectItem = function (breed, item) {
        var i;
        for (i = 0; i < $rootScope.inputFields.length; i++){
            if ($rootScope.inputFields[i].breed.slice(0, breed.length) == breed){
                $rootScope.inputFields[i].breed = item.breed;
                $rootScope.mainbreed = item.breed;
                $rootScope.inputFields[i].mixed = item.mixed;
                $rootScope.inputFields[i].isVisible.suggestions = false;
                $scope.addb = true;
                if ($rootScope.mainbreed == 'Other') {
                    $scope.only = true;
                    $scope.hide = true;
                } break;
            }
        } 
  };
    
    $scope.addBreed = function () {
        if ($rootScope.inputFields.length < $scope.max) {
            $rootScope.inputFields.push({"breed":'',"mixed":'', isVisible:{"suggestions": false}})
            if ($rootScope.inputFields.length == $scope.max) {
                $scope.hide = true;
            }
        } else {
            $scope.hide = true;
        }
    }
  
    function f(x, y){
        var i;
        for (i = 0; i < $rootScope.inputFields.length ; i++) {
            if ($rootScope.inputFields[i].breed.slice(0, x.length) == x){
                if (y) {
                    $rootScope.inputFields[i].isVisible.suggestions = y
                } else {
                    $rootScope.inputFields[i].isVisible.suggestions = true
                }
                
            }
        } if (!y) {
            $scope.filteredChoices = [{breed: "Unknown"}, {breed: "other"}];
            $scope.notfound = true;
        }
    }

    function querySearch (query) {
        // returns list of filtered items
        return  query ? $scope.breeds.filter( createFilterFor(query) ) : [];
    }

    function createFilterFor(query) {
        return function filterFn(item) {
            var lowercaseitem = item.breed.toLowerCase();
          // Check if the given item matches for the given query
            return (lowercaseitem.indexOf(query) === 0);
        };
    }
    
    $http({
        method: 'GET',
        url: 'http://127.0.0.1:5000/breeds'
    }).then(function (response){
        $scope.breeds = response.data;
    },function (error){
        console.log(error)
    });
    
}]);