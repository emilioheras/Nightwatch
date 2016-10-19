var navegation      = require("../navegation.functions");
var functions   = require("../functions.classifications");

//var race = "sportmaniacs-clasificacion";
//var raceEvents = ["330", "337"];

var race = "zurich-maraton-sevilla-2016";
var raceEvents = ["5698d2c7-7f34-4780-acf5-7ebbbc5ffd28", "56cb9baa-4b6c-453e-b0f8-752ebc5ffd28"];

module.exports = {

    //"CheckCorrectNumberOfAthletesPerRaceEvent" : function (browser) {
    //
    //    browser.maximizeWindow();
    //    navegation.login(browser, "alberto@sportmaniacs.com", "123456");
    //    browser.pause(1000);
    //
    //    raceEvents.forEach(function(event){
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        navegation.clickOnOfficialClassificationTabWithLoging(browser, event);
    //        functions.checkAthletesForEachClassificationOfOneEvent(browser, race, event);
    //    });
    //    browser.end();
    //},
    //
    //
    //"checkThatTheTimesOfAthletesAreOrderedAfterclickingOnTheColumnHeader" : function (browser) {
    //
    //    browser.maximizeWindow();
    //    navegation.login(browser, "alberto@sportmaniacs.com", "123456");
    //    browser.pause(1000);
    //
    //    raceEvents.forEach(function (event) {
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        navegation.clickOnOfficialClassificationTabWithLoging(browser, event);
    //        navegation.clickOnColumnTime(browser);
    //        functions.checkTheOrderOfTimes(browser, event);
    //    });
    //    browser.end();
    //},
    //
    //
    //"checkPagination" : function (browser) {
    //
    //    browser.maximizeWindow();
    //    navegation.login(browser, "alberto@sportmaniacs.com", "123456");
    //    browser.pause(1000);
    //    raceEvents.forEach(function(event){
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        navegation.clickOnOfficialClassificationTabWithLoging(browser, event);
    //        functions.checkThatWeAreOnTheSamePageAfterClickingNextOrPrevious(browser, race, event);
    //    });
    //    browser.end();
    //},


    //"checkManualPagination" : function (browser) {
    //
    //    browser.maximizeWindow();
    //    navegation.login(browser, "alberto@sportmaniacs.com", "123456");
    //    browser.pause(1000);
    //    raceEvents.forEach(function(event){
    //        navegation.goToEventClassificationPage(browser, race, event);
    //        navegation.clickOnOfficialClassificationTabWithLoging(browser, event);
    //        functions.insertPageNumberManually (browser, event, race);
    //    });
    //    browser.end();
    //},


    //"checkIfItShowTheAthleteInfo" : function (browser) {
    //
    //    browser.maximizeWindow();
    //    //browser.resizeWindow(1900, 1080);
    //    navegation.login(browser, "alberto@sportmaniacs.com", "123456");
    //    browser.pause(1000);
    //    raceEvents.forEach(function(event){
    //        if(event) {
    //            navegation.goToEventClassificationPage(browser, race, event);
    //            navegation.clickOnOfficialClassificationTabWithLoging(browser, event);
    //            functions.checkIfGoToTheAthleteinfo(browser, race, event);
    //        }
    //    });
    //    browser.end();
    //},
    //
    //
    //"checkIfTheFilterWorks" : function (browser) {
    //
    //    browser.maximizeWindow();
    //    navegation.login(browser, "alberto@sportmaniacs.com", "123456");
    //    browser.pause(1000);
    //    raceEvents.forEach(function(event) {
    //        if(event) {
    //            navegation.goToEventClassificationPage(browser, race, event);
    //            navegation.clickOnOfficialClassificationTabWithLoging(browser, event);
    //            functions.checkFinderAthletes(browser, event);
    //        }
    //    });
    //    browser.end();
    //}
};
