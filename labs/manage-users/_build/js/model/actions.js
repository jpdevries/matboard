require('isomorphic-fetch');

var settings = require('./settings'),
endpoints = settings.endpoints;


var UPDATE_QUICKCREATE = 'update_quickcreate';
var updateQuickCreate = function(quickCreate) {
  return {
    type:UPDATE_QUICKCREATE,
    quickCreate:quickCreate,
  }
}

exports.UPDATE_QUICKCREATE = UPDATE_QUICKCREATE;
exports.updateQuickCreate = updateQuickCreate;

var ADD_USER_GROUP = 'addusergroup';
var addUserGroup = function(userGroup) {
  return {
    type:ADD_USER_GROUP,
    userGroup:userGroup
  }
}

exports.ADD_USER_GROUP = ADD_USER_GROUP;
exports.addUserGroup = addUserGroup;




var ADD_USER_TO_GROUP = 'addusertogroup';
var addUserToGroup = function(user,group) {
  return {
    type:ADD_USER_TO_GROUP,
    id:user,
    group:group
  }
}

exports.ADD_USER_TO_GROUP = ADD_USER_TO_GROUP;
exports.addUserToGroup = addUserToGroup;

var removeUserFromGroup = (user,group) => (
  (dispatch) => (
    fetch(endpoints.API_REMOVE_USER_FROM_GROUP, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user:user,
        group:group
      })
    }).then(function(response){
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((data) => (
      dispatch(
        removeUserFromGroupSuccess(user,group)
      )
    )).catch((error) => (
      dispatch(
        removeUserFromGroupError(user,group)
      )
    ))
  )
);

var REMOVE_USER_FROM_GROUP_SUCCESS = 'removeuserfromgroupsuccess';
var removeUserFromGroupSuccess = function(user,group) {
  return {
    type:REMOVE_USER_FROM_GROUP_SUCCESS,
    id:user,
    group:group
  }
}

var REMOVE_USER_FROM_GROUP_ERROR = 'removeuserfromgrouperror';
var removeUserFromGroupError = function(user,group) {
  return {
    type:REMOVE_USER_FROM_GROUP_ERROR,
    id:user,
    group:group
  }
}

exports.REMOVE_USER_FROM_GROUP_SUCCESS = REMOVE_USER_FROM_GROUP_SUCCESS;
exports.REMOVE_USER_FROM_GROUP_ERROR = REMOVE_USER_FROM_GROUP_ERROR;
exports.removeUserFromGroup = removeUserFromGroup;

var deleteUserError = function(user) {
  return {
    type:ADD_USER_ERROR,
    user:user,
    id:user.id
  }
}

var UPDATE_USER = 'updateuser';
var UPDATE_USER_SUCCESS = 'updateusersuccess';
var UPDATE_USER_ERROR = 'updateusererror';
var updateUserSuccess = function(id,user,data) {
  return {
    type:UPDATE_USER_SUCCESS,
    user:user,
    id:id,
    data:data
  }
}

var updateUserError = function(id,user) {
  return {
    type:UPDATE_USER_ERROR,
    user:user,
    id:id
  }
}

var updateUser = (id,user) => (
  (dispatch) => (
    fetch(endpoints.API_USER_UPDATE, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(function(response){
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((data) => (
      dispatch(
        updateUserSuccess(id,user,data)
      )
    )).catch((error) => (
      dispatch(
        updateUserError(id,user)
      )
    ))
  )
);

exports.UPDATE_USER = UPDATE_USER;
exports.UPDATE_USER_SUCCESS = UPDATE_USER_SUCCESS;
exports.UPDATE_USER_ERROR = UPDATE_USER_ERROR;
exports.updateUser = updateUser;


var ADD_USER = 'adduser';
var ADD_USER_SUCCESS = 'addusersuccess';
var ADD_USER_ERROR = 'addusererror';

var addUserSuccess = function(user,data) {
  return {
    type:ADD_USER_SUCCESS,
    user:user,
    data:data
  }
}

var addUserError = function(user) {
  return {
    type:ADD_USER_ERROR,
    user:user
  }
}

var addUser = (user) => (
  (dispatch) => (
    fetch(endpoints.API_USER_ADD, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(function(response){
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((data) => (
      dispatch(
        addUserSuccess(user,data)
      )
    )).catch((error) => (
      dispatch(
        addUserError(user)
      )
    ))
  )
);

exports.ADD_USER_SUCCESS = ADD_USER_SUCCESS;
exports.ADD_USER_ERROR = ADD_USER_ERROR;
exports.addUser = addUser;

var DELETE_USER = 'deleteuser';
var DELETE_USER_SUCCESS = 'deleteusersuccess';
var DELETE_USER_ERROR = 'deleteusererror';

var deleteUserSuccess = function(user) {
  return {
    type:DELETE_USER_SUCCESS,
    user:user,
    id:user.id
  }
}

var deleteUserError = function(user) {
  return {
    type:ADD_USER_ERROR,
    user:user,
    id:user.id
  }
}

var deleteUser = function(user) {
  return function(dispatch) {
    return fetch(endpoints.API_USER_DELETE, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(function(response){
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((data) => (
      dispatch(
        deleteUserSuccess(user)
      )
    )).catch((error) => (
      dispatch(
        deleteUserError(user)
      )
    ))
  }
};

exports.DELETE_USER_SUCCESS = DELETE_USER_SUCCESS;
exports.DELETE_USER_ERROR = DELETE_USER_ERROR;
exports.deleteUser = deleteUser;

var DELETE_USERS = 'deleteusers';
var DELETE_USERS_SUCCESS = 'deleteuserssuccess';
var DELETE_USERS_ERROR = 'deleteuserserror';

var deleteUsersSuccess = function(users) {
  return {
    type:DELETE_USERS_SUCCESS,
    users:users
  }
}

var deleteUsersError = function(users) {
  return {
    type:DELETE_USERS_ERROR,
    users:users
  }
}

var deleteUsers = function(users) {
  //console.log('deleteUsers',users);
  return function(dispatch) {
    return fetch(endpoints.API_USERS_DELETE, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        users:users
      })
    }).then(function(response){
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((data) => (
      dispatch(
        deleteUsersSuccess(users)
      )
    )).catch((error) => (
      dispatch(
        deleteUsersError(users)
      )
    ))
  }
};

exports.DELETE_USERS_SUCCESS = DELETE_USERS_SUCCESS;
exports.DELETE_USERS_ERROR = DELETE_USERS_ERROR;
exports.deleteUsers = deleteUsers;











var ACTIVATE_USERS = 'activateusers';
var ACTIVATE_USERS_SUCCESS = 'activateuserssuccess';
var ACTIVATE_USERS_ERROR = 'activateuserserror';

var activateUsersSuccess = function(users) {
  return {
    type:ACTIVATE_USERS_SUCCESS,
    users:users
  }
}

var activateUsersError = function(users) {
  return {
    type:ACTIVATE_USERS_ERROR,
    users:users
  }
}

var activateUsers = function(users) {
  //console.log('activate',users);
  return function(dispatch) {
    return fetch(endpoints.API_USERS_ACTIVATE, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        users:users
      })
    }).then(function(response){
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((data) => (
      dispatch(
        activateUsersSuccess(users)
      )
    )).catch((error) => (
      dispatch(
        activateUsersError(users)
      )
    ))
  }
};

exports.ACTIVATE_USERS_SUCCESS = ACTIVATE_USERS_SUCCESS;
exports.ACTIVATE_USERS_ERROR = ACTIVATE_USERS_ERROR;
exports.activateUsers = activateUsers;

var DEACTIVATE_USERS = 'deactivateusers';
var DEACTIVATE_USERS_SUCCESS = 'deactivateuserssuccess';
var DEACTIVATE_USERS_ERROR = 'deactivateuserserror';

var deactivateUsersSuccess = function(users) {
  return {
    type:DEACTIVATE_USERS_SUCCESS,
    users:users
  }
}

var deactivateUsersError = function(users) {
  return {
    type:DEACTIVATE_USERS_ERROR,
    users:users
  }
}

var deactivateUsers = function(users) {
  //console.log('activate',users);
  return function(dispatch) {
    return fetch('/api/users/deactivate', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        users:users
      })
    }).then(function(response){
      if(response.state < 200 || response.state >= 300) {
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    }).then((response) => (
      response.json()
    )).then((data) => (
      dispatch(
        deactivateUsersSuccess(users)
      )
    )).catch((error) => (
      dispatch(
        deactivateUsersError(users)
      )
    ))
  }
};

exports.DEACTIVATE_USERS_SUCCESS = DEACTIVATE_USERS_SUCCESS;
exports.DEACTIVATE_USERS_ERROR = DEACTIVATE_USERS_ERROR;
exports.deactivateUsers = deactivateUsers;


var SET_ROLES = 'setroles';
var setRoles = function(roles) {
  return {
    type:SET_ROLES,
    roles:roles
  }
}

exports.SET_ROLES = SET_ROLES;
exports.setRoles = setRoles;

var SET_USER_GROUPS = 'setusergroups';
var setUserGroups = function(userGroups) {
  return {
    type:SET_USER_GROUPS,
    userGroups:userGroups
  }
}

exports.SET_USER_GROUPS = SET_USER_GROUPS;
exports.setUserGroups = setUserGroups;

var QUICKCREATE_ROLE_ADD = "quickcreateroleadd";
var quickCreateRoleAdd = function(group,role) {
  return {
    type:QUICKCREATE_ROLE_ADD,
    group:group,
    role:role
  }
}

exports.QUICKCREATE_ROLE_ADD = QUICKCREATE_ROLE_ADD;
exports.quickCreateRoleAdd = quickCreateRoleAdd;


var QUICKCREATE_ROLE_REMOVE = "quickcreateroleremove";
var quickCreateRoleRemove = function(group,role) {
  return {
    type:QUICKCREATE_ROLE_REMOVE,
    group:group,
    role:role
  }
}

exports.QUICKCREATE_ROLE_REMOVE = QUICKCREATE_ROLE_REMOVE;
exports.quickCreateRoleRemove = quickCreateRoleRemove;

var FLUSH_QUICK_CREATE = 'flushquickcreate';
var flushQuickCreate = function(quickCreate = {}) {
  return {
    type:FLUSH_QUICK_CREATE,
    quickCreate:quickCreate
  }
}

exports.FLUSH_QUICK_CREATE = FLUSH_QUICK_CREATE;
exports.flushQuickCreate = flushQuickCreate;
