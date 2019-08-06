const writeFile = require('fs').writeFile;
const fs = require('fs');
const csv = require('csvtojson')
var jsonexport = require('jsonexport');
var json_data = require("../config/data_config");

exports.readCsvData = function (callback) {
    var path = "./output/test-data.csv";
    var fileContent;
    // return new Promise(function (resolve) {
    fileContent = fs.readFileSync(path, { encoding: 'utf8' });
    // return resolve(fileContent);
    return callback(fileContent);
    // });
};

exports.csvToJson = function (callback) {
    var path = "./output/failed.csv";
    csv()
        .fromFile(path)
        .then((jsonObj) => {
            return callback(jsonObj);
        });

};

exports.updateCsv = function (callback) {
    var path = "./output/appliances_data.csv";
    var data = 'high fkcdsc scsdc';
    fs.appendFile(path, data.join(','), function (err) {
        if (err) {
            // throw err;
            return callback(err);
        } else {
            console.log('Saved!');
            // return data;
            return callback(true);
        }

    });

    return callback(fileContent);

};

exports.jsonToCsv = function (callback) {
    var path = "./output/appliances_data.csv";
    jsonexport(json_data.appliances_data, function (err, csv) {
        if (err) return console.log(err);
        return callback(csv);
    });
};

exports.readJsonObj = function (callback) {

    return callback(json_data.data);
};





