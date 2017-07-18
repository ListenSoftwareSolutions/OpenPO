(function () {
    "use strict";
    var app = angular.module("OpenPOModule")
    angular.module("OpenPOModule");


    app.controller('PurchaseOrderListController', ['PurchaseOrders',PurchaseOrderListController]);

    function PurchaseOrderListController(PurchaseOrders) {
        var ViewModel = this;
        ViewModel.PurchaseOrders = PurchaseOrders;
        ViewModel.title = "Purchase Orders";

        ViewModel.Message = PurchaseOrders.message;
        //ViewModel.userName = sessionStorage.getItem('userName');


    };

}());  //end if