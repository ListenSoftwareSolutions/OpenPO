angular.module('AppAddressBookModule', [])
.service('AddressBookService', function ($http) {
    this.post = function (addressBook) {
        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        var response = $http({
            url: "/api/people",
            method: "POST",
            data: addressBook,
            headers: authHeaders
        });
        return response;
    };
    this.get = function () {

        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        var response = $http({
            url: "/api/people",
            method: "GET",
            headers: authHeaders
        });
        return response;
    }
})
.controller('AddressBookController', ['$scope', 'AddressBookService', function ($scope, AddressBookService) {
    $scope.Companies = [];
    
    $scope.Message = "";
    $scope.userName = sessionStorage.getItem('userName');


    //loadPeople();

    $scope.loadPeople = function loadPeople() {

  
        var promise = AddressBookService.get();
        promise.then(function (resp) {
            
            $scope.Companies = resp.data;
            $scope.Message = "Call Completed Successfully";
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });
    };

    $scope.editPerson = function (addressId) {
        window.location("/people/edit/" + addressId);

    }

    $scope.addPerson = function () {
        var promise = AddressBookService.post($scope.addressBook);
        promise.then(function (resp) {
            $scope.Message = "Call Completed Successfully";
            //window.location.path("/people");
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });
    }
   
}]);
