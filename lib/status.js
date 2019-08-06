var jsonexport = require('jsonexport');
// var json = require('../config/');
var json_data = require("../config/data_config");
var csvjson = require("csvjson");
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
                    function randomDataSet(dataSetSize, minValue, maxValue) {
                        return new Array(dataSetSize).fill(0).map(function(n) {
                            return Math.round(Math.random() * (maxValue - minValue) + minValue);
                        });
                    }
                    var failed_array = randomDataSet(getRandomInt(20),0,78);
                    var outjson = [];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < failed_array.length; j++) {
                            if (i === failed_array[j]) {
                                data[i].status = "off";
                                outjson.push((data[i]));
                            }
                        }
                    }
                    const failedCSVData = csvjson.toCSV(outjson, {
                        headers: 'key'
                    });
                    writeFile('./output/failed.csv', failedCSVData, (err) => {
                        if(err){
                            return callback(err)
                        }else{
                            return callback(outjson);
                        }
                    });
                })
        }

    });


};
