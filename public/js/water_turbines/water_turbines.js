var app = angular.module('waterTurbines', []);

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
app.controller("waterTurbinesController", function ($scope, $http, $window, $compile, Scopes) {

    // var donut1 = new Morris.Donut({
    //     element: 'water_pump_chart1',
    //     half: true,
    //     resize: true,
    //     colors: ["#4287f5", "#85aded", "#546278"],
    //     data: [
    //         { label: "Download Sales", value: 12 },
    //         { label: "In-Store Sales", value: 30 },
    //         { label: "Mail-Order Sales", value: 20 }
    //     ],
    //     hideHover: 'auto'
    // });
    // $('#water_pump_chart1').resize(function () { donut1.redraw(); });
    // $("#water_pump_chart1").css("height", "150");
    // donut1.options.data.forEach(function (label, i) {
    //     var legendItem = $('<span></span>').text(label['label'] + " ( " + label['value'] + " )").prepend('<br><span>&nbsp;</span>');
    //     legendItem.find('span')
    //         .css('backgroundColor', donut1.options.colors[i])
    //         .css('width', '20px')
    //         .css('display', 'inline-block')
    //         .css('margin', '5px');
    //     $('#legend').append(legendItem)
    // });


    $scope.water_level = 69;
    $scope.water_volume = 80;
    $scope.show_water_volume = true;
    $scopeshow_risk_graph = true;
    // Create chart
    var trapStatusGuageChart = document.getElementsByClassName("trap-status-gauge");
    var lostEnergyGauge = document.getElementsByClassName("lost-energy-gauge");
    var emissionsGauge = document.getElementsByClassName("emissions-gauge");
    var barChart = document.getElementsByClassName("stacked_bar_chart");
    var label = ['Trap Status', 'Lost Energy Costs', 'Emissions Lost', 'Bar Chart'];

    var TS_chart = new Chart(trapStatusGuageChart, {

        type: "doughnut",
        data: {
            labels: ["A", "B", "C"],
            datasets: [{
                label: label,
                data: [$scope.water_volume, 70, 90],
                backgroundColor: [
                    "#63B8FF", "#7D9EC0", "#539DC2"
                ]
            }]
        },
        options: {
            cutoutPercentage: 60,
            rotation: 0.9 * Math.PI,
            circumference: 1.2 * Math.PI,
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltips: {
                enabled: false
            }
        }
    });
    var LE_chart = new Chart(lostEnergyGauge, {

        type: "doughnut",
        data: {
            labels: ["A", "B", "C"],
            datasets: [{
                label: label,
                data: [$scope.water_volume, 100, 200],
                backgroundColor: [
                    "#63B8FF", "#7D9EC0", "#539DC2"
                ]
            }]
        },
        options: {
            cutoutPercentage: 60,
            rotation: 0.9 * Math.PI,
            circumference: 1.2 * Math.PI,
            legend: {
                display: true,
                position: "bottom"
            },
            tooltips: {
                enabled: false
            }
        }
    });
    var Emission_chart = new Chart(emissionsGauge, {

        type: "doughnut",
        data: {
            labels: ["A", "B"],
            datasets: [{
                label: label,
                data: [$scope.water_volume, 900],
                backgroundColor: [
                    "#63B8FF", "#7D9EC0", "#539DC2"
                ]
            }]
        },
        options: {
            cutoutPercentage: 60,
            rotation: 0.9 * Math.PI,
            circumference: 1.2 * Math.PI,
            legend: {
                position: 'bottom',
                display: true
            },
            tooltips: {
                enabled: false
            }
        }
    });
    var Bar_chart = new Chart(barChart, {
        type: "bar",
        data: {
            labels: ["A", "B", 'C'],
            datasets: [{
                label: 'Dataset 1',
                data: [50, 100, 150],
                backgroundColor: [
                    "#63B8FF", "#7D9EC0", "#539DC2"
                ]
            },
            {
                label: 'Dataset 2',
                data: [100, 150, 200],
                backgroundColor: [
                    "#FFA07A", "#CD5C5C", "#B22222"
                ]
            },
            {
                label: 'Dataset 3',
                data: [150, 200, 250],
                backgroundColor: [
                    "#20B2AA", "#3CB371", "#98FB98"
                ]
            }]
        },
        options: {
            // legend: {
            //     position: 'bottom',
            //     display: true
            // },
            // tooltips: {
            //     enabled: false
            // },
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        callback: function (value, index, values) {
                            return value;
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'X axis legend'
                    }

                }],
                yAxes: [{

                    stacked: true,
                    ticks: {
                        callback: function (value, index, values) {
                            return value + " %";
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Y axis legend'
                    }

                },
                {
                    position: 'right',
                    stacked: true,
                    ticks: {},

                    scaleLabel: {
                        display: true,
                        labelString: 'Y axis legend'
                    }

                }
                ]
            }
        }
    });

    var water_level_up = document.getElementById("water_level_up");
    var water_level_down = document.getElementById("water_level_down");
    var water_level_overflow = document.getElementById("water_level_overflow");
    $scope.show_water_level_up = false;
    $scope.show_water_level_down = false;
    $scope.show_water_level_overflow = false;


    if ($scope.water_level <= 0) {
        $scope.show_water_level_down = true;
        water_level_down.classList.add("below_water_level");
        $scope.water_level = "Invalid Data";

    } else if ($scope.water_level > 100) {
        $scope.show_water_level_overflow = true;
        water_level_overflow.classList.add("overflow_water_level");
    }
    if ($scope.water_level > 0 && $scope.water_level <= 25) {
        $scope.show_water_level_down = true;
        $scope.show_water_level_up = false;
        water_level_down.classList.add("below_water_level");
    }
    else if ($scope.water_level > 25 && $scope.water_level <= 50) {
        $scope.show_water_level_up = true;
        water_level_up.classList.add("level_water");
    }
    else if ($scope.water_level > 50 && $scope.water_level <= 80) {
        $scope.show_water_level_up = true;
        water_level_up.classList.add("normal_water_level");
    }
    else if ($scope.water_level > 80 && $scope.water_level <= 94) {
        $scope.show_water_level_up = true;
        water_level_up.classList.add("semi_overflow_water_level");
    }
    else if ($scope.water_level > 94 && $scope.water_level <= 100) {
        $scope.show_water_level_up = true;
        water_level_up.classList.add("overflow_water_level");
    }


    $scope.water_pump_data = [

        {
            id: 'WP-1',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-2',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-3',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-4',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-5',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-6',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-7',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-8',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-9',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-10',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-11',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-12',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-13',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-14',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-15',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-16',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-17',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-18',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-19',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-20',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-21',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-22',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-23',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-24',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-25',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-26',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-27',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'WP-28',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },

    ];

    $(".knob").knob({
        draw: function () {

            // "tron" case
            if (this.$.data('skin') == 'tron') {

                var a = this.angle(this.cv), // Angle
                    sa = this.startAngle, // Previous start angle
                    sat = this.startAngle, // Start angle                    
                    ea, // Previous end angle
                    eat = sat + a, // End angle                    
                    r = true;

                this.g.lineWidth = this.lineWidth;

                this.o.cursor &&
                    (sat = eat - 0.3) &&
                    (eat = eat + 0.3);

                if (this.o.displayPrevious) {
                    ea = this.startAngle + this.angle(this.value);
                    this.o.cursor &&
                        (sa = ea - 0.3) &&
                        (ea = ea + 0.3);
                    this.g.beginPath();
                    this.g.strokeStyle = this.previousColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
            $('#risk_value').trigger('configure', {
                'draw': function (v) {
                    v = parseInt(document.getElementById('risk_value').value);
                    if (v <= 20) {
                        this.o.fgColor = 'green';
                        $("#risk_value").css("color", "green");
                    }
                    if (v > 20 && v <= 40) {
                        this.o.fgColor = '#cdd81e';
                        $("#risk_value").css("color", "#cdd81e");
                    }
                    if (v > 40 && v <= 60) {
                        this.o.fgColor = 'orange';
                        $("#risk_value").css("color", "orange");
                    }
                    if (v > 60 && v <= 80) {
                        this.o.fgColor = '#f56969';
                        $("#risk_value").css("color", "#f56969");
                    }
                    if (v > 80) {
                        this.o.fgColor = 'red';
                        $("#risk_value").css("color", "red");
                    }
                },
                'format': function (v) {
                    return v + ' %';
                }
            });
            $('#risk_value').trigger('change');

            $('#health_score').trigger('configure', {
                'draw': function (v) {
                    v = parseInt(document.getElementById('health_score').value);
                    if (v <= 20) {
                        this.o.fgColor = 'red';
                        $("#health_score").css("color", "red");
                    }
                    if (v > 20 && v <= 40) {
                        this.o.fgColor = '#f56969';
                        $("#health_score").css("color", "#f56969");
                    }
                    if (v > 40 && v <= 60) {
                        this.o.fgColor = 'orange';
                        $("#health_score").css("color", "orange");
                    }
                    if (v > 60 && v <= 80) {
                        this.o.fgColor = '#cdd81e';
                        $("#health_score").css("color", "#cdd81e");
                    }
                    if (v > 80) {
                        this.o.fgColor = 'green';
                        $("#health_score").css("color", "green");
                    }
                },
                'format': function (v) {
                    return v + ' %';
                }
            });
            $('#health_score').trigger('change');

            $('#rul_score').trigger('configure', {
                'draw': function (v) {
                    v = parseInt(document.getElementById('rul_score').value);
                    if (v <= 70) {
                        this.o.fgColor = 'red';
                        $("#rul_score").css("color", "red");
                    }
                    if (v > 70 && v <= 140) {
                        this.o.fgColor = '#f56969';
                        $("#rul_score").css("color", "#f56969");
                    }
                    if (v > 140 && v <= 210) {
                        this.o.fgColor = 'orange';
                        $("#rul_score").css("color", "orange");
                    }
                    if (v > 210 && v <= 280) {
                        this.o.fgColor = '#cdd81e';
                        $("#rul_score").css("color", "#cdd81e");
                    }
                    if (v > 280) {
                        this.o.fgColor = 'green';
                        $("#rul_score").css("color", "green");
                    }
                },
                'format': function (v) {
                    return v + ' D';
                }
            });
            $('#rul_score').trigger('change');
        }
    });

});