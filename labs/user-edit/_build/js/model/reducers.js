var actions = require('./actions');
var combineReducers = require('redux').combineReducers;
var update = require('react-addons-update');

var initialState = {
  data:{
    templates:[{
      name:'Base Template',
      id:0
    }],
    namespaces:[{
      name:'core',
      value:'core',
      id:0
    },{
      name:'ace',
      value:'ace',
      id:1
    },{
      name:'contentblocks',
      value:'contentblocks',
      id:2
    },{
      name:'redactor',
      value:'redactor',
      id:3
    },{
      name:'commerce',
      value:'commerce',
      id:4
    }],
    users:[{
      name:'jpdevries',
      value:'jpdevries',
      id:0
    }],
    userGroups:[{
      name:'Administrator',
      value:0,
      id:0
    },{
      name:'Editors',
      value:10,
      id:10
    }],
    languages:[{"alpha2":"aa","English":"Afar"},{"alpha2":"ab","English":"Abkhazian"},{"alpha2":"ae","English":"Avestan"},{"alpha2":"af","English":"Afrikaans"},{"alpha2":"ak","English":"Akan"},{"alpha2":"am","English":"Amharic"},{"alpha2":"an","English":"Aragonese"},{"alpha2":"ar","English":"Arabic"},{"alpha2":"as","English":"Assamese"},{"alpha2":"av","English":"Avaric"},{"alpha2":"ay","English":"Aymara"},{"alpha2":"az","English":"Azerbaijani"},{"alpha2":"ba","English":"Bashkir"},{"alpha2":"be","English":"Belarusian"},{"alpha2":"bg","English":"Bulgarian"},{"alpha2":"bh","English":"Bihari languages"},{"alpha2":"bi","English":"Bislama"},{"alpha2":"bm","English":"Bambara"},{"alpha2":"bn","English":"Bengali"},{"alpha2":"bo","English":"Tibetan"},{"alpha2":"br","English":"Breton"},{"alpha2":"bs","English":"Bosnian"},{"alpha2":"ca","English":"Catalan; Valencian"},{"alpha2":"ce","English":"Chechen"},{"alpha2":"ch","English":"Chamorro"},{"alpha2":"co","English":"Corsican"},{"alpha2":"cr","English":"Cree"},{"alpha2":"cs","English":"Czech"},{"alpha2":"cu","English":"Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic"},{"alpha2":"cv","English":"Chuvash"},{"alpha2":"cy","English":"Welsh"},{"alpha2":"da","English":"Danish"},{"alpha2":"de","English":"German"},{"alpha2":"dv","English":"Divehi; Dhivehi; Maldivian"},{"alpha2":"dz","English":"Dzongkha"},{"alpha2":"ee","English":"Ewe"},{"alpha2":"el","English":"Greek, Modern (1453-)"},{"alpha2":"en","English":"English"},{"alpha2":"eo","English":"Esperanto"},{"alpha2":"es","English":"Spanish; Castilian"},{"alpha2":"et","English":"Estonian"},{"alpha2":"eu","English":"Basque"},{"alpha2":"fa","English":"Persian"},{"alpha2":"ff","English":"Fulah"},{"alpha2":"fi","English":"Finnish"},{"alpha2":"fj","English":"Fijian"},{"alpha2":"fo","English":"Faroese"},{"alpha2":"fr","English":"French"},{"alpha2":"fy","English":"Western Frisian"},{"alpha2":"ga","English":"Irish"},{"alpha2":"gd","English":"Gaelic; Scottish Gaelic"},{"alpha2":"gl","English":"Galician"},{"alpha2":"gn","English":"Guarani"},{"alpha2":"gu","English":"Gujarati"},{"alpha2":"gv","English":"Manx"},{"alpha2":"ha","English":"Hausa"},{"alpha2":"he","English":"Hebrew"},{"alpha2":"hi","English":"Hindi"},{"alpha2":"ho","English":"Hiri Motu"},{"alpha2":"hr","English":"Croatian"},{"alpha2":"ht","English":"Haitian; Haitian Creole"},{"alpha2":"hu","English":"Hungarian"},{"alpha2":"hy","English":"Armenian"},{"alpha2":"hz","English":"Herero"},{"alpha2":"ia","English":"Interlingua (International Auxiliary Language Association)"},{"alpha2":"id","English":"Indonesian"},{"alpha2":"ie","English":"Interlingue; Occidental"},{"alpha2":"ig","English":"Igbo"},{"alpha2":"ii","English":"Sichuan Yi; Nuosu"},{"alpha2":"ik","English":"Inupiaq"},{"alpha2":"io","English":"Ido"},{"alpha2":"is","English":"Icelandic"},{"alpha2":"it","English":"Italian"},{"alpha2":"iu","English":"Inuktitut"},{"alpha2":"ja","English":"Japanese"},{"alpha2":"jv","English":"Javanese"},{"alpha2":"ka","English":"Georgian"},{"alpha2":"kg","English":"Kongo"},{"alpha2":"ki","English":"Kikuyu; Gikuyu"},{"alpha2":"kj","English":"Kuanyama; Kwanyama"},{"alpha2":"kk","English":"Kazakh"},{"alpha2":"kl","English":"Kalaallisut; Greenlandic"},{"alpha2":"km","English":"Central Khmer"},{"alpha2":"kn","English":"Kannada"},{"alpha2":"ko","English":"Korean"},{"alpha2":"kr","English":"Kanuri"},{"alpha2":"ks","English":"Kashmiri"},{"alpha2":"ku","English":"Kurdish"},{"alpha2":"kv","English":"Komi"},{"alpha2":"kw","English":"Cornish"},{"alpha2":"ky","English":"Kirghiz; Kyrgyz"},{"alpha2":"la","English":"Latin"},{"alpha2":"lb","English":"Luxembourgish; Letzeburgesch"},{"alpha2":"lg","English":"Ganda"},{"alpha2":"li","English":"Limburgan; Limburger; Limburgish"},{"alpha2":"ln","English":"Lingala"},{"alpha2":"lo","English":"Lao"},{"alpha2":"lt","English":"Lithuanian"},{"alpha2":"lu","English":"Luba-Katanga"},{"alpha2":"lv","English":"Latvian"},{"alpha2":"mg","English":"Malagasy"},{"alpha2":"mh","English":"Marshallese"},{"alpha2":"mi","English":"Maori"},{"alpha2":"mk","English":"Macedonian"},{"alpha2":"ml","English":"Malayalam"},{"alpha2":"mn","English":"Mongolian"},{"alpha2":"mr","English":"Marathi"},{"alpha2":"ms","English":"Malay"},{"alpha2":"mt","English":"Maltese"},{"alpha2":"my","English":"Burmese"},{"alpha2":"na","English":"Nauru"},{"alpha2":"nb","English":"Bokmål, Norwegian; Norwegian Bokmål"},{"alpha2":"nd","English":"Ndebele, North; North Ndebele"},{"alpha2":"ne","English":"Nepali"},{"alpha2":"ng","English":"Ndonga"},{"alpha2":"nl","English":"Dutch; Flemish"},{"alpha2":"nn","English":"Norwegian Nynorsk; Nynorsk, Norwegian"},{"alpha2":"no","English":"Norwegian"},{"alpha2":"nr","English":"Ndebele, South; South Ndebele"},{"alpha2":"nv","English":"Navajo; Navaho"},{"alpha2":"ny","English":"Chichewa; Chewa; Nyanja"},{"alpha2":"oc","English":"Occitan (post 1500); Provençal"},{"alpha2":"oj","English":"Ojibwa"},{"alpha2":"om","English":"Oromo"},{"alpha2":"or","English":"Oriya"},{"alpha2":"os","English":"Ossetian; Ossetic"},{"alpha2":"pa","English":"Panjabi; Punjabi"},{"alpha2":"pi","English":"Pali"},{"alpha2":"pl","English":"Polish"},{"alpha2":"ps","English":"Pushto; Pashto"},{"alpha2":"pt","English":"Portuguese"},{"alpha2":"qu","English":"Quechua"},{"alpha2":"rm","English":"Romansh"},{"alpha2":"rn","English":"Rundi"},{"alpha2":"ro","English":"Romanian; Moldavian; Moldovan"},{"alpha2":"ru","English":"Russian"},{"alpha2":"rw","English":"Kinyarwanda"},{"alpha2":"sa","English":"Sanskrit"},{"alpha2":"sc","English":"Sardinian"},{"alpha2":"sd","English":"Sindhi"},{"alpha2":"se","English":"Northern Sami"},{"alpha2":"sg","English":"Sango"},{"alpha2":"si","English":"Sinhala; Sinhalese"},{"alpha2":"sk","English":"Slovak"},{"alpha2":"sl","English":"Slovenian"},{"alpha2":"sm","English":"Samoan"},{"alpha2":"sn","English":"Shona"},{"alpha2":"so","English":"Somali"},{"alpha2":"sq","English":"Albanian"},{"alpha2":"sr","English":"Serbian"},{"alpha2":"ss","English":"Swati"},{"alpha2":"st","English":"Sotho, Southern"},{"alpha2":"su","English":"Sundanese"},{"alpha2":"sv","English":"Swedish"},{"alpha2":"sw","English":"Swahili"},{"alpha2":"ta","English":"Tamil"},{"alpha2":"te","English":"Telugu"},{"alpha2":"tg","English":"Tajik"},{"alpha2":"th","English":"Thai"},{"alpha2":"ti","English":"Tigrinya"},{"alpha2":"tk","English":"Turkmen"},{"alpha2":"tl","English":"Tagalog"},{"alpha2":"tn","English":"Tswana"},{"alpha2":"to","English":"Tonga (Tonga Islands)"},{"alpha2":"tr","English":"Turkish"},{"alpha2":"ts","English":"Tsonga"},{"alpha2":"tt","English":"Tatar"},{"alpha2":"tw","English":"Twi"},{"alpha2":"ty","English":"Tahitian"},{"alpha2":"ug","English":"Uighur; Uyghur"},{"alpha2":"uk","English":"Ukrainian"},{"alpha2":"ur","English":"Urdu"},{"alpha2":"uz","English":"Uzbek"},{"alpha2":"ve","English":"Venda"},{"alpha2":"vi","English":"Vietnamese"},{"alpha2":"vo","English":"Volapük"},{"alpha2":"wa","English":"Walloon"},{"alpha2":"wo","English":"Wolof"},{"alpha2":"xh","English":"Xhosa"},{"alpha2":"yi","English":"Yiddish"},{"alpha2":"yo","English":"Yoruba"},{"alpha2":"za","English":"Zhuang; Chuang"},{"alpha2":"zh","English":"Chinese"},{"alpha2":"zu","English":"Zulu"}]
  },
  bio:{
    username:'',
    givenName:'',
    familyName:'',
    url:'',
    photo:'',
    bday:'',
    gender:''
  },
  contact:{
    email:'',
    phone:{
      mobile:'',
      fax:''
    },
    streetAddress:'',
    locality:'',
    region:'',
    postalCode:'',
    country:'',
  },
  access:{
    active:true,
    sudo:false,
    blocked:false,
    blockedUntil:undefined,
    blockedAfter:undefined,
    numLogins:0,
    lastLogin:undefined,
    failedLogins:0,
    classKey:'modUser',
    newPassword:false,
  },
  security:{
    passwordNotify:'screen',
    passwordGenerateMethod:'modx'
  },
  settings:[{
    name:'Theme',
    key:'theme',
    value:'monkia',
    lastModified:new Date()
  }],
  accessPermissions:{
    userGroups:[{
      name:'Administrator',
      id:0,
      rank:0,
      role:'Super User'
    }]
  },
  memo:{
    note:''
  }
};

var bioReducer = function(state, action) {
  state = state || initialState.bio;
  switch(action.type) {
    case actions.UPDATE_BIO:
    return Object.assign({},state,action.bio);
    break;
  }
  return state;
};

var accessReducer = function(state, action) {
  //console.log(action,actions.UPDATE_ACCESS_DATE);
  state = state || initialState.access;
  switch(action.type) {
    case actions.UPDATE_ACCESS:
    return Object.assign({},state,action.access);
    break;

    case actions.UPDATE_ACCESS_DATE:
    var timestamp = Date.parse(action.value);
    if(isNaN(timestamp)) break;

    return (update(state, {$merge: {[action.key]:timestamp}}));
    break;
  }
  return state;
};

var securityReducer = function(state, action) {
  state = state || initialState.security;
  switch(action.type) {
    case actions.UPDATE_SECURITY:
    return Object.assign({},state,action.security);
    break;
  }
  return state;
};

var contactReducer = function(state, action) {
  state = state || initialState.contact;
  switch(action.type) {
    case actions.UPDATE_CONTACT:
    return Object.assign({},state,action.contact);
    break;
  }
  return state;
};

var settingsReducer = function(state, action) {
  state = state || initialState.settings;
  switch(action.type) {
    case actions.NEW_SETTING:
    return update(state, {$push: [
      update(action.setting, {$merge: {lastModified:new Date()} })
    ]});
    break;
  }
  return state;
};

var accessPermissionsReducer = function(state, action) {
  state = state || initialState.accessPermissions;
  var userGroups = state.userGroups;
  switch(action.type) {
    case actions.UPDATE_ACCESS_PERMISSIONS:

    break;

    case actions.ADD_USER_TO_USER_GROUP:

    for(var i = 0; i < userGroups.length; i++) {
      var userGroup = userGroups[i];
      if(userGroup.name == action.userGroup && userGroup.role == action.role) return state;
    }

    return update(state, {$merge: {userGroups: // consider breaking this out into an accessPermissionsUserGroupsReducer, nested syntax is confusing
      update(userGroups, {$push:
        [{
          name:action.userGroup,
          id:0,
          rank:0,
          role:action.role
        }]
      })
    }});
    break;
  }
  return state;
};

var memoReducer = function(state, action) {
  state = state || initialState.memo;
  switch(action.type) {
    case actions.UPDATE_MEMO:
    return update(state, {$set:{
      note:action.memo
    }});
    break;
  }
  return state;
};

var templateReducer = function(state, action) {
  state = state || initialState.data.templates;

  switch(action.type) {
    case actions.ADD_TEMPLATE:
    return update(state, {$push: [
      action.template
    ]});
    break;
  }

  return state;
};

var namespaceReducer = function(state, action) {
  state = state || initialState.data.namespaces;
  switch(action.type) {
    case actions.ADD_NAMESPACE:
    return update(state, {$push: [
      action.namespace
    ]});
  }

  return state;
}

var usersReducer = function(state, action) {
  state = state || initialState.data.users;
  switch(action.type) {
    case actions.ADD_USER:
    return update(state, {$push: [
      action.user
    ]});
  }

  return state;
}

var userGroupsReducer = function(state, action) {
  state = state || initialState.data.userGroups;
  switch(action.type) {
    case actions.ADD_USER_GROUP:
    break;
  }

  return state;
}

var languagesReducer = function(state, action) {
  state = state || initialState.data.languages;

  return state;
}

var dataReducer = combineReducers({
  templates:templateReducer,
  namespaces:namespaceReducer,
  users:usersReducer,
  userGroups:userGroupsReducer,
  languages:languagesReducer
});

var userReducer = combineReducers({
  bio:bioReducer,
  access:accessReducer,
  security:securityReducer,
  contact:contactReducer,
  settings:settingsReducer,
  accessPermissions:accessPermissionsReducer,
  memo:memoReducer,
  data:dataReducer,
});


exports.userReducer = userReducer;
