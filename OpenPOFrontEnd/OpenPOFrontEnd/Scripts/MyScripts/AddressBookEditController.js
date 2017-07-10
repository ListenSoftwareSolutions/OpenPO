(function () {
    "use strict";
    var app = angular.module("OpenPOModule")
    angular.module("OpenPOModule");


    app.controller('AddressBookEditController', ['AddressBook', AddressBookEditController]);

    function AddressBookEditController(AddressBook) {
        var ViewModel = this;
        ViewModel.AddressBook = AddressBook;
        ViewModel.title = "Edit Address Book";

        ViewModel.Message = "";
        //ViewModel.userName = sessionStorage.getItem('userName');


    };

}());  //end if