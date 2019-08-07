var status = require('../../lib/status');

module.exports = function (app) {
    this.status = function (request, response) {
        status.status(function (error, data) {
            if (error) {
                response.send(error);
            } else {
                response.send(data);
            }
        })
    };

    this.getDevice = function (request, response) {
        var id = request.params.id;
        status.getDeviceDetails(id)
            .then(function (data) {
                response.send(data);
            })
            .catch(function (err) {
                response.send(err);
            })
    };
    app.get('/device/status', this.status);
    app.get('/device/status/:id', this.getDevice);
};
