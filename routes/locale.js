module.exports = function(app) {

    /**
     * @function setLocale
     * @description Render the home page 
     * @param request: HTTP Request
     * @param response: HTTP Response
     */
    this.setLocale = function(request, response) {
        response.cookie('langCookie', request.params.name);
        response.redirect(request.headers.referer);
    };

    app.get('/lang/:name', this.setLocale);

};