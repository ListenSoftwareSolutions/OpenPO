

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