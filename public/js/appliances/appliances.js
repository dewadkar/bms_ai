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
        // console.log(data)
        $scope.tableData = [];
        for (var i = 0; i < data.length; i++) {
            var listData = {};
            listData.block_id = data[i].block_id;
            listData.device_id = data[i].device_id;
            listData.status = data[i].status;
            listData.device = data[i].device;
            listData.description = data[i].description;
            listData.rul = data[i].rul;
            listData.risk = data[i].risk;

            // listData.risk_history = data[i].risk_history.join('    ');
            listData.nominal_impact = data[i].nominal_impact;
            listData.expected_impact = data[i].expected_impact;
            listData.last_unscheduled_maintenance = data[i].last_unscheduled_maintenance;
            listData.max_subsystem_risk_level = data[i].max_subsystem_risk_level;
            listData.high_exp_subsystem_impact = data[i].high_exp_subsystem_impact;
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
                { title: 'Block ID', width: '12px', data: 'block_id' },
                { title: "Device ", width: '10px', data: 'device' },
                { title: "Status ", width: '50px', data: 'status' },
                { title: "Description ", width: '30px', data: 'description' },
                { title: "Remaining Useful Life (Days)", width: '20px', data: 'rul' },
                { title: "Risk ", width: '30px', data: 'risk' },
                // { title: "Risk History ", width: '30px', data: 'risk_history' },
                { title: "Nominal Impact ", width: '30px', data: 'nominal_impact' },
                { title: "Expected Impact ", width: '30px', data: 'expected_impact' },
                { title: "Last Unschedule Maintanance ", width: '30px', data: 'last_unscheduled_maintenance' },
                { title: "Max Subsystem Risk Level ", width: '30px', data: 'max_subsystem_risk_level' },
                { title: "High Exp Subsystem Impact ", width: '30px', data: 'high_exp_subsystem_impact' },

            ],
            createdRow: function (row, data, dataIndex) {
                $compile(angular.element(row).contents())($scope);
            },
            'retrieve': true,
            'destroy': true,
            'paging': true,
            'lengthChange': true,
            'searching': true,
            'ordering': true,
            'info': false,
            'autoWidth': true,
            "scrollX": true,
            aaSorting: [[2, 'desc']],
        });
        // $(tabelID).DataTable().order([2, 'desc']).draw();
        $(tabelID).DataTable().draw();
    }

    var popover_title = "AC";
    var popover_contents = '<span class="glyphicon glyphicon-plus-sign" style="margin:3px 0 0 0"></span>';

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

    $scope.updateApplianceData = function () {
        var content = {
            file_name: "appliances_data.csv",
            csv_header: ['Name', 'Address'],
            data: "Nitin Bawane,Amravati"

        };

        $http.put('/appliances/WriteToApplianceData', content)
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

    // $scope.readJsonObjectdata = function () {
    var origionalData, failed_data;
    $http.get('/appliances/readJsonobject')
        .then(function (response) {
            var origionalData = response.data;
            return origionalData;
        })
        .then(function (response) {
            origionalData = response;
            $http.get('/appliances/csvtojson')
                .then(function (response) {
                    var failed_data = response.data;

                    for (var i = 0; i < failed_data.length; i++) {
                        for (var j = 0; j < origionalData.length; j++) {
                            if (failed_data[i].device_id == origionalData[j].device_id) {
                                origionalData[j].device = '<a href="/asset" style="color: crimson">' + origionalData[j].device + '</a>';
                                origionalData[j].status = "On but need repairing";
                            }
                        }
                    }
                    return origionalData;
                }).then(function (response) {
                    var tabelID = "#table-building";
                    generateTable(response, tabelID);
                })
                .catch(function (error) {
                    console.log('Error while converting csv to json object!', error);
                });

            return response;
        })
        .catch(function (error) {
            console.log('Error while converting data into json to csv!', error);
        });
    // };

});