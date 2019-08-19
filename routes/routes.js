/**
 * @author iKnowlation Research Labs Pvt. Ltd.
 * @description Application routes mapping
 */

module.exports = function (app) {
    // Simulation home page - Dashboard
    require('./dashboard/dashboard')(app);

    // Simulation Appliances page
    require('./appliances/appliances')(app);

    require('./asset/asset')(app);
    require('./devices/status')(app);

    //Water Turbines page
    require('./water_turbines/water_turbines')(app);

    //Digiset page
    require('./digiset/digiset')(app);

    // Login routes
    require('./user/login')(app);
};
