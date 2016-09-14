var USERS_ACTIVATE = '/users/activate/';
var USERS_DEACTIVATE = '/users/deactivate/';
var USER_DELETE = '/user/delete/';
var USER_REMOVE = '/user/remove/';
var USER_REMOVE_FROM_GROUP = `${USER_REMOVE}group/`;
var USERS_DELETE = '/users/delete/';
var USER_UPDATE = '/user/update';
var USER_GROUPS = '/user/groups/';
var API = '/api';

module.exports = {
  paginateUsers:15,
  endpoints:{
    ADD_USER:'/user/add/',

    UPDATE_USER:'/update/user/',

    GROUPS:'/groups/',

    USERS_ACTIVATE:USERS_ACTIVATE,
    API_USERS_ACTIVATE:`${API}${USERS_ACTIVATE}`,

    USERS_DEACTIVATE:USERS_DEACTIVATE,
    API_USERS_DEACTIVATE:`${API}${USERS_DEACTIVATE}`,

    USER_DELETE:USER_DELETE,
    API_USER_DELETE:`${API}${USER_DELETE}`,

    USERS_DELETE:USERS_DELETE,
    API_USERS_DELETE:`${API}${USERS_DELETE}`,

    USER_UPDATE:USER_UPDATE,
    API_USER_UPDATE:`${API}${USER_UPDATE}`,

    API_USER_ADD:`${API}/user/add`,

    API_ROLES:`${API}/roles`,

    USER_GROUPS:'USER_GROUPS',
    API_USER_GROUPS:`${API}${USER_GROUPS}`,

    API_USERS:`${API}/users`,

    USER_REMOVE:USER_REMOVE,
    USER_REMOVE_FROM_GROUP:USER_REMOVE_FROM_GROUP,
    API_REMOVE_USER_FROM_GROUP:`${API}${USER_REMOVE_FROM_GROUP}`
  }
};
