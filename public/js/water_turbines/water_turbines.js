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
        colors: ["#3c8dbc", "#f56954", "#00a65a"],
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
        colors: ["#3c8dbc", "#f56954", "#00a65a"],
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
        colors: ["#3c8dbc", "#f56954", "#00a65a"],
        data: [
            { label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 }
        ],
        hideHover: 'auto'
    });

    var ctx = document.getElementById('guegeChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: ['rgb(0, 99, 132)', 'green', 'red', 'yellow', 'orange'],
                borderColor: '#fff',
                data: [5, 10, 5, 2, 20],
            }]
        },

        // Configuration options go here
        options: {
            circumference: 1 * Math.PI,
            rotation: 1 * Math.PI,
            cutoutPercentage: 70
        }
    });




});