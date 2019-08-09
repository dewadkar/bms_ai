// var waterTurbine = require('../../lib/water_turbines');


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
        response.render('water_turbines/water_turbines', { title: "Water Turbines" });
    };

    // Digiset Page
    app.get('/waterTurbines', this.view);
};
