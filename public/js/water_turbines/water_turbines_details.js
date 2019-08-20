var app = angular.module('waterTurbinesDetails', []);
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

app.controller("WTDetailsController", function ($scope, $http, $window, $compile, Scopes) {

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
                this.o.cursor && (sat = eat - 0.3) && (eat = eat + 0.3);

                if (this.o.displayPrevious) {
                    ea = this.startAngle + this.angle(this.value);
                    this.o.cursor && (sa = ea - 0.3) && (ea = ea + 0.3);
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

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var now = new Date();
    var data = [],
        totalPoints = 100;

    function plotRiskChart(data) {
        var riskctx = document.getElementById('risk-chart').getContext("2d");
        var gradientStroke = riskctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#00a9ff');
        gradientStroke.addColorStop(1, 'green');
        var labels = [];
        var d;
        var month;

        for (var i = 8; i > 0; i -= 1) {
            d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            month = months[d.getMonth()];
            month = month + '' + d.getFullYear().toString().substr(2, 2);
            labels.push(month);
        }

        riskChart = new Chart(riskctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
                    borderWidth: 4,
                    data: data.slice(0, data.length - 1),
                    label: "Risk History"
                },
                {
                    borderColor: "#00a9ff",
                    data: data.slice(0, data.length),
                    label: "Prediction"
                }
                ]
            },
            options: {
                legend: {
                    position: "bottom"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 10,
                            padding: 20
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'probability(%)'
                        }
                    },],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Months'
                        }

                    }]
                }
            }
        });
        riskChart.render();
    }
    function plotHealthScoreChart(data) {

        var healthctx = document.getElementById('health-score-chart').getContext("2d");
        var gradientStroke = healthctx.createLinearGradient(500, 0, 100, 0);
        // gradientStroke.addColorStop(0, 'red');
        gradientStroke.addColorStop(0, '#00a9ff');
        gradientStroke.addColorStop(1, 'green');
        var labels = [];


        var d;
        var month;

        for (var i = 8; i > 0; i -= 1) {
            d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            month = months[d.getMonth()];
            month = month + '' + d.getFullYear().toString().substr(2, 2);
            labels.push(month);
        }

        var healthChart = new Chart(healthctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
                    borderWidth: 4,
                    data: data.slice(0, data.length - 1),
                    label: "Histry of Health "
                },
                {
                    borderColor: "#00a9ff",
                    data: data.slice(0, data.length),
                    label: "Prediction"
                }
                ]
            },
            options: {
                legend: {
                    position: "bottom"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 10,
                            padding: 20
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'probability(%)'
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Months'
                        }
                    }]
                }
            }
        });
        healthChart.render();

    }
    function plotRulChart(data) {

        var rulctx = document.getElementById('rul-chart').getContext("2d");
        var gradientStroke = rulctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#00a9ff');

        gradientStroke.addColorStop(1, 'green');
        var labels = [];

        var d;
        var month;

        for (var i = 8; i > 0; i -= 1) {
            d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            month = months[d.getMonth()];
            month = month + '' + d.getFullYear().toString().substr(2, 2);
            labels.push(month)
        }

        var rulChart = new Chart(rulctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
                    borderWidth: 4,
                    data: data.slice(0, data.length - 1),
                    label: "History RUL"
                },
                {
                    borderColor: "#00a9ff",
                    data: data.slice(0, data.length),
                    label: "Prediction"
                }
                ]
            },
            options: {
                legend: {
                    position: "bottom"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 10,
                            padding: 20
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Days'
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Last Eight Months'
                        }
                    }]
                }
            }
        });
        rulChart.render();

    }
    function plotEnergyConsumptionChart(data) {
        $scope.data = data;
        var enrgyctx = document.getElementById('interactive').getContext("2d");
        var gradientStroke = enrgyctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'green');
        // gradientStroke.addColorStop(1, 'red');
        var labels = [];
        for (var i = 8; i > 0; i--) {
            labels.push(i);
        }
        $scope.myChart = new Chart(enrgyctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Time (Cycle)",
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false,
                    borderWidth: 4,
                    data: data
                }]
            },
            options: {
                legend: {
                    position: "bottom"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 10,
                            padding: 20
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Wh (Normalized)'
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
        return $scope.myChart;

    }
    function plotTemperatureHumidityChart(data, humidity) {

        var labels = [];

        for (var i = 0; i <= 8; i++) {
            labels.push(i);
        }

        var lineChartData = {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                borderColor: '#00a9ff',
                backgroundColor: '#00a9ff',
                fill: false,
                data: data,
                yAxisID: 'y-axis-1',
            }, {
                label: 'Humidity',
                borderColor: 'blue',
                backgroundColor: 'blue',
                fill: false,
                data: humidity,
                yAxisID: 'y-axis-2'
            }]
        };
        return lineChartData;
    }

    var temp_humidity_chart_data = plotTemperatureHumidityChart(data, []);
    var humidityctx = document.getElementById('temp_humidity').getContext("2d");
    var gradientStroke = humidityctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, 'green');
    gradientStroke.addColorStop(1, '#00a9ff');
    var temp_humidity_chart = new Chart(humidityctx, {
        type: 'line',
        data: temp_humidity_chart_data,
        options: {
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature (C)',
                    }
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    scaleLabel: {
                        display: true,
                        labelString: 'Humidity (g/m3)',
                    }
                },
                ],

                xAxes: [{
                    gridLines: {
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time (Cycle)'

                    }
                }]

            },
            legend: {
                position: "bottom"
            }
        }
    });
    temp_humidity_chart.render();
    $scope.data = data;
    var enrgyctx = document.getElementById('interactive').getContext("2d");
    gradientStroke = enrgyctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, 'green');


    var labels = [];
    for (var i = 8; i > 0; i--) {
        labels.push(i);
    }

    var energyConsumption_chart = new Chart(enrgyctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Time",
                borderColor: gradientStroke,
                pointBorderColor: gradientStroke,
                pointBackgroundColor: gradientStroke,
                pointHoverBackgroundColor: gradientStroke,
                pointHoverBorderColor: gradientStroke,
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                fill: true,
                borderWidth: 4,
                data: data
            }]
        },
        options: {
            legend: {
                position: "bottom"
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold",
                        beginAtZero: true,
                        maxTicksLimit: 10,
                        padding: 20
                    },
                    gridLines: {
                        drawTicks: false,
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Wh (Normalized)'
                    }

                }],
                xAxes: [{
                    gridLines: {
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time (Cycle)'
                    }
                }]
            }
        }
    });

    function getStats() {
        $http.get('/waterTurbines/status/' + $window.id)
            .then(function (data) {
                var riskData = data["data"][""].failure_risk[""].split(";");
                var risk = [];
                for (var i = 0; i < 8; i++) {
                    risk.push(parseInt(riskData[i]));
                }

                var healthScoreData = data["data"][""].health_score[""].split(";");
                var healthScore = [];
                for (var i = 0; i < 8; i++) {
                    healthScore.push(parseInt(healthScoreData[i]));
                }
                var remainingUsefulLifeData = data["data"][""].remaining_useful_life[""].split(";");
                var remainingUsefulLife = [];
                for (var i = 0; i < 8; i++) {
                    remainingUsefulLife.push(parseInt(remainingUsefulLifeData[i]));
                }

                var energyConsumptionData = data["data"][""].energy_consumption[""].split(";");
                var energyConsumption = [];
                for (var i = 0; i < 8; i++) {
                    energyConsumption.push(parseInt(energyConsumptionData[i]));
                }

                var temperatureHumidityData = data["data"][""].temperature_humidity[""].split(";");
                var temperatureHumidity = [];
                for (var i = 0; i < 8; i++) {
                    temperatureHumidity.push(parseInt(temperatureHumidityData[i]));
                }
                var humidityData = data["data"][""].humidity[""].split(";");
                var humidity = [];
                for (var i = 0; i < 8; i++) {
                    humidity.push(parseInt(humidityData[i]));
                }

                $scope.risk_value = 0;
                $scope.health_score = 0;
                $scope.rul_score = 0;

                plotRiskChart(risk);
                plotHealthScoreChart(healthScore);
                plotRulChart(remainingUsefulLife);
                plotEnergyConsumptionChart(energyConsumption);
                plotTemperatureHumidityChart(temperatureHumidity, humidity);


                $('#risk_value').val(risk[risk.length - 2]);
                $("#risk_value").trigger('change');

                $("#health_score").val(healthScore[healthScore.length - 2]);
                $("#health_score").trigger('change');

                $("#rul_score").val(remainingUsefulLife[remainingUsefulLife.length - 2]);
                $("#rul_score").trigger('change');



            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getStats();

    var updateInterval = 1000; //Fetch data ever x milliseconds
    var realtime = 'on'; //If == to on then fetch data every x seconds. else stop fetching
    var precision = 100; // 2 decimals

    function update() {
        energyConsumption_chart.data.datasets.forEach((dataset) => {
            if (dataset.data.length > 8) {
                dataset.data = dataset.data.splice(1, dataset.data.length - 1);
                var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
                dataset.data.push(Math.random(1, 10));
            } else {
                dataset.data.push(Math.random(1, 10));
            }
        });;
        energyConsumption_chart.draw();
        energyConsumption_chart.update();


        temp_humidity_chart.data.datasets.forEach((dataset) => {
            if (dataset.data.length > 8) {
                dataset.data = dataset.data.splice(1, dataset.data.length - 1);
                var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
                dataset.data.push(Math.random(1, 10));
            } else {
                dataset.data.push(Math.random(1, 10));
            }
        });

        temp_humidity_chart.draw();
        temp_humidity_chart.update();
        if (realtime === 'on') {
            setTimeout(update, updateInterval);
        }
    }

    //INITIALIZE REALTIME DATA FETCHING
    if (realtime === 'on') {
        update();
    }

});