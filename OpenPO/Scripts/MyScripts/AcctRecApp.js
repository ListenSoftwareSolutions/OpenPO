angular.module('AppAcctRecModule', [])
.service('AcctRecService', function ($http) {
    this.post = function (acctRec) {
        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        var response = $http({
            url: "/api/AcctRec",
            method: "POST",
            data: acctRec,
            headers: authHeaders
        });
        return response;
    };
})
.controller('AcctRecController', ['$scope', 'AcctRecService', function ($scope, AcctRecService) {

    $scope.initialize = function () {
        $scope.AcctRec.AddressId = 8;
    }
    $scope.addAcctRec = function () {
        var promise = AcctRecService.post($scope.AcctRec);
        promise.then(function (resp) {
            $scope.Message = "Call Completed Successfully";
            window.location.href = '/Home/Index';
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });
    };
}]);