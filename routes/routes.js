/**
 * @author iKnowlation Research Labs Pvt. Ltd.
 * @description Application routes mapping
 */

module.exports = function (app) {
    // Simulation home page - Dashboard
    require('./dashboard/dashboard')(app);

    // Simulation Appliances page
    require('./appliances/appliances')(app);
    require('./appliances/asset')(app);
};