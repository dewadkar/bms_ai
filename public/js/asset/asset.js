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

    // var barChartCanvas = $('#barChart').get(0).getContext('2d')
    // var barChart = new Chart(barChartCanvas)
    // var barChartData = areaChartData
    // barChartData.datasets[1].fillColor = '#00a65a'
    // barChartData.datasets[1].strokeColor = '#00a65a'
    // barChartData.datasets[1].pointColor = '#00a65a'
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

    // barChartOptions.datasetFill = false
    // barChart.Bar(barChartData, barChartOptions)

    var data = [
        {
            "brand": "XXX",
            "model": "AC",
            "model_year": "2018",
            "model_number": "XXX2034",
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
    function generateAssetTable(data, tabelID) {
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
    generateAssetTable(data, tabelID);

    $scope.selectedDevicetable = null;
    function generateDeviceTable(deviceData, selectedDeviceTabelID) {

        var tabledata = deviceData[0];
        $scope.deviceTableData = [];
        var listData = {};
        listData.block_id = tabledata.block_id;
        listData.device_id = tabledata.device_id;
        listData.status = tabledata.status;
        listData.device = tabledata.device;
        listData.description = tabledata.description;
        listData.rul = tabledata.rul;
        listData.risk = tabledata.risk;
        listData.nominal_impact = tabledata.nominal_impact;
        listData.expected_impact = tabledata.expected_impact;
        listData.average_subsystem_risk_level = tabledata.average_subsystem_risk_level;
        listData.last_unscheduled_maintenance = tabledata.last_unscheduled_maintenance;
        listData.max_subsystem_risk_level = tabledata.max_subsystem_risk_level;
        listData.average_exp_subsystem_impact = tabledata.average_exp_subsystem_impact;
        listData.high_exp_subsystem_impact = tabledata.high_exp_subsystem_impact;
        $scope.deviceTableData.push(listData);

        if ($scope.selectedDevicetable !== null) {
            $(selectedDeviceTabelID).DataTable().destroy();
            $(selectedDeviceTabelID).empty();
            $scope.selectedDevicetable = null;
        }
        $scope.selectedDevicetable = $(selectedDeviceTabelID).DataTable({
            'data': $scope.deviceTableData,
            'columns': [
                { title: 'Block ID', width: '12px', data: 'block_id' },
                { title: 'Device ID', width: '12px', data: 'device_id' },
                { title: "Device ", width: '10px', data: 'device' },
                { title: "Status ", width: '50px', data: 'status' },
                { title: "Description ", width: '30px', data: 'description' },
                { title: "Remaining Useful Life (Days)", width: '20px', data: 'rul' },
                { title: "Risk ", width: '30px', data: 'risk' },
                // { title: "Risk History ", width: '30px', data: 'risk_history' },
                { title: "Nominal Impact ", width: '30px', data: 'nominal_impact' },
                { title: "Expected Impact ", width: '30px', data: 'expected_impact' },
                { title: "Average Subsystem Risk Level ", width: '30px', data: 'average_subsystem_risk_level' },
                { title: "Last Unschedule Maintanance ", width: '30px', data: 'last_unscheduled_maintenance' },
                { title: "Max Subsystem Risk Level ", width: '30px', data: 'max_subsystem_risk_level' },
                { title: "Average Exp Subsystem Impact", width: '30px', data: 'average_exp_subsystem_impact' },
                { title: "High Exp Subsystem Impact ", width: '30px', data: 'high_exp_subsystem_impact' },

            ],
            createdRow: function (row, data, dataIndex) {
                $compile(angular.element(row).contents())($scope);
            },
            'retrieve': true,
            'destroy': true,
            'paging': false,
            'lengthChange': true,
            'searching': false,
            'ordering': false,
            'info': false,
            'autoWidth': true,
            "scrollX": true,
            // aaSorting: [[2, 'desc']],
        });
        $(selectedDeviceTabelID).DataTable().draw();
    }
    $http.get('/appliances/readJsonobject')
        .then(function (response) {
            var origionalData = response.data;
            var deviceData = [];
            var device = {};
            for (var j = 0; j < origionalData.length; j++) {
                if (origionalData[j].device_id === $window.appliance) {
                    device.block_id = origionalData[j].block_id;
                    device.device = '<a href="/asset/' + origionalData[j].device_id + '" style="color: crimson">' + origionalData[j].device + '</a>';
                    device.status = "On but need repairing";
                    device.device_id = origionalData[j].device_id;
                    device.description = origionalData[j].description;
                    device.rul = origionalData[j].rul;
                    device.risk = '<span style="color:red">' + origionalData[j].risk + '</span>';
                    device.nominal_impact = '<span style="color:red">' + origionalData[j].nominal_impact + '</span>';
                    device.expected_impact = '<span style="color:red">' + origionalData[j].expected_impact + '</span>';
                    device.last_unscheduled_maintenance = origionalData[j].last_unscheduled_maintenance;
                    device.average_subsystem_risk_level = '<span style="color:red">' + origionalData[j].average_subsystem_risk_level + '</span>';
                    device.max_subsystem_risk_level = '<span style="color:red">' + origionalData[j].max_subsystem_risk_level + '</span>';
                    device.average_exp_subsystem_impact = '<span style="color:red">' + origionalData[j].average_exp_subsystem_impact + '</span>';
                    device.high_exp_subsystem_impact = '<span style="color:red">' + origionalData[j].high_exp_subsystem_impact + '</span>';
                    deviceData.push(device)
                    break;

                }
            }
            return deviceData;
        })
        .then(function (response) {
            var selectedDeviceTabelID = "#table-selected-device";
            generateDeviceTable(response, selectedDeviceTabelID);
        })
        .catch(function (error) {
            console.log('Error while creating object', error);
        })

    function plotAssetRiskChart(data) {

        var riskctx = document.getElementById('risk-chart').getContext("2d");
        var gradientStroke = riskctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'green');
        // gradientStroke.addColorStop(1, '#00a9ff');
        gradientStroke.addColorStop(1, 'red');
        var labels = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(i + 1);
        }
        var myChart = new Chart(riskctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Data",
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
        myChart.render();

    }
    function plotRiskScoreChart(data) {

        var healthctx = document.getElementById('health-score-chart').getContext("2d");
        var gradientStroke = healthctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'green');
        // gradientStroke.addColorStop(1, '#00a9ff');
        gradientStroke.addColorStop(1, 'red');
        var labels = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(i + 1);
        }
        var myChart = new Chart(healthctx, {
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
        myChart.render();

    }
    function plotRulChart(data) {

        var rulctx = document.getElementById('rul-chart').getContext("2d");
        var gradientStroke = rulctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'green');
        // gradientStroke.addColorStop(1, '#00a9ff');
        gradientStroke.addColorStop(1, 'red');
        var labels = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(i + 1);
        }
        var myChart = new Chart(rulctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Data",
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
        myChart.render();

    }
    function plotTemperatureHumidityChart(data) {
        var humidityctx = document.getElementById('temp_humidity').getContext("2d");
        var gradientStroke = humidityctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'green');
        // gradientStroke.addColorStop(1, '#00a9ff');
        gradientStroke.addColorStop(1, 'red');
        var labels = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(i + 1);
        }
        var myChart = new Chart(humidityctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Data",
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
        myChart.render();
        // $.plot('#temp_humidity', [data], {
        //     grid: {
        //         hoverable: true,
        //         borderColor: '#f3f3f3',
        //         borderWidth: 1,
        //         tickColor: '#f3f3f3'
        //     },
        //     series: {
        //         shadowSize: 2,
        //         lines: {
        //             show: true
        //         },
        //         points: {
        //             show: true
        //         },
        //         color: '#3c8dbc'
        //     },
        //     lines: {
        //         fill: false, //Converts the line chart to area chart
        //         color: ['#3c8dbc', '#fc8dbc']
        //     },
        //     yaxis: {
        //         min: 0,
        //         max: 100,
        //         show: true
        //     },
        //     xaxis: {
        //         show: true
        //     }
        // })
    }
    function plotEnergyConsumptionChart(data) {
        var enrgyctx = document.getElementById('interactive').getContext("2d");
        var gradientStroke = enrgyctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'green');
        // gradientStroke.addColorStop(1, '#00a9ff');
        gradientStroke.addColorStop(1, 'red');
        var labels = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(i + 1);
        }
        var myChart = new Chart(enrgyctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Data",
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
        myChart.render();

    }
    function plotSimilarVsIndividualAssetChart(data) {
        console.log(data)
        var similarIndividualAssetctx = document.getElementById('similar_vs_individual').getContext("2d");

        var labels = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(i + 1);
        }
        var myChart = new Chart(similarIndividualAssetctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: "Data",
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
        myChart.render();
    }
    function getStats() {
        $http.get('/device/status/' + $window.appliance)
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
                var similarVsIndividualData = data["data"][""].similar_individual[""].split(";");
                var similarIndividual = [];
                for (var i = 0; i < 8; i++) {
                    similarIndividual.push(parseInt(similarVsIndividualData[i]));
                }
                $scope.risk_value = 0;
                $scope.health_score = 0;
                $scope.rul_score = 0;
                plotAssetRiskChart(risk);
                plotRiskScoreChart(healthScore);
                plotRulChart(remainingUsefulLife);
                plotTemperatureHumidityChart(temperatureHumidity);
                plotEnergyConsumptionChart(similarIndividual);
                plotSimilarVsIndividualAssetChart(similarIndividual)

                $('#risk_value').val(risk[risk.length - 1]);
                $("#risk_value").trigger('change');

                $("#health_score").val(healthScore[healthScore.length - 1]);
                $("#health_score").trigger('change');

                $("#rul_score").val(remainingUsefulLife[remainingUsefulLife.length - 1]);
                $("#rul_score").trigger('change');




            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getStats();
});
