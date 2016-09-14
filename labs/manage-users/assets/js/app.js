/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (!Array.prototype.includes) {
	  Array.prototype.includes = function (searchElement /*, fromIndex*/) {
	    'use strict';

	    var O = Object(this);
	    var len = parseInt(O.length, 10) || 0;
	    if (len === 0) {
	      return false;
	    }
	    var n = parseInt(arguments[1], 10) || 0;
	    var k;
	    if (n >= 0) {
	      k = n;
	    } else {
	      k = len + n;
	      if (k < 0) {
	        k = 0;
	      }
	    }
	    var currentElement;
	    while (k < len) {
	      currentElement = O[k];
	      if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
	        // NaN !== NaN
	        return true;
	      }
	      k++;
	    }
	    return false;
	  };
	}

	var manageUsers = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function () {
	  var app = new manageUsers.ManageUsers();
	  document.querySelector('html').classList.add('react');
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _redux = __webpack_require__(2);

	var _reactRedux = __webpack_require__(3);

	var actions = __webpack_require__(4);
	var store = __webpack_require__(8);

	var ManageUsersForm = __webpack_require__(18);

	var ManageUsers = function ManageUsers() {
	  store.subscribe(function () {
	    console.log(store.getState());
	  });

	  /*store.dispatch(actions.addUserGroup({
	    title:'modmore'
	  }));
	   store.dispatch(actions.addUser({
	    username:'marcjenkins',
	    givenName:'Marc',
	    familyName:'Jenkins',
	    email:'marc@modmore.com',
	    active:true,
	    sudo:true,
	    jobTitle:'Marketing Director',
	    userGroups:[1]
	  }));*/

	  //store.dispatch(actions.addUserToGroup(0,2));

	  var ManageUsersFormController = (0, _reactRedux.connect)(function (state, props) {
	    return {
	      quickCreate: state.quickCreate,
	      users: state.users.sort(function (a, b) {
	        return (// sort alphabetically
	          a.username > b.username ? 1 : -1
	        );
	      }),
	      userGroups: state.userGroups,
	      roles: state.roles,
	      viewProps: state.viewProps
	    };
	  })(ManageUsersForm);

	  ReactDOM.render(React.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    React.createElement(ManageUsersFormController, null)
	  ), document.getElementById('manage-users-form'));
	};

	exports.ManageUsers = ManageUsers;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Redux;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactRedux;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(5);

	var settings = __webpack_require__(7),
	    endpoints = settings.endpoints;

	var UPDATE_QUICKCREATE = 'update_quickcreate';
	var updateQuickCreate = function updateQuickCreate(quickCreate) {
	  return {
	    type: UPDATE_QUICKCREATE,
	    quickCreate: quickCreate
	  };
	};

	exports.UPDATE_QUICKCREATE = UPDATE_QUICKCREATE;
	exports.updateQuickCreate = updateQuickCreate;

	var ADD_USER_GROUP = 'addusergroup';
	var addUserGroup = function addUserGroup(userGroup) {
	  return {
	    type: ADD_USER_GROUP,
	    userGroup: userGroup
	  };
	};

	exports.ADD_USER_GROUP = ADD_USER_GROUP;
	exports.addUserGroup = addUserGroup;

	var ADD_USER_TO_GROUP = 'addusertogroup';
	var addUserToGroup = function addUserToGroup(user, group) {
	  return {
	    type: ADD_USER_TO_GROUP,
	    id: user,
	    group: group
	  };
	};

	exports.ADD_USER_TO_GROUP = ADD_USER_TO_GROUP;
	exports.addUserToGroup = addUserToGroup;

	var removeUserFromGroup = function removeUserFromGroup(user, group) {
	  return function (dispatch) {
	    return fetch(endpoints.API_REMOVE_USER_FROM_GROUP, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        user: user,
	        group: group
	      })
	    }).then(function (response) {
	      if (response.state < 200 || response.state >= 300) {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	      }
	      return response;
	    }).then(function (response) {
	      return response.json();
	    }).then(function (data) {
	      return dispatch(removeUserFromGroupSuccess(user, group));
	    }).catch(function (error) {
	      return dispatch(removeUserFromGroupError(user, group));
	    });
	  };
	};

	var REMOVE_USER_FROM_GROUP_SUCCESS = 'removeuserfromgroupsuccess';
	var removeUserFromGroupSuccess = function removeUserFromGroupSuccess(user, group) {
	  return {
	    type: REMOVE_USER_FROM_GROUP_SUCCESS,
	    id: user,
	    group: group
	  };
	};

	var REMOVE_USER_FROM_GROUP_ERROR = 'removeuserfromgrouperror';
	var removeUserFromGroupError = function removeUserFromGroupError(user, group) {
	  return {
	    type: REMOVE_USER_FROM_GROUP_ERROR,
	    id: user,
	    group: group
	  };
	};

	exports.REMOVE_USER_FROM_GROUP_SUCCESS = REMOVE_USER_FROM_GROUP_SUCCESS;
	exports.REMOVE_USER_FROM_GROUP_ERROR = REMOVE_USER_FROM_GROUP_ERROR;
	exports.removeUserFromGroup = removeUserFromGroup;

	var deleteUserError = function deleteUserError(user) {
	  return {
	    type: ADD_USER_ERROR,
	    user: user,
	    id: user.id
	  };
	};

	var UPDATE_USER = 'updateuser';
	var UPDATE_USER_SUCCESS = 'updateusersuccess';
	var UPDATE_USER_ERROR = 'updateusererror';
	var updateUserSuccess = function updateUserSuccess(id, user, data) {
	  return {
	    type: UPDATE_USER_SUCCESS,
	    user: user,
	    id: id,
	    data: data
	  };
	};

	var updateUserError = function updateUserError(id, user) {
	  return {
	    type: UPDATE_USER_ERROR,
	    user: user,
	    id: id
	  };
	};

	var updateUser = function updateUser(id, user) {
	  return function (dispatch) {
	    return fetch(endpoints.API_USER_UPDATE, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(user)
	    }).then(function (response) {
	      if (response.state < 200 || response.state >= 300) {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	      }
	      return response;
	    }).then(function (response) {
	      return response.json();
	    }).then(function (data) {
	      return dispatch(updateUserSuccess(id, user, data));
	    }).catch(function (error) {
	      return dispatch(updateUserError(id, user));
	    });
	  };
	};

	exports.UPDATE_USER = UPDATE_USER;
	exports.UPDATE_USER_SUCCESS = UPDATE_USER_SUCCESS;
	exports.UPDATE_USER_ERROR = UPDATE_USER_ERROR;
	exports.updateUser = updateUser;

	var ADD_USER = 'adduser';
	var ADD_USER_SUCCESS = 'addusersuccess';
	var ADD_USER_ERROR = 'addusererror';

	var addUserSuccess = function addUserSuccess(user, data) {
	  return {
	    type: ADD_USER_SUCCESS,
	    user: user,
	    data: data
	  };
	};

	var addUserError = function addUserError(user) {
	  return {
	    type: ADD_USER_ERROR,
	    user: user
	  };
	};

	var addUser = function addUser(user) {
	  return function (dispatch) {
	    return fetch(endpoints.API_USER_ADD, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(user)
	    }).then(function (response) {
	      if (response.state < 200 || response.state >= 300) {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	      }
	      return response;
	    }).then(function (response) {
	      return response.json();
	    }).then(function (data) {
	      return dispatch(addUserSuccess(user, data));
	    }).catch(function (error) {
	      return dispatch(addUserError(user));
	    });
	  };
	};

	exports.ADD_USER_SUCCESS = ADD_USER_SUCCESS;
	exports.ADD_USER_ERROR = ADD_USER_ERROR;
	exports.addUser = addUser;

	var DELETE_USER = 'deleteuser';
	var DELETE_USER_SUCCESS = 'deleteusersuccess';
	var DELETE_USER_ERROR = 'deleteusererror';

	var deleteUserSuccess = function deleteUserSuccess(user) {
	  return {
	    type: DELETE_USER_SUCCESS,
	    user: user,
	    id: user.id
	  };
	};

	var deleteUserError = function deleteUserError(user) {
	  return {
	    type: ADD_USER_ERROR,
	    user: user,
	    id: user.id
	  };
	};

	var deleteUser = function deleteUser(user) {
	  return function (dispatch) {
	    return fetch(endpoints.API_USER_DELETE, {
	      method: 'DELETE',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(user)
	    }).then(function (response) {
	      if (response.state < 200 || response.state >= 300) {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	      }
	      return response;
	    }).then(function (response) {
	      return response.json();
	    }).then(function (data) {
	      return dispatch(deleteUserSuccess(user));
	    }).catch(function (error) {
	      return dispatch(deleteUserError(user));
	    });
	  };
	};

	exports.DELETE_USER_SUCCESS = DELETE_USER_SUCCESS;
	exports.DELETE_USER_ERROR = DELETE_USER_ERROR;
	exports.deleteUser = deleteUser;

	var DELETE_USERS = 'deleteusers';
	var DELETE_USERS_SUCCESS = 'deleteuserssuccess';
	var DELETE_USERS_ERROR = 'deleteuserserror';

	var deleteUsersSuccess = function deleteUsersSuccess(users) {
	  return {
	    type: DELETE_USERS_SUCCESS,
	    users: users
	  };
	};

	var deleteUsersError = function deleteUsersError(users) {
	  return {
	    type: DELETE_USERS_ERROR,
	    users: users
	  };
	};

	var deleteUsers = function deleteUsers(users) {
	  //console.log('deleteUsers',users);
	  return function (dispatch) {
	    return fetch(endpoints.API_USERS_DELETE, {
	      method: 'DELETE',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        users: users
	      })
	    }).then(function (response) {
	      if (response.state < 200 || response.state >= 300) {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	      }
	      return response;
	    }).then(function (response) {
	      return response.json();
	    }).then(function (data) {
	      return dispatch(deleteUsersSuccess(users));
	    }).catch(function (error) {
	      return dispatch(deleteUsersError(users));
	    });
	  };
	};

	exports.DELETE_USERS_SUCCESS = DELETE_USERS_SUCCESS;
	exports.DELETE_USERS_ERROR = DELETE_USERS_ERROR;
	exports.deleteUsers = deleteUsers;

	var ACTIVATE_USERS = 'activateusers';
	var ACTIVATE_USERS_SUCCESS = 'activateuserssuccess';
	var ACTIVATE_USERS_ERROR = 'activateuserserror';

	var activateUsersSuccess = function activateUsersSuccess(users) {
	  return {
	    type: ACTIVATE_USERS_SUCCESS,
	    users: users
	  };
	};

	var activateUsersError = function activateUsersError(users) {
	  return {
	    type: ACTIVATE_USERS_ERROR,
	    users: users
	  };
	};

	var activateUsers = function activateUsers(users) {
	  //console.log('activate',users);
	  return function (dispatch) {
	    return fetch(endpoints.API_USERS_ACTIVATE, {
	      method: 'post',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        users: users
	      })
	    }).then(function (response) {
	      if (response.state < 200 || response.state >= 300) {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	      }
	      return response;
	    }).then(function (response) {
	      return response.json();
	    }).then(function (data) {
	      return dispatch(activateUsersSuccess(users));
	    }).catch(function (error) {
	      return dispatch(activateUsersError(users));
	    });
	  };
	};

	exports.ACTIVATE_USERS_SUCCESS = ACTIVATE_USERS_SUCCESS;
	exports.ACTIVATE_USERS_ERROR = ACTIVATE_USERS_ERROR;
	exports.activateUsers = activateUsers;

	var DEACTIVATE_USERS = 'deactivateusers';
	var DEACTIVATE_USERS_SUCCESS = 'deactivateuserssuccess';
	var DEACTIVATE_USERS_ERROR = 'deactivateuserserror';

	var deactivateUsersSuccess = function deactivateUsersSuccess(users) {
	  return {
	    type: DEACTIVATE_USERS_SUCCESS,
	    users: users
	  };
	};

	var deactivateUsersError = function deactivateUsersError(users) {
	  return {
	    type: DEACTIVATE_USERS_ERROR,
	    users: users
	  };
	};

	var deactivateUsers = function deactivateUsers(users) {
	  //console.log('activate',users);
	  return function (dispatch) {
	    return fetch('/api/users/deactivate', {
	      method: 'post',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        users: users
	      })
	    }).then(function (response) {
	      if (response.state < 200 || response.state >= 300) {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	      }
	      return response;
	    }).then(function (response) {
	      return response.json();
	    }).then(function (data) {
	      return dispatch(deactivateUsersSuccess(users));
	    }).catch(function (error) {
	      return dispatch(deactivateUsersError(users));
	    });
	  };
	};

	exports.DEACTIVATE_USERS_SUCCESS = DEACTIVATE_USERS_SUCCESS;
	exports.DEACTIVATE_USERS_ERROR = DEACTIVATE_USERS_ERROR;
	exports.deactivateUsers = deactivateUsers;

	var SET_ROLES = 'setroles';
	var setRoles = function setRoles(roles) {
	  return {
	    type: SET_ROLES,
	    roles: roles
	  };
	};

	exports.SET_ROLES = SET_ROLES;
	exports.setRoles = setRoles;

	var SET_USER_GROUPS = 'setusergroups';
	var setUserGroups = function setUserGroups(userGroups) {
	  return {
	    type: SET_USER_GROUPS,
	    userGroups: userGroups
	  };
	};

	exports.SET_USER_GROUPS = SET_USER_GROUPS;
	exports.setUserGroups = setUserGroups;

	var QUICKCREATE_ROLE_ADD = "quickcreateroleadd";
	var quickCreateRoleAdd = function quickCreateRoleAdd(group, role) {
	  return {
	    type: QUICKCREATE_ROLE_ADD,
	    group: group,
	    role: role
	  };
	};

	exports.QUICKCREATE_ROLE_ADD = QUICKCREATE_ROLE_ADD;
	exports.quickCreateRoleAdd = quickCreateRoleAdd;

	var QUICKCREATE_ROLE_REMOVE = "quickcreateroleremove";
	var quickCreateRoleRemove = function quickCreateRoleRemove(group, role) {
	  return {
	    type: QUICKCREATE_ROLE_REMOVE,
	    group: group,
	    role: role
	  };
	};

	exports.QUICKCREATE_ROLE_REMOVE = QUICKCREATE_ROLE_REMOVE;
	exports.quickCreateRoleRemove = quickCreateRoleRemove;

	var FLUSH_QUICK_CREATE = 'flushquickcreate';
	var flushQuickCreate = function flushQuickCreate() {
	  var quickCreate = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return {
	    type: FLUSH_QUICK_CREATE,
	    quickCreate: quickCreate
	  };
	};

	exports.FLUSH_QUICK_CREATE = FLUSH_QUICK_CREATE;
	exports.flushQuickCreate = flushQuickCreate;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(6);
	module.exports = self.fetch.bind(self);


/***/ },
/* 6 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var USERS_ACTIVATE = '/users/activate/';
	var USERS_DEACTIVATE = '/users/deactivate/';
	var USER_DELETE = '/user/delete/';
	var USER_REMOVE = '/user/remove/';
	var USER_REMOVE_FROM_GROUP = USER_REMOVE + 'group/';
	var USERS_DELETE = '/users/delete/';
	var USER_UPDATE = '/user/update';
	var USER_GROUPS = '/user/groups/';
	var API = '/api';

	module.exports = {
	  paginateUsers: 15,
	  endpoints: {
	    ADD_USER: '/user/add/',

	    UPDATE_USER: '/update/user/',

	    GROUPS: '/groups/',

	    USERS_ACTIVATE: USERS_ACTIVATE,
	    API_USERS_ACTIVATE: '' + API + USERS_ACTIVATE,

	    USERS_DEACTIVATE: USERS_DEACTIVATE,
	    API_USERS_DEACTIVATE: '' + API + USERS_DEACTIVATE,

	    USER_DELETE: USER_DELETE,
	    API_USER_DELETE: '' + API + USER_DELETE,

	    USERS_DELETE: USERS_DELETE,
	    API_USERS_DELETE: '' + API + USERS_DELETE,

	    USER_UPDATE: USER_UPDATE,
	    API_USER_UPDATE: '' + API + USER_UPDATE,

	    API_USER_ADD: API + '/user/add',

	    API_ROLES: API + '/roles',

	    USER_GROUPS: 'USER_GROUPS',
	    API_USER_GROUPS: '' + API + USER_GROUPS,

	    API_USERS: API + '/users',

	    USER_REMOVE: USER_REMOVE,
	    USER_REMOVE_FROM_GROUP: USER_REMOVE_FROM_GROUP,
	    API_REMOVE_USER_FROM_GROUP: '' + API + USER_REMOVE_FROM_GROUP
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redux = __webpack_require__(2);
	var createStore = redux.createStore;
	var applyMiddleware = redux.applyMiddleware;
	var thunk = __webpack_require__(9).default;

	var reducers = __webpack_require__(10);

	var store = createStore(reducers.manageUsersReducer, applyMiddleware(thunk));

	module.exports = store;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	function createThunkMiddleware(extraArgument) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch;
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === 'function') {
	          return action(dispatch, getState, extraArgument);
	        }

	        return next(action);
	      };
	    };
	  };
	}

	var thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;

	exports['default'] = thunk;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var actions = __webpack_require__(4);
	var combineReducers = __webpack_require__(2).combineReducers;
	var update = __webpack_require__(11);

	var initialViewProps = {
	  pageType: function () {
	    try {
	      return document.querySelector('body').getAttribute('data-page-type') || 'summary';
	    } catch (e) {}
	    return 'summary';
	  }(),
	  showFilterBy: function () {
	    try {
	      return document.querySelector('body').getAttribute('data-show-filterby') != 'false';
	    } catch (e) {}
	    return true;
	  }()
	};

	var initialUserGroups = function () {
	  var userGroups = [];
	  try {
	    var userGroupSections = document.querySelectorAll('section.user-group');
	    for (var i = 0; i < userGroupSections.length; i++) {
	      var userGroup = userGroupSections[i],
	          id = parseInt(userGroup.getAttribute('data-user-group-id')),
	          slackChannel = userGroup.getAttribute('data-slackchannel'),
	          title = userGroup.querySelector('.name').innerHTML;
	      userGroups.push({
	        id: id,
	        title: title,
	        name: title,
	        slackChannel: slackChannel
	      });
	    }
	  } catch (e) {}
	  return userGroups;
	}();

	//console.log('initialUserGroups',initialUserGroups);

	var initialUsers = function () {
	  var users = [];
	  try {
	    var userRows = document.querySelectorAll('tr.user-row');
	    var addedUsers = [];
	    for (var i = 0; i < userRows.length; i++) {
	      var userRow = userRows[i],
	          userGroups = userRow.getAttribute('data-user-groups').split(',').map(function (groupId) {
	        return parseInt(groupId);
	      }),
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
	      Array.prototype.map.call(userRow.nextElementSibling.querySelectorAll('input[name="grouproles[]"]'), function (input) {
	        var group = input.getAttribute('data-group'),
	            role = input.getAttribute('data-role');

	        if (!groupRoles[group]) groupRoles[group] = [];
	        groupRoles[group].push(role);
	      });

	      if (!addedUsers[id]) users.push({
	        id: id,
	        username: username,
	        slack: slack,
	        givenName: givenName,
	        familyName: familyName,
	        email: email,
	        active: active,
	        sudo: sudo,
	        jobTitle: jobTitle,
	        userGroups: userGroups,
	        groupRoles: groupRoles, // #remove
	        roles: groupRoles
	      });
	      addedUsers[id] = true;
	    }
	  } catch (e) {}
	  return users;
	}();

	//console.log(initialUsers);

	var initialRoles = function () {
	  try {
	    return Array.prototype.map.call(document.querySelector('.create-setting-form .field-group fieldset fieldset').querySelectorAll('label'), function (fieldsetLabel) {
	      return {
	        name: fieldsetLabel.querySelector('span').innerHTML,
	        id: fieldsetLabel.querySelector('input').getAttribute('data-role-id'),
	        key: fieldsetLabel.querySelector('input').getAttribute('data-role-id')
	      };
	    });
	  } catch (e) {
	    return [];
	  }
	}();

	//console.log(initialRoles);

	var initialQuickCreate = {
	  username: '',
	  givenName: '',
	  familyName: '',
	  email: '',
	  active: true,
	  sudo: false,
	  open: false,
	  updating: false,
	  id: undefined,
	  roles: function () {
	    var o = {};
	    initialUserGroups.map(function (userGroup) {
	      return o[userGroup.id.toString()] = [];
	    });
	    return o;
	  }()
	};

	var initialState = {
	  users: initialUsers,
	  userGroups: initialUserGroups,
	  roles: initialRoles,
	  quickCreate: initialQuickCreate
	};

	//console.log('initialState',initialState);

	var usersReducer = function usersReducer(state, action) {
	  state = state || initialState.users;

	  var index = 0;
	  state.map(function (user, i) {
	    if (user.id == action.id) index = i;
	  });

	  switch (action.type) {
	    case actions.UPDATE_USER_SUCCESS:
	      //console.log(actions.UPDATE_USER_SUCCESS, action.user);
	      var newState = update(state, _defineProperty({}, index, { $apply: function $apply(user) {
	          return update(user, { $merge: action.user });
	        } }));
	      //console.log(state,newState);
	      return newState;
	      break;

	    case actions.ADD_USER_TO_GROUP:
	      return update(state, _defineProperty({}, index, { $apply: function $apply(user) {
	          return update(user, { $merge: {
	              userGroups: update(user.userGroups, { $push: [action.group] }),
	              roles: { $apply: function $apply(roles) {
	                  try {
	                    if (!roles[action.group]) update(roles, { $merge: _defineProperty({}, action.group, []) });
	                  } catch (e) {}
	                  return roles;
	                } }
	            } });
	        } }));
	      break;

	    case actions.REMOVE_USER_FROM_GROUP_SUCCESS:
	      //console.log(actions.REMOVE_USER_FROM_GROUP,state[index]);

	      return update(state, _defineProperty({}, index, { $apply: function $apply(user) {
	          return update(user, { $merge: {
	              userGroups: state[index].userGroups.map(function (group) {
	                return group !== action.group ? group : undefined;
	              }).filter(function (group) {
	                return group !== undefined;
	              }),
	              roles: Object.assign({}, state[index].roles, _defineProperty({}, action.group, []))
	            } });
	        } }));
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
	      if (action.user.id === undefined) {
	        var nextIndex = 0;
	        state.map(function (user, i) {
	          nextIndex = Math.max(user.id, nextIndex);
	        });
	        action.user.id = nextIndex + 1;
	      }
	      return update(state, { $push: [action.user] });

	    case actions.DELETE_USER_SUCCESS:
	      var newState = update(state, { $splice: [[index, 1]] });
	      return newState;

	    case actions.DELETE_USER_ERROR:
	      return state;

	    case actions.DELETE_USERS_SUCCESS:
	      return update(state, { $set: state.map(function (user, i) {
	          return !action.users.includes(user.id.toString()) ? user : undefined;
	        }).filter(function (user) {
	          return user !== undefined;
	        })
	      });

	    case actions.ACTIVATE_USERS_SUCCESS:
	      return update(state, { $set: state.map(function (user, i) {
	          return action.users.includes(user.id.toString()) ? update(user, { $merge: { active: true } }) : user;
	        })
	      });

	    case actions.DEACTIVATE_USERS_SUCCESS:
	      return update(state, { $set: state.map(function (user, i) {
	          return action.users.includes(user.id.toString()) ? update(user, { $merge: { active: false } }) : user;
	        })
	      });

	    default:
	      return state;
	  }
	};

	var quickCreateReducer = function quickCreateReducer(state, action) {
	  state = state || initialState.quickCreate;

	  switch (action.type) {
	    case actions.UPDATE_QUICKCREATE:
	      //console.log(actions.UPDATE_QUICKCREATE, update(state, {$merge:action.quickCreate}));
	      return update(state, { $merge: action.quickCreate });

	    case actions.QUICKCREATE_ROLE_ADD:
	      if (!state.roles[action.group]) state.roles[action.group] = [];
	      if (state.roles[action.group].includes(action.role)) break;
	      return update(state, { 'roles': { $apply: function $apply(roles) {
	            return update(roles, _defineProperty({}, action.group, { $apply: function $apply(group) {
	                return update(group, { $push: [action.role] });
	              } }));
	          } } });

	    case actions.QUICKCREATE_ROLE_REMOVE:
	      return update(state, { 'roles': { $apply: function $apply(roles) {
	            return update(roles, _defineProperty({}, action.group, { $apply: function $apply(group) {
	                return group.filter(function (role) {
	                  return role.toString() !== action.role.toString();
	                });
	              } }));
	          } } });

	    case actions.FLUSH_QUICK_CREATE:
	      //console.log('action.quickCreate',action.quickCreate,update(initialQuickCreate,{$merge: action.quickCreate}));
	      return update(state, { $set: update(initialQuickCreate, { $merge: action.quickCreate }) });

	  }
	  return state;
	};

	var userGroupsReducer = function userGroupsReducer(state, action) {
	  state = state || initialState.userGroups;
	  //return state;
	  switch (action.type) {
	    case actions.ADD_USER_GROUP:
	      if (action.userGroup.id === undefined) {
	        var nextIndex = 0;
	        state.map(function (userGroup, i) {
	          nextIndex = Math.max(userGroup.id, nextIndex);
	        });
	        action.userGroup.id = nextIndex + 1;
	      }

	      return update(state, { $push: [action.userGroup] });

	    case actions.SET_USER_GROUPS:
	      return update(state, { $set: action.userGroups });
	  }
	  return state;
	};

	var rolesReducer = function rolesReducer(state, action) {
	  state = state || initialState.roles;

	  switch (action.type) {
	    case actions.SET_ROLES:
	      //console.log('setting roles',update(state, {$set:action.roles}));
	      return update(state, { $set: action.roles });
	  }

	  return state;
	};

	var viewPropsReducer = function viewPropsReducer(state, action) {
	  state = state || initialViewProps;
	  return state;
	};

	var manageUsersReducer = combineReducers({
	  quickCreate: quickCreateReducer,
	  users: usersReducer,
	  userGroups: userGroupsReducer,
	  roles: rolesReducer,
	  viewProps: viewPropsReducer
	});

	exports.manageUsersReducer = manageUsersReducer;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule update
	 */

	/* global hasOwnProperty:true */

	'use strict';

	var _prodInvariant = __webpack_require__(14),
	    _assign = __webpack_require__(15);

	var keyOf = __webpack_require__(16);
	var invariant = __webpack_require__(17);
	var hasOwnProperty = {}.hasOwnProperty;

	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return _assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}

	var COMMAND_PUSH = keyOf({ $push: null });
	var COMMAND_UNSHIFT = keyOf({ $unshift: null });
	var COMMAND_SPLICE = keyOf({ $splice: null });
	var COMMAND_SET = keyOf({ $set: null });
	var COMMAND_MERGE = keyOf({ $merge: null });
	var COMMAND_APPLY = keyOf({ $apply: null });

	var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];

	var ALL_COMMANDS_SET = {};

	ALL_COMMANDS_LIST.forEach(function (command) {
	  ALL_COMMANDS_SET[command] = true;
	});

	function invariantArrayCase(value, spec, command) {
	  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : _prodInvariant('1', command, value) : void 0;
	  var specValue = spec[command];
	  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. Did you forget to wrap your parameter in an array?', command, specValue) : _prodInvariant('2', command, specValue) : void 0;
	}

	/**
	 * Returns a updated shallow copy of an object without mutating the original.
	 * See https://facebook.github.io/react/docs/update.html for details.
	 */
	function update(value, spec) {
	  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : _prodInvariant('3', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : void 0;

	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : _prodInvariant('4', COMMAND_SET) : void 0;

	    return spec[COMMAND_SET];
	  }

	  var nextValue = shallowCopy(value);

	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : _prodInvariant('5', COMMAND_MERGE, mergeObj) : void 0;
	    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : _prodInvariant('6', COMMAND_MERGE, nextValue) : void 0;
	    _assign(nextValue, spec[COMMAND_MERGE]);
	  }

	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function (item) {
	      nextValue.push(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function (item) {
	      nextValue.unshift(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : _prodInvariant('7', COMMAND_SPLICE, value) : void 0;
	    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : _prodInvariant('8', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : void 0;
	    spec[COMMAND_SPLICE].forEach(function (args) {
	      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : _prodInvariant('8', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : void 0;
	      nextValue.splice.apply(nextValue, args);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : _prodInvariant('9', COMMAND_APPLY, spec[COMMAND_APPLY]) : void 0;
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }

	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }

	  return nextValue;
	}

	module.exports = update;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule reactProdInvariant
	 * 
	 */
	'use strict';

	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */

	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;

	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }

	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

	  throw error;
	}

	module.exports = reactProdInvariant;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function keyOf(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var actions = __webpack_require__(4);
	var store = __webpack_require__(8);

	var ManageUserFormHeader = __webpack_require__(19);
	var SettingsGridSection = __webpack_require__(24);

	var ManageUsersForm = React.createClass({
	  displayName: 'ManageUsersForm',

	  getInitialState: function getInitialState() {
	    return {
	      filter: undefined,
	      filterBy: undefined
	    };
	  },
	  handleFilterBy: function handleFilterBy(filterBy) {
	    this.setState({
	      filterBy: isNaN(filterBy) ? undefined : filterBy
	    });
	  },
	  linkUsers: function linkUsers(users) {
	    var linkedUsers = [];
	    for (var i = 0; i < users.length; i++) {
	      linkedUsers.push(Object.assign({}, users[i], {
	        nextUser: i < users.length - 1 && users[i + 1] ? users[i + 1] : undefined
	      }));
	    }

	    return linkedUsers;
	  },
	  render: function render() {
	    var _this = this;

	    var props = this.props,
	        expanded = this.state.filterBy !== undefined;

	    var sections = props.userGroups.filter(function (userGroup) {
	      return _this.state.filterBy === undefined ? true : _this.state.filterBy == userGroup.id;
	    }).map(function (userGroup) {
	      return React.createElement(SettingsGridSection, { bulkActions: true, viewProps: props.viewProps, userGroup: userGroup, key: userGroup.id, expanded: expanded, filter: _this.state.filter, handleFilterBy: _this.handleFilterBy, users: _this.linkUsers(props.users.filter(function (user) {
	          return user.userGroups.includes(userGroup.id);
	        })), title: userGroup.title });
	    });

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { id: 'manage-user-form__header' },
	        React.createElement(ManageUserFormHeader, { filterBy: this.state.filterBy, viewProps: props.viewProps, roles: props.roles, userGroups: props.userGroups, quickCreate: props.quickCreate, handleFilterBy: this.handleFilterBy, handleFilter: function handleFilter(filter) {
	            return _this.setState({
	              filter: filter.length ? filter : undefined
	            });
	          } })
	      ),
	      React.createElement(
	        'div',
	        { id: 'fold', className: 'settings-grid' },
	        sections
	      )
	    );
	  }
	});

	module.exports = ManageUsersForm;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var actions = __webpack_require__(4);
	var store = __webpack_require__(8);
	var ReactFormData = __webpack_require__(20);
	var QuickCreateFieldset = __webpack_require__(22);
	var update = __webpack_require__(11);

	var settings = __webpack_require__(7),
	    endpoints = settings.endpoints;

	var CreateSettingsForm = React.createClass({
	  displayName: 'CreateSettingsForm',

	  mixins: [ReactFormData],
	  getInitialState: function getInitialState() {
	    return {
	      quickCreateOpen: false,
	      formMethod: ''
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    store.subscribe(function () {
	      _this.setState({ quickCreateOpen: store.getState().quickCreate.open });
	    });
	  },
	  handleDeleteUser: function handleDeleteUser(event) {
	    //console.log('handleDeleteUser',event);
	    this.setState({ formMethod: 'delete' });
	  },
	  render: function render() {
	    var _this2 = this;

	    var props = this.props;
	    //console.log(props);
	    var quickCreateUserBtn = this.state.quickCreateOpen ? false : React.createElement(
	      'a',
	      { href: endpoints.ADD_USER, className: 'button', onClick: function onClick(event) {
	          event.preventDefault();
	          store.dispatch(actions.updateQuickCreate({ open: true }));
	        } },
	      'Quick ',
	      props.quickCreate.updating ? 'Update' : 'Create',
	      ' User'
	    );

	    var createUserBtn = this.state.quickCreateOpen ? React.createElement(
	      'button',
	      null,
	      'More Options'
	    ) : React.createElement(
	      'a',
	      { className: 'button', href: endpoints.ADD_USER },
	      'Create User'
	    );

	    var quickCreate = this.state.quickCreateOpen ? React.createElement(QuickCreateFieldset, _extends({}, props, { handleDeleteUser: this.handleDeleteUser })) : false;

	    return React.createElement(
	      'form',
	      { ref: 'createSettingForm', action: props.quickCreate.updating ? endpoints.UPDATE_USER + props.quickCreate.id : endpoints.ADD_USER, method: 'post', className: 'create-setting-form', onChange: this.updateFormData, onSubmit: function onSubmit(event) {
	          event.preventDefault();
	          //console.log('onSubmit',this.state.formMethod,props.quickCreate);

	          switch (_this2.state.formMethod) {
	            case 'delete':
	              store.dispatch(actions.deleteUser(update({}, { $merge: {
	                  user_id: props.quickCreate.id,
	                  id: props.quickCreate.id
	                } }))).then(function () {
	                return closeQuickCreate(_this2);
	              });
	              return;
	          }

	          var user = {};
	          var userGroups = [];

	          try {
	            // try to use modern FormData
	            var formData = new FormData(_this2.refs.createSettingForm);
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	              for (var _iterator = formData.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var pair = _step.value;

	                user[pair[0]] = pair[1];
	                if (pair[0].indexOf('-role') > -1) {
	                  userGroups.push(parseInt(pair[1].split('|')[0]));
	                }
	              }
	            } catch (err) {
	              _didIteratorError = true;
	              _iteratorError = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                  _iterator.return();
	                }
	              } finally {
	                if (_didIteratorError) {
	                  throw _iteratorError;
	                }
	              }
	            }
	          } catch (e) {
	            // fallback to react-form-data
	            //console.log(this.formData)
	            for (var key in _this2.formData) {
	              //console.log(key);
	              user[key] = _this2.formData[key];
	              if (key.indexOf('-role') > -1) {
	                _this2.formData[key].map(function (pair, index) {
	                  userGroups.push(parseInt(pair.split('|')[0]));
	                });
	              }
	            }
	          }

	          for (var group in props.quickCreate.roles) {
	            //console.log('group',group,props.quickCreate.roles[group]);
	            userGroups.push(parseInt(group));
	          }

	          userGroups = [].concat(_toConsumableArray(new Set(userGroups))); // remove duplicates

	          userGroups = userGroups.map(function (userGroup) {
	            return (// make sure sure sure they are numbers #consider changing
	              parseInt(userGroup)
	            );
	          });

	          //console.log('userGroups',userGroups);

	          userGroups = userGroups.filter(function (userGroup) {
	            return (// kinda weird to have to do this, expected userGroups to be removed, maybe a formData bug with the React mixin (polyfill)
	              props.quickCreate.roles[userGroup] !== undefined && props.quickCreate.roles[userGroup].length ? true : false
	            );
	          });

	          //console.log('userGroups',userGroups,'props.quickCreate.roles',props.quickCreate.roles);

	          var userParams = {
	            id: props.quickCreate.id,
	            username: props.quickCreate.username,
	            givenName: props.quickCreate.givenName,
	            familyName: props.quickCreate.familyName,
	            email: props.quickCreate.email,
	            active: props.quickCreate.active,
	            sudo: props.quickCreate.sudo,
	            roles: props.quickCreate.roles,
	            userGroups: userGroups
	          };

	          (props.quickCreate.updating ? store.dispatch(actions.updateUser(props.quickCreate.id, userParams)) : store.dispatch(actions.addUser(userParams))).then(function () {
	            return closeQuickCreate(_this2);
	          });

	          function closeQuickCreate(that) {
	            that.setState({ quickCreateOpen: false });
	            store.dispatch(actions.flushQuickCreate());
	          }
	        } },
	      React.createElement(
	        'div',
	        { className: 'top-bar' },
	        quickCreateUserBtn,
	        createUserBtn
	      ),
	      quickCreate
	    );
	  }
	});

	var ManageUserFormHeader = React.createClass({
	  displayName: 'ManageUserFormHeader',

	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    var _this3 = this;

	    var props = this.props;

	    //console.log('props.viewProps',props.viewProps);

	    var filterBuyOptions = props.userGroups.map(function (userGroup, index) {
	      return React.createElement(
	        'option',
	        { key: userGroup.id, value: userGroup.id },
	        userGroup.title
	      );
	    });

	    var filterByLabel = props.viewProps.showFilterBy ? React.createElement(
	      'label',
	      { htmlFor: 'filter-by', 'aria-hidden': true },
	      'Filter by: '
	    ) : false;

	    var filterBy = props.viewProps.showFilterBy ? React.createElement(
	      'select',
	      { 'aria-label': 'Filter Users by User Group', name: 'filter-by', id: 'filter-by', value: props.filterBy, onChange: function onChange(event) {
	          try {
	            props.handleFilterBy(parseInt(event.target.value));
	          } catch (e) {}
	        } },
	      React.createElement(
	        'option',
	        { checked: true, value: '' },
	        'All'
	      ),
	      filterBuyOptions
	    ) : false;

	    return React.createElement(
	      'header',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        'Manage Users'
	      ),
	      React.createElement(
	        'div',
	        { className: 'create-user-module' },
	        React.createElement(CreateSettingsForm, props)
	      ),
	      React.createElement('hr', { 'aria-hidden': true }),
	      React.createElement(
	        'div',
	        { role: 'search' },
	        React.createElement(
	          'h3',
	          { id: 'search' },
	          'Search Users'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'label',
	            { htmlFor: 'search-users' },
	            'Search for any User.'
	          ),
	          ' We’ll try and find them.'
	        ),
	        React.createElement(
	          'form',
	          { action: '#', id: 'search', className: 'search-settings' },
	          React.createElement(
	            'div',
	            { className: 'search-users-wrapper' },
	            React.createElement('input', { name: 'search-users', id: 'search-users', type: 'text', placeholder: 'carmensandiego', 'aria-labeledby': 'search', onChange: function onChange(event) {
	                try {
	                  _this3.props.handleFilter(event.target.value);
	                } catch (e) {}
	              } })
	          ),
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'button',
	              { type: 'submit' },
	              'Search'
	            )
	          ),
	          filterByLabel,
	          filterBy
	        )
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Below you will find users who have logged in recently per user group.'
	      ),
	      React.createElement('hr', { 'aria-hidden': true })
	    );
	  }
	});

	module.exports = ManageUserFormHeader;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);


/***/ },
/* 21 */
/***/ function(module, exports) {

	// Generated by CoffeeScript 1.9.1
	var getValue, isCheckbox, isMultiChoice, toggleValue;

	isCheckbox = function(el) {
	  return el.getAttribute('type') === 'checkbox';
	};

	isMultiChoice = function(checkbox) {
	  return checkbox.getAttribute('value') != null;
	};

	toggleValue = function(arr, val) {
	  var valueIndex;
	  valueIndex = arr.indexOf(val);
	  if (valueIndex !== -1) {
	    arr.splice(valueIndex, 1);
	  } else {
	    arr.push(val);
	  }
	  return arr;
	};

	getValue = function(el, currentValue) {
	  if (!isCheckbox(el)) {
	    return el.value;
	  } else {
	    if (isMultiChoice(el)) {
	      if (currentValue == null) {
	        currentValue = [];
	      }
	      return toggleValue(currentValue, el.value);
	    } else {
	      return el.checked;
	    }
	  }
	};

	module.exports = {
	  componentWillMount: function() {
	    if (this.getInitialFormData != null) {
	      return this.formData = this.getInitialFormData();
	    } else {
	      return this.formData = {};
	    }
	  },
	  updateFormData: function(e) {
	    var key, newValue, t;
	    t = e.target;
	    key = t.getAttribute('name');
	    if (key != null) {
	      newValue = getValue(t, this.formData[key]);
	      this.setFormData(key, newValue);
	      if (this.formDataDidChange != null) {
	        return this.formDataDidChange();
	      }
	    }
	  },
	  setFormData: function(key, value) {
	    return this.formData[key] = value;
	  },
	  clearFormData: function() {
	    return this.formData = {};
	  },
	  resetFormData: function(obj) {
	    this.clearFormData();
	    return Object.keys(obj).forEach((function(_this) {
	      return function(key) {
	        return _this.formData[key] = obj[key];
	      };
	    })(this));
	  }
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (!React) var React = __webpack_require__(23); // only require React if need be (server-side rendering)

	var actions = __webpack_require__(4),
	    store = __webpack_require__(8);

	var settings = __webpack_require__(7),
	    endpoints = settings.endpoints;

	var QuickCreateFieldset = function (_React$Component) {
	  _inherits(QuickCreateFieldset, _React$Component);

	  function QuickCreateFieldset() {
	    _classCallCheck(this, QuickCreateFieldset);

	    return _possibleConstructorReturn(this, (QuickCreateFieldset.__proto__ || Object.getPrototypeOf(QuickCreateFieldset)).apply(this, arguments));
	  }

	  _createClass(QuickCreateFieldset, [{
	    key: 'render',
	    value: function render() {

	      var props = this.props;
	      var userGroups = props.userGroups;
	      var roles = props.roles; // all the roles there are
	      var userGroupsMarkup = [];
	      var userRoles = props.quickCreate.roles; // an object containing what roles the user is in per group

	      //console.log('userGroups',userGroups);
	      //console.log('userRoles',userRoles);
	      try {
	        userGroups.map(function (group, index) {
	          var rolesMarkup = [];

	          roles.map(function (role, index) {
	            var roleChecked = function () {
	              try {
	                return userRoles[group.id].includes(role.id);
	              } catch (e) {
	                return false;
	              }
	            }();
	            rolesMarkup.push(React.createElement(
	              'label',
	              { key: index, htmlFor: 'user-group-' + group.id + '-roles[]' },
	              React.createElement('input', { type: 'checkbox', onChange: function onChange(event) {
	                  if (event.target.checked) {
	                    store.dispatch(actions.quickCreateRoleAdd(group.id, role.id));
	                  } else {
	                    store.dispatch(actions.quickCreateRoleRemove(group.id, role.id));
	                  }
	                }, checked: roleChecked, name: 'user-group-' + group.id + '-roles[]', value: group.id + '|' + role.id }),
	              ' ',
	              role.name
	            ));
	          });
	          userGroupsMarkup.push(React.createElement(
	            'fieldset',
	            { key: index },
	            React.createElement(
	              'legend',
	              null,
	              group.title || group.name
	            ),
	            rolesMarkup
	          ));
	        });
	      } catch (e) {}

	      var otherButtons = props.quickCreate.updating ? React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'button',
	            { type: 'submit', formaction: '/duplicate/user', formMethod: 'put' },
	            'Duplicate User'
	          ),
	          React.createElement(
	            'button',
	            { type: 'submit', onClick: this.props.handleDeleteUser, className: 'dangerous', formAction: endpoints.USER_DELETE, formMethod: 'post' },
	            'Delete User'
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'a',
	            { className: 'button', href: "mailto:" + props.quickCreate.email + "?subject=MODX%20Next" },
	            'Email User'
	          )
	        )
	      ) : false;

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'fieldset',
	          null,
	          React.createElement(
	            'legend',
	            null,
	            'Quick ',
	            props.quickCreate.updating ? 'Update' : 'Create',
	            ' User'
	          ),
	          React.createElement('input', { type: 'hidden', name: 'id', value: props.quickCreate.id }),
	          React.createElement(
	            'div',
	            { className: 'n quick-create-fields field-group' },
	            React.createElement(
	              'div',
	              { className: 'field-username' },
	              React.createElement(
	                'label',
	                { htmlFor: 'username', id: 'username-label' },
	                'Username'
	              ),
	              React.createElement('input', { type: 'text', autoComplete: 'off', value: props.quickCreate.username, disabled: props.quickCreate.updating, onChange: function onChange(event) {
	                  store.dispatch(actions.updateQuickCreate({
	                    username: event.target.value
	                  }));
	                }, ref: 'quickCreateUsername', autoFocus: !props.quickCreate.updating, 'aria-describedby': 'username-label', name: 'username', id: 'username', className: 'nickname', 'aria-required': 'true', 'aria-invalid': 'false', required: true })
	            ),
	            React.createElement(
	              'div',
	              { className: 'field-given-name' },
	              React.createElement(
	                'label',
	                { htmlFor: 'given-name' },
	                'First Name'
	              ),
	              React.createElement('input', { type: 'text', value: props.quickCreate.givenName, onChange: function onChange(event) {
	                  store.dispatch(actions.updateQuickCreate({
	                    givenName: event.target.value
	                  }));
	                }, ref: 'quickCreateGivenName', name: 'given-name', id: 'given-name', className: 'given-name' })
	            ),
	            React.createElement(
	              'div',
	              { className: 'field-family-name' },
	              React.createElement(
	                'label',
	                { htmlFor: 'family-name' },
	                'Last Name'
	              ),
	              React.createElement('input', { type: 'text', value: props.quickCreate.familyName, onChange: function onChange(event) {
	                  store.dispatch(actions.updateQuickCreate({
	                    familyName: event.target.value
	                  }));
	                }, ref: 'quickCreateFamilyName', name: 'family-name', id: 'family-name', className: 'family-name' })
	            ),
	            React.createElement(
	              'div',
	              { className: 'field-email' },
	              React.createElement(
	                'label',
	                { htmlFor: 'email' },
	                'Email'
	              ),
	              React.createElement('input', { type: 'email', value: props.quickCreate.email, autoFocus: props.quickCreate.updating, onChange: function onChange(event) {
	                  store.dispatch(actions.updateQuickCreate({
	                    email: event.target.value
	                  }));
	                }, ref: 'quickCreateEmail', name: 'email', id: 'email', className: 'email', 'aria-required': 'true', 'aria-invalid': 'false', required: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'field-group user-group-field user-status-field' },
	            React.createElement(
	              'div',
	              { className: 'field' },
	              React.createElement('input', { type: 'checkbox', checked: props.quickCreate.active, onChange: function onChange(event) {
	                  store.dispatch(actions.updateQuickCreate({
	                    active: event.target.checked
	                  }));
	                }, ref: 'quickCreateUserActive', name: 'user-active', id: 'user-active' }),
	              React.createElement(
	                'label',
	                { htmlFor: 'user-active' },
	                ' Active'
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'field' },
	              React.createElement('input', { type: 'checkbox', checked: props.quickCreate.sudo, onChange: function onChange(event) {
	                  store.dispatch(actions.updateQuickCreate({
	                    sudo: event.target.checked
	                  }));
	                }, ref: 'quickCreateUserSudo', name: 'user-sudo', id: 'user-sudo' }),
	              React.createElement(
	                'label',
	                { htmlFor: 'user-sudo' },
	                ' Sudo'
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'button-bar' },
	            React.createElement(
	              'div',
	              { className: 'balanced' },
	              React.createElement(
	                'button',
	                { className: 'comfortably', type: 'submit' },
	                props.quickCreate.updating ? 'Update' : 'Create',
	                ' User'
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'field-group' },
	            React.createElement(
	              'fieldset',
	              { className: 'field' },
	              React.createElement(
	                'legend',
	                null,
	                'User Permissions'
	              ),
	              React.createElement(
	                'p',
	                null,
	                'Users can belong to any number of User Groups. User are assigned Roles that define their priveldges as a member of the User Group. A user can belong to the same User Group with multiple roles.'
	              ),
	              React.createElement(
	                'div',
	                { className: 'user-group-roles' },
	                userGroupsMarkup
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'footer',
	          { className: 'balanced' },
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'button',
	              { className: 'comfortably', type: 'submit' },
	              props.quickCreate.updating ? 'Update' : 'Create',
	              ' User'
	            )
	          ),
	          otherButtons
	        )
	      );
	    }
	  }]);

	  return QuickCreateFieldset;
	}(React.Component);

	exports.default = QuickCreateFieldset;


	module.exports = QuickCreateFieldset;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var update = __webpack_require__(11);
	var store = __webpack_require__(8);
	var actions = __webpack_require__(4);
	var ReactFormData = __webpack_require__(20);

	var settings = __webpack_require__(7),
	    endpoints = settings.endpoints;

	function cssSafeName(name) {
	  return name.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').trim().replace(/ /g, '').toLowerCase();
	}

	// can't use this until a future version of React
	var SettingTableRowGroup = React.createClass({
	  displayName: 'SettingTableRowGroup',

	  getInitialState: function getInitialState() {
	    return {
	      showSettings: false
	    };
	  },
	  render: function render() {
	    var props = this.props;
	    var user = props.user;
	    return React.createElement(SettingsTableRow, { user: user, className: 'contextual-setting' });
	  }
	});

	var SettingsGridSectionBulkActionsFieldset = React.createClass({
	  displayName: 'SettingsGridSectionBulkActionsFieldset',

	  mixins: [ReactFormData],
	  getInitalState: function getInitalState() {
	    return {
	      formAction: '',
	      formMethod: 'push'
	    };
	  },
	  handleBulkButtonClick: function handleBulkButtonClick(event) {
	    this.setState({
	      formAction: event.target.getAttribute('formaction'),
	      formMethod: event.target.getAttribute('formmethod')
	    });
	  },
	  render: function render() {
	    var _this = this;

	    var props = this.props;
	    var bulkToggledUsers = props.bulkToggledUsers;

	    var hiddenBulkToggleInputs = [],
	        bulkSelectedUsers = [];
	    Object.keys(bulkToggledUsers).forEach(function (key) {
	      if (bulkToggledUsers[key]) {
	        bulkSelectedUsers.push(key.toString());
	        hiddenBulkToggleInputs.push(React.createElement('input', { key: key, type: 'hidden', name: 'bulk-toggle-users[]', value: key }));
	      }
	    });

	    return React.createElement(
	      'form',
	      { action: '/bulk/actions', method: 'post', onChange: this.updateFormData, onSubmit: function onSubmit(event) {

	          /*try {
	            var formData = new FormData(event.target);
	            for(var pair of formData.entries()) {
	              console.log(pair);
	            }
	          } catch (e) {
	             console.log(this.formData);
	            for (var key in this.formData) {
	              console.log(key);
	            }
	          }*/

	          try {
	            switch (_this.state.formAction) {
	              case endpoints.API_USERS_ACTIVATE:
	                event.preventDefault();
	                store.dispatch(actions.activateUsers(bulkSelectedUsers));
	                break;

	              case endpoints.API_USERS_DEACTIVATE:
	                event.preventDefault();
	                store.dispatch(actions.deactivateUsers(bulkSelectedUsers));
	                break;

	              case endpoints.API_USERS_DELETE:
	                event.preventDefault();
	                store.dispatch(actions.deleteUsers(bulkSelectedUsers));
	                break;
	            }
	          } catch (e) {}
	        } },
	      hiddenBulkToggleInputs,
	      React.createElement(
	        'fieldset',
	        null,
	        React.createElement(
	          'legend',
	          { 'aria-label': 'Bulk Actions are conditionally enabled options such as activate, suspend, delete or email that can be executed on selected users.' },
	          'Bulk Actions'
	        ),
	        React.createElement(
	          'button',
	          { type: 'submit', 'aria-hidden': !props.emails.length, disabled: !props.emails.length, className: 'go', formAction: endpoints.API_USERS_ACTIVATE, formMethod: 'post', onClick: this.handleBulkButtonClick },
	          'Activate'
	        ),
	        React.createElement(
	          'button',
	          { type: 'submit', 'aria-hidden': !props.emails.length, disabled: !props.emails.length, className: 'danger', formAction: endpoints.API_USERS_DEACTIVATE, formMethod: 'post', onClick: this.handleBulkButtonClick },
	          'Suspend'
	        ),
	        React.createElement(
	          'button',
	          { type: 'submit', 'aria-hidden': !props.emails.length, disabled: !props.emails.length, className: 'danger', formAction: endpoints.API_USERS_DELETE, formMethod: 'delete', onClick: this.handleBulkButtonClick },
	          'Delete'
	        ),
	        React.createElement(
	          'a',
	          { className: 'button', 'aria-hidden': !props.emails.length, disabled: !props.emails.length, tabIndex: props.emails.length ? "0" : "-1", href: props.emails.length ? 'mailto:' + props.emails.join(',') + '?subject=MODX%20Next&body=' : undefined },
	          'Email'
	        ),
	        React.createElement(
	          'a',
	          { className: 'button', 'aria-hidden': !props.emails.length, disabled: !props.emails.length, tabIndex: props.emails.length ? "0" : "-1", href: props.emails.length ? 'https://' + props.slackChannel + '.slack.com/messages/@' + props.slackHandles.join(',') : undefined, target: '_blank' },
	          'Slack DM'
	        )
	      )
	    );
	  }
	});

	var SettingsTable = React.createClass({
	  displayName: 'SettingsTable',

	  getInitialState: function getInitialState() {
	    return {
	      userFormsToShow: {}
	    };
	  },
	  handleQuickEdit: function handleQuickEdit(user, event) {
	    event.preventDefault();
	    event.stopPropagation();
	    //console.log('handleQuickEdit!!!',user);
	  },
	  render: function render() {
	    var _this2 = this;

	    var props = this.props;

	    var bulkTh;
	    if (props.bulkActions) bulkTh = React.createElement(
	      'th',
	      null,
	      React.createElement('input', { type: 'checkbox', id: 'bulk-select-all-' + props.userGroup.id, onChange: function onChange(event) {
	          try {
	            _this2.props.handleBulkAllCheck(event.target.checked);
	          } catch (e) {}
	        } }),
	      ' ',
	      React.createElement(
	        'label',
	        { htmlFor: 'bulk-select-all-' + props.userGroup.id, className: 'accessibly-hidden' },
	        'Select all ',
	        props.userGroup.title,
	        ' Members'
	      )
	    );

	    var rows = props.users.map(function (user) {

	      return [React.createElement(SettingsTableRow, { user: user, pressed: _this2.state.userFormsToShow[user.id], userGroup: props.userGroup, bulkToggle: props.bulkToggledUsers[user.id] !== undefined ? props.bulkToggledUsers[user.id] : false, bulkActions: props.bulkActions,
	        handleFocus: function handleFocus(event) {
	          return _this2.setState({
	            userFormsToShow: update({}, _defineProperty({}, user.id, { $set: true }))
	          });
	        }, handleBulkToggle: function handleBulkToggle(id, checked) {
	          try {
	            props.handleBulkToggle(id, checked);
	          } catch (e) {}
	        }
	      }), _this2.state.userFormsToShow[user.id] ? React.createElement(SettingsTableRowForm, { handleNextBtnClicked: function handleNextBtnClicked(event) {
	          _this2.setState({
	            userFormsToShow: update({}, _defineProperty({}, user.id, { $set: false }))
	          });
	        }, slackChannel: props.userGroup.slackChannel, handleQuickEdit: _this2.handleQuickEdit.bind(null, user), className: 'contextual-setting', user: user, userGroup: props.userGroup, colspan: props.bulkActions ? "3" : "2" }) : false];
	    });

	    return React.createElement(
	      'table',
	      { className: 'settings-table' },
	      React.createElement(
	        'thead',
	        null,
	        React.createElement(
	          'tr',
	          null,
	          bulkTh,
	          React.createElement(
	            'th',
	            { className: 'username', 'aria-label': 'User Column' },
	            'User'
	          ),
	          React.createElement(
	            'th',
	            { 'aria-label': 'Active Column' },
	            'Active'
	          )
	        )
	      ),
	      React.createElement(
	        'tbody',
	        null,
	        rows
	      )
	    );
	  }
	});

	var SettingsGridSection = React.createClass({
	  displayName: 'SettingsGridSection',

	  getInitialState: function getInitialState() {
	    return {
	      bulkToggledUsers: {}
	    };
	  },
	  render: function render() {
	    var _this3 = this;

	    var props = this.props;
	    var users = props.users;
	    var minimumUsersBulkAction = props.minimumUsersBulkAction !== undefined ? props.minimumUsersBulkAction : 3;

	    var emails = users.map(function (user) {
	      return _this3.state.bulkToggledUsers[user.id] ? user.email : undefined;
	    }).filter(function (email) {
	      return email;
	    });

	    var slackHandles = users.map(function (user) {
	      return _this3.state.bulkToggledUsers[user.id] ? user.slack : undefined;
	    }).filter(function (slack) {
	      return slack;
	    });

	    if (props.filter !== undefined && props.filter.length) {
	      users = users.filter(function (user) {
	        if (user.username.indexOf(props.filter) > -1) return true;
	        return false;
	      });
	    }

	    var paginationAmount = settings.paginateUsers,
	        bulkActionsFieldset = users.length >= minimumUsersBulkAction ? React.createElement(SettingsGridSectionBulkActionsFieldset, { bulkToggledUsers: this.state.bulkToggledUsers, emails: emails, slackChannel: props.userGroup.slackChannel, slackHandles: slackHandles }) : false,
	        viewAll = this.props.expanded || this.props.viewProps.pageType == 'detail' ? false : users.length > paginationAmount ? React.createElement(
	      'footer',
	      null,
	      React.createElement(
	        'p',
	        null,
	        React.createElement(
	          'a',
	          { onClick: function onClick(event) {
	              event.preventDefault();
	              _this3.props.handleFilterBy(props.userGroup.id);
	            }, href: '' + endpoints.GROUPS + props.userGroup.id + '#fold' },
	          'View all ',
	          props.title,
	          ' users'
	        )
	      )
	    ) : false,
	        paginatedUsers = this.props.expanded || this.props.viewProps.pageType == 'detail' ? users : users.slice(0, paginationAmount);

	    return paginatedUsers.length ? React.createElement(
	      'section',
	      { id: "user-group-" + props.userGroup.id },
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'header',
	          null,
	          React.createElement(
	            'h2',
	            { id: cssSafeName(props.title), 'aria-label': props.title },
	            React.createElement(
	              'a',
	              { 'aria-hidden': true, className: 'subtle', href: '#' + cssSafeName(props.title), 'data-view-all-href': '' + endpoints.GROUPS + props.userGroup.id + '#fold' },
	              props.title
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'balanced' },
	          React.createElement(
	            'a',
	            { className: 'button', href: endpoints.ADD_USER + "?group=" + props.userGroup.id + "#fold", style: { marginBottom: "2em" }, onClick: function onClick(event) {
	                event.preventDefault();
	                store.dispatch(actions.flushQuickCreate({
	                  active: true,
	                  open: true,
	                  updating: false,
	                  roles: _defineProperty({}, props.userGroup.id, [store.getState().roles[0].id])
	                }));
	                window.scrollTo(0, 0);
	              } },
	            'Create ' + props.title + ' User'
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          bulkActionsFieldset,
	          React.createElement(SettingsTable, { slackChannel: props.userGroup.slackChannel, bulkActions: paginatedUsers.length >= minimumUsersBulkAction ? props.bulkActions : false, users: paginatedUsers, bulkToggledUsers: this.state.bulkToggledUsers, userGroup: props.userGroup, handleBulkToggle: function handleBulkToggle(id, checked) {
	              _this3.setState({
	                bulkToggledUsers: update(_this3.state.bulkToggledUsers, _defineProperty({}, id, { $set: checked }))
	              });
	            }, handleBulkAllCheck: function handleBulkAllCheck(allChecked) {
	              var all = {};
	              if (allChecked) {
	                paginatedUsers.map(function (user) {
	                  all[user.id] = true;
	                });
	              }
	              _this3.setState({
	                bulkToggledUsers: all
	              });
	            } }),
	          bulkActionsFieldset
	        ),
	        viewAll
	      )
	    ) : false;
	  }
	});

	var SettingsTableRow = function SettingsTableRow(props) {
	  var user = props.user,
	      userGroup = props.userGroup;

	  var bulkActionsTd;
	  var bulkName = 'bulk-' + userGroup.id + '-' + user.username;
	  var activeName = 'active-' + userGroup.id + '-' + user.username;
	  var activeLabel = 'Active status for user ' + user.username;
	  if (props.bulkActions) bulkActionsTd = React.createElement(
	    'td',
	    null,
	    React.createElement(
	      'label',
	      { hidden: true, className: 'accessibly-hidden', htmlFor: bulkName },
	      'Select ',
	      user.username
	    ),
	    React.createElement('input', { 'aria-label': 'Select ' + user.username, type: 'checkbox', id: bulkName, name: bulkName, checked: props.bulkToggle, onChange: function onChange(event) {
	        event.stopPropagation();
	        try {
	          props.handleBulkToggle(user.id, event.target.checked);
	        } catch (e) {}
	      } })
	  );

	  return React.createElement(
	    'tr',
	    null,
	    bulkActionsTd,
	    React.createElement(
	      'td',
	      { className: 'username', role: 'button', tabIndex: '0', 'aria-expanded': props.pressed, 'aria-pressed': props.pressed, 'aria-haspopup': 'true', 'aria-controls': 'user_popup_' + cssSafeName(userGroup.title) + '_' + user.id, 'aria-flowto': 'user_popup_' + cssSafeName(userGroup.title) + '_' + user.id, onFocus: function onFocus(event) {
	          try {
	            props.handleFocus();
	          } catch (e) {}
	        }, onBlur: function onBlur(event) {
	          try {
	            props.handleBlur();
	          } catch (e) {}
	        }, onClick: function onClick(event) {
	          if (document.activeElement !== event.target) event.target.focus(); // needed for mobile (iOS)
	        } },
	      user.username
	    ),
	    React.createElement(
	      'td',
	      { className: 'shy balanced checkbox' },
	      React.createElement('input', { id: activeName, name: activeName, 'aria-label': activeLabel, checked: user.active, type: 'checkbox', onChange: function onChange(event) {
	          return store.dispatch(actions.updateUser(user.id, update(user, { $merge: {
	              active: event.target.checked
	            } })));
	        } })
	    )
	  );
	};

	var SettingsTableRowForm = React.createClass({
	  displayName: 'SettingsTableRowForm',

	  mixins: [ReactFormData],
	  getInitialState: function getInitialState() {
	    return {
	      asyncAction: undefined
	    };
	  },
	  render: function render() {
	    var props = this.props,
	        user = props.user,
	        userGroup = props.userGroup,
	        nextUserBtn = user.nextUser ? React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'a',
	        { className: 'button', href: '#bulk-' + userGroup.id + '-' + user.nextUser.username, 'aria-label': 'Escape to Next User ' + user.nextUser.username, onClick: function onClick(event) {
	            console.log('bulk-' + userGroup.id + '-' + user.username);
	            props.handleNextBtnClicked();
	            document.getElementById('bulk-' + userGroup.id + '-' + user.nextUser.username).focus();
	          } },
	        'Next User'
	      )
	    ) : false;

	    //console.log('SettingsTableRowForm');
	    //console.log(user);

	    var userSudoCheckboxLabel = 'sudo__' + cssSafeName(userGroup.title) + '-' + userGroup.id + '-' + user.id,
	        userActiveCheckboxLabel = 'active__' + cssSafeName(userGroup.title) + '-' + userGroup.id + '-' + user.id;

	    return React.createElement(
	      'tr',
	      _extends({}, props, { id: 'user_popup_' + cssSafeName(userGroup.title) + '_' + user.id, role: 'dialog', 'aria-labeledby': 'user_popup_label_' + user.id, 'aria-describedby': 'user_popup_' + user.id + '_desc' }),
	      React.createElement(
	        'td',
	        { colSpan: props.colspan },
	        React.createElement(
	          'form',
	          { action: this.state.formAction, method: this.state.formMethod, onChange: this.updateFormData },
	          React.createElement(
	            'h3',
	            { hidden: true, id: 'user_popup_label_' + user.id },
	            'Edit or Contact ',
	            user.givenName,
	            ' ',
	            user.familyName
	          ),
	          React.createElement('input', { name: 'user_id', type: 'hidden', value: user.id }),
	          React.createElement('input', { name: 'username', type: 'hidden', value: user.username }),
	          React.createElement(
	            'div',
	            { className: 'friendly-labels' },
	            React.createElement(
	              'span',
	              null,
	              React.createElement(
	                'label',
	                { 'aria-hidden': true, htmlFor: userSudoCheckboxLabel },
	                'Sudo: '
	              ),
	              React.createElement('input', { 'aria-label': 'Sudo', id: userSudoCheckboxLabel, name: userSudoCheckboxLabel, checked: user.sudo, type: 'checkbox', onChange: function onChange(event) {
	                  store.dispatch(actions.updateUser(user.id, update(user, { $merge: {
	                      sudo: event.target.checked
	                    } })));
	                } })
	            ),
	            React.createElement(
	              'span',
	              null,
	              React.createElement(
	                'label',
	                { 'aria-hidden': true, htmlForm: userActiveCheckboxLabel },
	                'Active: '
	              ),
	              React.createElement('input', { 'aria-label': 'Active', id: userActiveCheckboxLabel, name: userActiveCheckboxLabel, checked: user.active, type: 'checkbox', onChange: function onChange(event) {
	                  store.dispatch(actions.updateUser(user.id, update(user, { $merge: {
	                      active: event.target.checked
	                    } })));
	                } })
	            )
	          ),
	          React.createElement(
	            'p',
	            { className: 'subtle balanced oblique' },
	            user.jobTitle
	          ),
	          nextUserBtn,
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'a',
	              { className: 'button', href: endpoints.UPDATE_USER + user.id, onClick: function onClick(event) {
	                  event.preventDefault();
	                  //event.stopPropagation();
	                  store.dispatch(actions.updateQuickCreate({
	                    username: user.username,
	                    givenName: user.givenName,
	                    familyName: user.familyName,
	                    email: user.email,
	                    active: user.active,
	                    sudo: user.sudo,
	                    open: true,
	                    updating: true,
	                    id: user.id,
	                    roles: user.roles
	                  }));
	                  window.scrollTo(0, 0);
	                } },
	              'Quick Edit'
	            ),
	            React.createElement(
	              'a',
	              { className: 'button', href: endpoints.UPDATE_USER + user.id },
	              'Edit'
	            )
	          ),
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'button',
	              { type: 'submit', formAction: 'duplicate/user', className: 'save' },
	              'Duplicate'
	            ),
	            React.createElement(
	              'button',
	              { className: 'delete', type: 'submit', onClick: function onClick(event) {
	                  event.preventDefault();
	                  event.stopPropagation();
	                  store.dispatch(actions.deleteUser(update(user, { $merge: {
	                      user_id: user.id
	                    } })));
	                }, formMethod: 'post', formAction: endpoints.USER_DELETE, 'data-async-action': 'deleteuser' },
	              'Delete'
	            ),
	            React.createElement(
	              'a',
	              { className: 'button', href: 'mailto:' + user.email + '?subject=MODX%20Next' },
	              'Email'
	            )
	          ),
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'a',
	              { className: 'button', href: "https://" + props.slackChannel + ".slack.com/messages/@" + user.username, target: '_blank' },
	              'Slack DM'
	            )
	          ),
	          React.createElement(
	            'div',
	            { style: { marginTop: "1em" } },
	            React.createElement(
	              'button',
	              { formAction: endpoints.USER_REMOVE_FROM_GROUP, onClick: function onClick(event) {
	                  event.preventDefault();
	                  store.dispatch(actions.removeUserFromGroup(user.id, userGroup.id));
	                } },
	              'Remove from Group'
	            )
	          )
	        ),
	        React.createElement(
	          'footer',
	          { id: 'user_popup_' + user.id + '_desc', className: 'subtle oblique balanced' },
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'span',
	              null,
	              React.createElement(
	                'span',
	                { className: 'given-name' },
	                user.givenName
	              ),
	              ' ',
	              React.createElement(
	                'span',
	                { className: 'family-name' },
	                user.familyName
	              ),
	              '’',
	              user.familyName.slice(-1) == 's' ? '' : 's',
	              ' last login was Jan 23, 2016 4:52pm from Planet Earth'
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SettingsGridSection;

/***/ }
/******/ ]);