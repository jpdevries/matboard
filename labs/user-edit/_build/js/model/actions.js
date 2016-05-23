var UPDATE_USER = 'updateuser';
var updateUser = function(user) {
  return {
    type:UPDATE_USER,
    user:user
  }
};

exports.UPDATE_USER = UPDATE_USER;
exports.updateUser = updateUser;


var ADD_USER = 'adduser';
var addUser = function(user) {
  return {
    type:ADD_USER,
    user:user
  }
};

exports.ADD_USER = ADD_USER;
exports.addUser = addUser;



var UPDATE_META = 'updatemeta';
var updateMeta = function(meta) {
  return {
    type:UPDATE_META,
    meta:meta
  }
};

exports.UPDATE_META = UPDATE_META;
exports.updateMeta = updateMeta;

var UPDATE_BIO = 'updatebio';
var updateBio = function(bio) {
  return {
    type:UPDATE_BIO,
    bio:bio
  }
};

exports.UPDATE_BIO = UPDATE_BIO;
exports.updateBio = updateBio;

var UPDATE_STATUS = 'updatestatus';
var updateStatus = function(status) {
  return {
    type:UPDATE_STATUS,
    status:status
  }
};

exports.UPDATE_STATUS = UPDATE_STATUS;
exports.updateStatus = updateStatus;

var UPDATE_ACCESS = 'updateaccess';
var updateAccess = function(access) {
  console.log('updateAccess');
  return {
    type:UPDATE_ACCESS,
    access:access
  }
};

exports.UPDATE_ACCESS = UPDATE_ACCESS;
exports.updateAccess = updateAccess;


var UPDATE_ACCESS_DATE = 'updateaccessdate';
var updateAccessDate = function(key,value) {
  console.log('updateAccessDate',key,value);
  return {
    type:UPDATE_ACCESS_DATE,
    value:value,
    key:key
  }
};

exports.UPDATE_ACCESS_DATE = UPDATE_ACCESS_DATE;
exports.updateAccessDate = updateAccessDate;


var UPDATE_SECURITY = 'updatesecurity';
var updateSecurity = function(security) {
  return {
    type:UPDATE_SECURITY,
    security:security
  }
};

exports.UPDATE_SECURITY = UPDATE_SECURITY;
exports.updateSecurity = updateSecurity;

var UPDATE_CONTACT = 'updatecontact';
var updateContact = function(contact) {
  return {
    type:UPDATE_CONTACT,
    contact:contact
  }
};

exports.UPDATE_CONTACT = UPDATE_CONTACT;
exports.updateContact = updateContact;


var NEW_SETTING = 'newsetting';
var newSetting = function(setting) {
  return {
    type:NEW_SETTING,
    setting:setting
  }
};

exports.NEW_SETTING = NEW_SETTING;
exports.newSetting = newSetting;


var UPDATE_MEMO = 'updatememo';
var updateMemo = function(memo) {
  return {
    type:UPDATE_MEMO,
    memo:memo
  }
};

exports.UPDATE_MEMO = UPDATE_MEMO;
exports.updateMemo = updateMemo;

var ADD_USER_TO_USER_GROUP = 'addusertousergroup';
var addUserToUserGroup = function(userGroup,role) {
  return {
    type:ADD_USER_TO_USER_GROUP,
    userGroup:userGroup,
    role:role
  };
};

exports.ADD_USER_TO_USER_GROUP = ADD_USER_TO_USER_GROUP;
exports.addUserToUserGroup = addUserToUserGroup;


var ADD_TEMPLATE = 'addtemplate';
var addTemplate = function(template) {
  return {
    type:ADD_TEMPLATE,
    template:template
  };
};

exports.ADD_TEMPLATE = ADD_TEMPLATE;
exports.addTemplate = addTemplate;



var ADD_NAMESPACE = 'addnamespace';
var addNamespace = function(namespace) {
  console.log(namespace);
  return {
    type:ADD_NAMESPACE,
    namespace:namespace
  };
};

exports.ADD_NAMESPACE = ADD_NAMESPACE;
exports.addNamespace = addNamespace;
