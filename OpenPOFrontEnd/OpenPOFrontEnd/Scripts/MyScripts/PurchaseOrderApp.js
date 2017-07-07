(function () {
    "use strict";
    var app = angular.module("OpenPOModule")
    angular.module("OpenPOModule");

    app.service('PurchaseOrderService', function ($http) {
        this.post = function (purchaseOrderk) {
            var accesstoken = sessionStorage.getItem('accessToken');

            var authHeaders = {};
            if (accesstoken) {
                authHeaders.Authorization = 'Bearer ' + accesstoken;
            }
            var response = $http({
                url: "/api/purchaseorder",
                method: "POST",
                data: purchaseOrder,
                headers: authHeaders
            });
            return response;
        };
        this.put = function (id, purchaseOrder) {
            var accesstoken = sessionStorage.getItem('accessToken');

            var authHeaders = {};
            if (accesstoken) {
                authHeaders.Authorization = 'Bearer ' + accesstoken;
            }
            var response = $http({
                url: "/api/purchaseorder/" + id,
                method: "PUT",
                data: purchaseOrder,
                headers: authHeaders
            });
            return response;
        };
        this.delete = function (id, purchaseOrder) {
            var accesstoken = sessionStorage.getItem('accessToken');

            var authHeaders = {};
            if (accesstoken) {
                authHeaders.Authorization = 'Bearer ' + accesstoken;
            }
            var response = $http({
                url: "/api/purchaseorder/" + id,
                method: "DELETE",
                data: purchaseOrder,
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
                url: "http://localhost:51829/api/purchaseorder",
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
    });
    app.controller('purchaseOrderController', ['purchaseOrderService', function (purchaseOrderService) {
        var viewModel = this;

        viewModel.PurchaseOrders = [];

        viewModel.Message = "";
        viewModel.userName = sessionStorage.getItem('userName');

        viewModel.test = function test() {
            alert('reached');
        }

        viewModel.getUDCList = function getUDCList(product_key) {
            var promise = purchaseOrderService.getUDC(product_key);
            promise.then(function (resp) {

                viewModel.UDCList = resp.data;
                //alert($scope.purchaseOrder.name);
                viewModel.Message = "Call Completed Successfully";
            }, function (err) {
                viewModel.Message = "Error!!! " + err.status
            });
        };
        viewModel.getPurchaseOrder = function getPurchaseOrder(id) {
            var promise = purchaseOrderService.get(id);
            promise.then(function (resp) {

                viewModel.purchaseOrder = resp.data;
                //alert($scope.purchaseOrder.name);
                viewModel.Message = "Call Completed Successfully" + viewModel.purchaseOrder.name;
                viewModel.getUDCList('AB_TYPE');
            }, function (err) {
                viewModel.Message = "Error!!! " + err.status
            });
        };


        viewModel.loadPurchaseOrder = function loadPurchaseOrder() {


            var promise = purchaseOrderService.list();
            promise.then(function (resp) {

                viewModel.PurchaseOrders = resp.data;
                viewModel.Message = "Call Completed Successfully";
            }, function (err) {
                viewModel.Message = "Error!!! " + err.status
            });
        };

        viewModel.updatePurchaseOrder = function (id) {

            var promise = purchaseOrderService.put(id, viewModel.purchaseOrder);
            promise.then(function (resp) {
                viewModel.Message = "Update Call Completed Successfully";
                window.location.href = "/purchaseorders";
            }, function (err) {
                viewModel.Message = "Error!!! " + err.status
            });

       
        }
        viewModel.deletePurchaseOrder = function (id) {

            var promise = purchaseOrderService.delete(id, viewModel.purchaseOrder);
            promise.then(function (resp) {
                viewModel.Message = "Call Completed Successfully";
                window.location.href = '/purchaseorders';
            }, function (err) {
                viewModel.Message = "Error!!! " + err.status
            });

           

        }

        viewModel.addPurchaseOrder = function () {
            var promise = purchaseOrderService.post(viewModel.purchaseOrder);
            promise.then(function (resp) {
                viewModel.Message = "Call Completed Successfully";
                window.location.href = '/purchaseorders';
            }, function (err) {
                viewModel.Message = "Error!!! " + err.status
            });
        };

    }]);

}());