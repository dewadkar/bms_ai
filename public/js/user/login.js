var app = angular.module("login_app", []);
app.controller("login_controller", function ($scope, $http) {

    $scope.login = function () {
        var data = {
            "user_name": $scope.username,
            "password": $scope.password
        };
        $http.post('/login', data)
            .then(function (result) {
                if(result.data.status==="SUCCESS"){
                    window.location.href = "/dashboard";
                }else{
                    alert(result.data.message);
                }
            })
            .catch(function (error) {

            })
    }
});

