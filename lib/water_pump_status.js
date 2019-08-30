var jsonexport = require('jsonexport');
var json_data = require("../config/water_pump");
var csvjson = require("csvjson");
const writeFile = require('fs').writeFile;
const csv = require('csvtojson');

// function

exports.status = function (callback) {

    var json = json_data.water_pump_data;

    const csvData = csvjson.toCSV(json, {
        headers: 'key'
    });
    writeFile('./output/water-pump-data.csv', csvData, (err) => {
        if (err) {
            return callback(err);
        } else {
            csv().fromFile('./output/water-pump-data.csv')
                .then(function (data) {
                    function getRandomInt(max) {
                        return Math.floor(Math.random() * Math.floor(max));
                    }

                    function randomDataSet(dataSetSize, minValue, maxValue) {
                        return new Array(dataSetSize).fill(0).map(function (n) {
                            return Math.round(Math.random() * (maxValue - minValue) + minValue);
                        });
                    }

                    var failed_array = randomDataSet(getRandomInt(20), 2, 78);
                    var alert_list = ["Water Pump stop operating due to discontinue power supply", "Water Pump getting sparks", "Water Pump performance get reducing", "Water Pump has starting problem ", "Water Pump getting heated", "Water Pump has working stop"];
                    var recommended_action_list = ["Need Servicing", "Need Replacing", "Replace Pump Motor", "Replace suction Pipe", "Replace wiring"];

                    var outjson = [];
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < failed_array.length; j++) {
                            if (i === failed_array[j]) {
                                data[i].status = "ON";
                                data[i].alert = alert_list[Math.floor(Math.random() * alert_list.length)];
                                data[i].recommended_action = recommended_action_list[Math.floor(Math.random() * recommended_action_list.length)]
                                outjson.push((data[i]));
                            }
                        }
                        // for (var k = 0; k < off_pump_array.length; k++) {
                        //     if (i === failed_array[k]) {
                        //         data[i].status = "OFF";
                        //         outjson.push((data[i]));
                        //     }
                        // }
                    }
                    const failedCSVData = csvjson.toCSV(outjson, {
                        headers: 'key'
                    });
                    writeFile('./output/water-pump-failed.csv', failedCSVData, (err) => {
                        if (err) {
                            return callback(err)
                        } else {
                            var water_pump_json = [];
                            for (var i = 0; i < data.length; i++) {
                                water_pump_json.push({
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
                            const csvGeneratorData = csvjson.toCSV(water_pump_json, {
                                headers: 'key'
                            });
                            writeFile('./output/water-pump-scoring-data.csv', csvGeneratorData, (err) => {
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

        let file = './output/water-pump-scoring-data.csv';
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

exports.csvToJson = function (callback) {
    var path = "./output/water-pump-failed.csv";
    csv()
        .fromFile(path)
        .then((jsonObj) => {
            return callback(jsonObj);
        });

};
