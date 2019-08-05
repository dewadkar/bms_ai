var status1 = require('../../lib/status');

module.exports = function (app) {
    this.status = function (request, response) {
        status1.status(function (error, data) {
            if (error) {
                response.send(error);
            } else {
                response.send(data);
            }
        })
    };

    app.get('/device/status', this.status);
};
