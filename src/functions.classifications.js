//var baseUrl = "http://web-test.local.sportmaniacs.com/es";
//var baseUrl         = "https://sportmaniacs.com/es";
var baseUrl         = "https://tests.sportmaniacs.com/es";
var navegation      = require("./navegation.functions");
var dorsal          = require("./dorsal.Classifications");
var searchTargets   = require("./searchTargets.Classifications");

module.exports = new function() {

    this.detectNumberOfAthletesPerPage = function() {
        var numberOfAthletes = $('#ranking-table-renderer tbody tr').length;
        return numberOfAthletes;
    };


   this.doSomethingWithTheNumAthletes = function(browser, callBack) {

        browser.execute(this.detectNumberOfAthletesPerPage, [], callBack.bind(this));
    };


    this.getListOfTimes = function() {

        var listOfTimesInSeconds = [];
        var stringSingleTime = "";
        var timeInSeconds = 0;
        var numberOfRows = $("#ranking-table-renderer tbody tr").length;

        for (var i=1; i<=numberOfRows; i++) {
            stringSingleTime = $("tr.table-tr:nth-child(" + i + ") > td:nth-child(5)").text();

            var dataTime = stringSingleTime.split(":");
            timeInSeconds = parseInt(dataTime[0])*3600 + parseInt(dataTime[1])*60 + parseInt(dataTime[2]);
            listOfTimesInSeconds[i-1] = timeInSeconds;
        }
        return listOfTimesInSeconds;
    };


    this.doSomethingWithTheListOfTimes = function(browser, callBack) {

        browser.execute(this.getListOfTimes, [], callBack.bind(this));
    };


    this.checkTheOrderOfTimes = function(browser, event) {

            this.doSomethingWithTheListOfTimes(browser, function(result) {
                var arrayOfTimes = result.value;
                var cloneArrayOfTimes = result.value.slice(0);
                cloneArrayOfTimes = cloneArrayOfTimes.sort(function (a, b) {return a - b;});

                for (var i=0; i<arrayOfTimes.length; i++)
                browser.verify.equal(arrayOfTimes[i], cloneArrayOfTimes[i]);
            });
    };


    this.checkThatWeAreOnTheSamePageAfterClickingNextOrPrevious = function (browser, race, event) {

        var allEvents = dorsal.dorsalesClasificacion;
        for (var property in allEvents) {
            if (property == event) {
                var eachEvent = allEvents[property];

                    if (eachEvent[0].pages > 1){// Si hay más de una página en clasificación general
                        browser.verify.value("#pagination input", "1", "Página 1 de clasificación " +eachEvent[0].option + " en evento " + event + " de " + race);
                        browser.click('#pagination [data-ranking="prev"]');
                        browser.verify.value("#pagination input", "1", 'Seguimos en la misma página después de pulsar en "prev"');

                        browser.moveToElement('#pagination input', 10, 10);
                        browser.clearValue('#pagination input');
                        browser.setValue('#pagination input', eachEvent[0].pages);

                        browser.pause(2000);

                        browser.verify.value("#pagination input", eachEvent[0].pages.toString(), "Página " +eachEvent[0].pages+" de clasificación " +eachEvent[0].option + " en evento " + event + " de " + race);
                        browser.click('#pagination [data-ranking="next"]');
                        browser.pause(2000);
                        browser.verify.value("#pagination input", eachEvent[0].pages.toString(), 'Seguimos en la página después de pulsar "next"');
                    }else{
                        browser.verify.cssProperty('#pagination', 'display', 'none', "Sólo una página en clasificación " +eachEvent[0].option + " en evento " + event + " de " + race);
                    }
            }
        }
    };


    this.insertPageNumberManually = function (browser, event, race) {

        var allEvents = dorsal.dorsalesClasificacion;

        for (var property in allEvents) {

            if (property == event) {
                var eachEvent = allEvents[property];

                if (eachEvent[0].pages > 1){
                    browser.moveToElement('#pagination input', 10, 10);
                    browser.verify.value("#pagination input", "1", 'Página 1 del evento ' + event + ' de ' + race);

                    var actualPage = eachEvent[0].pages.toString();
                    browser.clearValue('#pagination input');
                    browser.setValue('#pagination input', actualPage);
                    browser.verify.value("#pagination input", actualPage, 'Página ' + actualPage + ' del evento ' + event + ' de ' + race);
            }else{
                    browser.verify.cssProperty('#pagination', 'display', 'none', "Sólo una página en clasificación " +eachEvent[0].option + " en evento " + event + " de " + race);
                }
            }
        }
    };


    this.checkIfGoToTheAthleteinfo = function(browser, race, event) {

        var allEvents = dorsal.dorsalesClasificacion;

        for (var property in allEvents) {
            if (property == event) {
                var eachEvent = allEvents[property];
                var athletesCollections = eachEvent[0].athletesCollection;
                var onlyTwoAthletes = [athletesCollections[0], athletesCollections[2]];
                //var othersAthletes = [athletesCollections[0], athletesCollections[1], athletesCollections[2], athletesCollections[3], athletesCollections[4],];

                for(var i=0; i<onlyTwoAthletes.length; i++){
                    this.checkDataOfTheFloatingWindowOfAthlete(browser, event, onlyTwoAthletes[i]);
                    this.checkCompleteDataOfTheBigFloatingWindowOfAthlete(browser, event, onlyTwoAthletes[i], athletesCollections);
                }
            }
        }
    };


    this.checkDataOfTheFloatingWindowOfAthlete = function(browser, event, athlete){
        browser.moveToElement("#eventCategory", 1, 1);
        browser.click("#ranking-table-renderer tbody > tr:nth-child(" + athlete.position + ")");
        browser.waitForElementVisible('div.summary-box.floating-user', 20000, 'Ventana flotante del atleta ' +athlete.name+ ' en el evento ' +event+ ' visible');
        browser.verify.containsText('.floating-user .upper-body div:nth-child(2) .item-value', athlete.name, "Visible nombre atleta " + athlete.name);
        browser.verify.containsText('.floating-user .upper-body div:nth-child(2) .item-sub', athlete.club, "Visible club " + athlete.club);
        browser.verify.containsText('.floating-user .upper-body div:nth-child(3) .item-value', athlete.position, "Visible posición " + athlete.position);
        browser.verify.containsText('.floating-user .upper-body div:nth-child(5) .item-value', athlete.officialTime, "Visible tiempo oficial " + athlete.officialTime);

    };


    this.checkCompleteDataOfTheBigFloatingWindowOfAthlete = function(browser, event, athlete, othersAthletes){
        browser.click("div.summary-box.floating-user  a.user-toggler");
        browser.pause(4000);
        browser.waitForElementVisible('div.summary-box.floating-user', 20000, 'Ventana flotante grande del atleta ' +athlete.name+ ' en el evento ' +event+ ' visible');
        browser.verify.containsText('.floating-user .upper-body div:nth-child(2) .item-value', athlete.name, "Visible nombre atleta " + athlete.name);
        browser.verify.containsText('.floating-user .upper-body div:nth-child(2) .item-sub', athlete.club, "Visible club " + athlete.club);
        browser.verify.containsText('.open section:nth-child(3) div:nth-child(2) .row div:nth-child(1) .item-value', athlete.position, "Visible posición " + athlete.position);
        browser.verify.containsText('.open section:nth-child(3) div:nth-child(3) .row div:nth-child(1) .item-value', athlete.officialTime, "Visible tiempo oficial " + athlete.officialTime);
        browser.verify.containsText('.floating-user .upper-body div:nth-child(7) .item-value', athlete.dorsal, "Visible dorsal " + athlete.dorsal);
        this.checkAthletesBeforeAndAfter(browser, athlete, othersAthletes);
        browser.click("#topBar");
    };


    this.checkAthletesBeforeAndAfter = function(browser, athlete, othersAthletes){

        if(athlete.position == 1){
            browser.verify.containsText('#user-sheet-chart-' +athlete.dorsal+ ' .highcharts-xaxis-labels text:nth-child(2)', othersAthletes[1].name, "Visible nombre atleta posterior " + othersAthletes[1].name);
            browser.verify.containsText('#user-sheet-chart-' +athlete.dorsal+ ' .highcharts-xaxis-labels text:nth-child(3)', othersAthletes[2].name, "Visible nombre atleta posterior " + othersAthletes[2].name);
        }else if(athlete.position == 3){
            browser.verify.containsText('#user-sheet-chart-' +athlete.dorsal+ ' .highcharts-xaxis-labels text:nth-child(1)', othersAthletes[0].name, "Visible nombre atleta anterior " + othersAthletes[0].name);
            browser.verify.containsText('#user-sheet-chart-' +athlete.dorsal+ ' .highcharts-xaxis-labels text:nth-child(2)', othersAthletes[1].name, "Visible nombre atleta anterior " + othersAthletes[1].name);
            browser.verify.containsText('#user-sheet-chart-' +athlete.dorsal+ ' .highcharts-xaxis-labels text:nth-child(4)', othersAthletes[3].name, "Visible nombre atleta posterior " + othersAthletes[3].name);
            browser.verify.containsText('#user-sheet-chart-' +athlete.dorsal+ ' .highcharts-xaxis-labels text:nth-child(5)', othersAthletes[4].name, "Visible nombre atleta posterior " + othersAthletes[4].name);
        }
    };


    this.takeNumberOfOptions = function (browser) {
        var numberOfOptions = $('#eventCategory > option').length;
        return numberOfOptions;
    };


    this.doSomethingWithNumberOfOptions = function(browser, callBack) {

        browser.execute(this.takeNumberOfOptions, [], callBack.bind(this));
    };


    this.checkDorsalByCategories = function(browser, event) {
        var allEvents = dorsal.dorsalesClasificacion;
        for (var property in allEvents) {

            if (property == event) {

                var eachEvent = allEvents[property];

                for(var i=1; i<eachEvent.length; i++){

                }
            }
        }
    };


    //this.checkFirstAndLastDorsal = function (browser, jsonObject){
    //    if(jsonObject.pages >= 1){
    //        browser.expect.element('tr.table-tr:nth-child(1) > td:nth-child(2)').text.to.contain(jsonObject.first);
    //        browser.clearValue('#pagination input');
    //        browser.setValue('#pagination input', jsonObject.pages);
    //        browser.waitForElementVisible('tr.table-tr:last-child > td:nth-child(2)', 20000);
    //        browser.expect.element('tr.table-tr:last-child > td:nth-child(2)').text.to.contain(jsonObject.last);
    //    }else if(jsonObject.pages == 0){
    //        browser.verify.cssProperty('#pagination', 'display', 'none', "Sólo una página en " +eachEvent[0].option);
    //        browser.verify.elementNotPresent("#ranking-table-renderer >tbody >tr", "No hay atletas para esta opcion clasificacion");
    //    }
    //};


    this.checkFinderAthletes = function (browser, event) {
        browser.moveToElement('.header', 10, 10);
        var targets = searchTargets.busquedasClasificacion;
        for(var property in targets) {
            if (property == event) {
                var targetOfEvent = targets[property];
                for(var i=0; i < targetOfEvent.length; i++){
                    this.insertTargetInFinder(browser, targetOfEvent[i]);
                }
            }
        }
    };


    this.insertTargetInFinder = function (browser, target) {

        browser.clearValue('#dorsal');
        browser.setValue('#dorsal', target.target);

        if(target.pages == 1) {
            browser.verify.containsText('tr.table-tr:nth-child(1) > td:nth-child(2)', target.first, "Búsqueda de " + target.target);
            browser.verify.cssProperty('#pagination', 'display', 'none', "Sólo una página sin paginador");
        }else if(target.pages > 1) {
            browser.verify.containsText('tr.table-tr:nth-child(1) > td:nth-child(2)', target.first, "Búsqueda de " + target.target);
            browser.verify.containsText('#pagination input+span', target.pages, "Número de páginas " + target.pages);
        }else{
            browser.verify.elementNotPresent("#ranking-table-renderer >tbody >tr", "El atleta no existe");
        }
    };


    this.checkThatTheGraphsAreDisplayed = function (browser, event, eventWithPhotos, isLogged, hasParticipated) {
        if (!isLogged && !hasParticipated){
            browser.waitForElementVisible('#highcharts-6 g.highcharts-series path:nth-child(1)', 20000, 'Gráfica Participación por género con usuario no logueado en evento '+event);
            browser.waitForElementVisible('#highcharts-0 g.highcharts-series path:nth-child(1)', 20000, 'Gráfica Participación por categoría con usuario no logueado '+event);
            browser.waitForElementVisible('#highcharts-2 g.highcharts-series rect:nth-child(1)', 20000, 'Gráfica Media de tiempo por categoría con usuario no logueado '+event);
            browser.waitForElementVisible('#highcharts-4 g.highcharts-series rect:nth-child(1)', 20000, 'Gráfica Media de tiempo por Club con usuario no logueado '+event);
            browser.waitForElementVisible('#highcharts-8 g.highcharts-series:nth-child(1) rect:nth-child(1)', 20000, 'Gráfica Intervalos de tiempo por género con usuario no logueado '+event);
        }else if (isLogged && hasParticipated && event == eventWithPhotos){
            browser.waitForElementVisible('#highcharts-10 svg', 20000, 'Gráfica Participación por género con usuario logueado y participante en evento '+event);
            browser.waitForElementVisible('#highcharts-6 g.highcharts-series path:nth-child(1)', 20000, 'Gráfica Participación por género con usuario logueado y participante en evento '+event);
            browser.waitForElementVisible('#highcharts-0 g.highcharts-series path:nth-child(1)', 20000, 'Gráfica Participación por categoría con usuario logueado y participante '+event);
            browser.waitForElementVisible('#highcharts-2 g.highcharts-series rect:nth-child(1)', 20000, 'Gráfica Media de tiempo por categoría con usuario logueado y participante '+event);
            browser.waitForElementVisible('#highcharts-4 g.highcharts-series rect:nth-child(1)', 20000, 'Gráfica Media de tiempo por Club con usuario logueado y participante '+event);
            browser.waitForElementVisible('#highcharts-8 g.highcharts-series:nth-child(1) rect:nth-child(1)', 20000, 'Gráfica Intervalos de tiempo por género con usuario logueado y participante '+event);
        }else{
            browser.waitForElementVisible('#highcharts-6 g.highcharts-series path:nth-child(1)', 20000, 'Gráfica Participación por género con usuario logueado en evento '+event);
            browser.waitForElementVisible('#highcharts-0 g.highcharts-series path:nth-child(1)', 20000, 'Gráfica Participación por categoría con usuario logueado en evento '+event);
            browser.waitForElementVisible('#highcharts-2 g.highcharts-series rect:nth-child(1)', 20000, 'Gráfica Media de tiempo por categoría con usuario logueado en evento '+event);
            browser.waitForElementVisible('#highcharts-4 g.highcharts-series rect:nth-child(1)', 20000, 'Gráfica Media de tiempo por Club con usuario logueado en evento '+event);
            browser.waitForElementVisible('#highcharts-8 g.highcharts-series:nth-child(1) rect:nth-child(1)', 20000, 'Gráfica Intervalos de tiempo por género con usuario logueado en evento '+event);
        }
    };


    this.getNumberOfElements = function (browser) {
        var numberOfElementsA = $('#highcharts-0 g.highcharts-legend g.highcharts-legend-item').length;
        var numberOfElementsB = $('#highcharts-4 g.highcharts-series rect').length;
        var allAmounts = [numberOfElementsA, numberOfElementsB];
        return allAmounts;
    };


    this.doSomethingWithNumberOfElements = function(browser, callBack) {
        browser.execute(this.getNumberOfElements, [], callBack.bind(this));
    };


    this.checkThatTheElementsAreNotOfAParticularColor = function(browser, color) {
        this.doSomethingWithNumberOfElements(browser, function(result){
            //console.log(result.value);
            for(var i=1; i<=result.value[0]; i++){
                browser.expect.element('#highcharts-0 g.highcharts-legend g.highcharts-legend-item:nth-child('+i+') rect').to.have.css('fill', 'El elemento del gráfico no es ' + color[1]).which.does.not.equal(color[0]);
                browser.expect.element('#highcharts-0  g.highcharts-series-0  path:nth-child('+i+')').to.have.css('fill', 'El elemento del gráfico no es ' + color[1]).which.does.not.equal(color[0]);
                browser.expect.element('#highcharts-2 g.highcharts-series rect:nth-child('+i+')').to.have.css('fill', 'El elemento del gráfico no es ' + color[1]).which.does.not.equal(color[0]);
            }

            for(var i=1; i<=result.value[1]; i++){
                browser.expect.element('#highcharts-4 g.highcharts-series rect:nth-child('+i+')').to.have.css('fill', 'El elemento del gráfico no es ' + color[1]).which.does.not.equal(color[0]);
            }
        });
    };


    this.checkThatTheElementsAreOfAParticularColor = function (browser, arrayOfElement, color) {
         arrayOfElement.forEach(function(element){
            browser.expect.element(element).to.have.attribute('fill').equals(color);
         });
    };


    this.checkTheNumberOfAthletesFromTheFirstPageOfEachClassification = function (browser, race, event, numberOfPages, typeClassification, numberOfAthletesFromTheFirstPage) {

        var maximumNumberOfAthletesPerPage = 50;

        if (numberOfPages == 1) {

            this.doSomethingWithTheNumAthletes(browser, function(result) {
                browser.verify.equal(result.value, numberOfAthletesFromTheFirstPage, 'Clasificacion ' + typeClassification + ' / ' + numberOfAthletesFromTheFirstPage + ' atletas en la página 1 del evento '+event+' de '+race);
            });

        }else if (numberOfPages > 1) {

            this.doSomethingWithTheNumAthletes(browser, function(result) {
                browser.verify.equal(result.value, maximumNumberOfAthletesPerPage, 'Clasificacion ' + typeClassification + ' / ' + maximumNumberOfAthletesPerPage + ' atletas en la página 1 del evento '+event+' de '+race);
            });
        }
    };


    this.checkAthletesForEachClassificationOfOneEvent = function (browser, race, event){

        this.doSomethingWithNumberOfOptions(browser, function (result) {

            var allEvents = dorsal.dorsalesClasificacion;
            for (var property in allEvents) {

                if (property == event) {

                    var eachEvent = allEvents[property];

                    for (var i=0; i< result.value; i++) {
                        if (i != 0) {
                            navegation.selectNextOptionClassification(browser, eachEvent, i);
                            this.checkTheNumberOfAthletesFromTheFirstPageOfEachClassification(browser, race, event, eachEvent[i].pages, eachEvent[i].option, eachEvent[i].athletes);

                        } else {
                            this.checkTheNumberOfAthletesFromTheFirstPageOfEachClassification(browser, race, event, eachEvent[i].pages, eachEvent[i].option, eachEvent[i].athletes);
                        }
                    }

                }
            }
        });
    };
};

