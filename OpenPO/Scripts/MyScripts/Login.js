﻿angular.module('AppLoginModule', [])
.service('loginService', function ($http) {
    this.register = function (userInfo) {
        var resp = $http({
            url: "/api/Account/Register",
            method: "POST",
            data: userInfo,
        });
        return resp;
    };

    this.login = function (userlogin) {

        var resp = $http({
            url: "/TOKEN",
            method: "POST",
            data: $.param({ grant_type: 'password', username: userlogin.username, password: userlogin.password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return resp;
    };
})
.controller('LoginController', ['$scope', 'loginService', function ($scope, loginService)
{
    $scope.responseData = "";

    $scope.userName = "";

    $scope.userRegistrationEmail = "";
    $scope.userRegistrationPassword = "";
    $scope.userRegistrationConfirmPassword = "";

    $scope.userLoginEmail = "";
    $scope.userLoginPassword = "";

    $scope.accessToken = "";
    $scope.refreshToken = "";
    //Ends Here

    //Function to register user
    $scope.registerUser = function () {

        alert('reached');

        $scope.responseData = "";

        //The User Registration Information
        var userRegistrationInfo = {
            Email: $scope.userRegistrationEmail,
            Password: $scope.userRegistrationPassword,
            ConfirmPassword: $scope.userRegistrationConfirmPassword
        };

        var promiseregister = loginService.register(userRegistrationInfo);

        promiseregister.then(function (resp) {
            $scope.responseData = "User is Successfully";
            $scope.userRegistrationEmail = "";
            $scope.userRegistrationPassword = "";
            $scope.userRegistrationConfirmPassword = "";
        }, function (err) {
            $scope.responseData = "Error " + err.status;
        });
    };


    //$scope.redirect = function () {
   //     window.location.href = '/People/Index';
    //};

    $scope.logout = function ()
    {
        
        sessionStorage.setItem('userName', null);
        sessionStorage.setItem('accessToken', null);
        sessionStorage.setItem('refreshToken', null);
        window.location.href = '/Home/Index';
    }
    //Function to Login. This will generate Token 
    $scope.login = function () {
        //This is the information to pass for token based authentication

        var userLogin = {
            grant_type: 'password',
            username: $scope.userLoginEmail,
            password: $scope.userLoginPassword
        };

        var promiselogin = loginService.login(userLogin);

        promiselogin.then(function (resp) {

            $scope.userName = resp.data.userName;
            //Store the token information in the SessionStorage
            //So that it can be accessed for other views
            sessionStorage.setItem('userName', resp.data.userName);
            sessionStorage.setItem('accessToken', resp.data.access_token);
            sessionStorage.setItem('refreshToken', resp.data.refresh_token);
            window.location.href = '/Home/Index';
        }, function (err) {

            $scope.responseData = "Error " + err.status;
        });

    };
}]);

