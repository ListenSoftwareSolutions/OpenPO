(function () {
    "use strict";

    angular
        .module("common.services")
       
        .factory("addressBookResource",
        ["$AddressBookServices", addressBookResource]);

    function addressBookResource(AddressBookServices)
    {
        return {
            get: function (addressId) {

                return (AddressBookServices.get(addressId));
            }
        }

    }

    

}());