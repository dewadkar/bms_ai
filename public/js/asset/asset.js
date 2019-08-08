var app = angular.module('asset', []);

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

app.controller("assetController", function ($scope, $http, $window, $compile, Scopes) {
    $scope.new_patient = {};
    $('#test-datepicker').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy',
        todayHighlight: 'TRUE',
        endDate: new Date(),
    });

    $("#test-datepicker").datepicker("setDate", new Date());

    $(document).ready(function () {
        $('[data-toggle="popover"]').popover({
            placement: 'down',
            trigger: 'hover',
            position: 'absolute',

        });

    });


    var data = [],
        totalPoints = 100;

    function getRandomData() {

        if (data.length > 0)
            data = data.slice(1)

        // Do a random walk
        while (data.length < totalPoints) {

            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5

            if (y < 0) {
                y = 0
            } else if (y > 100) {
                y = 100
            }

            data.push(y)
        }

        // Zip the generated y values with the x values
        var res = []
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res
    }

    var data1 = []

    function getRandomData1() {

        if (data1.length > 0)
            data1 = data1.slice(1)

        // Do a random walk
        while (data1.length < totalPoints) {

            var prev = data1.length > 0 ? data1[data1.length - 1] : 50,
                y = prev + Math.random() * 100 - 50

            if (y < 0) {
                y = 0
            } else if (y > 100) {
                y = 100
            }

            data1.push(y)
        }

        // Zip the generated y values with the x values
        var res1 = []
        for (var i = 0; i < data1.length; ++i) {
            res1.push([i, data1[i]])
        }

        return res1
    }

    var updateInterval = 500 //Fetch data ever x milliseconds
    var realtime = 'on' //If == to on then fetch data every x seconds. else stop fetching
    // function update() {
    //
    //     electricity_consumption.setData([getRandomData(), getRandomData()])
    //     temprature_humidity.setData([getRandomData1(), getRandomData1()])
    //
    //     // Since the axes don't change, we don't need to call plot.setupGrid()
    //     electricity_consumption.draw()
    //     temprature_humidity.draw()
    //     if (realtime === 'on'){
    //         setTimeout(update, updateInterval)
    //     }
    // }

    //INITIALIZE REALTIME DATA FETCHING
    // if (realtime === 'on') {
    //     update()
    // }
    //REALTIME TOGGLE
    $('#realtime .btn').click(function () {
        if ($(this).data('toggle') === 'on') {
            realtime = 'on'
        } else {
            realtime = 'off'
        }
        update()
    })
    /*
     * END INTERACTIVE CHART
     */

    /* jQueryKnob */

    $(".knob").knob({
        /*change : function (value) {
         //console.log("change : " + value);
         },
         release : function (value) {
         console.log("release : " + value);
         },
         cancel : function () {
         console.log("cancel : " + this.value);
         },*/
        draw: function () {

            // "tron" case
            if (this.$.data('skin') == 'tron') {

                var a = this.angle(this.cv) // Angle
                    ,
                    sa = this.startAngle // Previous start angle
                    ,
                    sat = this.startAngle // Start angle
                    ,
                    ea // Previous end angle
                    , eat = sat + a // End angle
                    ,
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
        }
    });

    var sin = [],
        cos = []
    for (var i = 0; i < 7; i += 1) {
        sin.push([i, Math.sin(i)])
        cos.push([i, Math.cos(i)])
    }
    var line_data1 = {
        data: sin,
        color: '#3c8dbc'
    }
    var line_data2 = {
        data: cos,
        color: '#00c0ef'
    }

    //Initialize tooltip on hover
    $('<div class="tooltip-inner" id="line-chart-tooltip"></div>').css({
        position: 'absolute',
        display: 'none',
        opacity: 0.8
    }).appendTo('body')

    $('#line-chart').bind('plothover', function (event, pos, item) {

        if (item) {
            var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2)

            $('#line-chart-tooltip').html(item.series.label + ' of ' + x + ' = ' + y)
                .css({
                    top: item.pageY + 5,
                    left: item.pageX + 5
                })
                .fadeIn(200)
        } else {
            $('#line-chart-tooltip').hide()
        }

    })
    /* END LINE CHART */


    //-------------
    //- BAR CHART -
    //-------------
    var areaChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Electronics',
            fillColor: 'rgba(210, 214, 222, 1)',
            strokeColor: 'rgba(210, 214, 222, 1)',
            pointColor: 'rgba(210, 214, 222, 1)',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [35, 39]
        },
        {
            label: 'Digital Goods',
            fillColor: 'rgba(60,141,188,0.9)',
            strokeColor: 'rgba(60,141,188,0.8)',
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data: [28, 48]
        }
        ]
    }

    var barChartCanvas = $('#barChart').get(0).getContext('2d')
    var barChart = new Chart(barChartCanvas)
    var barChartData = areaChartData
    barChartData.datasets[1].fillColor = '#00a65a'
    barChartData.datasets[1].strokeColor = '#00a65a'
    barChartData.datasets[1].pointColor = '#00a65a'
    var barChartOptions = {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,
        //String - Colour of the grid lines
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        //Number - Width of the grid lines
        scaleGridLineWidth: 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - If there is a stroke on each bar
        barShowStroke: true,
        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,
        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,
        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1,
        //String - A legend template
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
        //Boolean - whether to make the chart responsive
        responsive: true,
        maintainAspectRatio: true
    }

    barChartOptions.datasetFill = false
    barChart.Bar(barChartData, barChartOptions)

    var data = [{
        "brand": "Samsung",
        "model": "TV",
        "model_year": "2015",
        "model_number": "STV1022",
        "serial_number": "SN00076564444",
        "warranty": "2 Year",
        "service_center_number": "(+91) 7045535344",
        "last_unschedule_maintanance": "Yes",
        "average_subsystem_risk_level": "20%",
        "average_exp_subsystem_impact": "30%",
        "high_exp_subsystem_impact": "",
        "location": "Pune"
    },
    {
        "brand": "LG",
        "model": "AC",
        "model_year": "2018",
        "model_number": "LG2034",
        "serial_number": "SN1243434353",
        "warranty": "5 Year",
        "service_center_number": "(+91) 9543535324",
        "last_unschedule_maintanance": "No",
        "average_subsystem_risk_level": "10 %",
        "average_exp_subsystem_impact": "20 %",
        "high_exp_subsystem_impact": "",
        "location": "Pune"

    }];

    $scope.table = null;
    function generateTable(data, tabelID) {
        $scope.tableData = [];
        for (var i = 0; i < data.length; i++) {
            var listData = {};
            listData.index = i + 1;
            listData.brand = data[i].brand;
            listData.model = data[i].model;
            listData.model_year = data[i].model_year;
            listData.model_number = data[i].model_number;
            listData.serial_number = data[i].serial_number;
            listData.warranty = data[i].warranty;
            listData.service_center_number = data[i].service_center_number;
            listData.last_unschedule_maintanance = data[i].last_unschedule_maintanance;
            listData.average_subsystem_risk_level = data[i].average_subsystem_risk_level;
            listData.average_exp_subsystem_impact = data[i].average_exp_subsystem_impact;
            listData.high_exp_subsystem_impact = data[i].high_exp_subsystem_impact;
            listData.location = data[i].location;
            $scope.tableData.push(listData);
        }

        if ($scope.table !== null) {
            $(tabelID).DataTable().destroy();
            $(tabelID).empty();
            $scope.table = null;
        }
        $scope.table = $(tabelID).DataTable({
            'data': $scope.tableData,
            'columns': [
                { title: 'Sr.Num', width: '10px', data: 'index' },
                { title: "Brand ", width: '30px', data: 'brand' },
                { title: "Model ", width: '30px', data: 'model' },
                { title: "Model Year ", width: '30px', data: 'model_year' },
                { title: "Model Number ", width: '30px', data: 'model_number' },
                { title: "Serial Number ", width: '30px', data: 'serial_number' },
                { title: "Warranty ", width: '30px', data: 'warranty' },
                { title: "Service Center Number ", width: '70px', data: 'service_center_number' },
                { title: "Last Unschedule Maintanance ", width: '30px', data: 'last_unschedule_maintanance' },
                { title: "Avg. Subsystem Risk Level ", width: '30px', data: 'average_subsystem_risk_level' },
                { title: "Avg.Exp. Subsystem Impact ", width: '30px', data: 'average_exp_subsystem_impact' },
                { title: "High Exp Subsystem Impact ", width: '30px', data: 'high_exp_subsystem_impact' },
                { title: "Location ", width: '30px', data: 'location' },

            ],
            createdRow: function (row, data, dataIndex) {
                $compile(angular.element(row).contents())($scope);
            },
            'retrieve': true,
            'destroy': true,
            'paging': false,
            'lengthChange': true,
            'searching': true,
            'ordering': false,
            'info': false,
            'autoWidth': true,
            "scrollX": true,
        });
        $(tabelID).DataTable().draw();
    }
    var tabelID = "#table-asset-description";
    generateTable(data, tabelID);

    function plotAssetRiskChart(data) {

        // console.log('Risk chart data-------', data)


        $.plot('#risk-chart', [data], {
            data: data1,
            grid: {
                hoverable: true,
                borderColor: '#f3f3f3',
                borderWidth: 1,
                tickColor: '#f3f3f3'
            },
            // legend: {
            //     cursor: "pointer",
            //     itemclick: function (e) {
            //         if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            //             e.dataSeries.visible = false;
            //         } else {
            //             e.dataSeries.visible = true;
            //         }

            //         e.chart.render();
            //     }
            // },
            series: {
                shadowSize: 2,
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            lines: {
                fill: false,
                color: ['#3c8dbc', '#f56954']
            },
            yaxis: {
                show: true,
                title: "Axis Y Title",
            },
            xaxis: {
                show: true,
                title: "RUL History",
            }
        })
    }
    function plotRiskScoreChart(data) {
        $.plot('#health-score-chart', [data], {
            grid: {
                hoverable: true,
                borderColor: '#f3f3f3',
                borderWidth: 1,
                tickColor: '#f3f3f3'
            },
            series: {
                shadowSize: 0,
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            lines: {
                fill: false,
                color: ['#3c8dbc', '#f56954']
            },
            yaxis: {
                show: true
            },
            xaxis: {
                show: true,
                label: "RUL History"
            }
        })
    }
    function plotRulChart(data) {
        $.plot('#rul-chart', [data], {
            grid: {
                hoverable: true,
                borderColor: '#f3f3f3',
                borderWidth: 1,
                tickColor: '#f3f3f3'
            },
            series: {
                shadowSize: 0,
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            lines: {
                fill: false,
                color: ['#3c8dbc', '#f56954']
            },
            yaxis: {
                show: true
            },
            xaxis: {
                show: true,
                label: "RUL History"
            },
        })
    }
    function plotTemperatureHumidityChart(data) {
        $.plot('#temp_humidity', [data], {
            grid: {
                hoverable: true,
                borderColor: '#f3f3f3',
                borderWidth: 1,
                tickColor: '#f3f3f3'
            },
            series: {
                shadowSize: 2,
                lines: {
                    show: true
                },
                points: {
                    show: true
                },
                color: '#3c8dbc'
            },
            lines: {
                fill: false, //Converts the line chart to area chart
                color: ['#3c8dbc', '#fc8dbc']
            },
            yaxis: {
                min: 0,
                max: 100,
                show: true
            },
            xaxis: {
                show: true
            }
        })
    }
    function plotEnergyConsumptionChart(data) {
        $.plot('#interactive', [data], {
            grid: {
                hoverable: true,
                borderColor: '#f3f3f3',
                borderWidth: 1,
                tickColor: '#f3f3f3'
            },
            series: {
                shadowSize: 2,
                lines: {
                    show: true
                },
                points: {
                    show: true
                },
                color: '#3c8dbc'
            },
            lines: {
                fill: false, //Converts the line chart to area chart
                color: ['#3c8dbc', '#fc8dbc']
            },
            yaxis: {
                min: 0,
                max: 5000,
                show: true
            },
            xaxis: {
                show: true,
            }
        })
    }

    function getStats() {
        $http.get('/device/status/'+$window.appliance)
            .then(function (data) {
                var riskData = data["data"][""].failure_risk[""].split(";");
                var risk = [];
                for (var i = 0; i < riskData.length; i++) {
                    risk.push([i, parseInt(riskData[i])]);
                }
                var healthScoreData = data["data"][""].health_score[""].split(";");
                var healthScore = [];
                for (var i = 0; i < healthScoreData.length; i++) {
                    healthScore.push([i, parseInt(healthScoreData[i])]);
                }
                var remainingUsefulLifeData = data["data"][""].remaining_useful_life[""].split(";");
                var remainingUsefulLife = [];
                for (var i = 0; i < remainingUsefulLifeData.length; i++) {
                    remainingUsefulLife.push([i, parseInt(remainingUsefulLifeData[i])]);
                }


                var temperatureHumidityData = data["data"][""].temperature_humidity[""].split(";");
                var temperatureHumidity = [];
                for (var i = 0; i < temperatureHumidityData.length; i++) {
                    temperatureHumidity.push([i, parseInt(temperatureHumidityData[i])]);
                }

                var energyConsumptionData = data["data"][""].energy_consumption[""].split(";");
                var energyConsumption = [];
                for (var i = 0; i < energyConsumptionData.length; i++) {
                    energyConsumption.push([i, parseInt(energyConsumptionData[i])]);
                }

                plotAssetRiskChart(risk);
                plotRiskScoreChart(healthScore);
                plotRulChart(remainingUsefulLife);
                plotTemperatureHumidityChart(temperatureHumidity);
                plotEnergyConsumptionChart(energyConsumption);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getStats();
});
