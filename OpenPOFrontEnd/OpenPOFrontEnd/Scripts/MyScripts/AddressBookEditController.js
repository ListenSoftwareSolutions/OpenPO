(function () {
    "use strict";
    var app = angular.module("OpenPOModule")
    angular.module("OpenPOModule");


    app.controller('AddressBookEditController', ['AddressBook','AddressBookService', AddressBookEditController]);

    function AddressBookEditController(AddressBook,AddressBookService) {
        var ViewModel = this;
        
        if (AddressBook == null)
        {
            ViewModel.title = "Add Address Book";
            //ViewModel.AddressBook.addressId = 'Add New';
        }
        else
        {
            ViewModel.AddressBook = AddressBook;
            ViewModel.title = "Edit Address Book";
        }
        

        ViewModel.Message = "";
        //ViewModel.userName = sessionStorage.getItem('userName');
        ViewModel.Save = function Delete() {
            var promise = AddressBookService.delete(ViewModel.AddressBook.addressId);
            promise.then(function (resp) {
                ViewModel.Message = "Delete Call Completed Successfully";
                //window.location.href = "/Home/company";
            }, function (err) {
                ViewModel.Message = "Error!!! " + err.status
            });
        }
        ViewModel.Save = function Save() {
            if (ViewModel.AddressBook.addressId == undefined)
            {
                var promise = AddressBookService.post(ViewModel.AddressBook);
                promise.then(function (resp) {
                    ViewModel.Message = "Add Call Completed Successfully";
                    //window.location.href = "/Home/company";
                }, function (err) {
                    ViewModel.Message = "Error!!! " + err.status
                });
            }
            else {
                var promise = AddressBookService.put(ViewModel.AddressBook.addressId, ViewModel.AddressBook);
                promise.then(function (resp) {
                    ViewModel.Message = "Update Call Completed Successfully";
                    //window.location.href = "/Home/company";
                }, function (err) {
                    ViewModel.Message = "Error!!! " + err.status
                });
            }
         

              

          
          
        }
        

    };

}());  //end if