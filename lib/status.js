var jsonexport = require('jsonexport');
// var json = require('../config/');
var json_data = require("../config/data_config");
var csvjson = require("csvjson");
const writeFile = require('fs').writeFile;
const csv = require('csvtojson');
const promise = require('promise');
const device_type = require("../config/device_type");


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
                    writeFile('./output/failed.csv', failedCSVData, (err) => {
                        if (err) {
                            return callback(err)
                        } else {
                            var type_data = device_type.type;
                            var type_a_json = [];
                            var type_b_json = [];
                            var type_c_json = [];
                            var type_d_json = [];

                            for (var i = 0; i < data.length; i++) {
                                if (data[i].device_id.includes('1')) {
                                    type_a_json.push({
                                        "device_id": data[i].device_id,
                                        "device_type": "TYPE-A",
                                        "failure_risk": randomDataSet(30, 1, 40),
                                        "health_score": randomDataSet(30, 40, 80),
                                        "remaining_useful_life": randomDataSet(50, 1, 100),
                                        "temperature_humidity": randomDataSet(50, 1, 100),
                                        "energy_consumption":randomDataSet(20, 250, 5000),
                                    });
                                }
                                if (data[i].device_id.includes('2')) {
                                    type_b_json.push({
                                        "device_id": data[i].device_id,
                                        "device_type": "TYPE-B",
                                        "failure_risk": randomDataSet(30, 1, 40),
                                        "health_score": randomDataSet(30, 40, 80),
                                        "remaining_useful_life": randomDataSet(50, 1, 100),
                                        "temperature_humidity": randomDataSet(50, 1, 100),
                                        "energy_consumption":randomDataSet(20, 250, 5000),

                                    });

                                }
                                if (data[i].device_id.includes('3')) {
                                    type_c_json.push({
                                        "device_id": data[i].device_id,
                                        "device_type": "TYPE-C",
                                        "failure_risk": randomDataSet(30, 1, 40),
                                        "health_score": randomDataSet(30, 40, 80),
                                        "remaining_useful_life": randomDataSet(30, 1, 100),
                                        "temperature_humidity": randomDataSet(30, 1, 100),
                                        "energy_consumption":randomDataSet(20, 250, 5000),

                                    });
                                }
                                if (data[i].device_id.includes('4')) {
                                    type_d_json.push({
                                        "device_id": data[i].device_id,
                                        "device_type": "TYPE-D",
                                        "failure_risk": randomDataSet(30, 1, 40),
                                        "health_score": randomDataSet(30, 40, 80),
                                        "remaining_useful_life": randomDataSet(50, 1, 100),
                                        "temperature_humidity": randomDataSet(50, 1, 100),
                                        "energy_consumption":randomDataSet(20, 250, 5000),

                                    });
                                }
                            }
                            const csvTypeAData = csvjson.toCSV(type_a_json, {
                                headers: 'key'
                            });
                            const csvTypeBData = csvjson.toCSV(type_b_json, {
                                headers: 'key'
                            });
                            const csvTypeCData = csvjson.toCSV(type_c_json, {
                                headers: 'key'
                            });
                            const csvTypeDData = csvjson.toCSV(type_d_json, {
                                headers: 'key'
                            });
                            writeFile('./output/type_a.csv', csvTypeAData, (err) => {
                                if (err) {

                                } else {
                                    writeFile('./output/type_b.csv', csvTypeBData, (err) => {
                                        if (err) {

                                        } else {
                                            writeFile('./output/type_c.csv', csvTypeCData, (err) => {
                                                if (err) {

                                                } else {
                                                    writeFile('./output/type_d.csv', csvTypeDData, (err) => {
                                                        if (err) {

                                                        } else {
                                                            return callback(outjson);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });

                        }
                    });
                })
        }

    });


};

exports.getDeviceDetails = function (id) {
    return new Promise(function (resolve, reject) {
        var file = '';
        if (id.includes('1')) {
            file = './output/type_a.csv';
        }
        if (id.includes('2')) {
            file = './output/type_b.csv';
        }
        if (id.includes('3')) {
            file = './output/type_c.csv';
        }
        if (id.includes('4')) {
            file = './output/type_d.csv';
        }
        csv().fromFile(file)
            .then(function (data) {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].device_id === id) {
                            resolve(data[i]);
                        }
                    }
                }else{
                    reject(data);
                }
            })
            .catch(function (err) {
                reject(err);
            })
    })
};
