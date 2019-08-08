// Location for logs
var location = '/routes/asset/asset';

module.exports = function (app) {

    /**
     * @function view
     * @description Render the asset page 
     * @param request: HTTP Request
     * @param response: HTTP Response
     * @returns Render ejs page
     */
    this.view = function (request, response) {
        // var loc = location + 'view';
        response.render('asset/asset', { title: "Asset",  appliance_id:request.params.id });
    };

    // Kvinna home page
    app.get('/asset/:id', this.view);
};
