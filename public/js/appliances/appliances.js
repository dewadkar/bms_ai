var app = angular.module('appliances', []);

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

app.controller("appliancesController", function ($scope, $http, $window, $compile, Scopes) {
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


    $scope.table = null;
    function generateTable(data, tabelID) {

        $scope.tableData = [];
        for (var i = 0; i < data.length; i++) {
            var listData = {};
            listData.index = data[i].floor;
            listData.devices = data[i].data.devices;
            listData.status = data[i].data.status;
            listData.discription = data[i].data.discription;
            listData.rul = data[i].data.rul;
            listData.risk = data[i].data.risk;
            listData.risk_history = data[i].data.risk_history.join('    ');
            listData.nominal_impact = data[i].data.nominal_impact;
            listData.expected_impact = data[i].data.expected_impact;
            listData.last_unschedule_maintanance = data[i].data.last_unschedule_maintanance;
            listData.max_subsystem_risk_level = data[i].data.max_subsystem_risk_level;
            listData.high_exp_subsystem_impact = data[i].data.high_exp_subsystem_impact;
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
                { title: '#Block', width: '10px', data: 'index' },
                { title: "Device ", width: '30px', data: 'devices' },
                { title: "Status ", width: '30px', data: 'status' },
                { title: "Description ", width: '30px', data: 'discription' },
                { title: "Remaining Useful Life (Days)", width: '30px', data: 'rul' },
                { title: "Risk ", width: '30px', data: 'risk' },
                { title: "Risk History ", width: '30px', data: 'risk_history' },
                { title: "Nominal Impact ", width: '30px', data: 'nominal_impact' },
                { title: "Expected Impact ", width: '30px', data: 'expected_impact' },
                { title: "Last Unschedule Maintanance ", width: '30px', data: 'last_unschedule_maintanance' },
                { title: "Max Subsystem Risk Level ", width: '30px', data: 'max_subsystem_risk_level' },
                { title: "High Exp Subsystem Impact ", width: '30px', data: 'high_exp_subsystem_impact' },

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

    var popover_title = "AC";
    var popover_contents = '<span class="glyphicon glyphicon-plus-sign" style="margin:3px 0 0 0"></span>';
    var data = [
        {
            "floor": "1",
            "data": {
                "flat_no": "101",
                "devices": ['<a id="ac" href="/asset">\u25C8</a>'],
                "status": "Active",
                "discription": "Installed since three month",
                "rul": "900 ",
                "risk": "10 %",
                "risk_history": [7, 8, 10],
                "nominal_impact": "3 %",
                "expected_impact": "3 %",
                "last_unschedule_maintanance": "NA",
                "average_subsystem_risk_level": "50 %",
                "max_subsystem_risk_level": "70 %",
                "average_exp_subsystem_impact": "50 %",
                "high_exp_subsystem_impact": "70 %"

            }

        },
        {
            "floor": "2",

            "data": {
                "flat_no": "201",
                "devices": ['<a id="gyser" href="/asset">\u25C7</a>'],
                "status": "active",
                "discription": "Installed since eight month",
                "rul": "365 ",
                "risk": "10 %",
                "risk_history": [7, 8, 10],
                "nominal_impact": "3 %",
                "expected_impact": "3 %",
                "last_unschedule_maintanance": "NA",
                "average_subsystem_risk_level": "50 %",
                "max_subsystem_risk_level": "70 %",
                "average_exp_subsystem_impact": "50 %",
                "high_exp_subsystem_impact": "70 %"

            },


        },
        {
            "floor": "1",

            "data": {
                "flat_no": "102",
                "devices": ['<a id="gyser" href="/asset">\u25C8</a>'],
                "status": "active",
                "discription": "Installed since eight month",
                "rul": "365 ",
                "risk": "10 %",
                "risk_history": [7, 8, 10],
                "nominal_impact": "3 %",
                "expected_impact": "3 %",
                "last_unschedule_maintanance": "NA",
                "average_subsystem_risk_level": "50 %",
                "max_subsystem_risk_level": "70 %",
                "average_exp_subsystem_impact": "50 %",
                "high_exp_subsystem_impact": "70 %"

            },


        },
        {
            "floor": "1",

            "data": {
                "flat_no": "103",
                "devices": ['<a id="gyser" href="/asset">\u25D8</a>'],
                "status": "active",
                "discription": "Installed since eight month",
                "rul": "365 ",
                "risk": "10 %",
                "risk_history": [7, 8, 10],
                "nominal_impact": "3 %",
                "expected_impact": "3 %",
                "last_unschedule_maintanance": "NA",
                "average_subsystem_risk_level": "50 %",
                "max_subsystem_risk_level": "70 %",
                "average_exp_subsystem_impact": "50 %",
                "high_exp_subsystem_impact": "70 %"

            },


        },
        {
            "floor": "1",

            "data": {
                "flat_no": "104",
                "devices": ['<a id="gyser" href="/asset">\u22C8</a>'],
                "status": "active",
                "discription": "Installed since eight month",
                "rul": "365 ",
                "risk": "10 %",
                "risk_history": [7, 8, 10],
                "nominal_impact": "3 %",
                "expected_impact": "3 %",
                "last_unschedule_maintanance": "NA",
                "average_subsystem_risk_level": "50 %",
                "max_subsystem_risk_level": "70 %",
                "average_exp_subsystem_impact": "50 %",
                "high_exp_subsystem_impact": "70 %"

            },


        },
        {
            "floor": "2",

            "data": {
                "flat_no": "201",
                "devices": ['<a id="gyser" href="/asset">\u23C8</a>'],
                "status": "active",
                "discription": "Installed since eight month",
                "rul": "365 ",
                "risk": "10 %",
                "risk_history": [7, 8, 10],
                "nominal_impact": "3 %",
                "expected_impact": "3 %",
                "last_unschedule_maintanance": "NA",
                "average_subsystem_risk_level": "50 %",
                "max_subsystem_risk_level": "70 %",
                "average_exp_subsystem_impact": "50 %",
                "high_exp_subsystem_impact": "70 %"

            },


        },
        {
            "floor": "2",

            "data": {
                "flat_no": "202",
                "devices": ['<a id="gyser" href="/asset">\u25CD</a>'],
                "status": "active",
                "discription": "Installed since eight month",
                "rul": "365 ",
                "risk": "10 %",
                "risk_history": [7, 8, 10],
                "nominal_impact": "3 %",
                "expected_impact": "3 %",
                "last_unschedule_maintanance": "NA",
                "average_subsystem_risk_level": "50 %",
                "max_subsystem_risk_level": "70 %",
                "average_exp_subsystem_impact": "50 %",
                "high_exp_subsystem_impact": "70 %"

            },


        }
    ];

    var tabelID = "#table-building";
    generateTable(data, tabelID);


    $('#ac').popover({
        placement: 'bottom',
        toggle: 'popover',
        trigger: "click",
        container: 'body',
        content: popover_contents,
        title: popover_title,
        // template: popover_template,
        html: true,
    });


    $('#gyser').popover({
        placement: 'bottom',
        toggle: 'popover',
        trigger: "hover",
        container: 'body',
        content: popover_contents,
        title: popover_title,
        html: true,
    });

    $scope.table1 = null;
    $scope.readApplianceData = function () {
        $http.get('/appliances/readApplianceData')
            .then(function (response) {
                var csv_data = response.data.split(/\r\n|\n/);

                var table_data = '<table class="table-bordered table-striped">';
                for (var i = 0; i < csv_data.length; i++) {
                    var cell_data = csv_data[i].split(',');
                    table_data += '<tr>';
                    for (var j = 0; j < cell_data.length; j++) {
                        if (i === 0) {
                            table_data += '<th>' + cell_data[j] + '</th>';
                        } else {
                            table_data += '<td>' + cell_data[j] + '</td>';
                        }
                    }
                    table_data += '</tr>';
                }
                table_data += '</table>';
                $('#appliances_table_csv_data').html(table_data);

            })
            .catch(function (error) {
                console.log('Error while reading Appliance data!', error);
            });

        $scope.updateApplianceData = function () {
            var content = "Happy Birth Day";

            $http.get('/appliances/WriteToApplianceData/', content)
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    console.log('Error while updating Appliance data!', error);
                });
        };

        $scope.convertCsvtojson = function () {
            $http.get('/appliances/csvtojson')
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    console.log('Error while converting csv to json object!', error);
                });
        };

        $scope.convertJsonToCsv = function () {
            $http.get('/appliances/jsonToCsv')
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    console.log('Error while converting data into json to csv!', error);
                });




        };

        function ConvertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';

            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ',';
                    line += array[i][index];
                }
                str += line + '\r\n\r';
            }
            return str;
        }





    };
});