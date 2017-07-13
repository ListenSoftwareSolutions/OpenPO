(function () {
    "use strict";
    var app = angular.module("OpenPOModule")
    angular.module("OpenPOModule");


    app.controller('AddressBookListController', ['Companies', AddressBookListController]);

    function AddressBookListController(Companies) {
        var ViewModel = this;
        ViewModel.Companies = Companies;
        ViewModel.title = "Display Address Book";

        ViewModel.Message = "";
        //ViewModel.userName = sessionStorage.getItem('userName');


    };

}());  //end if