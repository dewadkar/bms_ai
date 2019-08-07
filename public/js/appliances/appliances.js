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
            data: "A1,TYPE-A,15;40;40;9;24;49;64;69;19;32;73;55;27;64;69;91;60;13;6;39;98;4;53;85;10;47;17;83;30;46;12;82;29;35;44;12;56;19;41;24;23;4;69;28;36;17;11;60;91;67;12;13;97;58;84;71;31;62;85;95;88;87;64;21;69;41;19;9;76;51;40;19;14;37;69;32;26;67;83;54;38;70;38;65;46;67;27;96;84;97;82;34;73;44;42;46;37;78;92;81,33;10;59;80;71;69;50;30;84;8;19;98;44;36;11;68;1;88;81;87;30;16;32;56;41;60;18;23;17;69;47;17;43;14;52;27;82;68;41;62;87;45;2;64;56;97;92;2;10;64;75;97;66;47;99;53;8;17;95;11;15;57;60;12;34;27;76;52;51;55;7;22;22;82;38;21;50;66;76;21;99;64;81;50;60;50;62;59;73;27;94;35;38;33;86;45;5;55;65;86,37;5;79;91;21;89;57;61;43;27;68;10;8;6;19;59;16;72;57;81;89;10;63;25;15;20;80;60;3;90;72;23;58;25;42;2;62;7;88;82;98;84;37;5;23;86;29;87;8;73;27;47;66;43;61;99;59;13;32;56;70;13;59;89;61;71;76;42;52;60;19;19;73;85;75;87;43;2;89;88;34;40;16;36;63;61;60;76;36;14;74;7;35;12;95;5;33;16;80;4,63;72;67;57;75;97;65;37;21;79;43;99;14;54;36;5;34;94;47;71;55;73;9;71;49;80;97;76;82;26;6;8;80;38;38;50;20;85;22;52;20;43;37;41;42;62;54;45;70;94;78;13;72;58;39;74;38;4;15;97;95;23;13;89;20;25;2;67;60;45;13;81;96;90;50;80;68;16;47;38;88;31;85;14;42;32;92;93;11;47;65;50;29;25;31;33;25;97;37;63"
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