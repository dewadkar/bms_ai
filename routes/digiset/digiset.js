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

    /**
     * @function digisetDetailsView
     * @description Render the Digiset Details page 
     * @param request: HTTP Request
     * @param response: HTTP Response
     * @returns Render ejs page
     */
    this.digisetDetailsView = function (request, response) {
        // var loc = location + 'digisetDetailsView';
        if(request.session.user_name){
            response.render('digiset/digiset_details', { title: "Digiset Details", generator_id: request.params.id });
        }else{
            response.redirect('/');
        }
    };

    // Digiset Page
    app.get('/digiset', this.view);

    // Digiset Details Page
    app.get('/digiset/details/:id', this.digisetDetailsView);
};
