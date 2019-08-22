var status = require('../../lib/water_pump_status');


var location = '/routes/digiset/digiset';

module.exports = function (app) {

    /**
     * @function view
     * @description Render the Water Turbines page 
     * @param request: HTTP Request
     * @param response: HTTP Response
     * @returns Render ejs page
     */
    this.view = function (request, response) {
        // var loc = location + 'view';
        if (request.session.user_name) {
            response.render('water_pump/water_pump', { title: "Water Turbines" });
        } else {
            response.redirect('/');
        }
    };

    this.viewTurbinesDetails = function (request, response) {
        // var loc = location + 'view';
        if (request.session.user_name) {
            response.render('water_pump/water_pump_details', { title: "Water Turbines", id: request.params.id });
        } else {
            response.redirect('/');
        }
    };

    this.generateData = function (request, response) {
        status.status(function (error, data) {
            if (error) {
                response.send(error);
            } else {
                response.send(data);
            }
        })
    };

    this.getTurbineDetails = function (request, response) {
        var id = request.params.id;
        status.getTurbineDetails(id)
            .then(function (data) {
                response.send(data);
            })
            .catch(function (err) {
                response.send(err);
            });
    };

    // Digiset Page
    app.get('/waterPump', this.view);
    app.get('/waterPump/details/:id', this.viewTurbinesDetails);
    app.get('/waterPump/generate', this.generateData);
    app.get('/waterPump/status/:id', this.getTurbineDetails);
};
