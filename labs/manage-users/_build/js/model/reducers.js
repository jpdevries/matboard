var actions = require('./actions');
var combineReducers = require('redux').combineReducers;
var update = require('react-addons-update');

var initialState = {
  users:[{
    id:0,
    username:'jpdevries',
    givenName:'John-Paul',
    familyName:'de Vries',
    email:'mail@devries.jp',
    active:true,
    sudo:false,
    jobTitle:'Redactor Lead Developer',
    userGroups:[1]
  },{
    id:1,
    username:'markh',
    givenName:'Mark',
    familyName:'Hamstra',
    email:'mark@modmore.com',
    active:true,
    sudo:true,
    jobTitle:'modmore Founder',
    userGroups:[0,1]
  }],
  userGroups:[{
    id:0,
    title:'Administrators'
  },{
    id:1,
    title:'Editors'
  }],
  quickCreate:{
    username:'jpdevries',
    givenName:'John-Paul',
    familyName:'de Vries',
    email:'mail@devries.jp',
    active:true,
    sudo:true,
  }
};

var usersReducer = function(state, action) {
  state = state || initialState.users;
  //return state;
  console.log(action);

  var index = 0;
  state.map((user,i) => {
      if(user.id == action.id) index = i;
  });

  switch(action.type) {
    case actions.UPDATE_USER:
    return update(state, {[index]: {$merge:action.user} })
    break;

    case actions.ADD_USER_TO_GROUP:
    return update(state, {[index]: {$apply: (user) => {
      return update (user, {$merge: {userGroups: update(user.userGroups, {$push: [action.group]}) }})
    }} })
    break;

    case actions.REMOVE_USER_FROM_GROUP:
    return update(state, {[index]: {$apply: (user) => {
      return update(user, {$merge: {
        userGroups:(
          state[index].userGroups.map((group) => (
            (group !== action.group) ? group : undefined
          )).filter((group) => (group !== undefined))
        )
      } } )
    }} });
    break;

    case actions.ADD_USER:
    if(action.user.id === undefined) {
      var nextIndex = 0;
      state.map((user,i) => {
          nextIndex = Math.max(user.id,nextIndex);
      });
      action.user.id = nextIndex + 1;
    }
    return update(state, {$push: [action.user]});
  }
  return state;
}

var quickCreateReducer = function(state, action) {
  state = state || initialState.quickCreate;
  return state;
  switch(action.type) {
    case actions.UPDATE_CONTENT:
    return action.content;
    break;
  }
  return state;
}

var userGroupsReducer = function(state, action) {
  state = state || initialState.userGroups;
  //return state;
  switch(action.type) {
    case actions.ADD_USER_GROUP:
    if(action.userGroup.id === undefined) {
      var nextIndex = 0;
      state.map((userGroup,i) => {
          nextIndex = Math.max(userGroup.id,nextIndex);
      });
      action.userGroup.id = nextIndex + 1;
    }

    return update(state, {$push: [action.userGroup]});
    break;
  }
  return state;
}

var manageUsersReducer = combineReducers({
  quickCreate:quickCreateReducer,
  users:usersReducer,
  userGroups:userGroupsReducer
});


exports.manageUsersReducer = manageUsersReducer;
