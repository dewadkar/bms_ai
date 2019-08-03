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



    var table = document.getElementById("my-table");

    // function generateTable() {
    //     var newTable = document.createElement("table"),
    //         tBody = newTable.createTBody(),
    //         nOfColumns = parseInt(5, 10),
    //         nOfRows = parseInt(20, 10),
    //         row = generateRow(nOfColumns);
    //     for (var i = 0; i < nOfRows; i++) {
    //         tBody.appendChild(row.cloneNode(true));
    //     }

    //     (table.hasChildNodes() ? table.replaceChild : table.appendChild).call(table, newTable, table.children[0]);
    // }
    // generateTable();

    // function generateRow(n) {
    //     var row = document.createElement("tr"),
    //         text1 = document.createTextNode('\u25A9 \u25CD'),
    //         text2 = document.createTextNode('\u25C8 \u25D8'),
    //         text3 = document.createTextNode('\u25A9 \u25D8'),
    //         text4 = document.createTextNode('\u25CD \u25D8')

    //     for (var i = 0; i < n; i++) {
    //         if (i == 0) {
    //             row.insertCell().appendChild(text1.cloneNode(true));
    //         } else if (i == 1) {
    //             row.insertCell().appendChild(text2.cloneNode(true));
    //         } else if (i == 2) {
    //             row.insertCell().appendChild(text3.cloneNode(true));
    //         } else if (i == 3) {
    //             row.insertCell().appendChild(text4.cloneNode(true));
    //         }
    //     }
    // }


    $scope.table = null;
    function generateTable(data, tabelID) {

        $scope.tableData = [];
        for (var i = 0; i < data.length; i++) {
            var listData = {};
            listData.index = data[i].floor;
            listData.devices = data[i].data.devices.join('    ');
            listData.status = data[i].data.status;
            listData.discription = data[i].data.discription;
            listData.risk = data[i].data.risk;
            listData.risk_history = data[i].data.risk_history;
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
                { title: '# Block', width: '10px', data: 'index' },
                { title: "Devices ", width: '30px', data: 'devices' },
                { title: "Status ", width: '30px', data: 'status' },
                { title: "Description ", width: '30px', data: 'discription' },
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
    var popover_template = '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content">ssscscsacsac</div></div>';

    var data = [{
        "floor": "1",
        "data": {
            "flat_no": "101",
            "devices": ['<a id="ac" href="/asset" >\u25C8</a>', '<a href="#" id="gyser">\u25CD</a>', '<a href="/">\u25C8</a>'],
            "status": "",
            "discription": "",
            "risk": "",
            "risk_history": "",
            "nominal_impact": "",
            "expected_impact": "",
            "last_unschedule_maintanance": "",
            "average_subsystem_risk_level": "",
            "max_subsystem_risk_level": "",
            "average_exp_subsystem_impact": "",
            "high_exp_subsystem_impact": "",
            "location": ""


        }

    },
    {
        "floor": "2",

        "data": {
            "flat_no": "201",
            "devices": ["\u25C8 ", "\u25D8", "\u25CD"],
            "status": "active",
            "discription": "",
            "risk": "20",
            "risk_history": "",
            "nominal_impact": "",
            "expected_impact": "",
            "last_unschedule_maintanance": "",
            "average_subsystem_risk_level": "",
            "max_subsystem_risk_level": "",
            "average_exp_subsystem_impact": "",
            "high_exp_subsystem_impact": "",
            "location": ""

        }

    }];

    // console.log(data);
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

    // Check for the various File API support.
    if ($window.File && $window.FileReader && $window.FileList && $window.Blob) {
        // Great success! All the File APIs are supported.
        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "resources/data.csv",
                dataType: "text",
                success: function (data) { processData(data); }
            });
        });

        function processData(allText) {
            var record_num = 5;  // or however many elements there are in each row
            var allTextLines = allText.split(/\r\n|\n/);
            var entries = allTextLines[0].split(',');
            var lines = [];

            var headings = entries.splice(0, record_num);
            while (entries.length > 0) {
                var tarr = [];
                for (var j = 0; j < record_num; j++) {
                    tarr.push(headings[j] + ":" + entries.shift());
                }
                lines.push(tarr);
            }
            // alert(lines);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

});