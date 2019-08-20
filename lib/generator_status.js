let generator_data = require("../config/generator");
let csvjson = require("csvjson");
const writeFile = require('fs').writeFile;
const csv = require('csvtojson');

exports.status = function (callback) {

    var json = generator_data.generator_data;

    const csvData = csvjson.toCSV(json, {
        headers: 'key'
    });
    writeFile('./output/generator-test-data.csv', csvData, (err) => {
        if (err) {
            return callback(err);
        } else {
            csv().fromFile('./output/generator-test-data.csv')
                .then(function (data) {
                    function getRandomInt(max) {
                        return Math.floor(Math.random() * Math.floor(max));
                    }

                    function randomDataSet(dataSetSize, minValue, maxValue) {
                        return new Array(dataSetSize).fill(0).map(function (n) {
                            return Math.round(Math.random() * (maxValue - minValue) + minValue);
                        });
                    }

                    var failed_array = randomDataSet(getRandomInt(20), 0, 40);
                    var running_status = randomDataSet(getRandomInt(40 - failed_array.length), 0, 40);
                    var outjson = [];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < failed_array.length; j++) {
                            if (i === failed_array[j]) {
                                data[i].status = "off";
                                outjson.push((data[i]));
                            }
                        }
                    }
                    var running_status_json = [];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < running_status.length; j++) {
                            if (i === running_status[j]) {
                                data[i].running = true;
                                running_status_json.push((data[i]));
                            }
                        }
                    }
                    const runningCSVData = csvjson.toCSV(running_status_json, {
                        headers: 'key'
                    })
                    const failedCSVData = csvjson.toCSV(outjson, {
                        headers: 'key'
                    });
                    writeFile('./output/generator_failed.csv', failedCSVData, (err) => {
                        if (err) {
                            return callback(err)
                        } else {
                            writeFile('./output/generator_running_status.csv', runningCSVData, (err) => {
                                var generator_json = [];
                                for (var i = 0; i < data.length; i++) {
                                    generator_json.push({
                                        "generator_id": data[i].generator_id,
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
                                writeFile('./output/generator_scoring_data.csv', csvGeneratorData, (err) => {
                                    if (err) {
                                        return callback(err)
                                    } else {
                                        return callback(outjson);
                                    }
                                })
                            })
                        }
                    })
                })
        }
    });
};

exports.getGeneratorDetails = function (id) {
    return new Promise(function (resolve, reject) {

        let file = './output/generator_scoring_data.csv';
        csv().fromFile(file)
            .then(function (data) {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].generator_id === id) {
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

exports.getRunningStatus = function () {
    return new Promise(function (resolve, reject) {
        let file = './output/generator_running_status.csv';
        csv().fromFile(file)
            .then(function (data) {
                if (data) {
                    resolve(data);
                } else {
                    reject(data);
                }
            })
            .catch(function (err) {
                reject(err);
            })
    })
};
