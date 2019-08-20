var jsonexport = require('jsonexport');
var json_data = require("../config/water_turbines");
var csvjson = require("csvjson");
const writeFile = require('fs').writeFile;
const csv = require('csvtojson');

// function

exports.status = function (callback) {

    var json = json_data.water_turbines_data;

    const csvData = csvjson.toCSV(json, {
        headers: 'key'
    });
    writeFile('./output/water_turbines/test-data.csv', csvData, (err) => {
        if (err) {
            return callback(err);
        } else {
            csv().fromFile('./output/water_turbines/test-data.csv')
                .then(function (data) {
                    function getRandomInt(max) {
                        return Math.floor(Math.random() * Math.floor(max));
                    }

                    function randomDataSet(dataSetSize, minValue, maxValue) {
                        return new Array(dataSetSize).fill(0).map(function (n) {
                            return Math.round(Math.random() * (maxValue - minValue) + minValue);
                        });
                    }

                    var failed_array = randomDataSet(getRandomInt(20), 0, 78);
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
                    writeFile('./output/water_turbines/failed.csv', failedCSVData, (err) => {
                        if (err) {
                            return callback(err)
                        } else {
                            var generator_json = [];
                            for (var i = 0; i < data.length; i++) {
                                generator_json.push({
                                    "id": data[i].id,
                                    "failure_risk": randomDataSet(30, 1, 40),
                                    "health_score": randomDataSet(30, 40, 80),
                                    "remaining_useful_life": randomDataSet(50, 1, 100),
                                    "temperature_humidity": randomDataSet(12, 16, 44),
                                    "humidity": randomDataSet(12, 16, 44),
                                    "energy_consumption": randomDataSet(12, 1, 3),
                                    "similar_individual": randomDataSet(50, 1, 100),
                                });
                            }
                            const csvGeneratorData = csvjson.toCSV(generator_json, {
                                headers: 'key'
                            });
                            writeFile('./output/water_turbines/scoring_data.csv', csvGeneratorData, (err) => {
                                if (err) {
                                    return callback(err)
                                } else {
                                    return callback(outjson);
                                }
                            })
                        }
                    })
                })
        }
    });
};
exports.getTurbineDetails = function (id) {
    return new Promise(function (resolve, reject) {

        let file = './output/water_turbines/scoring_data.csv';
        csv().fromFile(file)
            .then(function (data) {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id === id) {
                            resolve(data[i]);
                        }
                    }
                } else {
                    reject(data);
                }
            })
            .catch(function (err) {
                reject(err);
            })
    })
};
