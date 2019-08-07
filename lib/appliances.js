const writeFile = require('fs').writeFile;
const fs = require('fs');
const csv = require('csvtojson')
var jsonexport = require('jsonexport');
var json_data = require("../config/data_config");
var json2csv = require('json2csv');

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

exports.updateCsv = function (request) {
    var path = './output/' + request.body.file_name + '';
    var data = request.body.data;
    var csvHeader = request.body.csv_header;

    return new Promise((resolve, reject) => {
        fs.stat(path, data, err => {
            if (err == null) {
                console.log('File exists', err);
                var csvData = '\r' + data;
                fs.appendFile(path, csvData, function (err) {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                    fileContent = fs.readFileSync(path, { encoding: 'utf8' });
                    resolve(fileContent);
                });
            }
            else {
                //write the headers and newline
                console.log('New file, just writing headers');
                fields = (csvHeader);
                fs.writeFile(path, fields + '\r' + data, function (err, stat) {
                    if (err) throw err;
                    console.log('file saved');
                });
                reject(err);
            }
        });
    });

    // return new Promise((resolve, reject) => {
    //     fs.appendFile(path, '\r\n' + data, error => {
    //         if (error) {
    //             reject(error);
    //         } else {
    //             fileContent = fs.readFileSync(path, { encoding: 'utf8' });
    //             resolve(fileContent);
    //         }
    //     });
    // });
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





