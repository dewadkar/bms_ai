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

    // var ctx = document.getElementById('guegeChart').getContext('2d');
    // var chart = new Chart(ctx, {
    //     // The type of chart we want to create
    //     type: 'doughnut',

    //     // The data for our dataset
    //     data: {
    //         labels: ["January", "February", "March", "April", "May"],
    //         datasets: [{
    //             label: "My First dataset",
    //             backgroundColor: ['rgb(0, 99, 132)', 'green', 'red', 'yellow', 'orange'],
    //             borderColor: '#fff',
    //             data: [5, 10, 5, 2, 20],
    //         }]
    //     },

    //     // Configuration options go here
    //     options: {
    //         circumference: 1 * Math.PI,
    //         rotation: 1 * Math.PI,
    //         cutoutPercentage: 70
    //     }
    // });



    // Create chart
    var guageChart1 = document.getElementsByClassName("chartjs-gauge");
    var chart = new Chart(guageChart1, {
        type: "doughnut",
        data: {
            labels: ["Red", "Blue"],
            datasets: [{
                label: "Gauge",
                data: [10, 30],
                backgroundColor: [
                    "#4287f5",
                    "#85aded",
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
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderColor: '#ffffff',
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
                    offset: 20,
                    borderRadius: 4,
                    borderWidth: 1,
                    formatter: function (value, context) {
                        var i = context.dataIndex;
                        var len = context.dataset.data.length - 1;
                        if (i == len) {
                            return null;
                        }
                        return value + ' mph';
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
            change_gauge(chart, "Gauge", [50, 250])
        }, 1000);

        $window.setTimeout(function () {
            change_gauge(chart, "Gauge", [100, 200])
        }, 2000);

        $window.setTimeout(function () {
            change_gauge(chart, "Gauge", [150, 150])
        }, 3000);

        $window.setTimeout(function () {
            change_gauge(chart, "Gauge", [200, 100])
        }, 4000);

        $window.setTimeout(function () {
            change_gauge(chart, "Gauge", [250, 50])
        }, 5000);
    }

    // Start sequence
    accelerate();
    $window.setInterval(function () {
        if (!accelerating) {
            acelerating = true;
            accelerate();
        }
    }, 6000);


});