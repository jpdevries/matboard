var actions = require('./actions');
var combineReducers = require('redux').combineReducers;
var update = require('react-addons-update');

var initialUserGroups = (function(){
  var userGroups = [];
  try {
    var userGroupSections = document.querySelectorAll('section.user-group');
    for(var i = 0; i < userGroupSections.length; i++) {
      var userGroup = userGroupSections[i],
      id = parseInt(userGroup.getAttribute('data-user-group-id')),
      title = userGroup.querySelector('.name').innerHTML;
      userGroups.push({
        id:id,
        title:title
      });
    }
  } catch (e) {} 
  return userGroups;
})();

console.log('initialUserGroups',initialUserGroups);

var initialUsers = (function(){
  var users = [];
  try {
    var userRows = document.querySelectorAll('tr.user-row');
    var addedUsers = [];
    for(var i = 0; i < userRows.length; i++) {
      var userRow = userRows[i],
      userGroups = userRow.getAttribute('data-user-groups').split(',').map((groupId) => (
        parseInt(groupId)
      )),
      username = userRow.querySelector('.username').innerHTML,
      email = userRow.getAttribute('data-email'),
      id = userRow.getAttribute('data-user-id'),
      contextualSettings = userRow.nextElementSibling,
      givenName = contextualSettings.querySelector('.givenName').innerHTML,
      sudo = contextualSettings.querySelector('input.sudo').checked,
      active = contextualSettings.querySelector('input.active').checked,
      jobTitle = contextualSettings.querySelector('.jobTitle').innerHTML;
      //console.log(id,username,userGroups,email,givenName,jobTitle,sudo,active);
      if(!addedUsers[id]) users.push({
        id:id,
        username:username,
        givenName:givenName,
        familyName:'',
        email:email,
        active:true,
        sudo:true,
        jobTitle:jobTitle,
        userGroups:userGroups
      });
      addedUsers[id] = true;
    }

  } catch(e) {}
  return users;
})();

console.log(initialUsers);

/*initialUsers = [{
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
}];*/

  /*initialUserGroups = [{
    id:0,
    title:'Administrators'
  },{
    id:1,
    title:'Editors'
  }];*/

var initialFieldsetRoles = [ // todo: move this to the store
  {
    key:'administrator',
    title:'Administrator',
    id:1,
    roles:[{
      title:'Super User',
      id:1,
      key:1
    },{
      title:'Editor',
      id:2,
      key:2
    }]
  },
  {
    key:'modmore',
    title:'modmore',
    id:2,
    roles:[{
      title:'Super User',
      id:1,
      key:1
    },{
      title:'Editor',
      id:2,
      key:2
    }]
  },
  {
    key:'mgab',
    title:'MGAB',
    id:3,
    roles:[{
      title:'Super User',
      id:1,
      key:1
    },{
      title:'Editor',
      id:2,
      key:2
    }]
  },
  {
    key:'sterc',
    title:'Sterc',
    id:4,
    roles:[{
      title:'Super User',
      id:1,
      key:1
    },{
      title:'Editor',
      id:2,
      key:2
    }]
  },
  {
    key:'sitebuilders',
    title:'Site Builders',
    id:5,
    roles:[{
      title:'Super User',
      id:1,
      key:1
    },{
      title:'Editor',
      id:2,
      key:2
    }]
  }
];

var initialState = {
  users:initialUsers,
  userGroups:initialUserGroups,
  fieldsetRoles:initialFieldsetRoles,
  quickCreate:{
    username:'',
    givenName:'',
    familyName:'',
    email:'',
    active:true,
    sudo:true,
    open:false,
    updating:false,
    id:undefined
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

  console.log(index);

  switch(action.type) {
    case actions.UPDATE_USER_SUCCESS:
    var newState =  update(state, {[index]: {$apply: (user) => {
      return update(user,{$merge:action.user})
    }} });
    console.log(state,newState);
    return newState;
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

    case actions.ADD_USER_SUCCESS:
    if(action.user.id === undefined) {
      var nextIndex = 0;
      state.map((user,i) => {
          nextIndex = Math.max(user.id,nextIndex);
      });
      action.user.id = nextIndex + 1;
    }
    return update(state, {$push: [action.user]});

    case actions.DELETE_USER_SUCCESS:
    var newState = update(state, {$splice: [[index, 1]]});
    console.log(newState);
    return newState;

    case actions.DELETE_USER_ERROR:
    return state;
  }
  return state;
}

var quickCreateReducer = function(state, action) {
  state = state || initialState.quickCreate;

  switch(action.type) {
    case actions.UPDATE_QUICKCREATE:
    console.log(actions.UPDATE_QUICKCREATE);
    return update(state, {$merge:action.quickCreate});
    break;
  }
  return state;
}

var fieldsetRolesReducer = function(state, action) {
  state = state || initialState.fieldsetRoles;

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
  userGroups:userGroupsReducer,
  fieldsetRoles:fieldsetRolesReducer
});


exports.manageUsersReducer = manageUsersReducer;
