(function () {

    "use strict";
    var app = angular.module("OpenPOModule"
        , ["ui.router","ui.mask"]
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
        this.getList = function () {

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
            })
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;


            //return response;
        };
    });
    app.service('PurchaseOrderService', function ($http) {
        this.getList = function (search) {

            var accesstoken = sessionStorage.getItem('accessToken');

            var authHeaders = {};
            if (accesstoken) {
                authHeaders.Authorization = 'Bearer ' + accesstoken;
            }

            var webapiurl;
            if (search == '') {
                webapiurl = "http://localhost:51829/api/purchaseOrder/GetAllList";
            }
            else {
                webapiurl = "http://localhost:51829/api/purchaseOrder/GetList/" + search;
            }
          
            var response = $http({
                url:webapiurl,
                method: "GET",
                headers: authHeaders
            });
            return response;
        }
    });
    app.factory('PurchaseOrderResource', ['PurchaseOrderService',PurchaseOrderResource]);
    function PurchaseOrderResource(PurchaseOrderService)
    {
        return {
            getList: function (search)
            {
               return PurchaseOrderService.getList(search).then(function (resp) {
               return resp.data;
                });
            }
        }
    };
    app.factory('AddressBookResource', ['AddressBookService', AddressBookResource]);
    function AddressBookResource(AddressBookService) {
        return {
            get: function (addressId) {
                return AddressBookService.get(addressId).then(function (resp) {
                    return resp.data;
                });
            }//end get
            ,getList: function () {
            return AddressBookService.getList().then(function (resp) {
                return resp.data;
            });
            }
        }
        
    };


    app.config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");


            var poSearch =
                {
                    name: "poSearch",
                    url: "/search:search",
                    templateUrl: "app/purchaseOrder/purchaseOrderListView.html",
                    controller: "PurchaseOrderListController",
                    controllerAs: "ViewModel",
                    resolve: {
                        
                        PurchaseOrders: function (PurchaseOrderResource, $stateParams) {
                            var search = $stateParams.search;

                            return (PurchaseOrderResource.getList(search));
                            /*
                            var purchaseOrderTemp = {
                                customerAddressId: "2",
                                description: "My Purchase Order",
                                message: ""
                            };
                            purchaseOrderTemp.message = search;
                            return (purchaseOrderTemp);
                            */
                        }
                    }
                  
                };
            var companyDetail = {
                name: "companyDetail",
                url: "/companies/details/:addressId",
                templateUrl: "app/addressBook/addressBookDetailView.html",
                controller: "AddressBookDetailController",
                controllerAs: "ViewModel",
                resolve: {

                    //AddressBookResource: "AddressBookResource",
                    AddressBook: function (AddressBookResource, $stateParams)
                    {
                        var addressIdParam = $stateParams.addressId;

                        return (AddressBookResource.get(addressIdParam));
                      

                    }

                       /*
                        var addressBookTemp = {
                            addressId: "2",
                            name: "David Nishimoto",
                            firstName: "David",
                            lastName: "Nishimoto"
                        };
                        return addressBookTemp;
                        */
                       //}
          

                }

            }


            var companies = {
                name: "companies",
                url: "/companies",
                templateUrl: "app/addressBook/addressBookListView.html",
                controller: "AddressBookListController",
                controllerAs:"ViewModel",
                resolve: {

                AddressBookResource: "AddressBookResource",
                Companies: function (AddressBookResource, $stateParams) {

                    return (AddressBookResource.getList());
                    }
                }
            };

            var companyEdit = {
                name: "companyEdit",
                url: "/companies/edit/:addressId",
                templateUrl: "app/addressBook/addressBookEditView.html",
                controller: "AddressBookEditController as ViewModel",
                controllerAs: "ViewModel",
                resolve: {

                    AddressBookResource: "AddressBookResource",
                    AddressBook: function (AddressBookResource, $stateParams) {
                        var addressIdParam = $stateParams.addressId;

                        if (addressIdParam!=0)
                        {
                            return(AddressBookResource.get(addressIdParam));
                        }
                        return (null);


                    }

                    /*
                     var addressBookTemp = {
                         addressId: "2",
                         name: "David Nishimoto",
                         firstName: "David",
                         lastName: "Nishimoto"
                     };
                     return addressBookTemp;
                     */
                    //}


                }
            }
            var companyUpdate = {
                name: "companyUpdate",
                url: "/companies/save/AddressBook",
                templateUrl: "app/addressBook/addressBookEditView.html",
                controller: "AddressBookSaveController as ViewModel",
                controllerAs: "ViewModel",
                resolve: {

                    AddressBookResource: "AddressBookResource",
                    AddressBook: function (AddressBookResource, $stateParams) {
                        var addressIdParam = $stateParams.addressId;

                        return (AddressBookResource.get(addressIdParam));


                    }

                    /*
                     var addressBookTemp = {
                         addressId: "2",
                         name: "David Nishimoto",
                         firstName: "David",
                         lastName: "Nishimoto"
                     };
                     return addressBookTemp;
                     */
                    //}


                }
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
            $stateProvider.state(companyUpdate);
            $stateProvider.state(companyDetail);
            $stateProvider.state(poSearch);

        }])
}());