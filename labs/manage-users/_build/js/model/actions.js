require('isomorphic-fetch');

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




var REMOVE_USER_FROM_GROUP = 'removeuserfromgroup';
var removeUserFromGroup = function(user,group) {
  console.log('ru',user,group);
  return {
    type:REMOVE_USER_FROM_GROUP,
    id:user,
    group:group
  }
}

exports.REMOVE_USER_FROM_GROUP = REMOVE_USER_FROM_GROUP;
exports.removeUserFromGroup = removeUserFromGroup;


var UPDATE_USER = 'updateuser';
var UPDATE_USER_SUCCESS = 'updateusersuccess';
var UPDATE_USER_ERROR = 'updateusererror';
var updateUserSuccess = function(id,user) {
  return {
    type:UPDATE_USER_SUCCESS,
    user:user,
    id:id
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
    fetch('/api/user/update', {
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
        updateUserSuccess(id,user)
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

var addUserSuccess = function(user) {
  return {
    type:ADD_USER_SUCCESS,
    user:user
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
    fetch('/api/user/add', {
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
        addUserSuccess(user)
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
    return fetch('/api/user/delete', {
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
  console.log('deleteUsers',users);
  return function(dispatch) {
    return fetch('/api/users/delete', {
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
  console.log('activate',users);
  return function(dispatch) {
    return fetch('/api/users/activate', {
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
  console.log('activate',users);
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
