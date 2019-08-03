var app = angular.module('simulationHome', []);

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

app.controller("homeController", function ($scope, $http, $window, $compile, Scopes) {
    $scope.new_patient = {};
    $('#test-datepicker').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy',
        todayHighlight: 'TRUE',
        endDate: new Date(),
    });

    $("#test-datepicker").datepicker("setDate", new Date());


    $scope.building_data = [
        {
            id: 'Block-1',
            devices: [
                {
                    id: 'Device-1',
                    icon: 'fa fa-battery-2',
                    status: ''
                },
                {
                    id: 'Device-2',
                    icon: 'fa fa-hourglass-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-odnoklassniki-square',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-2',
            devices: [
                {
                    id: 'Device-1',
                    icon: 'fa fa-battery-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-odnoklassniki-square',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-3',
            devices: [
                {
                    id: 'Device-1',
                    icon: 'fa fa-battery-2',
                    status: ''
                },
                {
                    id: 'Device-2',
                    icon: 'fa fa-hourglass-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                
            ]
        },
        {
            id: 'Block-4',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fa fa-hourglass-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-odnoklassniki-square',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-4',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fa fa-hourglass-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-odnoklassniki-square',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-4',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fa fa-hourglass-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-odnoklassniki-square',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-4',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fa fa-hourglass-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-odnoklassniki-square',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-4',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fa fa-hourglass-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-odnoklassniki-square',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-4',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fa fa-hourglass-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-odnoklassniki-square',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-4',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fa fa-hourglass-2',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fa fa-gg-circle',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-odnoklassniki-square',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fa fa-safari',
                    status: ''
                }
            ]
        },
    ];
});