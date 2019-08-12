// var digiset = require('../../lib/digiset');


var location = '/routes/digiset/digiset';

module.exports = function (app) {

    /**
     * @function view
     * @description Render the Digiset page 
     * @param request: HTTP Request
     * @param response: HTTP Response
     * @returns Render ejs page
     */
    this.view = function (request, response) {
        // var loc = location + 'view';
        response.render('digiset/digiset', { title: "Digiset" });
    };

    // Digiset Page
    app.get('/digiset', this.view);
};
