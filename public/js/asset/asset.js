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

    // var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    var now = new Date();

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





    /* jQueryKnob */

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


    //Initialize tooltip on hover
    $('<div class="tooltip-inner" id="line-chart-tooltip"></div>').css({
        position: 'absolute',
        display: 'none',
        opacity: 0.8
    }).appendTo('body')


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
            'columns': [{
                title: 'Sr.Num',
                width: '10px',
                data: 'index'
            },
            {
                title: "Brand ",
                width: '30px',
                data: 'brand'
            },
            {
                title: "Model ",
                width: '30px',
                data: 'model'
            },
            {
                title: "Model Year ",
                width: '30px',
                data: 'model_year'
            },
            {
                title: "Model Number ",
                width: '30px',
                data: 'model_number'
            },
            {
                title: "Serial Number ",
                width: '30px',
                data: 'serial_number'
            },
            {
                title: "Warranty ",
                width: '30px',
                data: 'warranty'
            },
            {
                title: "Service Center Number ",
                width: '70px',
                data: 'service_center_number'
            },
            {
                title: "Last Unschedule Maintanance ",
                width: '30px',
                data: 'last_unschedule_maintanance'
            },
            {
                title: "Avg. Subsystem Risk Level ",
                width: '30px',
                data: 'average_subsystem_risk_level'
            },
            {
                title: "Avg.Exp. Subsystem Impact ",
                width: '30px',
                data: 'average_exp_subsystem_impact'
            },
            {
                title: "High Exp Subsystem Impact ",
                width: '30px',
                data: 'high_exp_subsystem_impact'
            },
            {
                title: "Location ",
                width: '30px',
                data: 'location'
            },

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
    var assetTableData = [{
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

    var tabelID = "#table-asset-description";
    generateAssetTable(assetTableData, tabelID);

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
            'columns': [{
                title: 'Block ID',
                width: '12px',
                data: 'block_id'
            },
            {
                title: 'Device ID',
                width: '12px',
                data: 'device_id'
            },
            {
                title: "Device ",
                width: '10px',
                data: 'device'
            },
            {
                title: "Status ",
                width: '50px',
                data: 'status'
            },
            {
                title: "Description ",
                width: '30px',
                data: 'description'
            },
            {
                title: "Remaining Useful Life (Days)",
                width: '20px',
                data: 'rul'
            },
            {
                title: "Risk ",
                width: '30px',
                data: 'risk'
            },
            // { title: "Risk History ", width: '30px', data: 'risk_history' },
            {
                title: "Nominal Impact ",
                width: '30px',
                data: 'nominal_impact'
            },
            {
                title: "Expected Impact ",
                width: '30px',
                data: 'expected_impact'
            },
            {
                title: "Average Subsystem Risk Level ",
                width: '30px',
                data: 'average_subsystem_risk_level'
            },
            {
                title: "Last Unschedule Maintanance ",
                width: '30px',
                data: 'last_unscheduled_maintenance'
            },
            {
                title: "Max Subsystem Risk Level ",
                width: '30px',
                data: 'max_subsystem_risk_level'
            },
            {
                title: "Average Exp Subsystem Impact",
                width: '30px',
                data: 'average_exp_subsystem_impact'
            },
            {
                title: "High Exp Subsystem Impact ",
                width: '30px',
                data: 'high_exp_subsystem_impact'
            },

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
        gradientStroke.addColorStop(0, 'red');
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

        myChart = new Chart(riskctx, {
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
                    data: data.slice(0, data.length - 1),
                    label: "Risk History"
                },
                {
                    borderColor: "red",
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
        myChart.render();
    }

    function plotHealthScoreChart(data) {

        var healthctx = document.getElementById('health-score-chart').getContext("2d");
        var gradientStroke = healthctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'red');
        // gradientStroke.addColorStop(1, '#00a9ff');
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
                    data: data.slice(0, data.length - 1),
                    label: "Histry of Health "
                },
                {
                    borderColor: "red",
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
        myChart.render();

    }

    function plotRulChart(data) {

        var rulctx = document.getElementById('rul-chart').getContext("2d");
        var gradientStroke = rulctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'red');
        // gradientStroke.addColorStop(1, '#00a9ff');
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

        var myChart = new Chart(rulctx, {
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
                    data: data.slice(0, data.length - 1),
                    label: "History RUL"
                },
                {
                    borderColor: "red",
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
                            labelString: 'Last Six Months'
                        }
                    }]
                }
            }
        });
        myChart.render();

    }

    function plotTemperatureHumidityChart(data, humidity) {

        var labels = [];
        var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        var todaysDay = now.getDay();
        var arr = [];
        var j = 0;
        for (var i = 0; i <= 8; i++) {
            if (todaysDay >= 0) {
                arr.push(days[todaysDay]);
            } else if (todaysDay == -1) {
                arr.push(days[Math.abs(todaysDay + 7)]);
            } else if (todaysDay == -2) {
                arr.push(days[Math.abs(todaysDay + 7)]);
            } else if (todaysDay == -3) {
                arr.push(days[Math.abs(todaysDay + 7)]);
            } else if (todaysDay == -4) {
                arr.push(days[Math.abs(todaysDay + 7)]);
            } else if (todaysDay == -5) {
                arr.push(days[Math.abs(todaysDay + 7)]);
            } else if (todaysDay == -6) {
                arr.push(days[Math.abs(todaysDay + 7)]);
            }
            todaysDay--;
        }
        for (var j = arr.length - 1; j >= 0; j--) {
            labels.push(arr[j]);
        }
        var lineChartData = {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                borderColor: 'red',
                backgroundColor: 'red',
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
        return lineChartData
    }

    var temp_humidity_chart_data = plotTemperatureHumidityChart(data, [])
    var humidityctx = document.getElementById('temp_humidity').getContext("2d");
    var gradientStroke = humidityctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, 'green');
    gradientStroke.addColorStop(1, 'red');
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
    var gradientStroke = enrgyctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, 'green');
    gradientStroke.addColorStop(1, 'red');
    var labels = [];
    for (var i = 8; i > 0; i--) {
        labels.push(now.getHours() - i + " Hr");
    }
    var energyConsumption_chart = new Chart(enrgyctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Hours",
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
                        labelString: 'Energy Consumption (Watt/Hr)'
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

    function plotEnergyConsumptionChart(data) {
        $scope.data = data;
        var enrgyctx = document.getElementById('interactive').getContext("2d");
        var gradientStroke = enrgyctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, 'green');
        gradientStroke.addColorStop(1, 'red');
        var labels = [];
        for (var i = 8; i > 0; i--) {
            labels.push(now.getHours() - i + " Hr");
        }
        $scope.myChart = new Chart(enrgyctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Hours",
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
                            labelString: 'Energy Consumption (Watt/Hr)'
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
        // $scope.myChart.render();
        // $scope.myChart.draw()
        return $scope.myChart;

    }

    function plotSimilarVsIndividualAssetChart(data1, data2) {
        var similarIndividualAssetctx = document.getElementById('similar_vs_individual').getContext("2d");
        var labels = [];
        var d;
        var month;
        for (var i = 2; i > 0; i -= 1) {
            d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            month = months[d.getMonth()];
            month = month + '' + d.getFullYear().toString().substr(2, 2);
            labels.push(month)
        }

        var myChart = new Chart(similarIndividualAssetctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    borderColor: "#ff6384",
                    backgroundColor: "#36a2eb",
                    fill: false,
                    borderWidth: 1,
                    data: data1,
                    label: 'Similar Asset'
                },
                {
                    borderColor: "#cc65fe",
                    backgroundColor: "#37e29b",
                    fill: false,
                    borderWidth: 1,
                    data: data2,
                    label: "Individual Asset"
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
                            labelString: 'Average failed devices '
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
                var humidityData = data["data"][""].humidity[""].split(";");
                var humidity = [];
                for (var i = 0; i < 8; i++) {
                    humidity.push(parseInt(humidityData[i]));
                }

                $scope.risk_value = 0;
                $scope.health_score = 0;
                $scope.rul_score = 0;
                plotAssetRiskChart(risk);
                plotHealthScoreChart(healthScore);
                plotRulChart(remainingUsefulLife);
                plotTemperatureHumidityChart(temperatureHumidity, humidity);
                plotEnergyConsumptionChart(energyConsumption);
                var individualData2 = [40, 53, 45, 32, 57, 50, 63, 74]
                plotSimilarVsIndividualAssetChart(similarIndividual, individualData2);

                $('#risk_value').val(risk[risk.length - 2]);
                $("#risk_value").trigger('change');

                $("#health_score").val(healthScore[healthScore.length - 2]);
                $("#health_score").trigger('change');

                $("#rul_score").val(remainingUsefulLife[remainingUsefulLife.length - 2]);
                $("#rul_score").trigger('change');


            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getStats();

    var updateInterval = 1000 //Fetch data ever x milliseconds
    var realtime = 'on' //If == to on then fetch data every x seconds. else stop fetching
    // var cc = plotEnergyConsumptionChart(getRandomData())
    var precision = 100; // 2 decimals


    function update() {
        energyConsumption_chart.data.datasets.forEach((dataset) => {
            if (dataset.data.length > 8) {
                dataset.data = dataset.data.splice(1, dataset.data.length - 1)
                var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
                dataset.data.push(Math.random(1, 10));
            } else {
                dataset.data.push(Math.random(1, 10));
            }
        });;
        energyConsumption_chart.draw()
        energyConsumption_chart.update()


        temp_humidity_chart.data.datasets.forEach((dataset) => {
            if (dataset.data.length > 8) {
                dataset.data = dataset.data.splice(1, dataset.data.length - 1)
                var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
                dataset.data.push(Math.random(1, 10));
            } else {
                dataset.data.push(Math.random(1, 10));
            }
        });;

        temp_humidity_chart.draw();
        temp_humidity_chart.update();
        if (realtime === 'on') {
            setTimeout(update, updateInterval)
        }
    }

    //INITIALIZE REALTIME DATA FETCHING
    if (realtime === 'on') {
        update()
    }
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
    $scope.failed_device_alert = false;
    $http.get('/appliances/csvtojson')
        .then(function (resp) {
            var failed_data = resp.data;
            var failed_ids = [];
            for (var i = 0; i < failed_data.length; i++) {
                failed_ids.push(failed_data[i].device_id);
            }
            for (var j = 0; j < failed_ids.length; j++) {
                if (failed_ids.includes($window.appliance)) {
                    $scope.failed_device_alert = true;
                } else {
                    $scope.failed_device_alert = false;
                }
            }
        });



});