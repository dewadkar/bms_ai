var app = angular.module('digiset', []);

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
    $rootScope.$on('scope.stored', function (event, data) {
    });
});
app.controller("digisetController", function ($scope, $http, $window, $compile, Scopes) {

    function totalGeneratorChart() {
        $scope.totalGeneratorData = [5, 8];
        $scope.on_generators = $scope.totalGeneratorData[0];
        $scope.off_generators = $scope.totalGeneratorData[1];
        $scope.total_fuel = 180;
        var data = {
            labels: [
                "ON",
                "OFF"
            ],
            datasets: [
                {
                    data: $scope.totalGeneratorData,
                    backgroundColor: [
                        '#008d4c',
                        '#d73925'
                    ],
                    hoverBackgroundColor: [
                        "#008d4c",
                        "#d73925"
                    ]
                }]
        };

        var totalGeneratorChart = new Chart(document.getElementById('totalGeneratorChart'), {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                legend: {
                    display: false
                }
            }
        });

        // Chart.pluginService.register({
        //     beforeDraw: function (chart) {
        //         var width = chart.chart.width,
        //             height = chart.chart.height,
        //             ctx = chart.chart.ctx;

        //         ctx.restore();
        //         var fontSize = (height / 70).toFixed(2);
        //         ctx.font = fontSize + "em sans-serif";
        //         ctx.textBaseline = "middle";

        //         var text = $scope.totalGeneratorData[0] + $scope.totalGeneratorData[1],
        //             textX = Math.round((width - ctx.measureText(text).width) / 2),
        //             textY = height / 2;

        //         ctx.fillText(text, textX, textY);
        //         ctx.save();
        //     }
        // });

    }
    totalGeneratorChart();

    function generateDonatChart(type, data, label, labels, title_text, colorSet, highlight) {

        var config = {
            type: type, // ddoughnut
            data: {
                datasets: [{
                    data: data,// [20,30,10,10,30]
                    label: label,
                    backgroundColor: colorSet,
                    borderColor: highlight,
                }],

                labels: labels
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: title_text
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
        return config;
    }

    var colorSet = ['#4a8af0', '#3ecf43', '#ebb434', '#f23565'];
    var highlight = ['#4a8af0', '#3ecf43', '#ebb434', '#f23565'];

    var run_hours_labels = ["1st Hr", "2nd Hr", "3rd Hr", "4th Hr"];
    var run_hours_data = [10, 20, 30, 40];
    var run_hours_ctx = document.getElementById('run_hours').getContext('2d');
    var config = generateDonatChart('doughnut', run_hours_data, "RUN-HOURS",
        run_hours_labels, "RUN-HOURS", colorSet, highlight);
    window.run_hr_donout = new Chart(run_hours_ctx, config);

    var energy_generated_data = [1000, 3000, 980, 850];
    var energy_generated_labels = ["1st Hr", "2nd Hr", "3rd Hr", "4th Hr"];
    var energy_generated_ctx = document.getElementById('energy_generated').getContext('2d');
    config = generateDonatChart('doughnut', energy_generated_data, "ENERGY-GENERATED", energy_generated_labels,
        "ENERGY GENERATED", colorSet, colorSet);
    window.run_hr_donout = new Chart(energy_generated_ctx, config);

    var fuel_used_data = [2, 5, 9, 3];
    var fuel_used_labels = ["1st Hr", "2nd Hr", "3rd Hr", "4th Hr"];
    var fuel_used_ctx = document.getElementById('fuel_used').getContext('2d');
    config = generateDonatChart('doughnut', fuel_used_data, "FUEL USED",
        fuel_used_labels, "FUEL USED", colorSet, colorSet);
    window.fuel_used_donout = new Chart(fuel_used_ctx, config);

    var generator_fuels_used_data = [8, 5, 4, 1, 9, 3, 2];
    var generator_fuels_used_labels = ["1", "2", "3", "4", "5", "6", "7"];
    var generator_fuel_used_ctx = document.getElementById('generator_fuels_used').getContext('2d');
    config = generateDonatChart('line', generator_fuels_used_data, "GENERATOR FUEL USED DAILY",
        generator_fuels_used_labels, "GENERATOR FUEL USED", ["#476dd8"], ["#2e4882"]);
    window.generator_fuel_used_ctx_line = new Chart(generator_fuel_used_ctx, config);


    var fuel_filled_data = [10, 8, 5, 6, 9, 15, 1];
    var fuel_filled_labels = ["1", "2", "3", "4", "5", "6", "7"];
    var fuel_filled_ctx = document.getElementById('fuel_filled').getContext('2d');
    config = generateDonatChart('bar', fuel_filled_data, "Daily Fuel Filled",
        fuel_filled_labels, "GENERATOR FUEL FILLED", "#00a65a", "#142f23");
    window.generator_fuel_used_ctx_line = new Chart(fuel_filled_ctx, config);







});
