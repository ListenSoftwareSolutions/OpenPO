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
    this.delete = function (addressId, addressBook) {
        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        var response = $http({
            url: "/api/people/" + addressId,
            method: "DELETE",
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
    this.getUDC = function (productKey) {

        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        var response = $http({
            url: "/api/udc/GetListBox?product_code=" + productKey,
            method: "GET",
            headers: authHeaders
        });
        return response;
    };
})
.controller('AddressBookController', ['$scope', 'AddressBookService', function ($scope, AddressBookService) {
    $scope.Companies = [];
    
    $scope.Message = "";
    $scope.userName = sessionStorage.getItem('userName');


    //loadPeople();
    $scope.getUDCList = function getUDCList(product_key) {
        var promise = AddressBookService.getUDC(product_key);
        promise.then(function (resp) {

            $scope.UDCList = resp.data;
            //alert($scope.AddressBook.name);
            $scope.Message = "Call Completed Successfully" ;
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });
    };
    $scope.getPerson = function getPerson(id) {
        var promise = AddressBookService.get(id);
        promise.then(function (resp) {

            $scope.AddressBook = resp.data;
            //alert($scope.AddressBook.name);
            $scope.Message = "Call Completed Successfully"+$scope.AddressBook.name;
            $scope.getUDCList('AB_TYPE');
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
            $scope.Message = "Update Call Completed Successfully";
            window.location.href="/Home/company";
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });

       // window.location("/people/edit/" + addressId);

    }
    $scope.deletePerson = function (addressId) {

        var promise = AddressBookService.delete(addressId, $scope.AddressBook);
        promise.then(function (resp) {
            $scope.Message = "Call Completed Successfully";
            window.location.href = '/Home/Company';
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });

        // window.location("/people/edit/" + addressId);

    }

        $scope.addPerson = function () {
        var promise = AddressBookService.post($scope.AddressBook);
        promise.then(function (resp) {
            $scope.Message = "Call Completed Successfully";
            window.location.href = '/Home/Company';
        }, function (err) {
            $scope.Message = "Error!!! " + err.status
        });
    };
   
}]);
