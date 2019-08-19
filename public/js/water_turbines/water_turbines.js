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

    var donut1 = new Morris.Donut({
        element: 'water_pump_chart1',
        resize: true,
        colors: ["#4287f5", "#85aded", "#546278"],
        data: [
            { label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 }
        ],
        hideHover: 'auto'
    });
    $('#water_pump_chart1').resize(function () { donut1.redraw(); });
    $("#water_pump_chart1").css("height", "150");

    var donut2 = new Morris.Donut({
        element: 'water_pump_chart2',
        resize: true,
        colors: ["#4287f5", "#85aded", "#546278"],
        data: [
            { label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 }
        ],
        hideHover: 'auto'
    });
    $('#water_pump_chart2').resize(function () { donut2.redraw(); });
    $("#water_pump_chart2").css("height", "150");

    var donut3 = new Morris.Donut({
        element: 'water_pump_chart3',
        resize: true,
        colors: ["#4287f5", "#85aded", "#546278"],
        data: [
            { label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 }
        ],
        hideHover: 'auto'
    });
    $('#water_pump_chart3').resize(function () { donut3.redraw(); });
    $("#water_pump_chart3").css("height", "150");

    $scope.water_volume = 80;
    $scope.show_water_volume = true;

    // Create chart
    var guageChart1 = document.getElementsByClassName("chartjs-gauge");
    var chart = new Chart(guageChart1, {
        type: "doughnut",
        data: {
            labels: ["Red", "Blue"],
            datasets: [{
                label: "Gauge",
                data: [$scope.water_volume, 900],
                backgroundColor: [
                    "#cf343b",
                    "#546278"
                ]
            }]
        },
        options: {
            circumference: Math.PI,
            rotation: Math.PI,
            cutoutPercentage: 75, // precent
            plugins: {
                datalabels: {
                    backgroundColor: '#d7faeb',
                    borderColor: 'blue',
                    color: function (context) {
                        return context.dataset.backgroundColor;
                    },
                    font: function (context) {
                        var w = context.chart.width;
                        return {
                            size: w < 512 ? 18 : 20
                        }
                    },
                    align: 'start',
                    anchor: 'start',
                    offset: 10,
                    borderRadius: 2,
                    borderWidth: 1,
                    formatter: function (value, context) {
                        var i = context.dataIndex;
                        var len = context.dataset.data.length - 1;
                        if (i == len) {
                            return null;
                        }
                        return value + ' Ltr';
                    }
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
    });
    // DEMO Code: not relevant to example
    function change_gauge(chart, label, data) {
        chart.data.datasets.forEach((dataset) => {
            if (dataset.label == label) {
                dataset.data = data;
            }
        });
        chart.update();
    }
    var accelerating = false;
    function accelerate() {
        accelerating = false;
        $window.setTimeout(function () {
            change_gauge(chart, "Gauge", [$scope.water_volume, 900])
        }, 1000);

        // $window.setTimeout(function () {
        //     change_gauge(chart, "Gauge", [100, 200])
        // }, 2000);

        // $window.setTimeout(function () {
        //     change_gauge(chart, "Gauge", [150, 150])
        // }, 3000);

        // $window.setTimeout(function () {
        //     change_gauge(chart, "Gauge", [200, 100])
        // }, 4000);

        // $window.setTimeout(function () {
        //     change_gauge(chart, "Gauge", [250, 50])
        // }, 5000);
        // $window.setTimeout(function () {
        //     change_gauge(chart, "Gauge", [300, 0])
        // }, 6000);
    }
    // Start sequence
    accelerate();
    $window.setInterval(function () {
        if (!accelerating) {
            acelerating = true;
            accelerate();
        }
    }, 6000);


    var water_level_up = document.getElementById("water_level_up");
    var water_level_down = document.getElementById("water_level_down");
    var water_level_overflow = document.getElementById("water_level_overflow");
    $scope.show_water_level_up = false;
    $scope.show_water_level_down = false;
    $scope.show_water_level_overflow = false;

    $scope.water_level = 69;
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



});