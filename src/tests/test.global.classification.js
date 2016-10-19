/**
 * Created by Emilio on 16/09/2016.
 */

var navegation     = require("../navegation.functions");
var functions   = require("../functions.classifications");

var race = "zurich-maraton-sevilla-2016";
var raceEvents = ["5698d2c7-7f34-4780-acf5-7ebbbc5ffd28", "56cb9baa-4b6c-453e-b0f8-752ebc5ffd28"];

//var race = "97";
//var raceEvents = ["330", "337"];

module.exports = {
    /*NO FUNCIONA PORQUE EN LA WEB DE TEST NO SALE EL ALERT DE NO LOGEADO*/
    //"shouldShowThatTheUserIsNotLogged": function(browser) {
    //    browser.maximizeWindow();
    //    raceEvents.forEach(function(event){
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        browser.verify.visible("#no-user");
    //    });
    //    browser.end();
    //},


    //"userLoggedButHasNotParticipated": function(browser) {
    //    browser.maximizeWindow();
    //    navegation.login(browser, "user00@gmail.com", "123456");
    //    browser.pause(1000);    //
    //    raceEvents.forEach(function(event){
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        browser.waitForElementNotVisible('#no-user', 1000);
    //    });
    //    browser.end();
    //},

    /*NO TIENE LÓGICA AHORA PORQUE NECESITA UN ATLETA QUE HAYA PARTICIPADO EN EL EVENTO*/
    //"userLoggedAndAlsoHasParticipated": function(browser) {
    //    browser.maximizeWindow();
    //    navegation.login(browser, "emilio.sportmaniacs@gmail.com", "123456");
    //    browser.pause(1000);
    //    raceEvents.forEach(function(event){
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        browser.waitForElementNotVisible('#no-user', 20000);
    //        if(event == raceEvents[1])
    //            browser.verify.visible("#user-card");
    //    });
    //    browser.end();
    //},


    //"shouldShowTheGraphicsInTheSummaryWithoutLogin": function (browser) {
    //    browser.maximizeWindow();
    //    raceEvents.forEach(function (event) {
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        functions.checkThatTheGraphsAreDisplayed(browser, event, raceEvents[1], false, false);
    //    });
    //    browser.end();
    //},


    //"shouldShowTheGraphicsInTheSummaryAfterLoginIfTheUserHasNotParticipatedInTheRace": function (browser) {
    //    browser.maximizeWindow();
    //    navegation.login(browser, "user@gmail.com", "123456");
    //    browser.pause(1000);
    //    raceEvents.forEach(function(event){
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        navegation.clickOnSummaryTabWithLoging(browser, event);
    //        functions.checkThatTheGraphsAreDisplayed(browser, event, raceEvents[1], true, false);
    //    });
    //    browser.end();
    //},


    /*NO FUNCIONA LA BÚSQUEDA DE LAS GRÁFICAS PORQUE EL ATLETA ALBERTO NO HA PARTICIPADO*/
    //"shouldShowTheGraphicsInTheSummaryAfterLoginIfTheUserHasParticipatedInTheRace": function (browser) {
    //    browser.maximizeWindow();
    //    navegation.logout(browser);
    //    navegation.login(browser, "emilio.sportmaniacs@gmail.com", "123456");
    //    browser.pause(1000);
    //    raceEvents.forEach(function(event){
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        navegation.clickOnSummaryTabWithLoging(browser, event);
    //        functions.checkThatTheGraphsAreDisplayed(browser, event, raceEvents[1], true, true);
    //    });
    //    browser.end();
    //},


    "shouldNotShowTheGraphicsInYellowWithoutLogin": function (browser) {
        browser.maximizeWindow();
        var yellowColor = ['#F9DB2D', 'amarillo'];
        navegation.goToEventClassificationPage(browser, race, raceEvents[0]);
        functions.checkThatTheElementsAreNotOfAParticularColor(browser, yellowColor);
        browser.end();
    },


    "shouldNotShowTheGraphicsInYellowAfterLoginIfTheUserHasNotParticipatedInTheRace": function (browser, event) {
        browser.maximizeWindow();
        var yellowColor = ['#F9DB2D', 'amarillo'];
        navegation.login(browser, "user@gmail.com", "123456");
        browser.pause(1000);
        navegation.goToEventClassificationPage(browser, race, raceEvents[1]);
        navegation.clickOnSummaryTabWithLoging(browser, event);
        functions.checkThatTheElementsAreNotOfAParticularColor(browser, yellowColor);
        browser.end();
    },

    /*No funciona porque cuando me logueo, FireFox se cuelga*/
    //"shouldShowTheGraphicsInYellowAfterLoginIfTheUserHasParticipatedInTheRace": function (browser) {
    //    browser.maximizeWindow();
    //    var halfTime = '#highcharts-10 g.highcharts-series > rect:nth-child(1)';
    //    var participationByCategory = '#highcharts-0 g.highcharts-legend g.highcharts-legend-item:nth-child(6) rect';
    //    var circularCategory = '#highcharts-0  g.highcharts-series-0  path:nth-child(6)';
    //    var halfTimeCategory = '#highcharts-2 g.highcharts-series rect:nth-child(6)';
    //    var halfTimeClub = '#highcharts-4 g.highcharts-series rect:nth-child(2)';
    //    var yellowColor = '#F9DB2D';
    //    var elements = [halfTime, participationByCategory, circularCategory, halfTimeCategory, halfTimeClub];
    //
    //    navegation.login(browser, "alberto@sportmaniacs.com", "123456");
    //    browser.pause(1000);
    //    navegation.goToEventClassificationPage(browser, race, raceEvents[1]);
    //    functions.checkThatTheElementsAreOfAParticularColor(browser, elements, yellowColor);
    //    browser.end();
    //}
}

