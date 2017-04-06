var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider)
{ 
$routeProvider.when('/login', {
    controller: 'LoginController',
    templateUrl: 'securityinfo.cshtml',
    title: 'Login'
}).when('/people', {
    controller: 'PeopleController',
    templateUrl: 'people.cshtml',
    title: 'People'
}).otherwise({
    redirectTo: '/'
});
})