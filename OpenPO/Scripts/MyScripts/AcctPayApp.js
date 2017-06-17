angular.module('AppAcctPayModule', [])
.service('AcctPayService', function ($http) {

})
.controller('AcctPayController', ['$scope', 'AcctPayService', function ($scope, AcctPayService) {

    

    $scope.initialize = function () {
        var AcctPay ={
            "AddressId" : 8
        };

        $scope.AcctPay=AcctPay;
        $scope.Message = 8;
    }

}]);