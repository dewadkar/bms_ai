/**
 * @author iKnowlation Research Labs Pvt. Ltd.
 * @description Routes for BMS home Page
 */

// Module Dependency
// var log = require('../../lib/logging/logger');

// Location for logs
var location = '/routes/dashboard/dashboard';


module.exports = function (app) {

    /**
     * @function dashboard()
     * @description Render to BMS home page
     * @param {*} request 
     * @param {*} response 
     */
    this.view = function (request, response) {
        var loc = location + 'view';

        // if(request.session)
        // log.debug(loc, "Render to BMS Home Page");
        if(request.session.user_name){
            response.render('dashboard/dashboard', {
                title: "Smart BMS "
            });
        }else{
            response.redirect('/');
        }

    };



    // Render to BMS Home Page
    app.get('/dashboard', this.view);

};
