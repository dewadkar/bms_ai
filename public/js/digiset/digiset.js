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

    function totalGeneratorChart(on_generators, off_generators) {
        $scope.totalGeneratorData = [on_generators, off_generators];
        $scope.on_generators = $scope.totalGeneratorData[0];
        $scope.off_generators = $scope.totalGeneratorData[1];
        $scope.total_fuel = 180;
        var data = {
            labels: [
                "ON",
                "OFF"
            ],
            datasets: [{
                data: $scope.totalGeneratorData,
                backgroundColor: [
                    // '#008d4c',
                    // '#d73925'
                    "#CDCAF3",
                    "#F1E3F5"

                ],
                hoverBackgroundColor: [
                    "#CDCAF3",
                    "#F1E3F5"
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
            },
            plugins: [{
                beforeDraw: function (chart) {
                    var width = chart.chart.width,
                        height = chart.chart.height,
                        ctx = chart.chart.ctx;

                    ctx.restore();
                    var fontSize = (height / 70).toFixed(2);
                    ctx.font = fontSize + "em sans-serif";
                    ctx.textBaseline = "middle";

                    var text = $scope.totalGeneratorData[0] + $scope.totalGeneratorData[1],
                        textX = Math.round((width - ctx.measureText(text).width) / 2),
                        textY = height / 2;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }]
        });
    }


    function generateDonatChart(type, data, label, labels, title_text, colorSet, highlight) {

        var config = {
            type: type, // ddoughnut
            data: {
                datasets: [{
                    data: data, // [20,30,10,10,30]
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

    var colorSet = ['#f6d55c', '#f6a55c', '#f6faac', '#f6ff65'];
    var highlight = ['#f6d55c', '#f6a55c', '#f6faac', '#f6ff65'];


    // var energy_generated_data = [1000, 3000, 980, 850];
    // var energy_generated_labels = ["1st Hr", "2nd Hr", "3rd Hr", "4th Hr"];
    // var energy_generated_ctx = document.getElementById('energy_generated').getContext('2d');
    // config = generateDonatChart('doughnut', energy_generated_data, "ENERGY-GENERATED", energy_generated_labels,
    //     "ENERGY GENERATED", colorSet, colorSet);
    // window.run_hr_donout = new Chart(energy_generated_ctx, config);



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


    $scope.generator_data = [

        {
            id: 'G-1',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-2',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-3',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-4',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-5',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-6',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-7',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-8',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-9',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-10',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-11',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-12',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-13',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-14',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-15',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-16',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-17',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-18',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-19',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-20',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-21',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-22',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-23',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-24',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-25',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-26',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-27',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-28',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-29',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-30',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-31',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-32',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-33',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-34',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-35',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-36',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-37',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-38',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-39',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },
        {
            id: 'G-40',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: ''
        },


    ];


    $http.get("/digiset/generate")
        .then(function (response) {

            return response;
        })
        .then(function (response) {
            var failed_data = response.data;
            var failed_ids = [];
            for (var i = 0; i < failed_data.length; i++) {
                failed_ids.push(failed_data[i].generator_id);
            }
            for (var j = 0; j < $scope.generator_data.length; j++) {
                if (failed_ids.includes($scope.generator_data[j].id)) {
                    $scope.generator_data[j].color = '#db4040';
                }
            }
            var on_generators = $scope.generator_data.length - failed_ids.length;
            var off_generators = failed_ids.length;
            totalGeneratorChart(on_generators, off_generators);
            return $http.get('/digiset/running/status');
        })
        .then(function(data){
            var running_json = data.data;
            var colorSet = ['#F1E3F5', '#E5DAF5', '#CDCAF3', '#989CED'];
            var highlight = ['#F1E3F5', '#E5DAF5', '#CDCAF3', '#989CED'];


            var run_hours_labels = ["1st Hr", "2nd Hr", "3rd Hr", "4th Hr"];
            var run_hours_data = [Math.ceil(running_json.length/8), Math.ceil(running_json.length/5), Math.ceil(running_json.length/3), Math.ceil(running_json.length/2)];
            var run_hours_ctx = document.getElementById('run_hours').getContext('2d');
            var config = generateDonatChart('doughnut', run_hours_data, "RUN-HOURS",
                run_hours_labels, "RUN-HOURS", colorSet, highlight);
            window.run_hr_donout = new Chart(run_hours_ctx, config);

            var energy_generated_data = [];
            var fuel_used_data = [];
            for(var i=0;i<run_hours_data.length;i++){
                energy_generated_data.push(run_hours_data[i]*1000);
                fuel_used_data.push(run_hours_data[i]*3)
            }
            var energy_generated_labels = ["1st Hr", "2nd Hr", "3rd Hr", "4th Hr"];
            var energy_generated_ctx = document.getElementById('energy_generated').getContext('2d');
            config = generateDonatChart('doughnut', energy_generated_data, "ENERGY-GENERATED", energy_generated_labels,
                "ENERGY GENERATED", colorSet, colorSet);
            window.run_hr_donout = new Chart(energy_generated_ctx, config);

            // var fuel_used_data = [2, 5, 9, 3];
            var fuel_used_labels = ["1st Hr", "2nd Hr", "3rd Hr", "4th Hr"];
            var fuel_used_ctx = document.getElementById('fuel_used').getContext('2d');
            config = generateDonatChart('doughnut', fuel_used_data, "FUEL USED",
                fuel_used_labels, "FUEL USED", colorSet, colorSet);
            window.fuel_used_donout = new Chart(fuel_used_ctx, config);

            console.log(running_json);
        });


});
