var app = angular.module('digisetDetails', []);

app.factory('Scopes', function ($rootScope) {
    var mem = {};

    return {
        store: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});

app.run(function ($rootScope) {
    $rootScope.$on('scope.stored', function (event, data) { });
});
app.controller("digisetDetailsController", function ($scope, $http, $window, $compile, Scopes) {



});