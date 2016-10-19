var formFunctions   = require("../functions.forms");
var dataBuilder     = require("../testData.builder");
var navegation      = require("../navegation.functions");
var api             = "http://api.local.sportmaniacs.com";
// var api = "http://api-beta.sportmaniacs.com";


module.exports = {

    "Test Formularios" : function (browser) {
        
        var races = dataBuilder.buildTestData(api);

        navegation.login(browser, "user+test00@gmail.com", "123456");

        races.forEach(function(race) {
            race.events.forEach(function(event) {
                navegation.goToEventPage(browser, race.id, event.id);
                if(event.form.fields) {
                    event.form.fields.forEach(function (field) {
                        var selector = formFunctions.buildFullAttributesFormElementSelector(field);
                        if (selector)
                            browser.waitForElementPresent(selector, 3000);
                    });
                }
            });
        });
    }
};
