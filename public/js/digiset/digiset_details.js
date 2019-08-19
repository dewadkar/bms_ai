var app = angular.module('digisetDetails', []);

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
app.controller("digisetDetailsController", function ($scope, $http, $window, $compile, Scopes) {


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



});