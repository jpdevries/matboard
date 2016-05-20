var actions = require('./actions');
var combineReducers = require('redux').combineReducers;
var update = require('react-addons-update');

var initialState = {
  meta:{
    pagetitle:'',
    longtitle:'bacon',
    description:'',
    introtext:'',
    template:2,
    alias:'',
    menutitle:'',
    introtext:'intro text hello world',
    menuhide:true,
    published:true
  },
  settings:{
    parent:2,
    resourceType:'modResource',
    contentType:'html',
    contentDisposition:'inline',
    menuindex:3,
    container:true,
    searchable:true,
    richText:true,
    freezeURI:true,
    cacheable:true,
    emptyCache:true,
    deleted:true
  },
  publication:{
    publishedon:new Date(),
    publishedon:null,
    unpubdate:null
  },
  resourceGroups:[{
    name:'Group bacon!',
    id:0,
    active:false
  },{
    name:'Group 2',
    id:1,
    active:true
  },{
    name:'Group 3',
    id:2,
    active:false
  }],
  content:''
};



var metaReducer = function(state, action) {
  state = state || initialState.meta;
  //console.log(action.type);
  switch(action.type) {
    case actions.UPDATE_META:
    return Object.assign({},state,action.meta);
    break;
  }

  return state;
}

var settingsReducer = function(state, action) {
  state = state || initialState.settings;
  console.log('settingsReducer',action.type);
  switch(action.type) {
    case actions.UPDATE_SETTINGS:
    return Object.assign({},state,action.settings);
    break;
  }

  return state;
}

var publicationReducer = function(state, action) {
  state = state || initialState.publication;
  switch(action.type) {
    case actions.UPDATE_PUBLICATION:
    return Object.assign({},state,action.publication);
    break;
  }
  return state;
}

var resourceGroupsReducer = function(state, action) {
  state = state || initialState.resourceGroups;

  switch(action.type) {
    case actions.UPDATE_RESOURCE_GROUP:
    //console.log('state',state);
    var d = action.index;
    console.log('resourceGroupsReducer',action,action.index);
    //console.log('d',d,d.index);
    //return state;
    return update(state,{
      [action.index]:{
        $merge: {active:action.active}
      }
    });
    //console.log(update(state, {'Group 1': {$apply:function(x){ x.active = action.active }} }));
    //return Object.assign({},state,action.resourceGroups);
    break;

    case actions.UPDATE_RESOURCE_GROUPS:
    //return Object.assign({},state,action.resourceGroups);
    break;
  }
  return state;
}

var contentReducer = function(state, action) {
  state = state || initialState.content;
  switch(action.type) {
    case actions.UPDATE_CONTENT:
    return action.content;
    break;
  }
  return state;
}

var resourceReducer = combineReducers({
  meta:metaReducer,
  settings:settingsReducer,
  publication:publicationReducer,
  resourceGroups:resourceGroupsReducer,
  content:contentReducer
});


exports.resourceReducer = resourceReducer;
