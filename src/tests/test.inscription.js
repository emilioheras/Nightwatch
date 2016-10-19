var formFunctions   = require("../functions.forms");
var navegation      = require("../navegation.functions");
var dataBuilder     = require("../testData.builder");
var userBuilder     = require("../user.builder");
var api             = "http://api.local.sportmaniacs.com";
// var api             = "http://api-beta.sportmaniacs.com";


module.exports = {

    "Test Inscriptions" : function (browser) {
        navegation.login(browser, "user+test00@gmail.com", "123456");
        var races   = dataBuilder.buildTestData(api);
        races.forEach(function (race) {
            race.events.forEach(function (event) {
                if (event.form) {
                    navegation.goToEventPage(browser, race.id, event.id);
                    var user = userBuilder.buildAppropriateUser(event.form.fields, event);
                }
                if(event.form.steps && event.form.steps.length) {
                    event.form.steps = formFunctions.recalculateStepsForTeamInscriptions(event.form.steps, user);
                    event.form.steps.forEach((step, index) => {
                        
                        if(formFunctions.stepIsAnInscription(step))
                            navegation.clickImRegisteringAFriend(browser);
                        
                        formFunctions.fillStepFields(browser, user);
                        navegation.goToNextStep(browser);
                    });
                    navegation.clickOnPayButton(browser);
                    formFunctions.checkInscriptionEndedOk(browser);
                }
            });
        });
        browser.end()
    }
};
