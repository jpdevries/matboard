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

	var manageUsers = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function () {
	    var app = new manageUsers.ManageUsers();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _redux = __webpack_require__(2);

	var _reactRedux = __webpack_require__(3);

	var actions = __webpack_require__(4);
	var store = __webpack_require__(7);

	var ManageUsersForm = __webpack_require__(17);

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
	      fieldsetRoles: state.fieldsetRoles
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

	var REMOVE_USER_FROM_GROUP = 'removeuserfromgroup';
	var removeUserFromGroup = function removeUserFromGroup(user, group) {
	  console.log('ru', user, group);
	  return {
	    type: REMOVE_USER_FROM_GROUP,
	    id: user,
	    group: group
	  };
	};

	exports.REMOVE_USER_FROM_GROUP = REMOVE_USER_FROM_GROUP;
	exports.removeUserFromGroup = removeUserFromGroup;

	var UPDATE_USER = 'updateuser';
	var UPDATE_USER_SUCCESS = 'updateusersuccess';
	var UPDATE_USER_ERROR = 'updateusererror';
	var updateUserSuccess = function updateUserSuccess(id, user) {
	  return {
	    type: UPDATE_USER_SUCCESS,
	    user: user,
	    id: id
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
	    return fetch('/api/user/update', {
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
	      return dispatch(updateUserSuccess(id, user));
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

	var addUserSuccess = function addUserSuccess(user) {
	  return {
	    type: ADD_USER_SUCCESS,
	    user: user
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
	    return fetch('/api/user/add', {
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
	      return dispatch(addUserSuccess(user));
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
	    return fetch('/api/delete/user', {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redux = __webpack_require__(2);
	var createStore = redux.createStore;
	var applyMiddleware = redux.applyMiddleware;
	var thunk = __webpack_require__(8).default;

	var reducers = __webpack_require__(9);

	var store = createStore(reducers.manageUsersReducer, applyMiddleware(thunk));

	module.exports = store;

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var actions = __webpack_require__(4);
	var combineReducers = __webpack_require__(2).combineReducers;
	var update = __webpack_require__(10);

	var initialUserGroups = function () {
	  var userGroups = [];
	  try {
	    var userGroupSections = document.querySelectorAll('section.user-group');
	    for (var i = 0; i < userGroupSections.length; i++) {
	      var userGroup = userGroupSections[i],
	          id = parseInt(userGroup.getAttribute('data-user-group-id')),
	          title = userGroup.querySelector('.name').innerHTML;
	      userGroups.push({
	        id: id,
	        title: title
	      });
	    }
	  } catch (e) {}
	  return userGroups;
	}();

	console.log('initialUserGroups', initialUserGroups);

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
	          id = userRow.getAttribute('data-user-id'),
	          contextualSettings = userRow.nextElementSibling,
	          givenName = contextualSettings.querySelector('.givenName').innerHTML,
	          sudo = contextualSettings.querySelector('input.sudo').checked,
	          active = contextualSettings.querySelector('input.active').checked,
	          jobTitle = contextualSettings.querySelector('.jobTitle').innerHTML;
	      //console.log(id,username,userGroups,email,givenName,jobTitle,sudo,active);
	      if (!addedUsers[id]) users.push({
	        id: id,
	        username: username,
	        givenName: givenName,
	        familyName: '',
	        email: email,
	        active: true,
	        sudo: true,
	        jobTitle: jobTitle,
	        userGroups: userGroups
	      });
	      addedUsers[id] = true;
	    }
	  } catch (e) {}
	  return users;
	}();

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

	var initialFieldsetRoles = [// todo: move this to the store
	{
	  key: 'administrator',
	  title: 'Administrator',
	  id: 1,
	  roles: [{
	    title: 'Super User',
	    id: 1,
	    key: 1
	  }, {
	    title: 'Editor',
	    id: 2,
	    key: 2
	  }]
	}, {
	  key: 'modmore',
	  title: 'modmore',
	  id: 2,
	  roles: [{
	    title: 'Super User',
	    id: 1,
	    key: 1
	  }, {
	    title: 'Editor',
	    id: 2,
	    key: 2
	  }]
	}, {
	  key: 'mgab',
	  title: 'MGAB',
	  id: 3,
	  roles: [{
	    title: 'Super User',
	    id: 1,
	    key: 1
	  }, {
	    title: 'Editor',
	    id: 2,
	    key: 2
	  }]
	}, {
	  key: 'sterc',
	  title: 'Sterc',
	  id: 4,
	  roles: [{
	    title: 'Super User',
	    id: 1,
	    key: 1
	  }, {
	    title: 'Editor',
	    id: 2,
	    key: 2
	  }]
	}, {
	  key: 'sitebuilders',
	  title: 'Site Builders',
	  id: 5,
	  roles: [{
	    title: 'Super User',
	    id: 1,
	    key: 1
	  }, {
	    title: 'Editor',
	    id: 2,
	    key: 2
	  }]
	}];

	var initialState = {
	  users: initialUsers,
	  userGroups: initialUserGroups,
	  fieldsetRoles: initialFieldsetRoles,
	  quickCreate: {
	    username: '',
	    givenName: '',
	    familyName: '',
	    email: '',
	    active: true,
	    sudo: true,
	    open: false,
	    updating: false,
	    id: undefined
	  }
	};

	var usersReducer = function usersReducer(state, action) {
	  state = state || initialState.users;
	  //return state;
	  console.log(action);

	  var index = 0;
	  state.map(function (user, i) {
	    if (user.id == action.id) index = i;
	  });

	  console.log(index);

	  switch (action.type) {
	    case actions.UPDATE_USER_SUCCESS:
	      var newState = update(state, _defineProperty({}, index, { $apply: function $apply(user) {
	          return update(user, { $merge: action.user });
	        } }));
	      console.log(state, newState);
	      return newState;
	      break;

	    case actions.ADD_USER_TO_GROUP:
	      return update(state, _defineProperty({}, index, { $apply: function $apply(user) {
	          return update(user, { $merge: { userGroups: update(user.userGroups, { $push: [action.group] }) } });
	        } }));
	      break;

	    case actions.REMOVE_USER_FROM_GROUP:
	      return update(state, _defineProperty({}, index, { $apply: function $apply(user) {
	          return update(user, { $merge: {
	              userGroups: state[index].userGroups.map(function (group) {
	                return group !== action.group ? group : undefined;
	              }).filter(function (group) {
	                return group !== undefined;
	              })
	            } });
	        } }));
	      break;

	    case actions.ADD_USER_SUCCESS:
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
	      console.log(newState);
	      return newState;

	    case actions.DELETE_USER_ERROR:
	      return state;
	  }
	  return state;
	};

	var quickCreateReducer = function quickCreateReducer(state, action) {
	  state = state || initialState.quickCreate;

	  switch (action.type) {
	    case actions.UPDATE_QUICKCREATE:
	      console.log(actions.UPDATE_QUICKCREATE);
	      return update(state, { $merge: action.quickCreate });
	      break;
	  }
	  return state;
	};

	var fieldsetRolesReducer = function fieldsetRolesReducer(state, action) {
	  state = state || initialState.fieldsetRoles;

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
	      break;
	  }
	  return state;
	};

	var manageUsersReducer = combineReducers({
	  quickCreate: quickCreateReducer,
	  users: usersReducer,
	  userGroups: userGroupsReducer,
	  fieldsetRoles: fieldsetRolesReducer
	});

	exports.manageUsersReducer = manageUsersReducer;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ },
/* 11 */
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

	var _prodInvariant = __webpack_require__(13),
	    _assign = __webpack_require__(14);

	var keyOf = __webpack_require__(15);
	var invariant = __webpack_require__(16);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var actions = __webpack_require__(4);
	var store = __webpack_require__(7);

	var ManageUserFormHeader = __webpack_require__(18);
	var SettingsGridSection = __webpack_require__(23);

	var ManageUsersForm = React.createClass({
	  displayName: 'ManageUsersForm',

	  getInitialState: function getInitialState() {
	    return {
	      filter: undefined,
	      filterBy: undefined
	    };
	  },
	  render: function render() {
	    var _this = this;

	    var props = this.props;

	    var sections = props.userGroups.filter(function (userGroup) {
	      return _this.state.filterBy === undefined ? true : _this.state.filterBy == userGroup.id;
	    }).map(function (userGroup) {
	      return React.createElement(SettingsGridSection, _defineProperty({ bulkActions: true, userGroup: userGroup, key: userGroup.id, filter: _this.state.filter, users: props.users.filter(function (user) {
	          return user.userGroups.includes(userGroup.id);
	        }), title: userGroup.title }, 'userGroup', userGroup));
	    });

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { id: 'manage-user-form__header' },
	        React.createElement(ManageUserFormHeader, { fieldsetRoles: props.fieldsetRoles, quickCreate: props.quickCreate, handleFilterBy: function handleFilterBy(filterBy) {
	            return _this.setState({
	              filterBy: isNaN(filterBy) ? undefined : filterBy
	            });
	          }, handleFilter: function handleFilter(filter) {
	            return _this.setState({
	              filter: filter.length ? filter : undefined
	            });
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'settings-grid' },
	        sections
	      )
	    );
	  }
	});

	module.exports = ManageUsersForm;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var actions = __webpack_require__(4);
	var store = __webpack_require__(7);
	var ReactFormData = __webpack_require__(19);
	var QuickCreateFieldset = __webpack_require__(21);

	var CreateSettingsForm = React.createClass({
	  displayName: 'CreateSettingsForm',

	  mixins: [ReactFormData],
	  getInitialState: function getInitialState() {
	    return {
	      quickCreateOpen: false
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    store.subscribe(function () {
	      _this.setState({ quickCreateOpen: store.getState().quickCreate.open });
	    });
	  },
	  handleSubmit: function handleSubmit() {},
	  render: function render() {
	    var _this2 = this;

	    var props = this.props;
	    console.log(props);
	    var quickCreateUserBtn = this.state.quickCreateOpen ? false : React.createElement(
	      'button',
	      { onClick: function onClick(event) {
	          return _this2.setState({ quickCreateOpen: true });
	        } },
	      'Quick ',
	      props.quickCreate.updating ? 'Update' : 'Create',
	      ' User'
	    );
	    /*var fieldsetRoles = [
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
	    var fieldsetRolesMarkup = [];
	    fieldsetRoles.map(function(group,index){
	      var roles = [];
	      group.roles.map(function(role,index){
	        roles.push(
	          <label key={index} htmlFor={'user-group-' + group.key + '-roles[]'}><input type="checkbox" checked={role.checked} ref="userGroupEditorRoles" name={'user-group-' + group.key + '-roles[]'} value={group.id + '|' + role.id} />&nbsp;{role.title}</label>
	        );
	      });
	      fieldsetRolesMarkup.push((
	        <fieldset key={index}>
	          <legend>{group.title}</legend>
	          {roles}
	        </fieldset>
	      ));
	    });*/

	    var quickCreate = this.state.quickCreateOpen ? React.createElement(QuickCreateFieldset, props) : false;

	    console.log('props', props);

	    return React.createElement(
	      'form',
	      { ref: 'createSettingForm', action: props.quickCreate.updating ? "/update/user" : "/add/user", method: 'post', className: 'create-setting-form', onChange: this.updateFormData, onSubmit: function onSubmit(event) {
	          event.preventDefault();

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
	                if (pair[0].indexOf('-role') > -1) userGroups.push(parseInt(pair[1].split('|')[0]));
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
	            for (var key in _this2.formData) {
	              console.log(key);
	              user[key] = _this2.formData[key];
	              if (key.indexOf('-role') > -1) {
	                _this2.formData[key].map(function (pair, index) {
	                  userGroups.push(parseInt(pair.split('|')[0]));
	                });
	              }
	            }
	          }

	          console.log('user', user);

	          userGroups = [].concat(_toConsumableArray(new Set(userGroups))); // remove duplicates

	          var userParams = {
	            id: props.quickCreate.id,
	            username: props.quickCreate.username,
	            givenName: props.quickCreate.givenName,
	            familyName: props.quickCreate.familyName,
	            email: props.quickCreate.email,
	            active: props.quickCreate.active,
	            sudo: props.quickCreate.sudo,
	            userGroups: userGroups
	          };

	          if (props.quickCreate.updating) store.dispatch(actions.updateUser(props.quickCreate.id, userParams));else store.dispatch(actions.addUser(userParams));

	          //this.setState({quickCreateOpen:false});
	        } },
	      React.createElement(
	        'div',
	        { className: 'top-bar' },
	        quickCreateUserBtn,
	        React.createElement(
	          'button',
	          { id: 'create-user', formaction: './../user-edit/index.html' },
	          'Create User'
	        )
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

	    var filterBuyOptions = props.fieldsetRoles;

	    var filterBuyOptions = props.fieldsetRoles.map(function (fieldset, index) {
	      return React.createElement(
	        'option',
	        { key: fieldset.id, value: fieldset.id },
	        fieldset.title
	      );
	    });

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
	      React.createElement('hr', null),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h3',
	          null,
	          'Search Users'
	        ),
	        React.createElement(
	          'form',
	          { action: '#', id: 'search', className: 'search-settings' },
	          React.createElement(
	            'label',
	            { 'for': 'search-users' },
	            React.createElement(
	              'span',
	              { 'a11y-hidden': true },
	              'Search: '
	            ),
	            React.createElement('input', { name: 'search-users', id: 'search-users', type: 'text', placeholder: 'Search for any User. We\'ll try and find them.', onChange: function onChange(event) {
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
	          React.createElement(
	            'label',
	            { htmlFor: 'filter-by' },
	            'Filter ',
	            React.createElement(
	              'span',
	              { className: 'accessibly-hidden' },
	              'Users'
	            ),
	            ' by',
	            React.createElement(
	              'span',
	              { className: 'accessibly-hidden' },
	              ' User Group'
	            ),
	            ':'
	          ),
	          React.createElement(
	            'select',
	            { name: 'filter-by', id: 'filter-by', onChange: function onChange(event) {
	                try {
	                  props.handleFilterBy(parseInt(event.target.value));
	                } catch (e) {
	                  console.log(e);
	                }
	              } },
	            React.createElement(
	              'option',
	              { checked: true, value: '' },
	              'All'
	            ),
	            filterBuyOptions
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Below you will users who have logged in recently per user group.'
	        )
	      ),
	      React.createElement('hr', null)
	    );
	  }
	});

	module.exports = ManageUserFormHeader;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20);


/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (!React) var React = __webpack_require__(22); // only require React if need be (server-side rendering)

	var actions = __webpack_require__(4),
	    store = __webpack_require__(7);

	var QuickCreateFieldset = function (_React$Component) {
	  _inherits(QuickCreateFieldset, _React$Component);

	  function QuickCreateFieldset() {
	    _classCallCheck(this, QuickCreateFieldset);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(QuickCreateFieldset).apply(this, arguments));
	  }

	  _createClass(QuickCreateFieldset, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var fieldsetRoles = props.fieldsetRoles;
	      var fieldsetRolesMarkup = [];
	      fieldsetRoles.map(function (group, index) {
	        var roles = [];
	        group.roles.map(function (role, index) {
	          roles.push(React.createElement(
	            'label',
	            { key: index, htmlFor: 'user-group-' + group.key + '-roles[]' },
	            React.createElement('input', { type: 'checkbox', checked: role.checked, ref: 'userGroupEditorRoles', name: 'user-group-' + group.key + '-roles[]', value: group.id + '|' + role.id }),
	            ' ',
	            role.title
	          ));
	        });
	        fieldsetRolesMarkup.push(React.createElement(
	          'fieldset',
	          { key: index },
	          React.createElement(
	            'legend',
	            null,
	            group.title
	          ),
	          roles
	        ));
	      });

	      var otherButtons = props.quickCreate.updating ? React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'button',
	            { type: 'submit', formaction: '/duplicate/user', formmethod: 'put' },
	            'Duplicate User'
	          ),
	          React.createElement(
	            'button',
	            { type: 'submit', formaction: '/delete/user', formmethod: 'delete' },
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
	        'fieldset',
	        null,
	        React.createElement(
	          'legend',
	          null,
	          'Quick ',
	          props.quickCreate.updating ? 'Update' : 'Create',
	          ' User'
	        ),
	        React.createElement(
	          'div',
	          { className: 'n field-group' },
	          React.createElement(
	            'div',
	            { className: 'field-username' },
	            React.createElement(
	              'label',
	              { htmlFor: 'username', id: 'username-label' },
	              'Username'
	            ),
	            React.createElement('input', { type: 'text', value: props.quickCreate.username, ref: 'quickCreateUsername', autoFocus: !props.quickCreate.updating, 'aria-describedby': 'username-label', name: 'username', id: 'username', className: 'nickname', 'aria-required': 'true', 'aria-invalid': 'false', required: true })
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
	              'Active'
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
	              'Sudo'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
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
	              'User Groups'
	            ),
	            React.createElement(
	              'p',
	              null,
	              'Users can belong to any number of User Groups. User are assigned Roles that define their priveldges as a member of the User Group. A user can below to the same User Group with multiple roles.'
	            ),
	            fieldsetRolesMarkup
	          )
	        ),
	        React.createElement(
	          'footer',
	          null,
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'button',
	              { type: 'submit' },
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
/* 22 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var update = __webpack_require__(10);

	var store = __webpack_require__(7);
	var actions = __webpack_require__(4);

	var ReactFormData = __webpack_require__(19);

	// can't use this until a future version of React
	var SettingTableRowGroup = React.createClass({
	  displayName: 'SettingTableRowGroup',

	  getInitialState: function getInitialState() {
	    return {
	      showSettings: false
	    };
	  },
	  render: function render() {
	    var _this = this;

	    var props = this.props;
	    var user = props.user;
	    //<SettingsTableRowForm user={user} colspan="2" />
	    return React.createElement(SettingsTableRow, { user: user, className: 'contextual-setting',
	      handleBlur: function handleBlur(event) {
	        return console.log('showSetting', _this.state.showSetting)
	        //this.setState({showSetting:false})
	        ;
	      }, handleFocus: function handleFocus(event) {
	        return console.log('showSetting', _this.state.showSetting)
	        //this.setState({showSetting:true})
	        ;
	      }
	    });
	  }
	});

	var SettingsGridSectionBulkActionsFieldset = function SettingsGridSectionBulkActionsFieldset(props) {
	  return React.createElement(
	    'form',
	    { action: '/bulk/actions', method: 'post' },
	    React.createElement(
	      'fieldset',
	      null,
	      React.createElement(
	        'legend',
	        null,
	        'Bulk Actions'
	      ),
	      React.createElement(
	        'button',
	        { disabled: !props.emails.length, formAction: 'bulkactions/activate' },
	        'Activate'
	      ),
	      React.createElement(
	        'button',
	        { disabled: !props.emails.length, formAction: 'bulkactions/Suspend' },
	        'Suspend'
	      ),
	      React.createElement(
	        'button',
	        { disabled: !props.emails.length, formAction: 'bulkactions/delete', formMethod: 'delete' },
	        'Delete'
	      ),
	      React.createElement(
	        'button',
	        { disabled: !props.emails.length, formAction: 'mailto:' + props.emails.join(',') + '?subject=MODX%20Next', formTarget: '_blank' },
	        'Email'
	      )
	    )
	  );
	};

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
	    console.log('handleQuickEdit!!!', user);
	  },
	  render: function render() {
	    var _this2 = this;

	    var props = this.props;

	    var bulkTh;
	    if (props.bulkActions) bulkTh = React.createElement(
	      'th',
	      null,
	      React.createElement('input', { type: 'checkbox', onChange: function onChange(event) {
	          try {
	            _this2.props.handleBulkAllCheck(event.target.checked);
	          } catch (e) {}
	        } })
	    );

	    var rows = props.users.map(function (user) {

	      return [React.createElement(SettingsTableRow, { user: user, bulkToggle: props.bulkToggledUsers[user.id] !== undefined ? props.bulkToggledUsers[user.id] : false, bulkActions: props.bulkActions,
	        handleFocus: function handleFocus(event) {
	          return _this2.setState({
	            userFormsToShow: update({}, _defineProperty({}, user.id, { $set: true }))
	          });
	        }, handleBulkToggle: function handleBulkToggle(id, checked) {
	          try {
	            props.handleBulkToggle(id, checked);
	          } catch (e) {}
	        }
	      }), _this2.state.userFormsToShow[user.id] ? React.createElement(SettingsTableRowForm, { handleQuickEdit: _this2.handleQuickEdit.bind(null, user), className: 'contextual-setting', user: user, userGroup: props.userGroup, colspan: props.bulkActions ? "3" : "2" }) : undefined];
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
	            null,
	            'User'
	          ),
	          React.createElement(
	            'th',
	            null,
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

	    if (props.filter !== undefined && props.filter.length) {
	      users = users.filter(function (user) {
	        if (user.username.indexOf(props.filter) > -1) return true;
	        return false;
	      });
	    }

	    var bulkActionsFieldset = users.length >= minimumUsersBulkAction ? React.createElement(SettingsGridSectionBulkActionsFieldset, { emails: emails }) : undefined;

	    console.log(emails);

	    return users.length ? React.createElement(
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
	            null,
	            props.title
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          bulkActionsFieldset,
	          React.createElement(SettingsTable, { bulkActions: users.length >= minimumUsersBulkAction ? props.bulkActions : false, users: users, bulkToggledUsers: this.state.bulkToggledUsers, userGroup: props.userGroup, handleBulkToggle: function handleBulkToggle(id, checked) {
	              _this3.setState({
	                bulkToggledUsers: update(_this3.state.bulkToggledUsers, _defineProperty({}, id, { $set: checked }))
	              });
	            }, handleBulkAllCheck: function handleBulkAllCheck(allChecked) {
	              console.log('handleBulkAllCheck', allChecked);
	              var all = {};
	              if (allChecked) {
	                users.map(function (user) {
	                  all[user.id] = true;
	                });
	              }
	              _this3.setState({
	                bulkToggledUsers: all
	              });
	            } }),
	          bulkActionsFieldset
	        ),
	        React.createElement(
	          'footer',
	          null,
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'a',
	              { href: '#' },
	              'View all ',
	              props.title,
	              ' users'
	            )
	          )
	        )
	      )
	    ) : false;
	  }
	});

	var SettingsTableRow = function SettingsTableRow(props) {
	  var user = props.user;

	  var bulkActionsTd;
	  var bulkName = 'bulk-' + user.username;
	  if (props.bulkActions) bulkActionsTd = React.createElement(
	    'td',
	    null,
	    React.createElement(
	      'label',
	      null,
	      React.createElement('input', { type: 'checkbox', name: bulkName, checked: props.bulkToggle, onChange: function onChange(event) {
	          try {
	            props.handleBulkToggle(user.id, event.target.checked);
	          } catch (e) {}
	        } })
	    )
	  );

	  return React.createElement(
	    'tr',
	    { tabIndex: '0', onFocus: function onFocus(event) {
	        try {
	          props.handleFocus();
	        } catch (e) {}
	      }, onBlur: function onBlur(event) {
	        try {
	          props.handleBlur();
	        } catch (e) {}
	      } },
	    bulkActionsTd,
	    React.createElement(
	      'td',
	      null,
	      user.username
	    ),
	    React.createElement(
	      'td',
	      null,
	      React.createElement(
	        'label',
	        null,
	        React.createElement(
	          'span',
	          { 'a11y-hidden': true },
	          'Active: '
	        ),
	        React.createElement('input', { checked: user.active, type: 'checkbox', onChange: function onChange(event) {
	            return store.dispatch(actions.updateUser(user.id, {
	              active: event.target.checked
	            }));
	          } })
	      )
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
	    var props = this.props;
	    var user = props.user;
	    var userGroup = props.userGroup;

	    console.log('SettingsTableRowForm');
	    console.log(user);

	    return React.createElement(
	      'tr',
	      props,
	      React.createElement(
	        'td',
	        { colSpan: props.colspan },
	        React.createElement(
	          'form',
	          { action: this.state.formAction, method: this.state.formMethod, onChange: this.updateFormData },
	          React.createElement('input', { name: 'user_id', type: 'hidden', value: user.id }),
	          React.createElement('input', { name: 'username', type: 'hidden', value: user.username }),
	          React.createElement(
	            'div',
	            { className: 'friendly-labels' },
	            React.createElement(
	              'label',
	              null,
	              'Sudo: ',
	              React.createElement('input', { name: 'sudo', checked: user.sudo, type: 'checkbox', onChange: function onChange(event) {
	                  store.dispatch(actions.updateUser(user.id, {
	                    sudo: event.target.checked
	                  }));
	                } })
	            ),
	            React.createElement(
	              'label',
	              null,
	              'Active: ',
	              React.createElement('input', { name: 'active', checked: user.active, type: 'checkbox', onChange: function onChange(event) {
	                  store.dispatch(actions.updateUser(user.id, {
	                    active: event.target.checked
	                  }));
	                } })
	            )
	          ),
	          React.createElement(
	            'p',
	            { className: 'subtle balanced oblique' },
	            user.jobTitle
	          ),
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'button',
	              { type: 'submit', className: 'save' },
	              'Save'
	            )
	          ),
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'a',
	              { className: 'button' },
	              'Next User'
	            )
	          ),
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'a',
	              { className: 'button', href: "/update/user/" + user.id, onClick: function onClick(event) {
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
	                    id: user.id
	                  }));
	                } },
	              'Quick Edit'
	            ),
	            React.createElement(
	              'a',
	              { className: 'button', href: "/update/user/" + user.id },
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
	              { type: 'submit', onClick: function onClick(event) {
	                  event.preventDefault();
	                  event.stopPropagation();
	                  store.dispatch(actions.deleteUser(Object.assign({}, user, {
	                    user_id: user.id
	                  })));
	                }, formMethod: 'delete', formAction: '/delete/user', 'data-async-action': 'deleteuser' },
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
	              'button',
	              { type: 'submit', className: 'save' },
	              'Save'
	            )
	          ),
	          React.createElement(
	            'div',
	            { style: { marginTop: "1em" } },
	            React.createElement(
	              'button',
	              { formAction: 'removefromgroup/user', onClick: function onClick(event) {
	                  event.preventDefault();
	                  store.dispatch(actions.removeUserFromGroup(user.id, userGroup.id));
	                } },
	              'Remove from Group'
	            )
	          )
	        ),
	        React.createElement(
	          'footer',
	          { className: 'subtle oblique balanced' },
	          React.createElement(
	            'p',
	            null,
	            user.givenName,
	            ' ',
	            user.familyName,
	            '’ last login was Jan 23, 2016 4:52pm from Planet Earth'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SettingsGridSection;

/***/ }
/******/ ]);