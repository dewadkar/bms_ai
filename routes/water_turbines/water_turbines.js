var status = require('../../lib/water_turbines_status');


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
            response.render('water_turbines/water_turbines', { title: "Water Turbines" });
        } else {
            response.redirect('/');
        }
    };

    this.getTurbinesDetails = function (request, response) {
        // var loc = location + 'view';
        if (request.session.user_name) {
            response.render('water_turbines/water_turbines_details', { title: "Water Turbines", id: request.params.id });
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

    this.getTurbines = function () {
        var id = request.params.id;
        status.getTurbines(id)
            .then(function (data) {
                response.send(data);
            })
            .catch(function (err) {
                response.send(err);
            })
    };

    // Digiset Page
    app.get('/waterTurbines', this.view);
    app.get('/waterTurbines/details/:id', this.getTurbinesDetails);
    app.get('/waterTurbines/generate', this.generateData);
    app.get('/waterTurbines/status/:id', this.getTurbines);
};
