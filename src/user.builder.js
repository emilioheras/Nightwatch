/**
 * Created by Fran on 11/07/2016.
 */
var formFunctions       = require("./functions.forms");
var baseUser            = require("./tests/users/base.complete");
var baseUserPreferent   = require("./tests/users/preferente.valid.complete");
var baseUserFetri       = require("./tests/users/fetri.valid.complete");
var baseUserTeam        = require("./tests/users/team.valid.complete");
var baseUserRfea        = require("./tests/users/rfea.valid.complete");


module.exports = new function() {
    
    this.buildAppropriateUser = function (formFields, event) {

        if (event) {
            var correctUser = this.chooseAppropriateUser(event);
            var result = correctUser;
            var fields = this.extractShortNames(formFields);
            for (var field in result) {
                if (fields.indexOf(field) == -1)
                    delete result[field];
            }
        }
        if(Object.keys(result).length)
            return result;
    };



    this.chooseAppropriateUser = function (event) {

        var user = JSON.parse(JSON.stringify((baseUser)));
        var steps = JSON.stringify(event.form.steps);

        if(steps) {
            
            if (steps.match(/Preference/)) {
                user = baseUserPreferent;
            }
            if (steps.match(/RFEA/)) {
                user = baseUserRfea;
            }
            if (steps.match(/FETRI/)) {
                user = baseUserFetri;
            }
            if (steps.match(/Team/))
                user = baseUserTeam;
        }
        return user;

    };


    this.extractShortNames = function (formFields) {
        var shortNames = [];
        if(formFields)
            formFields.forEach((field) => {
                shortNames.push(formFunctions.calculateName(field.name));
            });
        return shortNames;
    };


};

