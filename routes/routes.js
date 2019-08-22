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
    require('./water_pump/water_pump')(app);

    //Digi-set page
    require('./digiset/digiset')(app);
    // Logout
    require('./user/logout')(app);

    // Generator Data

};
