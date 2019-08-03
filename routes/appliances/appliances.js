// Location for logs
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

    // Kvinna home page
    app.get('/appliances', this.view);
};