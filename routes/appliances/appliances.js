var appliance = require('../../lib/appliances');


var location = '/routes/appliances/appliances';

module.exports = function (app) {

    /**
     * @function view
     * @description Render the applainces page 
     * @param request: HTTP Request
     * @param response: HTTP Response
     * @returns Render ejs page
     */
    this.view = function (request, response) {
        // var loc = location + 'view';
        response.render('appliances/appliances', { title: "Appliances", });
    };

    this.readCsvData = function (request, response) {
        appliance.readCsvData(function (error, data) {
            if (error) {
                response.send(error);
            } else {
                response.send(data);
            }
        });
    };

    this.updateCsv = function (request, response) {
        appliance.updateCsv(function (error, result) {
            if (error) {
                response.send(error);
            } else {
                response.send(result);
            }
        });
    };

    this.csvToJson = function (request, response) {
        appliance.csvToJson(function (error, result) {
            if (error) {
                response.send(error);
            } else {
                response.send(result);
            }
        });

    };

    this.jsonToCsv = function (request, response) {
        appliance.jsonToCsv(function (error, result) {
            if (error) {
                response.send(error);
            } else {
                response.send(result);
            }
        });

    };

    this.readJsonObj = function (request, response) {
        appliance.readJsonObj(function (error, data) {
            if (error) {
                response.send(error);
            } else {
                response.send(data);
            }
        });
    };

    // Appliance Page
    app.get('/appliances', this.view);
    app.get('/appliances/readApplianceData', this.readCsvData);
    app.get('/appliances/WriteToApplianceData', this.updateCsv);
    app.get('/appliances/csvtojson', this.csvToJson);
    app.get('/appliances/jsontocsv', this.jsonToCsv);
    app.get('/appliances/readJsonobject', this.readJsonObj);
};