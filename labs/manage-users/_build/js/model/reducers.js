var actions = require('./actions');
var combineReducers = require('redux').combineReducers;
var update = require('react-addons-update');

var initialViewProps = {
  pageType:(function(){
    try {
      return document.querySelector('body').getAttribute('data-page-type') || 'summary'
    } catch (e) {}
    return 'summary';
  })(),
  showFilterBy:(function(){
    try {
      return (document.querySelector('body').getAttribute('data-show-filterby') != 'false')
    } catch (e) {}
    return true;
  })()
};

var initialUserGroups = (function(){
  var userGroups = [];
  try {
    var userGroupSections = document.querySelectorAll('section.user-group');
    for(var i = 0; i < userGroupSections.length; i++) {
      var userGroup = userGroupSections[i],
      id = parseInt(userGroup.getAttribute('data-user-group-id')),
      slackChannel = userGroup.getAttribute('data-slackchannel'),
      title = userGroup.querySelector('.name').innerHTML;
      userGroups.push({
        id:id,
        title:title,
        name:title,
        slackChannel:slackChannel
      });
    }
  } catch (e) {}
  return userGroups;
})();

//console.log('initialUserGroups',initialUserGroups);

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
      slack = userRow.getAttribute('data-slack') || undefined,
      id = userRow.getAttribute('data-user-id'),
      contextualSettings = userRow.nextElementSibling,
      givenName = contextualSettings.querySelector('.givenName').innerHTML,
      familyName = contextualSettings.querySelector('.familyName').innerHTML,
      sudo = contextualSettings.querySelector('input.sudo').checked,
      active = contextualSettings.querySelector('input.active').checked,
      jobTitle = contextualSettings.querySelector('.jobTitle').innerHTML;
      //console.log(id,username,userGroups,email,givenName,jobTitle,sudo,active);

      var groupRoles = {};
      Array.prototype.map.call(userRow.nextElementSibling.querySelectorAll('input[name="grouproles[]"]'),function(input){
        var group = input.getAttribute('data-group'),
        role = input.getAttribute('data-role');

        if(!groupRoles[group]) groupRoles[group] = [];
        groupRoles[group].push(role);
      });

      if(!addedUsers[id]) users.push({
        id:id,
        username:username,
        slack:slack,
        givenName:givenName,
        familyName:familyName,
        email:email,
        active:active,
        sudo:sudo,
        jobTitle:jobTitle,
        userGroups:userGroups,
        groupRoles:groupRoles, // #remove
        roles:groupRoles
      });
      addedUsers[id] = true;
    }

  } catch(e) {}
  return users;
})();

//console.log(initialUsers);

var initialRoles = (function(){
  try {
    return Array.prototype.map.call(document.querySelector('.create-setting-form .field-group fieldset fieldset').querySelectorAll('label'), (fieldsetLabel) => ({
      name:fieldsetLabel.querySelector('span').innerHTML,
      id:fieldsetLabel.querySelector('input').getAttribute('data-role-id'),
      key:fieldsetLabel.querySelector('input').getAttribute('data-role-id')
    }));
  } catch (e) {
    return [];
  }
})();

//console.log(initialRoles);

var initialQuickCreate = {
  username:'',
  givenName:'',
  familyName:'',
  email:'',
  active:true,
  sudo:false,
  open:false,
  updating:false,
  id:undefined,
  roles:(function(){
    var o = {};
    initialUserGroups.map((userGroup) => (
      o[userGroup.id.toString()] = []
    ))
    return o;
  })()
};

var initialState = {
  users:initialUsers,
  userGroups:initialUserGroups,
  roles:initialRoles,
  quickCreate:initialQuickCreate
};

//console.log('initialState',initialState);

var usersReducer = function(state, action) {
  state = state || initialState.users;

  var index = 0;
  state.map((user,i) => {
      if(user.id == action.id) index = i;
  });

  switch(action.type) {
    case actions.UPDATE_USER_SUCCESS:
    //console.log(actions.UPDATE_USER_SUCCESS, action.user);
    var newState =  update(state, {[index]: {$apply: (user) => {
      return update(user,{$merge:action.user})
    }} });
    //console.log(state,newState);
    return newState;
    break;

    case actions.ADD_USER_TO_GROUP:
    return update(state, {[index]: {$apply: (user) => {
      return update (user, {$merge: {
        userGroups: update(user.userGroups, {$push: [action.group]}) ,
        roles:{$apply: (roles) => {
          try {
            if(!roles[action.group]) update(roles, {$merge: {
              [action.group]:[]
            }})
          } catch (e) {}
          return roles;
        }}
      }})
    }} })
    break;

    case actions.REMOVE_USER_FROM_GROUP_SUCCESS:
    //console.log(actions.REMOVE_USER_FROM_GROUP,state[index]);

    return update(state, {[index]: {$apply: (user) => {
      return update(user, {$merge: {
        userGroups:(
          state[index].userGroups.map((group) => (
            (group !== action.group) ? group : undefined
          )).filter((group) => (group !== undefined))
        ),
        roles:Object.assign({},state[index].roles,{
          [action.group]:[]
        })
      } } )
    }} });
    break;

    /*
    return update(state, {'roles': {$apply: (roles) => (
      update(roles, {[action.group]: {$apply: (group) => (
        update(group, {$push: [action.role]})
      )}})
    ) } })
    */

    case actions.ADD_USER_SUCCESS:
    //console.log(actions.ADD_USER_SUCCESS,action.data);
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
    return newState;

    case actions.DELETE_USER_ERROR:
    return state;

    case actions.DELETE_USERS_SUCCESS:
    return update(state, {$set:
      state.map((user,i) => (
        (!action.users.includes(user.id.toString())) ? user : undefined
      )).filter((user) => (user !== undefined))
    });

    case actions.ACTIVATE_USERS_SUCCESS:
    return update(state, {$set:
      state.map((user,i) => (
        (action.users.includes(user.id.toString())) ? update(user,{$merge:{active:true}}) : user
      ))
    });

    case actions.DEACTIVATE_USERS_SUCCESS:
    return update(state, {$set:
      state.map((user,i) => (
        (action.users.includes(user.id.toString())) ? update(user,{$merge:{active:false}}) : user
      ))
    });

    default:
    return state;
  }
}

var quickCreateReducer = function(state, action) {
  state = state || initialState.quickCreate;

  switch(action.type) {
    case actions.UPDATE_QUICKCREATE:
    //console.log(actions.UPDATE_QUICKCREATE, update(state, {$merge:action.quickCreate}));
    return update(state, {$merge:action.quickCreate});

    case actions.QUICKCREATE_ROLE_ADD:
    if(!state.roles[action.group]) state.roles[action.group] = [];
    if(state.roles[action.group].includes(action.role)) break;
    return update(state, {'roles': {$apply: (roles) => (
      update(roles, {[action.group]: {$apply: (group) => (
        update(group, {$push: [action.role]})
      )}})
    ) } });




    case actions.QUICKCREATE_ROLE_REMOVE:
    return update(state, {'roles': {$apply: (roles) => (
      update(roles, {[action.group]: {$apply: (group) => (
        group.filter((role) => (
          role.toString() !== action.role.toString()
        ))
      )} })
    ) }});

    case actions.FLUSH_QUICK_CREATE:
    //console.log('action.quickCreate',action.quickCreate,update(initialQuickCreate,{$merge: action.quickCreate}));
    return update(state, {$set:update(initialQuickCreate,{$merge: action.quickCreate})});


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

    case actions.SET_USER_GROUPS:
    return update(state, {$set: action.userGroups})
  }
  return state;
}

var rolesReducer = function(state, action) {
  state = state || initialState.roles;

  switch(action.type) {
    case actions.SET_ROLES:
    //console.log('setting roles',update(state, {$set:action.roles}));
    return update(state, {$set:action.roles});
  }

  return state;
}

var viewPropsReducer = function(state, action) {
  state = state || initialViewProps;
  return state;
}

var manageUsersReducer = combineReducers({
  quickCreate:quickCreateReducer,
  users:usersReducer,
  userGroups:userGroupsReducer,
  roles:rolesReducer,
  viewProps:viewPropsReducer
});


exports.manageUsersReducer = manageUsersReducer;
