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
    $rootScope.$on('scope.stored', function (event, data) {});
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

    var electricity_consumption = $.plot('#interactive', [getRandomData(), getRandomData()], {
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3'
        },
        series: {
            shadowSize: 0, // Drawing is faster without shadows
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

    var temprature_humidity = $.plot('#temp_humidity', [getRandomData1(), getRandomData1()], {
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3'
        },
        series: {
            shadowSize: 0, // Drawing is faster without shadows
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


    var updateInterval = 500 //Fetch data ever x milliseconds
    var realtime = 'on' //If == to on then fetch data every x seconds. else stop fetching
    function update() {

        electricity_consumption.setData([getRandomData(), getRandomData()])
        temprature_humidity.setData([getRandomData1(), getRandomData1()])

        // Since the axes don't change, we don't need to call plot.setupGrid()
        electricity_consumption.draw()
        temprature_humidity.draw()
        if (realtime === 'on')
            setTimeout(update, updateInterval)
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
    $.plot('#rul-chart', [line_data1, line_data2], {
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

    $.plot('#health-score-chart', [line_data1, line_data2], {
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

    $.plot('#risk-chart', [line_data1, line_data2], {
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
});