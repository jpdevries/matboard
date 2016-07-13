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
	var store = __webpack_require__(5);

	var ManageUsersForm = __webpack_require__(14);

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
	      users: state.users.sort(function (a, b) {
	        return (// sort alphabetically
	          a.username > b.username ? 1 : -1
	        );
	      }),
	      userGroups: state.userGroups
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
/***/ function(module, exports) {

	'use strict';

	var UPDATE_USER = 'updateuser';
	var updateUser = function updateUser(id, user) {
	  return {
	    type: UPDATE_USER,
	    id: id,
	    user: user
	  };
	};

	exports.UPDATE_USER = UPDATE_USER;
	exports.updateUser = updateUser;

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

	var ADD_USER = 'adduser';
	var addUser = function addUser(user) {
	  return {
	    type: ADD_USER,
	    user: user
	  };
	};

	exports.ADD_USER = ADD_USER;
	exports.addUser = addUser;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redux = __webpack_require__(2);
	var createStore = redux.createStore;

	var reducers = __webpack_require__(6);

	var store = createStore(reducers.manageUsersReducer);

	module.exports = store;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var actions = __webpack_require__(4);
	var combineReducers = __webpack_require__(2).combineReducers;
	var update = __webpack_require__(7);

	var initialUserGroups = function () {
	  var userGroups = [];
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
	  return userGroups;
	}();

	console.log('initialUserGroups', initialUserGroups);

	var initialUsers = function () {
	  var users = [],
	      userRows = document.querySelectorAll('tr.user-row');
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

	var initialState = {
	  users: initialUsers,
	  userGroups: initialUserGroups,
	  quickCreate: {
	    username: 'jpdevries',
	    givenName: 'John-Paul',
	    familyName: 'de Vries',
	    email: 'mail@devries.jp',
	    active: true,
	    sudo: true
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

	  switch (action.type) {
	    case actions.UPDATE_USER:
	      return update(state, _defineProperty({}, index, { $merge: action.user }));
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

	    case actions.ADD_USER:
	      if (action.user.id === undefined) {
	        var nextIndex = 0;
	        state.map(function (user, i) {
	          nextIndex = Math.max(user.id, nextIndex);
	        });
	        action.user.id = nextIndex + 1;
	      }
	      return update(state, { $push: [action.user] });
	  }
	  return state;
	};

	var quickCreateReducer = function quickCreateReducer(state, action) {
	  state = state || initialState.quickCreate;
	  return state;
	  switch (action.type) {
	    case actions.UPDATE_CONTENT:
	      return action.content;
	      break;
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
	      break;
	  }
	  return state;
	};

	var manageUsersReducer = combineReducers({
	  quickCreate: quickCreateReducer,
	  users: usersReducer,
	  userGroups: userGroupsReducer
	});

	exports.manageUsersReducer = manageUsersReducer;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);

/***/ },
/* 8 */
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

	var _prodInvariant = __webpack_require__(10),
	    _assign = __webpack_require__(11);

	var keyOf = __webpack_require__(12);
	var invariant = __webpack_require__(13);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var actions = __webpack_require__(4);
	var store = __webpack_require__(5);

	var ManageUserFormHeader = __webpack_require__(15);
	var SettingsGridSection = __webpack_require__(16);

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
	      return React.createElement(SettingsGridSection, { bulkActions: true, key: userGroup.id, filter: _this.state.filter, users: props.users.filter(function (user) {
	          return user.userGroups.includes(userGroup.id);
	        }), title: userGroup.title, userGroup: userGroup });
	    });

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(ManageUserFormHeader, { handleFilterBy: function handleFilterBy(filterBy) {
	          return _this.setState({
	            filterBy: isNaN(filterBy) ? undefined : filterBy
	          });
	        }, handleFilter: function handleFilter(filter) {
	          return _this.setState({
	            filter: filter.length ? filter : undefined
	          });
	        } }),
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var actions = __webpack_require__(4);
	var store = __webpack_require__(5);

	var ManageUserFormHeader = React.createClass({
	  displayName: 'ManageUserFormHeader',

	  getInitialState: function getInitialState() {
	    return {
	      quickCreateOpen: false
	    };
	  },
	  render: function render() {
	    var _this = this;

	    var props = this.props;

	    var quickCreate = this.state.quickCreateOpen ? React.createElement(
	      'fieldset',
	      null,
	      React.createElement(
	        'legend',
	        null,
	        'Quick Create User'
	      ),
	      React.createElement(
	        'div',
	        { className: 'n field-group' },
	        React.createElement(
	          'div',
	          { className: 'field-username' },
	          React.createElement(
	            'label',
	            { 'for': 'username', id: 'username-label' },
	            'Username'
	          ),
	          React.createElement('input', { type: 'text', ref: 'quickCreateUsername', autoFocus: true, 'aria-describedby': 'username-label', name: 'username', id: 'username', className: 'nickname', 'aria-required': 'true', 'aria-invalid': 'false', required: true })
	        ),
	        React.createElement(
	          'div',
	          { className: 'field-given-name' },
	          React.createElement(
	            'label',
	            { 'for': 'given-name' },
	            'First Name'
	          ),
	          React.createElement('input', { type: 'text', ref: 'quickCreateGivenName', name: 'given-name', id: 'given-name', className: 'given-name' })
	        ),
	        React.createElement(
	          'div',
	          { className: 'field-family-name' },
	          React.createElement(
	            'label',
	            { 'for': 'family-name' },
	            'Last Name'
	          ),
	          React.createElement('input', { type: 'text', ref: 'quickCreateFamilyName', name: 'family-name', id: 'family-name', className: 'family-name' })
	        ),
	        React.createElement(
	          'div',
	          { className: 'field-email' },
	          React.createElement(
	            'label',
	            { 'for': 'email' },
	            'Email'
	          ),
	          React.createElement('input', { type: 'email', ref: 'quickCreateEmail', name: 'email', id: 'email', className: 'email', 'aria-required': 'true', 'aria-invalid': 'false', required: true })
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'field-group user-group-field user-status-field' },
	        React.createElement(
	          'div',
	          { className: 'field' },
	          React.createElement('input', { checked: true, type: 'checkbox', ref: 'quickCreateUserActive', name: 'user-active', id: 'user-active' }),
	          React.createElement(
	            'label',
	            { 'for': 'user-active' },
	            'Active'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'field' },
	          React.createElement('input', { type: 'checkbox', ref: 'quickCreateUserSudo', name: 'user-sudo', id: 'user-sudo' }),
	          React.createElement(
	            'label',
	            { 'for': 'user-sudo' },
	            'Sudo'
	          )
	        )
	      ),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'button',
	          { type: 'submit' },
	          'Submit'
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
	          React.createElement(
	            'fieldset',
	            null,
	            React.createElement(
	              'legend',
	              null,
	              'Administrator'
	            ),
	            React.createElement(
	              'label',
	              { 'for': 'user-group-editor-roles[]' },
	              'Roles'
	            ),
	            React.createElement(
	              'label',
	              null,
	              React.createElement('input', { type: 'checkbox', checked: true, ref: 'userGroupEditorRoles', name: 'user-group-editor-roles[]' }),
	              ' Editor'
	            ),
	            React.createElement(
	              'label',
	              null,
	              React.createElement('input', { type: 'checkbox', ref: 'userGroupEditorRoles', name: 'user-group-editor-roles[]' }),
	              ' Super User'
	            )
	          ),
	          React.createElement(
	            'fieldset',
	            null,
	            React.createElement(
	              'legend',
	              null,
	              'Editor'
	            ),
	            React.createElement(
	              'label',
	              { 'for': 'user-group-editor-roles[]' },
	              'Roles'
	            ),
	            React.createElement(
	              'label',
	              null,
	              React.createElement('input', { type: 'checkbox', name: 'user-group-editor-roles[]' }),
	              ' Editor'
	            ),
	            React.createElement(
	              'label',
	              null,
	              React.createElement('input', { type: 'checkbox', name: 'user-group-editor-roles[]' }),
	              ' Super User'
	            )
	          )
	        )
	      ),
	      React.createElement(
	        'footer',
	        null,
	        React.createElement(
	          'button',
	          { type: 'submit' },
	          'Submit'
	        )
	      )
	    ) : false;

	    var quickCreateUserBtn = this.state.quickCreateOpen ? false : React.createElement(
	      'button',
	      { formaction: '/quick-create/user', onClick: function onClick(event) {
	          return _this.setState({ quickCreateOpen: true });
	        } },
	      'Quick Create User'
	    );

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
	        React.createElement(
	          'form',
	          { action: '/add/user', method: 'post', className: 'create-setting-form', onSubmit: function onSubmit(event) {
	              //event.preventDefault();

	              store.dispatch(actions.addUser({ // todo: pull user groups out of the form
	                username: _this.refs.quickCreateUsername.value,
	                givenName: _this.refs.quickCreateGivenName.value,
	                familyName: _this.refs.quickCreateFamilyName.value,
	                email: _this.refs.quickCreateEmail.value,
	                active: _this.refs.quickCreateUserActive.checked,
	                sudo: _this.refs.quickCreateUserSudo.checked,
	                userGroups: [1]
	              }));

	              _this.setState({ quickCreateOpen: false });
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
	        )
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
	                  _this.props.handleFilter(event.target.value);
	                } catch (e) {}
	              } })
	          ),
	          React.createElement(
	            'button',
	            { type: 'submit' },
	            'Search'
	          ),
	          React.createElement(
	            'label',
	            { 'for': 'filter-by' },
	            'Filter by:'
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
	            React.createElement(
	              'option',
	              { value: '1' },
	              'Editors'
	            ),
	            React.createElement(
	              'option',
	              { value: '0' },
	              'Administrators'
	            )
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var update = __webpack_require__(7);

	var store = __webpack_require__(5);
	var actions = __webpack_require__(4);

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
	        { disabled: !props.emails.length, formAction: 'bulkactions/delete' },
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

	      return [React.createElement(SettingsTableRow, { user: user, className: 'contextual-setting', bulkToggle: props.bulkToggledUsers[user.id] !== undefined ? props.bulkToggledUsers[user.id] : false, bulkActions: props.bulkActions,
	        handleFocus: function handleFocus(event) {
	          return _this2.setState({
	            userFormsToShow: update({}, _defineProperty({}, user.id, { $set: true }))
	          });
	        }, handleBulkToggle: function handleBulkToggle(id, checked) {
	          try {
	            props.handleBulkToggle(id, checked);
	          } catch (e) {}
	        }
	      }), _this2.state.userFormsToShow[user.id] ? React.createElement(SettingsTableRowForm, { user: user, userGroup: props.userGroup, colspan: props.bulkActions ? "3" : "2" }) : undefined];
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

	    return React.createElement(
	      'section',
	      { id: 'core-settings' },
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
	    );
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

	var SettingsTableRowForm = function SettingsTableRowForm(props) {
	  var user = props.user;
	  var userGroup = props.userGroup;

	  return React.createElement(
	    'tr',
	    props,
	    React.createElement(
	      'td',
	      { colSpan: props.colspan },
	      React.createElement(
	        'form',
	        { action: '/', method: 'post' },
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
	            'button',
	            { className: 'save' },
	            'Next User'
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'button',
	            { type: 'submit', formAction: './quick-edit/user.html' },
	            'Quick Edit'
	          ),
	          React.createElement(
	            'button',
	            { type: 'submit', formAction: './../user-edit/index.html' },
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
	            { type: 'submit', formAction: '/api/delete/user' },
	            'Delete'
	          ),
	          React.createElement(
	            'button',
	            { type: 'submit', formAction: 'mailto:' + user.email + '?subject=MODX%20Next', formTarget: '_blank' },
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
	};

	module.exports = SettingsGridSection;

/***/ }
/******/ ]);