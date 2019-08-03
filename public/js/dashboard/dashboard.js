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
            id: 'Block-A',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-B',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-C',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-D',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-E',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-F',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-G',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-H',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-I',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-J',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-K',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-L',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-M',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-N',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-O',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-P',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-Q',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-R',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-S',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-T',
            devices: [
                {
                    id: 'Device-2',
                    icon: 'fas fa-battery-three-quarters',
                    status: ''
                },
                {
                    id: 'Device-3',
                    icon: 'fas fa-fan',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fas fa-hourglass-half',
                    status: ''
                },
                {
                    id: 'Device-1',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
    ];
});