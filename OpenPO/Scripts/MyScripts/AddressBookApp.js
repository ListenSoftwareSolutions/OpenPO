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
    this.put = function (addressId,addressBook) {
        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        var response = $http({
            url: "/api/people/"+addressId,
            method: "PUT",
            data: addressBook,
            headers: authHeaders
        });
        return response;
    };
    this.get = function (id) {

        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        var response = $http({
            url: "/api/people/" + id,
            method: "GET",
            headers: authHeaders
        });
        return response;
    };

    this.list = function () {

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

    $scope.getPerson = function getPerson(id) {
        var promise = AddressBookService.get(id);
        promise.then(function (resp) {

            $scope.AddressBook = resp.data;
            //alert($scope.AddressBook.name);
            $scope.Message = "Call Completed Successfully"+$scope.AddressBook.name;
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });
    };

    $scope.loadPeople = function loadPeople() {

  
        var promise = AddressBookService.list();
        promise.then(function (resp) {
            
            $scope.Companies = resp.data;
            $scope.Message = "Call Completed Successfully";
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });
    };

    $scope.updatePerson = function (addressId) {

        var promise = AddressBookService.put(addressId,$scope.AddressBook);
        promise.then(function (resp) {
            $scope.Message = "Call Completed Successfully";
            window.location.path("/Home/company.cshtml");
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });

       // window.location("/people/edit/" + addressId);

    }

        $scope.addPerson = function () {
        var promise = AddressBookService.post($scope.AddressBook);
        promise.then(function (resp) {
            $scope.Message = "Call Completed Successfully";
            window.location.path("/Home/company.cshtml");
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });
    };
   
}]);
