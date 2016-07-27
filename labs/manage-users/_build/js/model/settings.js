var USERS_ACTIVATE = '/users/activate/';
var USERS_DEACTIVATE = '/users/deactivate/';
var USER_DELETE = '/user/delete/';
var USERS_DELETE = '/users/delete/';
var USER_UPDATE = '/user/update';
var USER_GROUPS = '/user/groups/';

module.exports = {
  paginateUsers:12,
  endpoints:{
    ADD_USER:'/user/add/',

    UPDATE_USER:'/update/user/',

    GROUPS:'/groups/',

    USERS_ACTIVATE:USERS_ACTIVATE,
    API_USERS_ACTIVATE:`/api${USERS_ACTIVATE}`,

    USERS_DEACTIVATE:USERS_DEACTIVATE,
    API_USERS_DEACTIVATE:`/api${USERS_DEACTIVATE}`,

    USER_DELETE:USER_DELETE,
    API_USER_DELETE:`/api${USER_DELETE}`,

    USERS_DELETE:USERS_DELETE,
    API_USERS_DELETE:`/api${USERS_DELETE}`,

    USER_UPDATE:USER_UPDATE,
    API_USER_UPDATE:`/api${USER_UPDATE}`,

    API_USER_ADD:'/api/user/add',

    API_ROLES:'/api/roles',

    USER_GROUPS:'USER_GROUPS',
    API_USER_GROUPS:`/api${USER_GROUPS}`,

    API_USERS:'/api/users'
  }
};
