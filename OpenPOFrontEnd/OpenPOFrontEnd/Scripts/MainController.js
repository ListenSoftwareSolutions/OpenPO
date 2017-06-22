angular.module('AppMainModule', [])
.service('MainService', function ($http) {
        this.GetBook=function()
        {
            return ($http.get("orders/api/people/1"));
        }
     })
.controller('MainController',['$scope', 'MainService', function ($scope, MainService) {

    var promise=MainService.GetBook();
    promise.then(function(response)
    {
        $scope.addressbook = response.data;
    }, function (err) {
        $scope.message = "Error!!! " + err.status
    });
    var person = {
        firstName:"David",
        lastName: "Nishimoto",
        imagesrc: "images/dn.gif"
    };

    $scope.message = "Hello Angular";
    $scope.person = person;
}]);

