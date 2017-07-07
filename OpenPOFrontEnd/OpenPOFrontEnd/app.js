(function () {

    "use strict";
    var app = angular.module("OpenPOModule"
        , ["ui.router"]
    );
    app.service('AddressBookService', function ($http) {
        this.get = function (id) {

            var accesstoken = sessionStorage.getItem('accessToken');

            var authHeaders = {};
            if (accesstoken) {
                authHeaders.Authorization = 'Bearer ' + accesstoken;
            }

            var response = $http({
                url: "http://localhost:51829/api/people/" + id,
                method: "GET",
                headers: authHeaders
            });
            return response;
        };
        this.post = function (addressBook) {
            var accesstoken = sessionStorage.getItem('accessToken');

            var authHeaders = {};
            if (accesstoken) {
                authHeaders.Authorization = 'Bearer ' + accesstoken;
            }
            var response = $http({
                url: "http://localhost:51829/api/people",
                method: "POST",
                data: addressBook,
                headers: authHeaders
            });
            return response;
        };
        this.put = function (addressId, addressBook) {
            var accesstoken = sessionStorage.getItem('accessToken');

            var authHeaders = {};
            if (accesstoken) {
                authHeaders.Authorization = 'Bearer ' + accesstoken;
            }
            var response = $http({
                url: "http://localhost:51829/api/people/" + addressId,
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
                url: "http://localhost:51829/api/people/" + addressId,
                method: "DELETE",
                data: addressBook,
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

            //return ($resource("http://localhost:51829/api/people"));
            var response = $http({
                url: "http://localhost:51829/api/people",
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
                url: "http://localhost:51829/api/udc/GetListBox?product_code=" + productKey,
                method: "GET",
                headers: authHeaders
            });
            return response;
        };
    });

    app.factory('AddressBookResource', ['AddressBookService', AddressBookResource]);
    function AddressBookResource(AddressBookService) {

        //var ab=AddressBookService.get(2);

        //var factory = {};
        return {
            get: function (addressId)
            {
                return AddressBookService.get(addressId);
            }
        }
        /*
        factory.get = function (addressId) {
            return AddressBookService.get(addressId);
            //return (addressId);
        }
        */
       // return factory;
    };


    app.config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");


            var companyDetail = {
                name: "companyDetail",
                url: "/companies/details/:addressId",
                templateUrl: "app/addressBook/addressBookDetailView.html",
                controller: "AddressBookDetailController",
                controllerAs: "ViewModel",
                resolve: {
                    AddressBookResource: "AddressBookResource",

                    AddressBook: function (AddressBookResource, $stateParams) {

                        var addressIdParam = $stateParams.addressId;
                        return AddressBookResource.get({ addressId: addressIdParam }).$promise;
                        /*
                        var promise = AddressBookResource.get({ addressId: addressIdParam });
                        promise.then(function (resp) {
                            return resp.data;
                        });
                        
                        AddressBookResource.get({ addressId: addressIdParam }).then(
                            function (response) {
                                return response.data
                            })
                            */
                            
                    }

                }

            }


            var companies = {
                name: "companies",
                url: "/companies",
                templateUrl: "app/addressBook/addressBookListView.html",
                controller: "AddressBookController as ViewModel"
            };

            var companyEdit = {
                name: "companyEdit",
                url: "/companies/edit/:addressId",
                templateUrl: "app/addressBook/addressBookEditView.html",
                controller: "AddressBookController as ViewModel"
            }

            var purchaseorder = {
                name: "purchaseorder",
                url: "/purchaseorder",
                templateUrl: "app/purchaseorder/purchaseorderListView.html",
                controller: "PurchaseOrderController as ViewModel"
            };

            var home = {
                name: "home",
                url: "/",
                templateUrl: "app/welcomeView.html",
                controller: "AddressBookController as ViewModel"
            };

            var helloState = {
                name: 'hello',
                url: '/hello',
                template: '<h3>hello world!</h3>'
            };

            $stateProvider.state(companies);
            $stateProvider.state(home);
            $stateProvider.state(helloState);
            $stateProvider.state(companyEdit);
            $stateProvider.state(companyDetail);

        }])
}());