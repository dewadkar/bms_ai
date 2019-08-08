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
    $rootScope.$on('scope.stored', function (event, data) {});
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


    $scope.building_data = [{
            id: 'Block-A',
            devices: [{
                    id: 'A1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'A2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'A3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'A4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-B',
            devices: [{
                    id: 'B1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'B2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',

                    status: ''
                },
                {
                    id: 'B3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'B4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-C',
            devices: [{
                    id: 'C1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'C2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'C3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'C4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-D',
            devices: [{
                    id: 'D1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'D2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'D3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'D4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-E',
            devices: [{
                    id: 'E1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'E2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'E3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'E4',
                    color: 'rgb(255, 255, 255)',
                    icon: 'fab fa-safari',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-F',
            devices: [{
                    id: 'F1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'F2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'F4',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'F4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-G',
            devices: [{
                    id: 'G1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'G2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'G3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'G4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-H',
            devices: [{
                    id: 'H1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'H2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'H3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'H4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-I',
            devices: [{
                    id: 'I1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'I2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'I3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'I4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-J',
            devices: [{
                    id: 'J1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'J2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'J3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'J4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-K',
            devices: [{
                    id: 'K1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'K2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'K3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'K4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-L',
            devices: [{
                    id: 'L1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'L2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'L3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'L4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-M',
            devices: [{
                    id: 'M1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'M2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'M3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'M4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-N',
            devices: [{
                    id: 'N1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'N2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'N3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'N4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-O',
            devices: [{
                    id: 'O1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'O2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'O4',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'O4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-P',
            devices: [{
                    id: 'P1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'P2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'P3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'P4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-Q',
            devices: [{
                    id: 'Q1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'Q2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'Q3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'Q4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-R',
            devices: [{
                    id: 'R1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'R2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'R3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'R4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-S',
            devices: [{
                    id: 'S1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'S2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'S3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'S4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
        {
            id: 'Block-T',
            devices: [{
                    id: 'T1',
                    icon: 'fas fa-battery-three-quarters',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'T2',
                    icon: 'fas fa-fan',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'T3',
                    icon: 'fas fa-hourglass-half',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                },
                {
                    id: 'T4',
                    icon: 'fab fa-safari',
                    color: 'rgb(255, 255, 255)',
                    status: ''
                }
            ]
        },
    ];
    $scope.original = [];
    angular.copy($scope.building_data, $scope.original);



    $scope.label_total_type_d = "Electrical Meter";
    $scope.label_total_type_c = "AC Filter";
    $scope.label_total_type_b = "Water Pump Station";
    $scope.label_total_type_a = "DG Set";


    $scope.total_appliances = 0;
    $scope.total_type_a = 0;
    $scope.total_type_b = 0;
    $scope.total_type_c = 0;
    $scope.total_type_d = 0;
    for (var i = 0; i < $scope.original.length; i++) {
        var devices = $scope.original[i].devices;
        for (var j = 0; j < devices.length; j++) {
            $scope.total_appliances++;
            if (devices[j].id.includes('1')) {
                $scope.total_type_a++;
            }
            if (devices[j].id.includes('2')) {
                $scope.total_type_b++;
            }
            if (devices[j].id.includes('3')) {
                $scope.total_type_c++;
            }
            if (devices[j].id.includes('4')) {
                $scope.total_type_d++;
            }
        }
    }
    $scope.getFailure = function () {
        $http.get('/device/status')
            .then(function (response) {
                angular.copy($scope.original, $scope.building_data);
                var failed_data = response.data;
                $scope.device_a_on = 0;
                $scope.device_a_off = 0;
                $scope.device_b_on = 0;
                $scope.device_b_off = 0;
                $scope.device_c_on = 0;
                $scope.device_c_off = 0;
                $scope.device_d_on = 0;
                $scope.device_d_off = 0;

                for (var i = 0; i < failed_data.length; i++) {
                    for (var j = 0; j < $scope.building_data.length; j++) {
                        if ($scope.building_data[j].id === failed_data[i].block_id) {
                            var devices = $scope.building_data[j].devices;
                            for (var k = 0; k < devices.length; k++) {
                                if (devices[k].id === failed_data[i].device_id) {
                                    $scope.building_data[j].devices[k].color = "rgb(245, 6, 6)";
                                }
                            }
                        }
                    }
                    if (failed_data[i].device_id.includes('1')) {
                        $scope.device_a_off++;
                    }
                    if (failed_data[i].device_id.includes('2')) {
                        $scope.device_b_off++;
                    }
                    if (failed_data[i].device_id.includes('3')) {
                        $scope.device_c_off++;
                    }
                    if (failed_data[i].device_id.includes('4')) {
                        $scope.device_d_off++;
                    }
                }
                debugger;
                $scope.device_a_on =  $scope.total_type_a - $scope.device_a_off;
                $scope.device_b_on =  $scope.total_type_b - $scope.device_b_off;
                $scope.device_c_on =  $scope.total_type_c - $scope.device_c_off;
                $scope.device_d_on =  $scope.total_type_d - $scope.device_d_off;

            })
            .catch(function (error) {
                // console.log(error);
            });
    };

    setInterval($scope.getFailure(), 10000);

    // getFailure();
});