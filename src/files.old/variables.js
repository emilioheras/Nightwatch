module.exports = {

//LOGIN
	randomEmailForTesting: 'user+test' + Math.random() * 100 + 1 + '@gmail.com',
	randomPhone: Math.floor(Math.random() * (100000000 - 999999999) + 999999999),
	randomDayBirth: Math.floor(Math.random() * (1 - 31) + 31),	
	randomYearBirth: Math.floor(Math.random() * (1916 - 2016) + 2016),
	randomPostalCode: Math.floor(Math.random() * (10000 - 99999) + 99999),	

	//URLs:
	// baseUrl: "https://sportmaniacs.com/es",
	// baseUrlWithoutLanguage: "https://sportmaniacs.com",

	baseUrl: "http://web-test.local.sportmaniacs.com/es",
	baseUrlWithoutLanguage: "http://web-test.local.sportmaniacs.com",

	// baseUrl: "http://nacho.local.sportmaniacs.com/sportmaniacs/web/es/",
	// baseUrlWithoutLanguage: "http://nacho.local.sportmaniacs.com/sportmaniacs/web/",	
	tpvUrl: 'https://sis-t.redsys.es/sis/realizarPago',
	price: '16,00',
	price2: '16.00',
	
	//Carrera con inscripciones.
	getRaceInscriptionUrl: function(race) {
		return "services/inscription/" + race;
	},

	getInscriptionFormUrl: function(race, event) {
		return this.getRaceInscriptionUrl(race) + "/" + event;
	},

	getInscriptionLoginUrl: function(race, event) {
		return this.getInscriptionFormUrl(race, event) + "/login";
	},

	//Carrera con clasificaciones.
	getRaceClassificationUrl: function(race) {
		return "races/" + race;
	},

	getRaceClassificationResultsUrl: function(race, event) {
		return this.getRaceClassificationUrl(race) + "/" + event + "/results/official";
	},

	getAthleteClassificationResultsUrl: function(race, event) {
		return this.getRaceClassificationUrl(race) + "/" + event + "/results/athlete/3/results";
	},

	getSearchByClubUrl: function(race, event) {
		return this.getRaceClassificationUrl(race) + "/" + event + "/results/clubs";
	},

	//Idiomas.

	getLanguageUrl: function(language) {		
		return this.baseUrlWithoutLanguage + "/" + language;
	},
	
	races: {
		normal: {
			race: "travesia-nocturna-a-nado-noche-de-san-juan-2016",
			event: "574ee02e-fe74-42be-a7d9-1216bc5ffd28"
		},

		search: {
			race: "Carrera de la mujer Madrid 2015",
			partialName: "de la Mujer Madrid 2015",
			province: "Madrid"
		},

		classification: {
			race: "carrera-de-la-mujer-madrid-2016",
			event: "56d052a0-9e18-467d-a611-11abbc5ffd28"
		},

		// preferentialInscription: {
		// 	race: "carrera-inscriptiones-test",
		// 	event: "56f02bef-2248-48f0-b797-388dbc5ffd28"
		// },

		rfeaInscription: {
			race: "vii-maraton-malaga",
			event: "56bdd7c0-5b80-49e7-90d3-2e62bc5ffd28"
		},

		// rfeaInscription: {
		// 	race: "carrera-inscriptiones-test",
		// 	event: "369"
		// },

		// fetriInscription: {
		// 	race: "i-triatlon-cros-villa-de-torrox",
		// 	event: "57446cd9-ac44-49ea-b202-56b8bc5ffd28"
		// }

		fetriInscription: {
			race: "carrera-inscriptiones-test",
			event: "368"		
		}
	 },

	others: {
		login: "login",
		logout: "app/logout",
		clasificaciones: "results",
		provinceOfRace: "Valencia",		

		datosPerfil: {			
			perfil: "/my-profile",
			datosEditables: "my-profile/edit",
			fotos: "my-profile/photos",
			carreras: "my-profile/results"
		},

		atleta: {
			nombreCorto: "JACQUELINE",
			nombre: "JACQUELINE MARTIN ALVAREZ",
			dorsal: "3",
			club: "CORRECONMIGOAV 1"
		},

		prices: {
			price: "16,00",
			price2: "16.00"
		}
	},

	users: {
		pruebas: {
			userEmail: "user@gmail.com",
			password: "123456",
			badPassword: "555555"
		},

		modificable: {
			userEmail: "pepitoGrillo@myMail.com",
			password: "123456"
		},

		perfilIncompleto: {
			userEmail: "userb@gmail.com",
			password: "123456"
		},

		conCarreras: {
			userEmail: "lauracloquell@gmail.com",
			password: "i66740b"
		},

		conFotos: {
			userEmail: "javier@sportmaniacs.com",
			password: "123456"
		}
	},

	inscriptionTest: {
		home: "races/10km-villa-de-pantoja/",
		eventsList: "services/inscription/criterium-pontevedra",
		eventLogin: "services/inscription/criterium-pontevedra/570e084a-4cf4-448b-9c5f-7589bc5ffd28/login",
		eventForm: "services/inscription/criterium-pontevedra/570e084a-4cf4-448b-9c5f-7589bc5ffd28"
	},

	/*preferentialInscription: {		
		eventsPreferentialInscription: "services/inscription/vii-carrera-de-fondo-ciudad-de-baeza",
		eventPreferentialLogin: "services/inscription/vii-carrera-de-fondo-ciudad-de-baeza/56f02bef-2248-48f0-b797-388dbc5ffd28/login"		
	},*/

	supersprintInscription: {		
		eventsSupersprintInscription: "services/inscription/carrera-inscriptiones-test/371",
		eventSupersprintLogin: "services/inscription/carrera-inscriptiones-test/371/login"		
	},	

	sampleRaceRelativeUrl: "races/carrera-de-la-mujer-madrid-2016",
	classificationUrl: "races/carrera-de-la-mujer-madrid-2016/56d052a0-9e18-467d-a611-11abbc5ffd28/results/official",
	infoAtheleteUrl: "races/carrera-de-la-mujer-madrid-2016/56d052a0-9e18-467d-a611-11abbc5ffd28/results/athlete/3/results",
	infoClubUrl: "races/sportmaniacs-clasificacion/330/results/clubs/search/AD%20SEVILLA",
	searchAthleteUrl: "races/sportmaniacs-clasificacion/330/results/official/search/yessica",
	classificationRelativeUrl: "races/sportmaniacs-clasificacion/330/results/official",

	//TEXTS
	partialRaceSearch: "de la Mujer Madrid 2015",
	sampleTitleEnglish: "Browse and compete in races around the world",
	sampleRaceName: "Carrera de la mujer Madrid 2015",
	classificationSubtitle: "Clasificación oficial evento con clasificacion",
	race: 'Criterium Pontevedra',

	//ELEMENTS:

	contactForm: "body > footer > div.footer > div > div > nav.col-md-7.text-md-left.text-xs-center.footer-legal > ul > li:nth-child(4) > a",
	english: "body > footer > div.footer > div > div > nav.col-md-5.u-fw-600.text-md-right.text-xs-center > ul > li:nth-child(1) > a",
	spanish: "body > footer > div.footer > div > div > nav.col-md-5.u-fw-600.text-md-right.text-xs-center > ul > li:nth-child(2) > a",
	polski: "body > footer > div.footer > div > div > nav.col-md-5.u-fw-600.text-md-right.text-xs-center > ul > li:nth-child(3) > a",
	catalan: "body > footer > div.footer > div > div > nav.col-md-5.u-fw-600.text-md-right.text-xs-center > ul > li:nth-child(4) > a",
	classificationButton: "#results > div:nth-child(2) > div.col-xs-7.col-md-4 > a",
	classificationSubtitleP: "body > main > header > div.container.text-xs-left > p",
	rankingTable: "#rankingTable > table > tbody > tr:nth-child(1) > td:nth-child(3)",
	browserClub: "body > main > div > article > div > div > form > div > div.col-md-8.col-xs-10 > span > input.typeahead.form-control.tt-input",
	nameRace: "#nameRace",
	searchForm: "form.searchForm",
	cardTitle: "h3.card-title",
	athelete: "YESSICA SANCHEZ SANTOS",
	checkButton: "body > main > div > section.u-mb-lg > div:nth-child(2) > div.col-md-4.u-mb-0 > a",
	checkRace: "//*[@id='check.race']",
	checkDni: "//*[@id='check.dni']",
	checkSelectDay: "//*[@id='checkInscriptionFormContent']/div[3]/div[1]/select",
	checkSelectMonth: "//*[@id='checkInscriptionFormContent']/div[3]/div[2]/select",
	checkSelectYear: "//*[@id='checkInscriptionFormContent']/div[3]/div[3]/select",
	checkFormButton: "//*[@id='checkInscriptionFormContent']/div[4]/button",
	checkAlert: "//*[@id='checkInscriptionFormContent']/div[5]",
	logIn: '//*[@id="topBar"]/div/nav/ul/li[3]/a',
	logOut: '//*[@id="topBar"]/div/nav/ul/li[3]/div/a[2]',
	loginEmail: '//*[@id="loginFormEmail"]',
	loginButton: '//*[@id="ajax-modal-body"]/form/fieldset/div[4]/div/div[1]/button',
	loginAlert: '//*[@id="ajax-modal-body"]/form/fieldset/div[1]',
	newUser: '//*[@id="ajax-modal-body"]/a',
	signupName: '//*[@id="signupFormName"]',
	signupSurName: '//*[@id="signupFormSurname"]',
	signupEmail: '//*[@id="signupFormEmail"]',
	signupPass: '//*[@id="signupFormPassword"]',
	signupButton: '//*[@id="signupForm"]/fieldset/div[6]/button',
	profileButton: '//*[@id="topBar"]/div/nav/ul/li[3]/div/a[1]',

	//KEYS:
	keys : {
		arrowDown: '\uE015',
		enter: '\uE006'
	}
}