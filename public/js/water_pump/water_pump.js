var app = angular.module('waterPump', []);



app.controller("waterPumpController", function ($scope, $http, $window, $compile) {
    $scope.show_water_level_up = false;
    $scope.show_water_level_down = false;
    $scope.show_water_level_overflow = false;


    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateMinPeakHourData() {
        $scope.min_peak_hour_pressure = getRndInteger(0, 60);

    }
    function generateMaxPeakHourData() {
        $scope.max_peak_hour_pressure = getRndInteger(60, 500);

    }
    function generateWaterPressureData() {
        var water_pressure_img = document.getElementById("water_pressure_img");
        var water_pressure_value = document.getElementById("water_pressure_value");
        $scope.water_pressure = getRndInteger(20, 30);
        if ($scope.water_pressure <= 0) {
            water_pressure_img.style.backgroundColor = "rgb(202, 17, 41);";
            water_pressure_value.style.color = "rgb(202, 17, 41);";
        } else if ($scope.water_pressure > 0 && $scope.water_pressure <= 20) {
            water_pressure_img.style.backgroundColor = "rgb(212, 147, 49);";
            water_pressure_value.style.color = "rgb(212, 147, 49);";
        } else if ($scope.water_pressure > 20 && $scope.water_pressure <= 30) {
            water_pressure_img.style.backgroundColor = "#00A86B";
            water_pressure_value.style.color = "#00A86B";
        } else if ($scope.water_pressure > 30) {
            water_pressure_img.style.backgroundColor = "rgb(202, 17, 41);";
            water_pressure_value.style.color = "rgb(202, 17, 41);";
        }

    }
    function waterLevelDataGenerator() {
        var water_level = document.getElementById("water_level");
        var water_level_color = document.getElementById("water_level_color");
        $scope.water_level = Math.floor(Math.random() * Math.floor(101));
        if ($scope.water_level <= 0) {
            water_level.style.backgroundColor = "rgb(212, 147, 49);";
            water_level_color.style.color = "rgb(212, 147, 49)";
            $scope.water_level = "Invalid Data";
        } else if ($scope.water_level > 100) {
            water_level.style.backgroundColor = "rgb(202, 17, 41)";
            water_level_color.style.color = "rgb(202, 17, 41)";
        }
        if ($scope.water_level > 0 && $scope.water_level <= 25) {
            water_level.style.backgroundColor = "rgb(202, 17, 41)";
            water_level_color.style.color = "rgb(202, 17, 41)";
        }
        else if ($scope.water_level > 25 && $scope.water_level <= 50) {
            water_level.style.backgroundColor = "rgb(212, 147, 49)";
            water_level_color.style.color = "rgb(212, 147, 49)";
        }
        else if ($scope.water_level > 50 && $scope.water_level <= 80) {
            water_level.style.backgroundColor = "#00A86B";
            water_level_color.style.color = "#00A86B";
        }
        else if ($scope.water_level > 80 && $scope.water_level <= 94) {
            water_level.style.backgroundColor = "rgb(243, 116, 94)";
            water_level_color.style.color = "rgb(243, 116, 94)";
        }
        else if ($scope.water_level > 94 && $scope.water_level <= 100) {
            water_level.style.backgroundColor = "rgb(202, 17, 41)";
            water_level_color.style.color = "rgb(202, 17, 41)";
        }
    }
    function waterFlowDataGenerator() {
        $scope.water_flow = Math.floor(Math.random() * Math.floor(100) + 1);
        var water_flow_indicator = document.getElementById("water_flow_indicator");
        if ($scope.water_flow > 0 && $scope.water_flow <= 20) {
            water_flow_indicator.style.color = "red";
            $scope.water_flow_status = 'Low Pressure';
        } else if ($scope.water_flow > 20 && $scope.water_flow <= 30) {
            water_flow_indicator.style.color = "#B22222";
            $scope.water_flow_status = 'Semi Low Pressure';
        } else if ($scope.water_flow > 30 && $scope.water_flow <= 40) {
            water_flow_indicator.style.color = "rgb(212, 147, 49)";
            $scope.water_flow_status = 'Medium Pressure';
        } else if ($scope.water_flow > 40 && $scope.water_flow <= 50) {
            water_flow_indicator.style.color = "#00A86B";
            $scope.water_flow_status = 'Normal Pressure';
        } else if ($scope.water_flow > 50 && $scope.water_flow <= 60) {
            water_flow_indicator.style.color = "rgb(202, 17, 41)";
            $scope.water_flow_status = 'Semi High Pressure';
        } else if ($scope.water_flow > 60) {
            water_flow_indicator.style.color = "red";
            $scope.water_flow_status = 'High Pressure';
        }
    }
    $scope.show_risk_graph = true;
    // Create chart
    var pumpStatusGuageChart = document.getElementsByClassName("pump-status-gauge");
    var lostEnergyGauge = document.getElementsByClassName("lost-energy-gauge");
    var emissionsGauge = document.getElementsByClassName("emissions-gauge");
    var barChart = document.getElementsByClassName("stacked_bar_chart");
    var label = ['Pump Status', 'Lost Energy Costs', 'Emissions Lost', 'Bar Chart'];

    function plot_pump_status_chart() {
        var pump_status_chart = new Chart(pumpStatusGuageChart, {

            type: "doughnut",
            data: {
                labels: ["Functional", "Need Repair"],
                datasets: [{
                    data: [$scope.on_wp, $scope.need_repair],
                    backgroundColor: [
                        "#00A86B", "#F8DE7E"
                    ]
                }]
            },
            options: {

                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        fontColor: 'black'
                    }
                },

                cutoutPercentage: 60,
                rotation: 0.9 * Math.PI,
                circumference: 1.2 * Math.PI,
                tooltips: {
                    enabled: true
                }
            }
        });
    }

    function plot_lost_energy_chart() {
        var LE_chart = new Chart(lostEnergyGauge, {

            type: "doughnut",
            data: {
                labels: ["Lost Energy - $"],
                datasets: [{
                    data: [$scope.lost_energy_cost],
                    backgroundColor: [
                        "#FEDC56"
                        // "#BCD2EE", "#6495ED", "#5971AD"
                    ]
                }]
            },
            options: {
                cutoutPercentage: 60,
                rotation: 0.9 * Math.PI,
                circumference: 1.2 * Math.PI,
                legend: {
                    display: false,
                    position: "bottom",
                    labels: {
                        fontColor: 'black'
                    }
                },
                tooltips: {
                    callbacks: {
                        labelColor: function (tooltipItem, chart) {
                            return {
                                borderColor: 'rgb(255, 0, 0)',
                                backgroundColor: '#FEDC56'
                            };
                        },
                        labelTextColor: function (tooltipItem, chart) {
                            return '#ffffff';
                        }
                    }

                }
            }
        });

    }

    function plot_emission_lost_chart() {
        var Emission_chart = new Chart(emissionsGauge, {

            type: "doughnut",
            data: {
                labels: ["Emission Lost"],
                datasets: [{
                    label: label,
                    data: [$scope.emission_lost],
                    backgroundColor: [
                        '#9dc183'
                        // "#BCD2EE", "#6495ED", "#5971AD"
                    ]
                }]
            },
            options: {
                cutoutPercentage: 60,
                rotation: 0.9 * Math.PI,
                circumference: 1.2 * Math.PI,
                legend: {
                    position: 'bottom',
                    display: false,
                    labels: {
                        fontColor: 'black'
                    }
                },
                tooltips: {
                    enabled: true
                }
            }
        });
    }

    const formatter = (value, ctx) => {
        const otherDatasetIndex = ctx.datasetIndex === 0 ? 1 : 0;
        const total =
            ctx.chart.data.datasets[otherDatasetIndex].data[ctx.dataIndex] + value;

        return `${(value / total * 100).toFixed(0)}%`;
    };

    var Bar_chart = new Chart(barChart, {
        type: "bar",
        data: {
            labels: ["MON", "TUE", 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [

                {
                    type: 'line',
                    label: 'Dataset 2',
                    data: [80, 60, 70, 100, 80, 110, 70],
                    borderColor: '#1034A6',
                    pointBackgroundColor: "#B22222",
                    pointHoverBorderColor: "#3CB371",
                    pointBorderWidth: 1,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 1,
                    pointRadius: 5,
                    fill: false,
                    borderWidth: 4,
                    // color: ["#B22222"],
                    datalabels: {
                        color: "yellow",
                        // formatter: formatter
                    }

                },
                {
                    type: 'bar',
                    label: 'Dataset 1',
                    data: [50, 90, 120, 70, 60, 80, 100],
                    backgroundColor: [
                        "#BCD2EE", "#6495ED", "#5971AD", "#0080FF", "#0F52BA", "#1034A6", "#000080"
                    ],
                    datalabels: {
                        color: "white",
                        // formatter: formatter
                    },
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    data: [150, 120, 150, 170, 140, 130, 150],
                    backgroundColor: [
                        "#D0F0C0", "#98FB98", "#50C878", "#3CB371", "#00A572", "#20B2AA", "#01796F",
                    ],
                    datalabels: {
                        color: "white",
                        // formatter: formatter
                    }
                },
            ]
        },
        options: {
            maintainAspectRatio: false,
            spanGaps: false,
            // responsive: true,
            legend: {
                display: true,
                position: "top",
                labels: {
                    boxWidth: 14,
                }
            },
            tooltips: {
                mode: "label",
                callbacks: {
                    label: function (tooltipItem, data) {
                        const type = data.datasets[tooltipItem.datasetIndex].label;
                        const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        let total = 0;
                        for (let i = 0; i < data.datasets.length; i++)
                            total += data.datasets[i].data[tooltipItem.index];
                        if (tooltipItem.datasetIndex !== data.datasets.length - 1) {
                            return (
                                type + " : " + value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, "1,")
                            );
                        } else {
                            return [
                                type +
                                " : " +
                                value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, "1,"),
                                "Overall : " + total
                            ];
                        }
                    }
                }
            },
            plugins: {
                datalabels: {
                    color: "white",
                    align: "center"
                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'X axis legend'
                    },
                    gridLines: {
                        display: false
                    },
                },
                ],
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Y axis legend'
                    },
                },
                {
                    stacked: true,
                    position: 'right',
                    ticks: {
                        max: 6000,
                        min: 1000,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Y axis legend'
                    },
                    gridLines: {
                        display: false
                    },
                }
                ]
            },
        }
    });

    var water_level_up = document.getElementById("water_level_up");
    var water_level_down = document.getElementById("water_level_down");
    var water_level_overflow = document.getElementById("water_level_overflow");

    $scope.water_pump_data = [

        {
            id: 'WP-1',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-2',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-3',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-4',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-5',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-6',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-7',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-8',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-9',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-10',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-11',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-12',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-13',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-14',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-15',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-16',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-17',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-18',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-19',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-20',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-21',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-22',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-23',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-24',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-25',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-26',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-27',
            icon: 'fas fa-fan',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },
        {
            id: 'WP-28',
            icon: 'fas fa-battery-three-quarters',
            color: 'rgb(255, 255, 255)',
            status: '', alert: '', advise: ''
        },

    ];

    function generateAdvisoryTable(tabelID, data1) {
        if ($.fn.DataTable.isDataTable(tabelID)) {
            $(tabelID).DataTable().destroy();
        }
        if ($scope.table !== null) {
            $(tabelID).DataTable().destroy();
            $(tabelID).tabelIDempty();
            $scope.table = null;
        }
        $scope.table = $(tabelID).DataTable({
            'data': data1,
            'columns': [
                { title: 'DEVICE ID', width: '12px', data: 'id' },
                { title: "STATUS ", width: '50px', data: 'status' },
                { title: "ALERT ", width: '30px', data: 'alert' },
                { title: "RECOMMENDED ACTION ", width: '30px', data: 'recommended_action' }
            ],
            createdRow: function (row, data, dataIndex) {
                $compile(angular.element(row).contents())($scope);
            },
            'destroy': true,
            'retrieve': true,
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': false,
            'autoWidth': true,
            "scrollX": true,
        });

        $(tabelID).DataTable().draw();

    }

    $scope.simulate = function () {


        waterLevelDataGenerator();
        waterFlowDataGenerator();

        $http.get("/waterPump/generate")
            .then(function (response) {

                var failed_data = response.data;
                $scope.need_repair = failed_data.length;
                $scope.on_wp = $scope.water_pump_data.length - $scope.need_repair;

                var failed_ids = [];
                for (var i = 0; i < failed_data.length; i++) {
                    failed_ids.push(failed_data[i].id);
                }
                $scope.lost_energy_cost = Math.floor(failed_ids.length * 1245);
                $scope.emission_lost = Math.floor(failed_ids.length * 219);

                for (var j = 0; j < $scope.water_pump_data.length; j++) {
                    if (failed_ids.includes($scope.water_pump_data[j].id)) {
                        $scope.water_pump_data[j].color = '#CC0000';
                    } else {
                        $scope.water_pump_data[j].color = '#fffff';
                    }
                }
                plot_pump_status_chart();
                plot_lost_energy_chart();
                plot_emission_lost_chart();

                generateMinPeakHourData();
                generateMaxPeakHourData();
                generateWaterPressureData();


                $scope.alert_array = [];
                var alert_list = ["Water Pump stop operating due to discontinue power supply", "Water Pump getting sparks", "Water Pump performance get reducing", "Water Pump has starting problem ", "Water Pump getting heated", "Water Pump has working stop"];
                var recommended_action_list = ["Need Servicing", "Need Replacing", "Replace Pump Motor", "Replace suction Pipe", "Replace wiring"];

                for (var i = 0; i < failed_ids.length; i++) {
                    var alertObj = {};
                    alertObj.id = failed_ids[i];
                    alertObj.alert = alert_list[Math.floor(Math.random() * alert_list.length)];
                    alertObj.recommended_action = recommended_action_list[Math.floor(Math.random() * recommended_action_list.length)];
                    alertObj.status = '<span style="color:red">Need Repairing</span>';
                    $scope.alert_array.push(alertObj);
                }


                $scope.table = null;
                var alert_advisory_data = [];
                for (var i = 0; i < $scope.alert_array.length; i++) {
                    var listData = {};
                    if (failed_ids.includes($scope.alert_array[i].id)) {
                        listData.id = $scope.alert_array[i].id;
                        listData.status = $scope.alert_array[i].status;
                        listData.alert = $scope.alert_array[i].alert;
                        listData.recommended_action = $scope.alert_array[i].recommended_action;
                        alert_advisory_data.push(listData);
                    } else {
                        listData.status = $scope.alert_array[i].status;
                    }

                }

                return alert_advisory_data;
            })
            .then(function (alert_advisory_data) {
                var tableID = '#alert-advisory-table';
                generateAdvisoryTable(tableID, alert_advisory_data);
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    $scope.simulate();
});