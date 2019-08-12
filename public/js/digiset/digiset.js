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

    function generateDonatChart(type, data, label, labels, title_text) {
        debugger;
        var config = {
            type: type, // ddoughnut
            data: {
                datasets: [{
                    data: data,// [20,30,10,10,30]
                    label: label,
                    backgroundColor: [
                        "#DEB887",
                        "#A9A9A9",
                        "#DC143C",
                        "#F4A460",
                        "#2E8B57"
                    ],
                    borderColor: [
                        "#CDA776",
                        "#989898",
                        "#CB252B",
                        "#E39371",
                        "#1D7A46"
                    ],
                }],

                labels: labels
            },
            options: {
                responsive: true,
                legend: {
                    position: 'top',
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


    var run_hours_ctx = document.getElementById('run_hours').getContext('2d');
    var config = generateDonatChart('doughnut', [10, 20, 30, 40], "RUN-HOURS",
        ["1st Hr", "2nd Hr", "3rd Hr", "5th Hr"], "ENERGY RUN HOURS");
    window.run_hr_donout = new Chart(run_hours_ctx, config);

    var energy_generated_ctx = document.getElementById('energy_generated').getContext('2d');
    config = generateDonatChart('doughnut', [1000, 3000, 980, 850], "ENERGY-GENERATED",
        ["1st Hr", "2nd Hr", "3rd Hr", "5th Hr"], "ENERGY GENERATED");
    window.run_hr_donout = new Chart(energy_generated_ctx, config);

    var fuel_used_ctx = document.getElementById('fuel_used').getContext('2d');
    config = generateDonatChart('doughnut', [2,5, 9, 3], "FUEL USED",
        ["1st Hr", "2nd Hr", "3rd Hr", "5th Hr"], "FUEL USED");
    window.fuel_used_donout = new Chart(fuel_used_ctx, config);

    var generator_fuel_used_ctx = document.getElementById('generator_fuels_used').getContext('2d');
    config = generateDonatChart('line', [8,5,4,1,9,3,2], "GENERATOR FUEL USED DAILY",
        ["1", "2", "3", "4","5","6","7"], "GENERATOR FUEL USED");
    window.generator_fuel_used_ctx_line = new Chart(generator_fuel_used_ctx, config);


    var fuel_filled_ctx = document.getElementById('fuel_filled').getContext('2d');
    config = generateDonatChart('bar', [10,8,5,6,9,15,1], "Daily Fuel Filled",
        ["1", "2", "3", "4","5","6","7"], "GENERATOR FUEL FILLED");
    window.generator_fuel_used_ctx_line = new Chart(fuel_filled_ctx, config);


});
