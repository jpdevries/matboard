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
var addUser = function(user) {
  return {
    type:ADD_USER,
    user:user
  }
}

exports.ADD_USER = ADD_USER;
exports.addUser = addUser;
