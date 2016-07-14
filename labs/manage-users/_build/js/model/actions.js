require('isomorphic-fetch');

var UPDATE_USER = 'updateuser';
var updateUser = function(id,user) {
  return {
    type:UPDATE_USER,
    id:id,
    user:user
  }
}

exports.UPDATE_USER = UPDATE_USER;
exports.updateUser = updateUser;


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




var ADD_USER = 'adduser';
var ADD_USER_SUCCESS = 'addusersuccess';
var ADD_USER_ERROR = 'addusererror';

var addUserSuccess = function(user) {
  console.log(ADD_USER_SUCCESS, user);
  return {
    type:ADD_USER_SUCCESS,
    user:user
  }
}

var addUserError = function(user) {
  console.log(ADD_USER_ERROR, user);
  return {
    type:ADD_USER_ERROR,
    user:user
  }
}

var addUser = (user) => (
  (dispatch) => (
    fetch('/api/add/user', {
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
