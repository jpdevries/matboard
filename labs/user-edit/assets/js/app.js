/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var useredit = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function () {
	    var app = new useredit.UserEdit();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _redux = __webpack_require__(2);

	var _reactRedux = __webpack_require__(3);

	var actions = __webpack_require__(4);
	var store = __webpack_require__(5);

	var UserEditForm = __webpack_require__(13);

	var UserEdit = function UserEdit() {
	  store.subscribe(function () {
	    console.log(store.getState());
	    document.title = 'User ' + store.getState().bio.username;
	  });

	  store.dispatch(actions.updateBio({
	    username: 'jpdevries'
	  }));

	  store.dispatch(actions.addTemplate({
	    name: 'Product',
	    value: '1'
	  }));

	  store.dispatch(actions.addUser({
	    name: 'skytoaster',
	    value: 'skytoaster',
	    id: 1
	  }));

	  store.dispatch(actions.addUser({
	    name: 'modmore',
	    value: 'modmore',
	    id: 2
	  }));

	  /*
	  store.dispatch(actions.addNamespace({
	    name:'redactor',
	    value:'redactor'
	  }));
	  */

	  var UserEditFormController = (0, _reactRedux.connect)(function (state, props) {
	    return {
	      bio: state.bio,
	      access: state.access,
	      security: state.security,
	      contact: state.contact,
	      settings: state.settings,
	      accessPermissions: state.accessPermissions,
	      memo: state.memo,
	      data: state.data
	    };
	  })(UserEditForm);

	  //return;

	  ReactDOM.render(React.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    React.createElement(UserEditFormController, null)
	  ), document.getElementById('user-edit'));
	};

	exports.UserEdit = UserEdit;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Redux;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactRedux;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var UPDATE_USER = 'updateuser';
	var updateUser = function updateUser(user) {
	  return {
	    type: UPDATE_USER,
	    user: user
	  };
	};

	exports.UPDATE_USER = UPDATE_USER;
	exports.updateUser = updateUser;

	var ADD_USER = 'adduser';
	var addUser = function addUser(user) {
	  return {
	    type: ADD_USER,
	    user: user
	  };
	};

	exports.ADD_USER = ADD_USER;
	exports.addUser = addUser;

	var UPDATE_META = 'updatemeta';
	var updateMeta = function updateMeta(meta) {
	  return {
	    type: UPDATE_META,
	    meta: meta
	  };
	};

	exports.UPDATE_META = UPDATE_META;
	exports.updateMeta = updateMeta;

	var UPDATE_BIO = 'updatebio';
	var updateBio = function updateBio(bio) {
	  return {
	    type: UPDATE_BIO,
	    bio: bio
	  };
	};

	exports.UPDATE_BIO = UPDATE_BIO;
	exports.updateBio = updateBio;

	var UPDATE_STATUS = 'updatestatus';
	var updateStatus = function updateStatus(status) {
	  return {
	    type: UPDATE_STATUS,
	    status: status
	  };
	};

	exports.UPDATE_STATUS = UPDATE_STATUS;
	exports.updateStatus = updateStatus;

	var UPDATE_ACCESS = 'updateaccess';
	var updateAccess = function updateAccess(access) {
	  console.log('updateAccess');
	  return {
	    type: UPDATE_ACCESS,
	    access: access
	  };
	};

	exports.UPDATE_ACCESS = UPDATE_ACCESS;
	exports.updateAccess = updateAccess;

	var UPDATE_ACCESS_DATE = 'updateaccessdate';
	var updateAccessDate = function updateAccessDate(key, value) {
	  console.log('updateAccessDate', key, value);
	  return {
	    type: UPDATE_ACCESS_DATE,
	    value: value,
	    key: key
	  };
	};

	exports.UPDATE_ACCESS_DATE = UPDATE_ACCESS_DATE;
	exports.updateAccessDate = updateAccessDate;

	var UPDATE_SECURITY = 'updatesecurity';
	var updateSecurity = function updateSecurity(security) {
	  return {
	    type: UPDATE_SECURITY,
	    security: security
	  };
	};

	exports.UPDATE_SECURITY = UPDATE_SECURITY;
	exports.updateSecurity = updateSecurity;

	var UPDATE_CONTACT = 'updatecontact';
	var updateContact = function updateContact(contact) {
	  return {
	    type: UPDATE_CONTACT,
	    contact: contact
	  };
	};

	exports.UPDATE_CONTACT = UPDATE_CONTACT;
	exports.updateContact = updateContact;

	var NEW_SETTING = 'newsetting';
	var newSetting = function newSetting(setting) {
	  return {
	    type: NEW_SETTING,
	    setting: setting
	  };
	};

	exports.NEW_SETTING = NEW_SETTING;
	exports.newSetting = newSetting;

	var UPDATE_MEMO = 'updatememo';
	var updateMemo = function updateMemo(memo) {
	  return {
	    type: UPDATE_MEMO,
	    memo: memo
	  };
	};

	exports.UPDATE_MEMO = UPDATE_MEMO;
	exports.updateMemo = updateMemo;

	var ADD_USER_TO_USER_GROUP = 'addusertousergroup';
	var addUserToUserGroup = function addUserToUserGroup(userGroup, role) {
	  return {
	    type: ADD_USER_TO_USER_GROUP,
	    userGroup: userGroup,
	    role: role
	  };
	};

	exports.ADD_USER_TO_USER_GROUP = ADD_USER_TO_USER_GROUP;
	exports.addUserToUserGroup = addUserToUserGroup;

	var ADD_TEMPLATE = 'addtemplate';
	var addTemplate = function addTemplate(template) {
	  return {
	    type: ADD_TEMPLATE,
	    template: template
	  };
	};

	exports.ADD_TEMPLATE = ADD_TEMPLATE;
	exports.addTemplate = addTemplate;

	var ADD_NAMESPACE = 'addnamespace';
	var addNamespace = function addNamespace(namespace) {
	  console.log(namespace);
	  return {
	    type: ADD_NAMESPACE,
	    namespace: namespace
	  };
	};

	exports.ADD_NAMESPACE = ADD_NAMESPACE;
	exports.addNamespace = addNamespace;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redux = __webpack_require__(2);
	var createStore = redux.createStore;

	var reducers = __webpack_require__(6);

	var store = createStore(reducers.userReducer);

	module.exports = store;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var actions = __webpack_require__(4);
	var combineReducers = __webpack_require__(2).combineReducers;
	var update = __webpack_require__(7);

	var initialState = {
	  data: {
	    templates: [{
	      name: 'Base Template',
	      id: 0
	    }],
	    namespaces: [{
	      name: 'core',
	      value: 'core',
	      id: 0
	    }, {
	      name: 'ace',
	      value: 'ace',
	      id: 1
	    }, {
	      name: 'contentblocks',
	      value: 'contentblocks',
	      id: 2
	    }, {
	      name: 'redactor',
	      value: 'redactor',
	      id: 3
	    }, {
	      name: 'commerce',
	      value: 'commerce',
	      id: 4
	    }],
	    users: [{
	      name: 'jpdevries',
	      value: 'jpdevries',
	      id: 0
	    }],
	    userGroups: [{
	      name: 'Administrator',
	      value: 0,
	      id: 0
	    }, {
	      name: 'Editors',
	      value: 10,
	      id: 10
	    }],
	    languages: [{ "alpha2": "aa", "English": "Afar" }, { "alpha2": "ab", "English": "Abkhazian" }, { "alpha2": "ae", "English": "Avestan" }, { "alpha2": "af", "English": "Afrikaans" }, { "alpha2": "ak", "English": "Akan" }, { "alpha2": "am", "English": "Amharic" }, { "alpha2": "an", "English": "Aragonese" }, { "alpha2": "ar", "English": "Arabic" }, { "alpha2": "as", "English": "Assamese" }, { "alpha2": "av", "English": "Avaric" }, { "alpha2": "ay", "English": "Aymara" }, { "alpha2": "az", "English": "Azerbaijani" }, { "alpha2": "ba", "English": "Bashkir" }, { "alpha2": "be", "English": "Belarusian" }, { "alpha2": "bg", "English": "Bulgarian" }, { "alpha2": "bh", "English": "Bihari languages" }, { "alpha2": "bi", "English": "Bislama" }, { "alpha2": "bm", "English": "Bambara" }, { "alpha2": "bn", "English": "Bengali" }, { "alpha2": "bo", "English": "Tibetan" }, { "alpha2": "br", "English": "Breton" }, { "alpha2": "bs", "English": "Bosnian" }, { "alpha2": "ca", "English": "Catalan; Valencian" }, { "alpha2": "ce", "English": "Chechen" }, { "alpha2": "ch", "English": "Chamorro" }, { "alpha2": "co", "English": "Corsican" }, { "alpha2": "cr", "English": "Cree" }, { "alpha2": "cs", "English": "Czech" }, { "alpha2": "cu", "English": "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic" }, { "alpha2": "cv", "English": "Chuvash" }, { "alpha2": "cy", "English": "Welsh" }, { "alpha2": "da", "English": "Danish" }, { "alpha2": "de", "English": "German" }, { "alpha2": "dv", "English": "Divehi; Dhivehi; Maldivian" }, { "alpha2": "dz", "English": "Dzongkha" }, { "alpha2": "ee", "English": "Ewe" }, { "alpha2": "el", "English": "Greek, Modern (1453-)" }, { "alpha2": "en", "English": "English" }, { "alpha2": "eo", "English": "Esperanto" }, { "alpha2": "es", "English": "Spanish; Castilian" }, { "alpha2": "et", "English": "Estonian" }, { "alpha2": "eu", "English": "Basque" }, { "alpha2": "fa", "English": "Persian" }, { "alpha2": "ff", "English": "Fulah" }, { "alpha2": "fi", "English": "Finnish" }, { "alpha2": "fj", "English": "Fijian" }, { "alpha2": "fo", "English": "Faroese" }, { "alpha2": "fr", "English": "French" }, { "alpha2": "fy", "English": "Western Frisian" }, { "alpha2": "ga", "English": "Irish" }, { "alpha2": "gd", "English": "Gaelic; Scottish Gaelic" }, { "alpha2": "gl", "English": "Galician" }, { "alpha2": "gn", "English": "Guarani" }, { "alpha2": "gu", "English": "Gujarati" }, { "alpha2": "gv", "English": "Manx" }, { "alpha2": "ha", "English": "Hausa" }, { "alpha2": "he", "English": "Hebrew" }, { "alpha2": "hi", "English": "Hindi" }, { "alpha2": "ho", "English": "Hiri Motu" }, { "alpha2": "hr", "English": "Croatian" }, { "alpha2": "ht", "English": "Haitian; Haitian Creole" }, { "alpha2": "hu", "English": "Hungarian" }, { "alpha2": "hy", "English": "Armenian" }, { "alpha2": "hz", "English": "Herero" }, { "alpha2": "ia", "English": "Interlingua (International Auxiliary Language Association)" }, { "alpha2": "id", "English": "Indonesian" }, { "alpha2": "ie", "English": "Interlingue; Occidental" }, { "alpha2": "ig", "English": "Igbo" }, { "alpha2": "ii", "English": "Sichuan Yi; Nuosu" }, { "alpha2": "ik", "English": "Inupiaq" }, { "alpha2": "io", "English": "Ido" }, { "alpha2": "is", "English": "Icelandic" }, { "alpha2": "it", "English": "Italian" }, { "alpha2": "iu", "English": "Inuktitut" }, { "alpha2": "ja", "English": "Japanese" }, { "alpha2": "jv", "English": "Javanese" }, { "alpha2": "ka", "English": "Georgian" }, { "alpha2": "kg", "English": "Kongo" }, { "alpha2": "ki", "English": "Kikuyu; Gikuyu" }, { "alpha2": "kj", "English": "Kuanyama; Kwanyama" }, { "alpha2": "kk", "English": "Kazakh" }, { "alpha2": "kl", "English": "Kalaallisut; Greenlandic" }, { "alpha2": "km", "English": "Central Khmer" }, { "alpha2": "kn", "English": "Kannada" }, { "alpha2": "ko", "English": "Korean" }, { "alpha2": "kr", "English": "Kanuri" }, { "alpha2": "ks", "English": "Kashmiri" }, { "alpha2": "ku", "English": "Kurdish" }, { "alpha2": "kv", "English": "Komi" }, { "alpha2": "kw", "English": "Cornish" }, { "alpha2": "ky", "English": "Kirghiz; Kyrgyz" }, { "alpha2": "la", "English": "Latin" }, { "alpha2": "lb", "English": "Luxembourgish; Letzeburgesch" }, { "alpha2": "lg", "English": "Ganda" }, { "alpha2": "li", "English": "Limburgan; Limburger; Limburgish" }, { "alpha2": "ln", "English": "Lingala" }, { "alpha2": "lo", "English": "Lao" }, { "alpha2": "lt", "English": "Lithuanian" }, { "alpha2": "lu", "English": "Luba-Katanga" }, { "alpha2": "lv", "English": "Latvian" }, { "alpha2": "mg", "English": "Malagasy" }, { "alpha2": "mh", "English": "Marshallese" }, { "alpha2": "mi", "English": "Maori" }, { "alpha2": "mk", "English": "Macedonian" }, { "alpha2": "ml", "English": "Malayalam" }, { "alpha2": "mn", "English": "Mongolian" }, { "alpha2": "mr", "English": "Marathi" }, { "alpha2": "ms", "English": "Malay" }, { "alpha2": "mt", "English": "Maltese" }, { "alpha2": "my", "English": "Burmese" }, { "alpha2": "na", "English": "Nauru" }, { "alpha2": "nb", "English": "Bokmål, Norwegian; Norwegian Bokmål" }, { "alpha2": "nd", "English": "Ndebele, North; North Ndebele" }, { "alpha2": "ne", "English": "Nepali" }, { "alpha2": "ng", "English": "Ndonga" }, { "alpha2": "nl", "English": "Dutch; Flemish" }, { "alpha2": "nn", "English": "Norwegian Nynorsk; Nynorsk, Norwegian" }, { "alpha2": "no", "English": "Norwegian" }, { "alpha2": "nr", "English": "Ndebele, South; South Ndebele" }, { "alpha2": "nv", "English": "Navajo; Navaho" }, { "alpha2": "ny", "English": "Chichewa; Chewa; Nyanja" }, { "alpha2": "oc", "English": "Occitan (post 1500); Provençal" }, { "alpha2": "oj", "English": "Ojibwa" }, { "alpha2": "om", "English": "Oromo" }, { "alpha2": "or", "English": "Oriya" }, { "alpha2": "os", "English": "Ossetian; Ossetic" }, { "alpha2": "pa", "English": "Panjabi; Punjabi" }, { "alpha2": "pi", "English": "Pali" }, { "alpha2": "pl", "English": "Polish" }, { "alpha2": "ps", "English": "Pushto; Pashto" }, { "alpha2": "pt", "English": "Portuguese" }, { "alpha2": "qu", "English": "Quechua" }, { "alpha2": "rm", "English": "Romansh" }, { "alpha2": "rn", "English": "Rundi" }, { "alpha2": "ro", "English": "Romanian; Moldavian; Moldovan" }, { "alpha2": "ru", "English": "Russian" }, { "alpha2": "rw", "English": "Kinyarwanda" }, { "alpha2": "sa", "English": "Sanskrit" }, { "alpha2": "sc", "English": "Sardinian" }, { "alpha2": "sd", "English": "Sindhi" }, { "alpha2": "se", "English": "Northern Sami" }, { "alpha2": "sg", "English": "Sango" }, { "alpha2": "si", "English": "Sinhala; Sinhalese" }, { "alpha2": "sk", "English": "Slovak" }, { "alpha2": "sl", "English": "Slovenian" }, { "alpha2": "sm", "English": "Samoan" }, { "alpha2": "sn", "English": "Shona" }, { "alpha2": "so", "English": "Somali" }, { "alpha2": "sq", "English": "Albanian" }, { "alpha2": "sr", "English": "Serbian" }, { "alpha2": "ss", "English": "Swati" }, { "alpha2": "st", "English": "Sotho, Southern" }, { "alpha2": "su", "English": "Sundanese" }, { "alpha2": "sv", "English": "Swedish" }, { "alpha2": "sw", "English": "Swahili" }, { "alpha2": "ta", "English": "Tamil" }, { "alpha2": "te", "English": "Telugu" }, { "alpha2": "tg", "English": "Tajik" }, { "alpha2": "th", "English": "Thai" }, { "alpha2": "ti", "English": "Tigrinya" }, { "alpha2": "tk", "English": "Turkmen" }, { "alpha2": "tl", "English": "Tagalog" }, { "alpha2": "tn", "English": "Tswana" }, { "alpha2": "to", "English": "Tonga (Tonga Islands)" }, { "alpha2": "tr", "English": "Turkish" }, { "alpha2": "ts", "English": "Tsonga" }, { "alpha2": "tt", "English": "Tatar" }, { "alpha2": "tw", "English": "Twi" }, { "alpha2": "ty", "English": "Tahitian" }, { "alpha2": "ug", "English": "Uighur; Uyghur" }, { "alpha2": "uk", "English": "Ukrainian" }, { "alpha2": "ur", "English": "Urdu" }, { "alpha2": "uz", "English": "Uzbek" }, { "alpha2": "ve", "English": "Venda" }, { "alpha2": "vi", "English": "Vietnamese" }, { "alpha2": "vo", "English": "Volapük" }, { "alpha2": "wa", "English": "Walloon" }, { "alpha2": "wo", "English": "Wolof" }, { "alpha2": "xh", "English": "Xhosa" }, { "alpha2": "yi", "English": "Yiddish" }, { "alpha2": "yo", "English": "Yoruba" }, { "alpha2": "za", "English": "Zhuang; Chuang" }, { "alpha2": "zh", "English": "Chinese" }, { "alpha2": "zu", "English": "Zulu" }]
	  },
	  bio: {
	    username: '',
	    givenName: '',
	    familyName: '',
	    url: '',
	    photo: '',
	    bday: '',
	    gender: ''
	  },
	  contact: {
	    email: '',
	    phone: {
	      mobile: '',
	      fax: ''
	    },
	    streetAddress: '',
	    locality: '',
	    region: '',
	    postalCode: '',
	    country: ''
	  },
	  access: {
	    active: true,
	    sudo: false,
	    blocked: false,
	    blockedUntil: undefined,
	    blockedAfter: undefined,
	    numLogins: 0,
	    lastLogin: undefined,
	    failedLogins: 0,
	    classKey: 'modUser',
	    newPassword: false
	  },
	  security: {
	    passwordNotify: 'screen',
	    passwordGenerateMethod: 'modx'
	  },
	  settings: [{
	    name: 'Theme',
	    key: 'theme',
	    value: 'monkia',
	    lastModified: new Date()
	  }],
	  accessPermissions: {
	    userGroups: [{
	      name: 'Administrator',
	      id: 0,
	      rank: 0,
	      role: 'Super User'
	    }]
	  },
	  memo: {
	    note: ''
	  }
	};

	var bioReducer = function bioReducer(state, action) {
	  state = state || initialState.bio;
	  switch (action.type) {
	    case actions.UPDATE_BIO:
	      return Object.assign({}, state, action.bio);
	      break;
	  }
	  return state;
	};

	var accessReducer = function accessReducer(state, action) {
	  //console.log(action,actions.UPDATE_ACCESS_DATE);
	  state = state || initialState.access;
	  switch (action.type) {
	    case actions.UPDATE_ACCESS:
	      return Object.assign({}, state, action.access);
	      break;

	    case actions.UPDATE_ACCESS_DATE:
	      var timestamp = Date.parse(action.value);
	      if (isNaN(timestamp)) break;

	      return update(state, { $merge: _defineProperty({}, action.key, timestamp) });
	      break;
	  }
	  return state;
	};

	var securityReducer = function securityReducer(state, action) {
	  state = state || initialState.security;
	  switch (action.type) {
	    case actions.UPDATE_SECURITY:
	      return Object.assign({}, state, action.security);
	      break;
	  }
	  return state;
	};

	var contactReducer = function contactReducer(state, action) {
	  state = state || initialState.contact;
	  switch (action.type) {
	    case actions.UPDATE_CONTACT:
	      return Object.assign({}, state, action.contact);
	      break;
	  }
	  return state;
	};

	var settingsReducer = function settingsReducer(state, action) {
	  state = state || initialState.settings;
	  switch (action.type) {
	    case actions.NEW_SETTING:
	      return update(state, { $push: [update(action.setting, { $merge: { lastModified: new Date() } })] });
	      break;
	  }
	  return state;
	};

	var accessPermissionsReducer = function accessPermissionsReducer(state, action) {
	  state = state || initialState.accessPermissions;
	  var userGroups = state.userGroups;
	  switch (action.type) {
	    case actions.UPDATE_ACCESS_PERMISSIONS:

	      break;

	    case actions.ADD_USER_TO_USER_GROUP:

	      for (var i = 0; i < userGroups.length; i++) {
	        var userGroup = userGroups[i];
	        if (userGroup.name == action.userGroup && userGroup.role == action.role) return state;
	      }

	      return update(state, { $merge: { userGroups: // consider breaking this out into an accessPermissionsUserGroupsReducer, nested syntax is confusing
	          update(userGroups, { $push: [{
	              name: action.userGroup,
	              id: 0,
	              rank: 0,
	              role: action.role
	            }]
	          })
	        } });
	      break;
	  }
	  return state;
	};

	var memoReducer = function memoReducer(state, action) {
	  state = state || initialState.memo;
	  switch (action.type) {
	    case actions.UPDATE_MEMO:
	      return update(state, { $set: {
	          note: action.memo
	        } });
	      break;
	  }
	  return state;
	};

	var templateReducer = function templateReducer(state, action) {
	  state = state || initialState.data.templates;

	  switch (action.type) {
	    case actions.ADD_TEMPLATE:
	      return update(state, { $push: [action.template] });
	      break;
	  }

	  return state;
	};

	var namespaceReducer = function namespaceReducer(state, action) {
	  state = state || initialState.data.namespaces;
	  switch (action.type) {
	    case actions.ADD_NAMESPACE:
	      return update(state, { $push: [action.namespace] });
	  }

	  return state;
	};

	var usersReducer = function usersReducer(state, action) {
	  state = state || initialState.data.users;
	  switch (action.type) {
	    case actions.ADD_USER:
	      return update(state, { $push: [action.user] });
	  }

	  return state;
	};

	var userGroupsReducer = function userGroupsReducer(state, action) {
	  state = state || initialState.data.userGroups;
	  switch (action.type) {
	    case actions.ADD_USER_GROUP:
	      break;
	  }

	  return state;
	};

	var languagesReducer = function languagesReducer(state, action) {
	  state = state || initialState.data.languages;

	  return state;
	};

	var dataReducer = combineReducers({
	  templates: templateReducer,
	  namespaces: namespaceReducer,
	  users: usersReducer,
	  userGroups: userGroupsReducer,
	  languages: languagesReducer
	});

	var userReducer = combineReducers({
	  bio: bioReducer,
	  access: accessReducer,
	  security: securityReducer,
	  contact: contactReducer,
	  settings: settingsReducer,
	  accessPermissions: accessPermissionsReducer,
	  memo: memoReducer,
	  data: dataReducer
	});

	exports.userReducer = userReducer;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule update
	 */

	/* global hasOwnProperty:true */

	'use strict';

	var _assign = __webpack_require__(10);

	var keyOf = __webpack_require__(11);
	var invariant = __webpack_require__(12);
	var hasOwnProperty = {}.hasOwnProperty;

	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return _assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}

	var COMMAND_PUSH = keyOf({ $push: null });
	var COMMAND_UNSHIFT = keyOf({ $unshift: null });
	var COMMAND_SPLICE = keyOf({ $splice: null });
	var COMMAND_SET = keyOf({ $set: null });
	var COMMAND_MERGE = keyOf({ $merge: null });
	var COMMAND_APPLY = keyOf({ $apply: null });

	var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];

	var ALL_COMMANDS_SET = {};

	ALL_COMMANDS_LIST.forEach(function (command) {
	  ALL_COMMANDS_SET[command] = true;
	});

	function invariantArrayCase(value, spec, command) {
	  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(false) : void 0;
	  var specValue = spec[command];
	  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(false) : void 0;
	}

	/**
	 * Returns a updated shallow copy of an object without mutating the original.
	 * See https://facebook.github.io/react/docs/update.html for details.
	 */
	function update(value, spec) {
	  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(false) : void 0;

	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(false) : void 0;

	    return spec[COMMAND_SET];
	  }

	  var nextValue = shallowCopy(value);

	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(false) : void 0;
	    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(false) : void 0;
	    _assign(nextValue, spec[COMMAND_MERGE]);
	  }

	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function (item) {
	      nextValue.push(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function (item) {
	      nextValue.unshift(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(false) : void 0;
	    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : void 0;
	    spec[COMMAND_SPLICE].forEach(function (args) {
	      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : void 0;
	      nextValue.splice.apply(nextValue, args);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : void 0;
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }

	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }

	  return nextValue;
	}

	module.exports = update;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function (oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var actions = __webpack_require__(4);
	var store = __webpack_require__(5);

	var Select = __webpack_require__(14);
	var CountrySelect = __webpack_require__(15);
	var ContextSelect = __webpack_require__(16);
	var ContactFieldset = __webpack_require__(17);
	var TemplateSelect = __webpack_require__(18);
	var LanguageSelect = __webpack_require__(19);

	var GeneralInformationFieldset = function GeneralInformationFieldset(props) {

	  var handleGenderChange = function handleGenderChange(event) {
	    store.dispatch(actions.updateBio({
	      gender: event.target.value
	    }));
	  };

	  return React.createElement(
	    'fieldset',
	    null,
	    React.createElement(
	      'legend',
	      null,
	      'General Information'
	    ),
	    React.createElement(
	      'div',
	      { className: 'n field-group' },
	      React.createElement(
	        'div',
	        { className: 'field-username' },
	        React.createElement(
	          'label',
	          { 'for': 'username' },
	          'Username'
	        ),
	        React.createElement('input', { type: 'text', className: 'nickname', value: props.bio.username, required: true, onChange: function onChange(event) {
	            return store.dispatch(actions.updateBio({
	              username: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-given-name' },
	        React.createElement(
	          'label',
	          { 'for': 'given-name' },
	          'First Name'
	        ),
	        React.createElement('input', { type: 'text', className: 'given-name', onChange: function onChange(event) {
	            return store.dispatch(actions.updateBio({
	              givenName: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-family-name' },
	        React.createElement(
	          'label',
	          { 'for': 'family-name' },
	          'Last Name'
	        ),
	        React.createElement('input', { type: 'text', className: 'family-name', onChange: function onChange(event) {
	            return store.dispatch(actions.updateBio({
	              familyName: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-email' },
	        React.createElement(
	          'label',
	          { 'for': 'email' },
	          'Email'
	        ),
	        React.createElement('input', { type: 'email', className: 'email', required: true, onChange: function onChange(event) {
	            return store.dispatch(actions.updateContact({
	              email: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-website' },
	        React.createElement(
	          'label',
	          { 'for': 'website' },
	          'Website'
	        ),
	        React.createElement('input', { type: 'url', name: 'website', className: 'url', onChange: function onChange(event) {
	            return store.dispatch(actions.updateBio({
	              website: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-gravatar' },
	        React.createElement(
	          'label',
	          { 'for': 'gravatar' },
	          'Gravatar'
	        ),
	        React.createElement('input', { type: 'text', name: 'gravatar', className: 'photo', onChange: function onChange(event) {
	            return store.dispatch(actions.updateBio({
	              gravatar: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-bday' },
	        React.createElement(
	          'label',
	          { 'for': 'bday' },
	          'Date of birth'
	        ),
	        React.createElement('input', { type: 'date', name: 'bday', className: 'bday', onChange: function onChange(event) {
	            return store.dispatch(actions.updateBio({
	              bday: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-gender' },
	        React.createElement(
	          'label',
	          { 'for': 'gender' },
	          'Gender'
	        ),
	        React.createElement('input', { type: 'radio', checked: props.bio.gender == "", name: 'gender', value: '', onChange: handleGenderChange }),
	        ' Unspecified',
	        React.createElement('br', null),
	        React.createElement('input', { type: 'radio', checked: props.bio.gender == "man", name: 'gender', value: 'man', onChange: handleGenderChange }),
	        ' Man',
	        React.createElement('br', null),
	        React.createElement('input', { type: 'radio', checked: props.bio.gender == "woman", name: 'gender', value: 'woman', onChange: handleGenderChange }),
	        ' Woman',
	        React.createElement('br', null),
	        React.createElement('input', { type: 'radio', checked: props.bio.gender == "trans", name: 'gender', value: 'trans', onChange: handleGenderChange }),
	        ' Trans',
	        React.createElement('br', null),
	        React.createElement('input', { type: 'radio', checked: props.bio.gender !== "" && props.bio.gender !== "man" && props.bio.gender !== "woman" && props.bio.gender !== "trans", name: 'gender', value: 'other', onChange: handleGenderChange }),
	        ' ',
	        React.createElement('input', { type: 'text', name: 'gender_other', placeholder: 'Other', onChange: handleGenderChange }),
	        React.createElement('br', null)
	      )
	    )
	  );
	};

	var AccessFieldset = React.createClass({
	  displayName: 'AccessFieldset',

	  getInitialState: function getInitialState() {
	    return {
	      newPassword: false
	    };
	  },
	  render: function render() {
	    var _this = this;

	    var props = this.props,
	        newPassword;

	    var handlePasswordNotificationMethodChange = function handlePasswordNotificationMethodChange(event) {
	      store.dispatch(actions.updateSecurity({
	        passwordNotify: event.target.value
	      }));
	    };

	    var handlePassworMethodChange = function handlePassworMethodChange(event) {
	      store.dispatch(actions.updateSecurity({
	        passwordGenerateMethod: event.target.value
	      }));
	    };

	    if (this.state.newPassword) {
	      newPassword = React.createElement(
	        'div',
	        { style: { marginRight: "1em" } },
	        React.createElement(
	          'h4',
	          null,
	          'Password Notification Method:'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'pw-notify' },
	          React.createElement('input', { type: 'radio', checked: props.security.passwordNotify == "email", value: 'email', name: 'pw-notify', onChange: handlePasswordNotificationMethodChange }),
	          '  Send the new password by email.'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'pw-notify' },
	          React.createElement('input', { type: 'radio', checked: props.security.passwordNotify !== "email", value: 'screen', name: 'pw-notify', onChange: handlePasswordNotificationMethodChange }),
	          '  Show the new password on screen.'
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'New Password Method:'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'new-pw' },
	          React.createElement('input', { type: 'radio', checked: props.security.passwordGenerateMethod == "modx", value: 'modx', name: 'new-pw', onChange: handlePassworMethodChange }),
	          '  Let MODX generate a password.'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'new-pw' },
	          React.createElement('input', { type: 'radio', checked: props.security.passwordGenerateMethod !== "modx", value: 'user', name: 'new-pw', onChange: handlePassworMethodChange }),
	          '  Let me specify a password.'
	        )
	      );
	    }

	    return React.createElement(
	      'fieldset',
	      null,
	      React.createElement(
	        'legend',
	        null,
	        'Access'
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-active' },
	        React.createElement(
	          'label',
	          { 'for': 'active' },
	          React.createElement('input', { type: 'checkbox', name: 'active', checked: props.access.active, value: props.access.active, onChange: function onChange(event) {
	              return store.dispatch(actions.updateAccess({
	                active: event.target.checked
	              }));
	            } }),
	          ' Active'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-sudo' },
	        React.createElement(
	          'label',
	          { 'for': 'sudo' },
	          React.createElement('input', { type: 'checkbox', name: 'sudo', checked: props.access.sudo, value: props.access.sudo, onChange: function onChange(event) {
	              return store.dispatch(actions.updateAccess({
	                sudo: event.target.checked
	              }));
	            } }),
	          ' Sudo User'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-blocked' },
	        React.createElement(
	          'label',
	          { 'for': 'blocked' },
	          React.createElement('input', { type: 'checkbox', name: 'blocked', checked: props.access.blocked, value: props.access.blocked, onChange: function onChange(event) {
	              return store.dispatch(actions.updateAccess({
	                blocked: event.target.checked
	              }));
	            } }),
	          ' Blocked'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-group' },
	        React.createElement(
	          'fieldset',
	          { className: 'field-new-password' },
	          React.createElement(
	            'legend',
	            null,
	            'Password'
	          ),
	          React.createElement(
	            'label',
	            { 'for': 'new-password' },
	            React.createElement('input', { type: 'checkbox', name: 'new-password', value: this.state.newPassword, onChange: function onChange(event) {
	                return _this.setState({
	                  newPassword: event.target.checked
	                });
	              } }),
	            ' New Password'
	          ),
	          newPassword
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-blocked-until' },
	        React.createElement(
	          'label',
	          { 'for': 'blocked-until' },
	          'Blocked Until'
	        ),
	        React.createElement('input', { type: 'date', name: 'blocked-until', placeholder: props.access.blockedUntil, onChange: function onChange(event) {
	            store.dispatch(actions.updateAccessDate('blockedUntil', event.target.value));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-blocked-after' },
	        React.createElement(
	          'label',
	          { 'for': 'blocked-after' },
	          'Blocked After'
	        ),
	        React.createElement('input', { type: 'date', name: 'blocked-after', placeholder: props.access.blockedAfter, onChange: function onChange(event) {
	            return store.dispatch(actions.updateAccessDate('blockedAfter', event.target.value));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-num-logins' },
	        React.createElement(
	          'label',
	          { 'for': 'num-logins' },
	          'Number of Logins'
	        ),
	        React.createElement('input', { type: 'text', className: 'selfless', name: 'num-logins', value: props.access.numLogins, readonly: true })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-last-login' },
	        React.createElement(
	          'label',
	          { 'for': 'last-login' },
	          'Last Login'
	        ),
	        React.createElement('input', { type: 'date', name: 'last-login', value: props.access.lastLogin, readonly: true })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-failed-logins' },
	        React.createElement(
	          'label',
	          { 'for': 'failed-logins', className: 'failed-logins' },
	          'Failed Logins'
	        ),
	        React.createElement('input', { type: 'text', name: 'failed-logins', readonly: true, value: props.access.failedLogins })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-class-key' },
	        React.createElement(
	          'label',
	          { 'for': 'class-key' },
	          'Class Key'
	        ),
	        React.createElement(
	          'select',
	          { name: 'class-key', defaultValue: props.access.classKey, onChange: function onChange(event) {
	              return store.dispatch(actions.updateAccess({
	                classKey: event.target.value
	              }));
	            } },
	          React.createElement(
	            'option',
	            { value: 'modUser', checked: true },
	            'modUser'
	          )
	        )
	      )
	    );
	  }
	});

	var AccessPermisssionFieldset = React.createClass({
	  displayName: 'AccessPermisssionFieldset',

	  getInitialState: function getInitialState() {
	    return {
	      addUserToGroup: this.props.addUserToGroup || false,
	      disableAddUserToGroupButton: false
	    };
	  },
	  render: function render() {
	    var _this2 = this;

	    var addUserToGroupMarkup,
	        addUserGroupButton,
	        props = this.props;

	    if (this.state.showAddUserToGroup) {
	      var addUserToGroupButton = React.createElement(
	        'button',
	        { disabled: this.state.disableAddUserToGroupButton, onClick: function onClick(event) {
	            event.preventDefault();
	            store.dispatch(actions.addUserToUserGroup(_this2.refs.addUserToGroupGroup.value, _this2.refs.addUserToGroupRole.value));
	            _this2.setState({ showAddUserToGroup: false, disableAddUserToGroupButton: true });
	          } },
	        'Add User to Group'
	      );
	      addUserToGroupMarkup = React.createElement(
	        'fieldset',
	        null,
	        React.createElement(
	          'legend',
	          null,
	          'Add User to Group'
	        ),
	        React.createElement(
	          'div',
	          { className: 'field-add-user-to-group' },
	          React.createElement(
	            'label',
	            { 'for': 'add-user-to-group' },
	            'User Group'
	          ),
	          React.createElement(
	            'select',
	            { ref: 'addUserToGroupGroup', name: 'add-user-to-group' },
	            React.createElement(
	              'option',
	              { value: 'Administrator' },
	              'Administrator'
	            ),
	            React.createElement(
	              'option',
	              { value: 'Editors' },
	              'Editors'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'field-add-user-role' },
	          React.createElement(
	            'label',
	            { 'for': 'add-user-role' },
	            'Use Role'
	          ),
	          React.createElement(
	            'select',
	            { ref: 'addUserToGroupRole', name: 'add-user-role' },
	            React.createElement(
	              'option',
	              { value: 'Super User' },
	              'Super User'
	            ),
	            React.createElement(
	              'option',
	              { value: 'Editor' },
	              'Editor'
	            )
	          )
	        ),
	        addUserToGroupButton
	      );
	    } else {
	      addUserGroupButton = React.createElement(
	        'button',
	        { id: 'add-user-to-group', onClick: function onClick(event) {
	            event.preventDefault();
	            _this2.setState({ showAddUserToGroup: true, disableAddUserToGroupButton: false });
	          }, style: { marginBottom: "1em" } },
	        'Add User to Group'
	      );
	    }

	    var trGroups = this.props.accessPermissions.userGroups.map(function (group, index) {
	      return React.createElement(
	        'tr',
	        { key: index },
	        React.createElement(
	          'td',
	          null,
	          group.name
	        ),
	        React.createElement(
	          'td',
	          null,
	          group.role
	        ),
	        React.createElement(
	          'td',
	          null,
	          group.rank
	        )
	      );
	    });

	    return React.createElement(
	      'fieldset',
	      null,
	      React.createElement(
	        'legend',
	        null,
	        'Access Permissions'
	      ),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'p',
	          null,
	          'Here you can select which User Groups this user belongs to. You can drag and drop each row to reorder the rank of each User Group. The User Group that has a rank of 0 will be declared the User\'s Primary Group, and will be the User Group that determines the User\'s Dashboard.'
	        ),
	        React.createElement('hr', null)
	      ),
	      addUserGroupButton,
	      addUserToGroupMarkup,
	      React.createElement(
	        'table',
	        null,
	        React.createElement(
	          'thead',
	          null,
	          React.createElement(
	            'tr',
	            null,
	            React.createElement(
	              'th',
	              null,
	              'User Group'
	            ),
	            React.createElement(
	              'th',
	              null,
	              'Role'
	            ),
	            React.createElement(
	              'th',
	              null,
	              'Rank'
	            )
	          )
	        ),
	        React.createElement(
	          'tbody',
	          null,
	          trGroups
	        )
	      )
	    );
	  }
	});

	var ButtonBar = function ButtonBar(props) {
	  return React.createElement(
	    'div',
	    { className: 'button-bar' },
	    React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'button',
	        { disabled: !props.save, type: 'submit' },
	        'Save'
	      )
	    ),
	    React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'button',
	        { formaction: '/resource/duplicate' },
	        'Duplicate'
	      )
	    ),
	    React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'button',
	        null,
	        'Delete'
	      )
	    )
	  );
	};

	var UserSettingsFieldset = function UserSettingsFieldset(props) {};

	var CreateUserSettingFieldset = React.createClass({
	  displayName: 'CreateUserSettingFieldset',

	  getInitialState: function getInitialState() {
	    return {
	      creatingSetting: false,
	      disableCreateSettingButton: true,
	      fieldType: 'textarea'
	    };
	  },
	  handleCreateSettingKeyNameChange: function handleCreateSettingKeyNameChange(event) {
	    this.setState({ disableCreateSettingButton: !(this.refs.settingKey.value && this.refs.settingName.value) });
	  },
	  render: function render() {
	    var _this3 = this;

	    //if(!this.props.creatingSetting) return;

	    var createSettingButton = React.createElement(
	      'button',
	      { style: { marginTop: "1em" }, disabled: this.state.disableCreateSettingButton, type: 'submit', onClick: function onClick(event) {
	          event.preventDefault();
	          console.log(_this3.refs.settingSettingValue, _this3.refs.settingSettingValue.value);
	          store.dispatch(actions.newSetting({
	            key: _this3.refs.settingKey.value,
	            name: _this3.refs.settingName.value,
	            description: _this3.refs.settingDescription.value,
	            fieldType: _this3.refs.settingFieldType.value,
	            lexiconEntry: _this3.refs.settingLexiconEntry.value,
	            value: function () {
	              try {
	                return _this3.refs.settingSettingValue.state.value;
	              } catch (e) {}
	              return _this3.refs.settingSettingValue.value;
	            }()
	          }));

	          _this3.setState({ creatingSetting: false, disableCreateSettingButton: true }); // todo: async don't close until server confirms setting is added
	          _this3.props.handleSettingCreated();
	        } },
	      'Create Setting'
	    );

	    var settingValue = function () {
	      var ref = "settingSettingValue",
	          name = "setting-value";

	      switch (_this3.state.fieldType) {
	        case 'textarea':
	          return React.createElement('textarea', { ref: ref, name: name });
	          break;

	        case 'boolean':
	          return React.createElement('input', { type: 'checkbox', ref: ref, name: name, defaultChecked: true });
	          break;

	        case 'country':
	          return React.createElement(CountrySelect, { ref: ref, name: name, defaultValue: 'US' });

	        case 'context':
	          return React.createElement(ContextSelect, { ref: ref, name: name, defaultValue: '0' });

	        case 'password':
	          return React.createElement('input', { type: 'password', ref: ref, name: name });
	          break;

	        case 'template':
	          return React.createElement(Select, { ref: ref, name: name, defaultValue: '0', options: _this3.props.data.templates });
	          break;

	        case 'namespace':
	          return React.createElement(Select, { ref: ref, name: name, defaultValue: 'core', options: _this3.props.data.namespaces });

	        case 'user':
	          return React.createElement(Select, { ref: ref, name: name, defaultValue: '', options: _this3.props.data.users });

	        case 'user-group':
	          return React.createElement(Select, { ref: ref, name: name, defaultValue: '', options: _this3.props.data.userGroups });

	        case 'language':
	          return React.createElement(LanguageSelect, { ref: ref, name: name, className: "language-select", options: _this3.props.data.languages.map(function (language) {
	              return {
	                name: language.English,
	                value: language.alpha2
	              };
	            }), defaultValue: 'en' });

	        default:
	          return React.createElement('input', { type: 'text', ref: ref, name: name });
	          break;
	      }
	    }();

	    return React.createElement(
	      'fieldset',
	      null,
	      React.createElement(
	        'legend',
	        null,
	        'Create User Setting'
	      ),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'label',
	            { 'for': 'setting-key' },
	            'Key'
	          ),
	          React.createElement('input', { type: 'text', ref: 'settingKey', name: 'setting-key', onChange: this.handleCreateSettingKeyNameChange })
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'label',
	            { 'for': 'setting-name' },
	            'Name'
	          ),
	          React.createElement('input', { type: 'text', ref: 'settingName', name: 'setting-name', onChange: this.handleCreateSettingKeyNameChange })
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'label',
	            { 'for': 'setting-description' },
	            'Description'
	          ),
	          React.createElement('textarea', { ref: 'settingDescription', name: 'setting-description', rows: '2' })
	        )
	      ),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'label',
	            { 'for': 'setting-field-type' },
	            'Field Type'
	          ),
	          React.createElement(
	            'select',
	            { defaultValue: this.state.fieldType, ref: 'settingFieldType', name: 'setting-field-type', onChange: function onChange(event) {
	                return _this3.setState({ fieldType: event.target.value });
	              } },
	            React.createElement(
	              'option',
	              { value: 'textfield' },
	              'Textfield'
	            ),
	            React.createElement(
	              'option',
	              { value: 'textarea' },
	              'Textarea'
	            ),
	            React.createElement(
	              'option',
	              { value: 'boolean' },
	              'Yes/No'
	            ),
	            React.createElement(
	              'option',
	              { value: 'password' },
	              'Password'
	            ),
	            React.createElement(
	              'option',
	              { value: 'category' },
	              'Category'
	            ),
	            React.createElement(
	              'option',
	              { value: 'charset' },
	              'Charset'
	            ),
	            React.createElement(
	              'option',
	              { value: 'country' },
	              'Country'
	            ),
	            React.createElement(
	              'option',
	              { value: 'context' },
	              'Context'
	            ),
	            React.createElement(
	              'option',
	              { value: 'country' },
	              'Country'
	            ),
	            React.createElement(
	              'option',
	              { value: 'context' },
	              'Context'
	            ),
	            React.createElement(
	              'option',
	              { value: 'namespace' },
	              'Namespace'
	            ),
	            React.createElement(
	              'option',
	              { value: 'template' },
	              'Template'
	            ),
	            React.createElement(
	              'option',
	              { value: 'user' },
	              'User'
	            ),
	            React.createElement(
	              'option',
	              { value: 'user-group' },
	              'User Group'
	            ),
	            React.createElement(
	              'option',
	              { value: 'language' },
	              'Language'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'label',
	            { 'for': 'setting-namespace' },
	            'Namespace'
	          ),
	          React.createElement(Select, { ref: 'settingNamespace', name: 'setting-namespace', defaultValue: 'core', options: this.props.data.namespaces })
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'label',
	            { 'for': 'lexicon-entry' },
	            'Area Lexicon Entry'
	          ),
	          React.createElement('input', { ref: 'settingLexiconEntry', type: 'text', name: 'lexicon-entry' })
	        )
	      ),
	      React.createElement(
	        'footer',
	        null,
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'label',
	            { 'for': 'setting-value' },
	            'Value'
	          ),
	          settingValue
	        ),
	        createSettingButton
	      )
	    );
	  }
	});

	var UserSettingsFieldset = React.createClass({
	  displayName: 'UserSettingsFieldset',

	  getInitialState: function getInitialState() {
	    return {
	      creatingSetting: false,
	      disableCreateSettingButton: true
	    };
	  },
	  render: function render() {
	    var _this4 = this;

	    var settings = this.props.settings,
	        trSettings;

	    var trSettings = settings.map(function (setting, index) {
	      return React.createElement(
	        'tr',
	        { key: index },
	        React.createElement(
	          'td',
	          null,
	          setting.name
	        ),
	        React.createElement(
	          'td',
	          null,
	          setting.key
	        ),
	        React.createElement(
	          'td',
	          null,
	          setting.value
	        ),
	        React.createElement(
	          'td',
	          null,
	          setting.lastModified.toLocaleDateString()
	        )
	      );
	    });

	    var createNewSettingButton, createSettingButton, createUserSettingFieldset;
	    if (!this.state.creatingSetting) {
	      createNewSettingButton = React.createElement(
	        'button',
	        { id: 'create-new-setting', style: { marginBottom: "1em" }, onClick: function onClick(event) {
	            event.preventDefault();
	            _this4.setState({ creatingSetting: true });
	          } },
	        'Create New Setting'
	      );
	    } else {
	      createUserSettingFieldset = React.createElement(CreateUserSettingFieldset, { data: this.props.data, handleSettingCreated: function handleSettingCreated() {
	          _this4.setState({ creatingSetting: false, disableCreateSettingButton: true });
	        } });
	    }

	    return React.createElement(
	      'fieldset',
	      null,
	      React.createElement(
	        'legend',
	        null,
	        'User Settings'
	      ),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'p',
	          null,
	          'Here you can manage specifc settings for the user.'
	        ),
	        React.createElement('hr', null),
	        createNewSettingButton,
	        createUserSettingFieldset,
	        React.createElement(
	          'table',
	          null,
	          React.createElement(
	            'thead',
	            null,
	            React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'th',
	                null,
	                'Name'
	              ),
	              React.createElement(
	                'th',
	                null,
	                'Key'
	              ),
	              React.createElement(
	                'th',
	                null,
	                'Value'
	              ),
	              React.createElement(
	                'th',
	                null,
	                'Last Modified'
	              )
	            )
	          ),
	          React.createElement(
	            'tbody',
	            null,
	            trSettings
	          )
	        )
	      )
	    );
	  }
	});

	var MemoFieldset = function MemoFieldset(props) {
	  return React.createElement(
	    'fieldset',
	    null,
	    React.createElement(
	      'legend',
	      null,
	      'Memo'
	    ),
	    React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'field-comment' },
	        React.createElement(
	          'label',
	          { 'for': 'field-comment' },
	          'Comment'
	        ),
	        React.createElement('textarea', { name: 'comment', rows: '3', className: 'note', value: props.memo.note, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMemo(event.target.value));
	          } })
	      )
	    )
	  );
	};

	var UserEditForm = React.createClass({
	  displayName: 'UserEditForm',

	  render: function render() {
	    var allowSave = this.props.bio.username.length && this.props.contact.email.length;

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        'User: ',
	        this.props.bio.username
	      ),
	      React.createElement(
	        'form',
	        { action: '#', className: 'vcard' },
	        React.createElement(ButtonBar, { save: allowSave }),
	        React.createElement(GeneralInformationFieldset, { bio: this.props.bio }),
	        React.createElement(AccessFieldset, { access: this.props.access, security: this.props.security }),
	        React.createElement(ContactFieldset, { contact: this.props.contact }),
	        React.createElement(UserSettingsFieldset, { settings: this.props.settings, data: this.props.data }),
	        React.createElement(AccessPermisssionFieldset, { accessPermissions: this.props.accessPermissions }),
	        React.createElement(MemoFieldset, { memo: this.props.memo }),
	        React.createElement(
	          'footer',
	          null,
	          React.createElement(ButtonBar, { save: allowSave })
	        )
	      )
	    );
	  }
	});

	module.exports = UserEditForm;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = function (_React$Component) {
	  _inherits(Select, _React$Component);

	  function Select(props) {
	    _classCallCheck(this, Select);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, props));

	    _this.state = { options: props.options, value: props.defaultValue };
	    return _this;
	  }

	  _createClass(Select, [{
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      var optionsMarkup = this.state.options.map(function (option) {
	        return React.createElement(
	          "option",
	          { value: option.value, key: option.value },
	          option.name
	        );
	      });

	      return React.createElement(
	        "select",
	        _extends({}, this.props, { onChange: function onChange(event) {
	            _this2.setState({ value: event.target.value });
	            if (_this2.props.onChange) _this2.props.onChange(event);
	          } }),
	        optionsMarkup
	      );
	    }
	  }]);

	  return Select;
	}(React.Component);

	Select.propTypes = { options: React.PropTypes.array };
	Select.defaultProps = {
	  options: []
	};

	module.exports = Select;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = __webpack_require__(14);

	var CountrySelect = function (_Select) {
	  _inherits(CountrySelect, _Select);

	  function CountrySelect(props) {
	    _classCallCheck(this, CountrySelect);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(CountrySelect).call(this, props));
	  }

	  return CountrySelect;
	}(Select);

	CountrySelect.propTypes = { options: React.PropTypes.array };
	CountrySelect.defaultProps = {
	  options: [{ "value": "BD", "name": "Bangladesh" }, { "value": "BE", "name": "Belgium" }, { "value": "BF", "name": "Burkina Faso" }, { "value": "BG", "name": "Bulgaria" }, { "value": "BA", "name": "Bosnia and Herzegovina" }, { "value": "BB", "name": "Barbados" }, { "value": "WF", "name": "Wallis and Futuna" }, { "value": "BL", "name": "Saint Barthelemy" }, { "value": "BM", "name": "Bermuda" }, { "value": "BN", "name": "Brunei" }, { "value": "BO", "name": "Bolivia" }, { "value": "BH", "name": "Bahrain" }, { "value": "BI", "name": "Burundi" }, { "value": "BJ", "name": "Benin" }, { "value": "BT", "name": "Bhutan" }, { "value": "JM", "name": "Jamaica" }, { "value": "BV", "name": "Bouvet Island" }, { "value": "BW", "name": "Botswana" }, { "value": "WS", "name": "Samoa" }, { "value": "BQ", "name": "Bonaire, Saint Eustatius and Saba " }, { "value": "BR", "name": "Brazil" }, { "value": "BS", "name": "Bahamas" }, { "value": "JE", "name": "Jersey" }, { "value": "BY", "name": "Belarus" }, { "value": "BZ", "name": "Belize" }, { "value": "RU", "name": "Russia" }, { "value": "RW", "name": "Rwanda" }, { "value": "RS", "name": "Serbia" }, { "value": "TL", "name": "East Timor" }, { "value": "RE", "name": "Reunion" }, { "value": "TM", "name": "Turkmenistan" }, { "value": "TJ", "name": "Tajikistan" }, { "value": "RO", "name": "Romania" }, { "value": "TK", "name": "Tokelau" }, { "value": "GW", "name": "Guinea-Bissau" }, { "value": "GU", "name": "Guam" }, { "value": "GT", "name": "Guatemala" }, { "value": "GS", "name": "South Georgia and the South Sandwich Islands" }, { "value": "GR", "name": "Greece" }, { "value": "GQ", "name": "Equatorial Guinea" }, { "value": "GP", "name": "Guadeloupe" }, { "value": "JP", "name": "Japan" }, { "value": "GY", "name": "Guyana" }, { "value": "GG", "name": "Guernsey" }, { "value": "GF", "name": "French Guiana" }, { "value": "GE", "name": "Georgia" }, { "value": "GD", "name": "Grenada" }, { "value": "GB", "name": "United Kingdom" }, { "value": "GA", "name": "Gabon" }, { "value": "SV", "name": "El Salvador" }, { "value": "GN", "name": "Guinea" }, { "value": "GM", "name": "Gambia" }, { "value": "GL", "name": "Greenland" }, { "value": "GI", "name": "Gibraltar" }, { "value": "GH", "name": "Ghana" }, { "value": "OM", "name": "Oman" }, { "value": "TN", "name": "Tunisia" }, { "value": "JO", "name": "Jordan" }, { "value": "HR", "name": "Croatia" }, { "value": "HT", "name": "Haiti" }, { "value": "HU", "name": "Hungary" }, { "value": "HK", "name": "Hong Kong" }, { "value": "HN", "name": "Honduras" }, { "value": "HM", "name": "Heard Island and McDonald Islands" }, { "value": "VE", "name": "Venezuela" }, { "value": "PR", "name": "Puerto Rico" }, { "value": "PS", "name": "Palestinian Territory" }, { "value": "PW", "name": "Palau" }, { "value": "PT", "name": "Portugal" }, { "value": "SJ", "name": "Svalbard and Jan Mayen" }, { "value": "PY", "name": "Paraguay" }, { "value": "IQ", "name": "Iraq" }, { "value": "PA", "name": "Panama" }, { "value": "PF", "name": "French Polynesia" }, { "value": "PG", "name": "Papua New Guinea" }, { "value": "PE", "name": "Peru" }, { "value": "PK", "name": "Pakistan" }, { "value": "PH", "name": "Philippines" }, { "value": "PN", "name": "Pitcairn" }, { "value": "PL", "name": "Poland" }, { "value": "PM", "name": "Saint Pierre and Miquelon" }, { "value": "ZM", "name": "Zambia" }, { "value": "EH", "name": "Western Sahara" }, { "value": "EE", "name": "Estonia" }, { "value": "EG", "name": "Egypt" }, { "value": "ZA", "name": "South Africa" }, { "value": "EC", "name": "Ecuador" }, { "value": "IT", "name": "Italy" }, { "value": "VN", "name": "Vietnam" }, { "value": "SB", "name": "Solomon Islands" }, { "value": "ET", "name": "Ethiopia" }, { "value": "SO", "name": "Somalia" }, { "value": "ZW", "name": "Zimbabwe" }, { "value": "SA", "name": "Saudi Arabia" }, { "value": "ES", "name": "Spain" }, { "value": "ER", "name": "Eritrea" }, { "value": "ME", "name": "Montenegro" }, { "value": "MD", "name": "Moldova" }, { "value": "MG", "name": "Madagascar" }, { "value": "MF", "name": "Saint Martin" }, { "value": "MA", "name": "Morocco" }, { "value": "MC", "name": "Monaco" }, { "value": "UZ", "name": "Uzbekistan" }, { "value": "MM", "name": "Myanmar" }, { "value": "ML", "name": "Mali" }, { "value": "MO", "name": "Macao" }, { "value": "MN", "name": "Mongolia" }, { "value": "MH", "name": "Marshall Islands" }, { "value": "MK", "name": "Macedonia" }, { "value": "MU", "name": "Mauritius" }, { "value": "MT", "name": "Malta" }, { "value": "MW", "name": "Malawi" }, { "value": "MV", "name": "Maldives" }, { "value": "MQ", "name": "Martinique" }, { "value": "MP", "name": "Northern Mariana Islands" }, { "value": "MS", "name": "Montserrat" }, { "value": "MR", "name": "Mauritania" }, { "value": "IM", "name": "Isle of Man" }, { "value": "UG", "name": "Uganda" }, { "value": "TZ", "name": "Tanzania" }, { "value": "MY", "name": "Malaysia" }, { "value": "MX", "name": "Mexico" }, { "value": "IL", "name": "Israel" }, { "value": "FR", "name": "France" }, { "value": "IO", "name": "British Indian Ocean Territory" }, { "value": "SH", "name": "Saint Helena" }, { "value": "FI", "name": "Finland" }, { "value": "FJ", "name": "Fiji" }, { "value": "FK", "name": "Falkland Islands" }, { "value": "FM", "name": "Micronesia" }, { "value": "FO", "name": "Faroe Islands" }, { "value": "NI", "name": "Nicaragua" }, { "value": "NL", "name": "Netherlands" }, { "value": "NO", "name": "Norway" }, { "value": "NA", "name": "Namibia" }, { "value": "VU", "name": "Vanuatu" }, { "value": "NC", "name": "New Caledonia" }, { "value": "NE", "name": "Niger" }, { "value": "NF", "name": "Norfolk Island" }, { "value": "NG", "name": "Nigeria" }, { "value": "NZ", "name": "New Zealand" }, { "value": "NP", "name": "Nepal" }, { "value": "NR", "name": "Nauru" }, { "value": "NU", "name": "Niue" }, { "value": "CK", "name": "Cook Islands" }, { "value": "XK", "name": "Kosovo" }, { "value": "CI", "name": "Ivory Coast" }, { "value": "CH", "name": "Switzerland" }, { "value": "CO", "name": "Colombia" }, { "value": "CN", "name": "China" }, { "value": "CM", "name": "Cameroon" }, { "value": "CL", "name": "Chile" }, { "value": "CC", "name": "Cocos Islands" }, { "value": "CA", "name": "Canada" }, { "value": "CG", "name": "Republic of the Congo" }, { "value": "CF", "name": "Central African Republic" }, { "value": "CD", "name": "Democratic Republic of the Congo" }, { "value": "CZ", "name": "Czech Republic" }, { "value": "CY", "name": "Cyprus" }, { "value": "CX", "name": "Christmas Island" }, { "value": "CR", "name": "Costa Rica" }, { "value": "CW", "name": "Curacao" }, { "value": "CV", "name": "Cape Verde" }, { "value": "CU", "name": "Cuba" }, { "value": "SZ", "name": "Swaziland" }, { "value": "SY", "name": "Syria" }, { "value": "SX", "name": "Sint Maarten" }, { "value": "KG", "name": "Kyrgyzstan" }, { "value": "KE", "name": "Kenya" }, { "value": "SS", "name": "South Sudan" }, { "value": "SR", "name": "Suriname" }, { "value": "KI", "name": "Kiribati" }, { "value": "KH", "name": "Cambodia" }, { "value": "KN", "name": "Saint Kitts and Nevis" }, { "value": "KM", "name": "Comoros" }, { "value": "ST", "name": "Sao Tome and Principe" }, { "value": "SK", "name": "Slovakia" }, { "value": "KR", "name": "South Korea" }, { "value": "SI", "name": "Slovenia" }, { "value": "KP", "name": "North Korea" }, { "value": "KW", "name": "Kuwait" }, { "value": "SN", "name": "Senegal" }, { "value": "SM", "name": "San Marino" }, { "value": "SL", "name": "Sierra Leone" }, { "value": "SC", "name": "Seychelles" }, { "value": "KZ", "name": "Kazakhstan" }, { "value": "KY", "name": "Cayman Islands" }, { "value": "SG", "name": "Singapore" }, { "value": "SE", "name": "Sweden" }, { "value": "SD", "name": "Sudan" }, { "value": "DO", "name": "Dominican Republic" }, { "value": "DM", "name": "Dominica" }, { "value": "DJ", "name": "Djibouti" }, { "value": "DK", "name": "Denmark" }, { "value": "VG", "name": "British Virgin Islands" }, { "value": "DE", "name": "Germany" }, { "value": "YE", "name": "Yemen" }, { "value": "DZ", "name": "Algeria" }, { "value": "US", "name": "United States" }, { "value": "UY", "name": "Uruguay" }, { "value": "YT", "name": "Mayotte" }, { "value": "UM", "name": "United States Minor Outlying Islands" }, { "value": "LB", "name": "Lebanon" }, { "value": "LC", "name": "Saint Lucia" }, { "value": "LA", "name": "Laos" }, { "value": "TV", "name": "Tuvalu" }, { "value": "TW", "name": "Taiwan" }, { "value": "TT", "name": "Trinidad and Tobago" }, { "value": "TR", "name": "Turkey" }, { "value": "LK", "name": "Sri Lanka" }, { "value": "LI", "name": "Liechtenstein" }, { "value": "LV", "name": "Latvia" }, { "value": "TO", "name": "Tonga" }, { "value": "LT", "name": "Lithuania" }, { "value": "LU", "name": "Luxembourg" }, { "value": "LR", "name": "Liberia" }, { "value": "LS", "name": "Lesotho" }, { "value": "TH", "name": "Thailand" }, { "value": "TF", "name": "French Southern Territories" }, { "value": "TG", "name": "Togo" }, { "value": "TD", "name": "Chad" }, { "value": "TC", "name": "Turks and Caicos Islands" }, { "value": "LY", "name": "Libya" }, { "value": "VA", "name": "Vatican" }, { "value": "VC", "name": "Saint Vincent and the Grenadines" }, { "value": "AE", "name": "United Arab Emirates" }, { "value": "AD", "name": "Andorra" }, { "value": "AG", "name": "Antigua and Barbuda" }, { "value": "AF", "name": "Afghanistan" }, { "value": "AI", "name": "Anguilla" }, { "value": "VI", "name": "U.S. Virgin Islands" }, { "value": "IS", "name": "Iceland" }, { "value": "IR", "name": "Iran" }, { "value": "AM", "name": "Armenia" }, { "value": "AL", "name": "Albania" }, { "value": "AO", "name": "Angola" }, { "value": "AQ", "name": "Antarctica" }, { "value": "AS", "name": "American Samoa" }, { "value": "AR", "name": "Argentina" }, { "value": "AU", "name": "Australia" }, { "value": "AT", "name": "Austria" }, { "value": "AW", "name": "Aruba" }, { "value": "IN", "name": "India" }, { "value": "AX", "name": "Aland Islands" }, { "value": "AZ", "name": "Azerbaijan" }, { "value": "IE", "name": "Ireland" }, { "value": "ID", "name": "Indonesia" }, { "value": "UA", "name": "Ukraine" }, { "value": "QA", "name": "Qatar" }, { "value": "MZ", "name": "Mozambique" }]
	};

	module.exports = CountrySelect;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = __webpack_require__(14);

	var ContextSelect = function (_Select) {
	  _inherits(ContextSelect, _Select);

	  function ContextSelect(props) {
	    _classCallCheck(this, ContextSelect);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContextSelect).call(this, props));
	  }

	  return ContextSelect;
	}(Select);

	ContextSelect.propTypes = { options: React.PropTypes.array };
	ContextSelect.defaultProps = {
	  options: [{
	    name: 'web',
	    value: '0'
	  }, {
	    name: 'api',
	    value: '1'
	  }]
	};

	module.exports = ContextSelect;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var actions = __webpack_require__(4);
	var store = __webpack_require__(5);

	var CountrySelect = __webpack_require__(15);

	//todo: https://github.com/googlei18n/libphonenumber/tree/master/javascript
	var ContactFieldset = function ContactFieldset(props) {
	  return React.createElement(
	    'fieldset',
	    null,
	    React.createElement(
	      'legend',
	      { 'for': 'contact' },
	      'Contact'
	    ),
	    React.createElement(
	      'div',
	      { className: 'phone-numbers' },
	      React.createElement(
	        'div',
	        { className: 'field-mobile-phone' },
	        React.createElement(
	          'label',
	          { 'for': 'mobile-phone' },
	          'Mobile Phone Number'
	        ),
	        React.createElement('input', { type: 'tel', title: 'Mobile Phone Number: (+1 555 555 5555)', className: 'tel', val: props.contact.phone.mobile, onChange: function onChange(event) {
	            return store.dispatch(actions.updateContact({
	              phone: {
	                mobile: event.target.value
	              }
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-mobile-fax' },
	        React.createElement(
	          'label',
	          { 'for': 'fax' },
	          'Fax'
	        ),
	        React.createElement('input', { type: 'tel', name: 'fax', val: props.contact.phone.fax, onChange: function onChange(event) {
	            return store.dispatch(actions.updateContact({
	              phone: {
	                fax: event.target.value
	              }
	            }));
	          } })
	      )
	    ),
	    React.createElement(
	      'div',
	      { className: 'adr' },
	      React.createElement(
	        'div',
	        { className: 'field-street-address' },
	        React.createElement(
	          'label',
	          { 'for': 'street-address' },
	          'Address'
	        ),
	        React.createElement('textarea', { type: 'address', rows: '4', className: 'street-address', val: props.contact.streetAddress, onChange: function onChange(event) {
	            return store.dispatch(actions.updateContact({
	              streetAddress: event.target.value
	            }));
	          } })
	      )
	    ),
	    React.createElement(
	      'div',
	      { className: 'field-locality' },
	      React.createElement(
	        'label',
	        { 'for': 'locality' },
	        'City'
	      ),
	      React.createElement('input', { type: 'text', className: 'locality', val: props.contact.locality, onChange: function onChange(event) {
	          return store.dispatch(actions.updateContact({
	            locality: event.target.value
	          }));
	        } })
	    ),
	    React.createElement(
	      'div',
	      { className: 'field-region' },
	      React.createElement(
	        'label',
	        { 'for': 'region' },
	        'State'
	      ),
	      React.createElement('input', { type: 'text', className: 'region', val: props.contact.locality, onChange: function onChange(event) {
	          return store.dispatch(actions.updateContact({
	            region: event.target.value
	          }));
	        } })
	    ),
	    React.createElement(
	      'div',
	      { className: 'field-postal-code' },
	      React.createElement(
	        'label',
	        { 'for': 'postal-code' },
	        'Postal Code'
	      ),
	      React.createElement('input', { type: 'text', className: 'postal-code', val: props.contact.postalCode, onChange: function onChange(event) {
	          return store.dispatch(actions.updateContact({
	            postalCode: event.target.value
	          }));
	        } })
	    ),
	    React.createElement(
	      'div',
	      { className: 'field-country' },
	      React.createElement(
	        'label',
	        { 'for': 'country' },
	        'Country'
	      ),
	      React.createElement(CountrySelect, { name: 'country', className: 'country-name', defaultValue: 'US', onChange: function onChange(event) {
	          return store.dispatch(actions.updateContact({
	            country: event.target.value
	          }));
	        } })
	    )
	  );
	};

	module.exports = ContactFieldset;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = __webpack_require__(14);
	var store = __webpack_require__(5);

	var TemplateSelect = function (_Select) {
	  _inherits(TemplateSelect, _Select);

	  function TemplateSelect(props) {
	    _classCallCheck(this, TemplateSelect);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TemplateSelect).call(this, props));
	  }

	  return TemplateSelect;
	}(Select);

	console.log(store.getState());

	TemplateSelect.propTypes = { options: React.PropTypes.array };
	TemplateSelect.defaultProps = {
	  options: [{
	    name: 'Base Template',
	    value: '0'
	  }]
	};

	module.exports = TemplateSelect;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = __webpack_require__(14);
	var store = __webpack_require__(5);

	var LanguageSelect = function (_Select) {
	  _inherits(LanguageSelect, _Select);

	  function LanguageSelect(props) {
	    _classCallCheck(this, LanguageSelect);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LanguageSelect).call(this, props));
	  }

	  return LanguageSelect;
	}(Select);

	console.log(store.getState());

	LanguageSelect.propTypes = { options: React.PropTypes.array };
	LanguageSelect.defaultProps = {
	  options: function () {
	    return store.getState().data.languages.map(function (language) {
	      return {
	        name: language.English,
	        value: language.alpha2
	      };
	    });
	  }()
	};

	module.exports = LanguageSelect;

/***/ }
/******/ ]);