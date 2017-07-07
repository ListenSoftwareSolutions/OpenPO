(function () {
    "use strict";
    var app=angular.module("OpenPOModule")
    angular.module("OpenPOModule");
   
    //app.service('AddressBookService', function ($http) {
    //    this.post = function (addressBook) {
    //        var accesstoken = sessionStorage.getItem('accessToken');

    //        var authHeaders = {};
    //        if (accesstoken) {
    //            authHeaders.Authorization = 'Bearer ' + accesstoken;
    //        }
    //        var response = $http({
    //            url: "http://localhost:51829/api/people",
    //            method: "POST",
    //            data: addressBook,
    //            headers: authHeaders
    //        });
    //        return response;
    //    };
    //    this.put = function (addressId, addressBook) {
    //        var accesstoken = sessionStorage.getItem('accessToken');

    //        var authHeaders = {};
    //        if (accesstoken) {
    //            authHeaders.Authorization = 'Bearer ' + accesstoken;
    //        }
    //        var response = $http({
    //            url: "http://localhost:51829/api/people/" + addressId,
    //            method: "PUT",
    //            data: addressBook,
    //            headers: authHeaders
    //        });
    //        return response;
    //    };
    //    this.delete = function (addressId, addressBook) {
    //        var accesstoken = sessionStorage.getItem('accessToken');

    //        var authHeaders = {};
    //        if (accesstoken) {
    //            authHeaders.Authorization = 'Bearer ' + accesstoken;
    //        }
    //        var response = $http({
    //            url: "http://localhost:51829/api/people/" + addressId,
    //            method: "DELETE",
    //            data: addressBook,
    //            headers: authHeaders
    //        });
    //        return response;
    //    };
    //    this.get = function (id) {

    //        var accesstoken = sessionStorage.getItem('accessToken');

    //        var authHeaders = {};
    //        if (accesstoken) {
    //            authHeaders.Authorization = 'Bearer ' + accesstoken;
    //        }

    //        var response = $http({
    //            url: "http://localhost:51829/api/people/" + id,
    //            method: "GET",
    //            headers: authHeaders
    //        });
    //        return response;
    //    };

    //    this.list = function () {

    //        var accesstoken = sessionStorage.getItem('accessToken');

    //        var authHeaders = {};
    //        if (accesstoken) {
    //            authHeaders.Authorization = 'Bearer ' + accesstoken;
    //        }

    //        //return ($resource("http://localhost:51829/api/people"));
    //        var response = $http({
    //            url: "http://localhost:51829/api/people",
    //            method: "GET",
    //            headers: authHeaders
    //        });
    //        return response;
    //    }
    //    this.getUDC = function (productKey) {

    //        var accesstoken = sessionStorage.getItem('accessToken');

    //        var authHeaders = {};
    //        if (accesstoken) {
    //            authHeaders.Authorization = 'Bearer ' + accesstoken;
    //        }

    //        var response = $http({
    //            url: "http://localhost:51829/api/udc/GetListBox?product_code=" + productKey,
    //            method: "GET",
    //            headers: authHeaders
    //        });
    //        return response;
    //    };
    //});
    app.controller('AddressBookController', ['AddressBookService',AddressBookController]);

    function AddressBookController (AddressBookService) {
        var ViewModel = this;

        ViewModel.Companies = [];
       
        ViewModel.Message = "";
        ViewModel.userName = sessionStorage.getItem('userName');

        ViewModel.test= function test(){
            alert('reached');
        }
       
        ViewModel.getUDCList = function getUDCList(product_key) {
            var promise = AddressBookService.getUDC(product_key);
            promise.then(function (resp) {

                ViewModel.UDCList = resp.data;
                //alert($scope.AddressBook.name);
                ViewModel.Message = "Call Completed Successfully";
            }, function (err) {
                ViewModel.Message = "Error!!! " + err.status
            });
        };
        ViewModel.getPerson = function getPerson() {
            //alert('reached')
            ViewModel.AddressBook = addressBook;
            //var promise = AddressBookService.get(addressBook.addressId);
            //promise.then(function (resp) {

            //    ViewModel.AddressBook = resp.data;
            //    //alert($scope.AddressBook.name);
            //    ViewModel.Message = "Call Completed Successfully" + ViewModel.AddressBook.name;
            //    ViewModel.getUDCList('AB_TYPE');
            //}, function (err) {
            //    ViewModel.Message = "Error!!! " + err.status
            //});
        };


        ViewModel.loadPeople = function loadPeople() {


            var promise = AddressBookService.list();
            promise.then(function (resp) {

                ViewModel.Companies = resp.data;
                ViewModel.Message = "Call Completed Successfully";
            }, function (err) {
                ViewModel.Message = "Error!!! " + err.status
            });
        };

        ViewModel.updatePerson = function (addressId) {

            //var promise = AddressBookService.put(addressId, ViewModel.AddressBook);
            //promise.then(function (resp) {
            //    ViewModel.Message = "Update Call Completed Successfully";
            //    window.location.href = "/Home/company";
            //}, function (err) {
            //    ViewModel.Message = "Error!!! " + err.status
            //});

    
        }
        ViewModel.deletePerson = function (addressId) {

            //var promise = AddressBookService.delete(addressId, ViewModel.AddressBook);
            //promise.then(function (resp) {
            //    ViewModel.Message = "Call Completed Successfully";
            //    window.location.href = '/Home/Company';
            //}, function (err) {
            //    ViewModel.Message = "Error!!! " + err.status
            //});

       
        }

        ViewModel.addPerson = function () {
            //var promise = AddressBookService.post(ViewModel.AddressBook);
            //promise.then(function (resp) {
            //    ViewModel.Message = "Call Completed Successfully";
            //    window.location.href = '/Home/Company';
            //}, function (err) {
            //    ViewModel.Message = "Error!!! " + err.status
            //});
        };

    };

}());  //end if