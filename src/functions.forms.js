

module.exports = new function() {
    
    
    this.stepIsAnInscription = function(step, browser) {
        return !isNaN(step);
    };
    
    this.recalculateStepsForTeamInscriptions = function(steps, user) {

        if(user.teamtype) {
            var team_size = parseInt(user.teamtype.replace(/[^\d]/g, ""));
            steps = steps.slice(0, team_size + 1);
        }

        return steps;
    };

    this.calculateName = function (name)
    {
        var matche = name.match(/([\w\d_-]+])$/);
        var match = matche[0].replace(']','');
        return match;
    };

    this.buildFullAttributesFormElementSelector = function(field) {

        var selector = "";
        var hashMap = {};
        var breakFields = [
            "tipodni",
            "mail",
            "code",
            "tipodni_auth"
        ];
        var asRadio = [
            "gender"
        ];
        var asTypeAhead = [
            "club"
        ];
        hashMap["name"] = field.name;
        hashMap["data-is-field"] = 'data-is-field';
        hashMap["data-short-name"] = this.calculateName(field.name);
        var elementType = this.calculateType(field);

        if (field.type == "date")
            return false;

        if (hashMap["data-short-name"] == "prefix_phone" || hashMap["data-short-name"] == "prefix_emergency")
            return false;

        if (field.options && field.type == "select" && field.options.length == 1 && !field.ws)
            field.type = "hidden";

        if (field.value)
            hashMap["data-default"] = field.value;

        if (field.type)
            hashMap["type"] = field.type;

        if (field.required)
            hashMap["required"] = 'required';

        if (field.dependent)
            hashMap["data-dependent"] = JSON.stringify(field.dependent);

        if (field.group)
            hashMap["data-group"] = field.group.key;

        if (field.price || field.isPrice)
            hashMap["data-price"] = "data-price";

        if (field.ws) {
            var newWs = field.ws;
            newWs = newWs.replace("http:", "");
            hashMap["data-ws"] = newWs.replace("https:", "");
        }

        if(field.ws_deferred == true)
            hashMap["data-ws-validation"] = hashMap["data-ws"];

        if (field.response_type)
            hashMap["data-ws-response-type"] = field.response_type;

        if(breakFields.indexOf(hashMap["data-short-name"]) != -1 && field.type != "hidden")
            hashMap["data-break"] = "data-break";

        if (field.type == "select" || field.type == "product")
        {
            delete hashMap["type"];

            if (field.required)
                delete hashMap["required"]
        }
        if (field.type == "phone" || field.type == "number")
            hashMap["type"] = "text";

        //FIN
        if(asRadio.indexOf(hashMap["data-short-name"]) != -1 && field.type != "hidden") {
            hashMap["type"] = "radio";
            delete hashMap["data-is-field"];
            delete hashMap["data-short-name"];
            delete hashMap["data-group"];
        }

        if(asTypeAhead.indexOf(hashMap["data-short-name"]) != -1 && field.type != "hidden") {
            hashMap["type"] = "text";
        }


        for (var attribute in hashMap)
            selector += `[${attribute}='${hashMap[attribute]}']`;
        
        return `${elementType}${selector}`;

    };


    this.fulfillDependencies = function(browser, field, user, raceFieldCollection) {

        var desiredValue = this.calculateFullFillingValue[field.dependent.condition](field.dependent.value);
        var id = buildIdByName(field.dependent.field);

        var fieldIWantToChange = this.findDependentField(field.dependent.field, raceFieldCollection);
        if (fieldIWantToChange) {
            this.setDependencyValue[fieldIWantToChange.type](browser, field.dependent, desiredValue, id, user);
        }
    };


    
    this.findDependentField = function (name, raceFieldCollection){

        var result = false;
        raceFieldCollection.forEach(function (field) {
            if(field.name == name) {
                result = field;
            }
        });
        return result;
    };



    this.calculateType = function(field) {

        var short_name = this.calculateName(field.name);
        var elementType = "input";
        var asRadio = [
            "gender"
        ];
        var asTypeAhead = [
            "club"
        ];

        if ((field.options && field.options.length > 1 || field.ws) && (field.type == "select" || field.type == "product") )
            elementType = "select";

        if(asRadio.indexOf(short_name) != -1 && field.type != "hidden") {
            elementType = "input";
        }
        if(asTypeAhead.indexOf(short_name) != -1 && field.type != "hidden") {
            elementType = "input";
        }

        if (field.options && field.type == "select" && field.options.length == 1 && !field.ws) {
            elementType = "input";
        }
        return elementType;

    };

    this.calculateFullFillingValue = {
        eq: function(value) {
            return value;
        },

        gt: function(value) {
            return value + 1;
        },

        in: function(value) {
            return [value];
        },

        ne: function(value){
            return value;
        }
    };

    this.setDependencyValue = {

        checkbox: function(browser, dependency, desiredValue, id) {
            if(desiredValue) {
                browser.click(id);
                browser.keys("\uE004");
                browser.pause(3000);
            }
        },

        select: function(browser, dependency, desiredValue, id, user) {
            if(desiredValue) {
                var short_name = buildShortNameById(id);

                if (desiredValue == "undefined")
                    browser.setValue(id, user[short_name]);

                for (var i = 0; i < desiredValue; i++) {
                    browser.keys("\uE015");
                }
                browser.keys("\uE004");

            }
        },

        date: function(browser, dependency, desiredValue, id) {
            if (desiredValue) {
                var selector = dependency.field + "[year]";
                id = buildIdByName(selector);
                var parts = desiredValue.split("-");
                browser.setValue(id, (parseInt(parts[0]) + 1));
                browser.keys("\uE004");
                browser.pause(3000);
            }
        }
    };

    buildShortNameById = function (id) {
        var shortName = id.split('_');
        var short_name;
        if(shortName.length < 5) {
            short_name = shortName[shortName.length - 1];
        }else{
            short_name = shortName[shortName.length - 2]+"_"+shortName[shortName.length - 1];
        }
        return short_name;
    };

    buildIdByName = function(name){
        var id = name.replace(/\]\[|\[/g,"_");
        id = "#" + id.replace("]","");
        return id;
    };


    this.doSomethingWithAllFieldsFromCurrentGroup = function(browser, callBack) {

        browser.execute(this.detectStepFields, [], callBack.bind(this));
    };

    
    this.detectStepFields = function() {
        var result = [];
        var fields = $(".form-register fieldset.active [name]:not([type=hidden])");
        var pushed = [];


        fields.each(function (index, item) {

            var name = $(item).data("short-name");
            var id = $(item).attr("id");
            var type = $(item).attr("type");

            if (!id)
                return true;

            if (!name)
                name = $(item).closest("[data-short-name]").data("short-name");

            if(name == "value")
            {
                var targetElement = $("#" + id.replace("value", "eventattribute_id"));
                name = targetElement.attr("value");
            }

            if ($(item).is("[type=radio]")) {
                id = id.split("_").slice(0, id.split("_").length - 1).join("_");
            }

            if (pushed.indexOf(id) == -1) {
                result.push({
                    id: id,
                    name: name,
                    type: type
                });
                pushed.push(id);
            }

        });

        return result;
    };

    this.fillStepFields = function(browser, user) {

        this.doSomethingWithAllFieldsFromCurrentGroup(browser, function(result) {

            result.value.forEach((item, index) => {

                var id = '#' + item.id;

                browser.pause(300);

                if (id.match(/value/)){
                    if (id) {
                        this.fillExtraFields(browser, id, item);
                    }
                    browser.pause(300);
                }
                
                if(!user.hasOwnProperty(item.name))
                    return false;
                
                var desiredValue = user[item.name];

                browser.setValue(id, desiredValue);
                browser.click("body");
                browser.pause(300);
                
                if(desiredValue && !!desiredValue.match(/\d\d\d\d-\w*-\d\d?/)) {

                    var parts = desiredValue.split("-");
                    browser.setValue(id+"_year", parts[0]);
                    browser.setValue(id+"_month", parts[1]);
                    browser.setValue(id+"_day", parts[2]);
                }
                if (item.type == "radio" || item.type == "checkbox")
                    browser.click(id + "_" + desiredValue);
            });
        });
        return false;
    };
    
    this.fillExtraFields = function(browser, id, item){
        browser.getTagName(id, function(result) {
            if (result.value == "select") {
                browser.click(id);
                browser.keys(['\uE015', '\uE006']);
            }
            if (item.type == "text") {
                browser.setValue(id, "ExtraExtra");
            }

            if (item.type == "radio" || item.type == "checkbox"){
                browser.waitForElementPresent(id, 2000);
                browser.click(id);
            }
        });
    };
    
    this.checkInscriptionEndedOk = function (browser){
        if (!this.ImOnTheTPV(browser) || this.ImOnTheThankyouPage(browser));
    };

    this.ImOnTheThankyouPage = function(browser){
        browser.assert.urlContains('thank-you');
    };
    this.ImOnTheTPV = function(browser) {
        browser.assert.urlContains('realizarPago');
    };

    this.calculateNumberOfPagesWithAthletes = function(browser, numberOfAthletes) {
        var numberOfPages = Math.ceil(numberOfAthletes);
        return numberOfPages;
    }

    
};




