var jsonexport = require('jsonexport');
// var json = require('../config/');
var fs = require('fs');
var Promise = require("promise");
var json_data = require("../config/data_config");
var csvjson = require("csvjson");
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;
const csv = require('csvtojson')


// function

exports.status = function (callback) {
    var json = json_data.data;
    const csvData = csvjson.toCSV(json, {
        headers: 'key'
    });
    writeFile('./output/test-data.csv', csvData, (err) => {
        if (err) {

            return callback(err);
        } else {
            csv().fromFile('./output/test-data.csv')
                .then(function (data) {
                    function getRandomInt(max) {
                        return Math.floor(Math.random() * Math.floor(max));
                    }
                    //
                    // for (var a = [], i = 0; i < getRandomInt(80); ++i) a[i] = i;
                    //
                    // function shuffle(array) {
                    //     var tmp, current, top = array.length;
                    //     if (top) while (--top) {
                    //         current = Math.floor(Math.random() * (top + 1));
                    //         tmp = array[current];
                    //         array[current] = array[top];
                    //         array[top] = tmp;
                    //     }
                    //     return array;
                    // }
                    //
                    // var failed_array = shuffle(a);
                    // console.log(failed_array);
                    function randomDataSet(dataSetSize, minValue, maxValue) {
                        return new Array(dataSetSize).fill(0).map(function(n) {
                            return Math.round(Math.random() * (maxValue - minValue) + minValue);
                        });
                    }
                    var failed_array = randomDataSet(getRandomInt(20),0,78);
                    console.log(failed_array);
                    var outjson = [];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < failed_array.length; j++) {
                            if (i === failed_array[j]) {
                                data[i].status = "off";
                                outjson.push((data[i]));
                            }
                        }
                    }
                    return callback(outjson);
                })
            //
        }

    });


};
