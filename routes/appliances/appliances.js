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
        if(request.session.user_name){
            response.render('appliances/appliances', { title: "Appliances"});
        }else{
            response.redirect('/');
        }
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
        var options = {
            body: request.body,
            json: true
        };

        // return Promise(function (resolve, reject) {
        // appliance.updateCsv(options, function (error, result) {
        //     if (error) {
        //         response.send(error);
        //     } else {
        //         response.send(result);
        //     }
        // });
        appliance.updateCsv(options)
            .then(result => response.send(result))
            .catch(error => response.send(error));
        // appliance.updateCsv(function (options, error, result) {
        //     if (error) {
        //         response.send(error);
        //     } else {
        //         response.send(result);
        //     }
        // });
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
    app.put('/appliances/WriteToApplianceData', this.updateCsv);
    app.get('/appliances/csvtojson', this.csvToJson);
    app.get('/appliances/jsontocsv', this.jsonToCsv);
    app.get('/appliances/readJsonobject', this.readJsonObj);
};
