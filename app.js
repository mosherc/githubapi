var app = angular.module('BitSight', []);
    
app.controller('githubCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
    $scope.starUsers = [];
    $scope.prolificUsers = [];
    
    $scope.loadStarUsers = function() {
        console.log('hello');
        $http.get("https://api.github.com/search/repositories?q=created:2017-02-01..2017-02-28&sort=stars&order=desc")
            .success(function (data){
                console.log(data.items);
                $scope.starUsers = data.items.slice(0,5);
                console.log("new data");
            })
            .error(function() {
                console.log("Data not found");
            }
        );
    };
    
    $scope.loadProlificUsers = function() {
        var t = new Date();
        var lastYear = (t.getFullYear()-1) + "-" + t.getMonth() + "-" + t.getDate();
        $http.get("https://api.github.com/search/users?q=created:" + lastYear + ".." + t + "&sort=followers&order=desc")
            .success(function(data){
                $scope.prolificUsers = data.items.slice(0,5);
            })
            .error(function() {
                console.log("Data not found");
            });
        console.log("attempted data");
        $timeout($scope.loadProlificUsers(), 1000*10);
    };
    
    $scope.loadStarUsers();
    $scope.loadProlificUsers();
    
    
}]);