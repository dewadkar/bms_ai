// var digiset = require('../../lib/digiset');


var location = '/routes/digiset/digiset';
var status = require('../../lib/generator_status');


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
        response.render('digiset/digiset', {title: "Digiset"});
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
        if (request.session.user_name) {
            response.render('digiset/digiset_details', {title: "Digiset Details", generator_id: request.params.id});
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

    this.getGeneratorDetails = function (request, response) {
        var id = request.params.id;
        status.getGeneratorDetails(id)
            .then(function (data) {
                response.send(data);
            })
            .catch(function (err) {
                response.send(err);
            })
    };
    this.getRunningStatus = function (request, response) {
        status.getRunningStatus()
            .then(function (data) {
                response.send(data);
            })
            .catch(function (err) {
                response.send(err);
            })
    };


    app.get('/digiset', this.view);
    app.get('/digiset/details/:id', this.digisetDetailsView);
    app.get('/digiset/running/status', this.getRunningStatus);
    app.get('/digiset/generate', this.generateData);
    app.get('/digiset/generator/:id', this.getGeneratorDetails);
};
