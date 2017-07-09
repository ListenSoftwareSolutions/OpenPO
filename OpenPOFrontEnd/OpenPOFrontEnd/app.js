(function () {

    "use strict";
    var app = angular.module("OpenPOModule"
        , ["ui.router"]
    );
    app.service('GetAddressBookService', ['$http', '$q', function ($http, $q) {
    //app.service('GetAddressBookService', ['$http', function ($http) {
       
        var service = {
            AddressBook: [],
            get: get
        };
        return service;

        function get(id) {
            var accesstoken = sessionStorage.getItem('accessToken');

            var authHeaders = {};
            if (accesstoken) {
                authHeaders.Authorization = 'Bearer ' + accesstoken;
            }
            var deferred = $q.defer();

            $http({
                url: "http://localhost:51829/api/people/" + id,
                method: "GET",
                headers: authHeaders
            }).then(function (HttpData) {
                service.AddressBook = HttpData.data
                console.log(service.AddressBook);
                deferred.resolve(HttpData);
            },function(msg) {
                console.log(msg);
                deferred.reject(msg);
            });
  
            //.error(function (msg) {
 //               deferred.reject(msg);
           // });

            return deferred.promise;
         
        } //end get
       
    }]);
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

    app.factory('AddressBookResource', ['GetAddressBookService', AddressBookResource]);
    function AddressBookResource(GetAddressBookService) {
        return {
            get: function (addressId) {
                 return GetAddressBookService.get(addressId).then(function (resp) {
                    return resp.data;
                })
                //return GetAddressBookService.get(addressId);
                //return GetAddressBookService.get(addressId).$promise.then(function (resp) {
                //    return resp.data;
                //})
                //return(GetAddressBookService.get(addressId).$promise);
                /*
                var promise = GetAddressBookService.get(addressId);
                promise.then(function (resp) {
                    return resp.data;
                })
                */
            }
        }
      
        /*
        var factoryReturn = {
                 getAddressBook: getAddressBook
        }
        return factoryReturn;

        function getAddressBook(addressId)
        {
            var promise = AddressBookService.get(addressId);
            promise.then(function (resp) {
                return factoryReturn=resp.data;

            });
        }
*/

    //app.factory('AddressBookResource', ['$resource', AddressBookResource]);
    //function AddressBookResource($resource){

        
/*
        //worked
        var promise = AddressBookService.get(2);
        promise.then(function (resp) {
            return resp.data;
        
        });
*/
        

        //(failed)var ab = AddressBookService.get(2).$promise;

        //var factory = {};
        
        //return {
            //get: function (addressId)
            //{
                //return (AddressBookService.get(addressId));
                /*
                var promise = AddressBookService.get(addressId);
                promise.then(function (resp) {
                    return resp.data;
                });
                */

/*
                AddressBookService.get(addressId,
                        function (data) {
                            return(data);
                        });
*/
                //return AddressBookService.get(addressId);
           // }
        //}
        
        /*
        factory.get = function (addressIdParam) {
            var AddressBook = $resource('http://localhost:51829/api/people', { userId: '@id' });
            AddressBook.get({ addressId: addressBookParam }, function (ab) {
                //user.abc = true;
                ab.$save(ab);
            });
            //failed: return AddressBookService.get(addressId).$promise;
            //return (addressId);
        }
        */
        /*
        return{
            getAccountDetails: $resource(XXX, {}, {
                getAccountDetailsService: {}
            }),
            getAccountInformation: function($scope, number, transaction, index){
                AccountService.getAccountDetails.getAccountDetailsService({number : number})
               .$promise.then(function(response){});       
            }
        */
       
        //return factory;
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
                    AddressBook: function (AddressBookResource, $stateParams)
                    {
                        var addressIdParam = $stateParams.addressId;

                        return (AddressBookResource.get(addressIdParam));
                        /*
                        AddressBookResource.get({ addressId: addressIdParam }).then
                        (function (resp) {
                            return resp.data
                        });
*/

                    }
                    /*
                    AddressBookService: "AddressBookService",
                    AddressBook: function(AddressBookService, $stateParams)
                    {
                      
                        //return AddressBookService.get(addressIdParam).$promise;
                   
                        var promise = AddressBookService.get(addressIdParam);
                        promise.then
                        (function (resp) {
                            return resp.data;

                        });
                       
                     }
                    */
                       /*
                        var addressBookTemp = {
                            addressId: "2",
                            name: "David Nishimoto",
                            firstName: "David",
                            lastName: "Nishimoto"
                        };
                        return addressBookTemp;
                        */
                     
                        //var addressIdParam = $stateParams.addressId;
                        //return AddressBookResource.get({ addressId: addressIdParam });
                        //return addressBookTemp;
                    //}
                    /*
                    AddressBookResource: "AddressBookResource",

                    AddressBook: function (AddressBookResource, $stateParams) {

                        var addressIdParam = $stateParams.addressId;
                        
                        var addressBookTemp = {
                            addressId: "2",
                            Name: "David Nishimoto",
                            FirstName: "David",
                            LastName: "Nishimoto"
                        };
                        return addressBookTemp;
                 
                        var AddressBook = "Hello World";
                        //return AddressBookResource.get({ addressId: addressIdParam }).$promise;
                   
                        var promise = AddressBookResource.get({ addressId: addressIdParam });
                        promise.then(function (resp) {
                            return resp.data;
                        });
                        
                        AddressBookResource.get({ addressId: addressIdParam }).then(
                            function (response) {
                                return response.data
                            })
                    }

                            */
                            

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