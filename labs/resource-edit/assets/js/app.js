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

	var metabox = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function () {
	    var app = new metabox.MetaBox();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _redux = __webpack_require__(2);

	var _reactRedux = __webpack_require__(3);

	var actions = __webpack_require__(4);
	var store = __webpack_require__(5);

	var ResourceEditForm = __webpack_require__(13);

	var MetaBox = function MetaBox() {
	  store.subscribe(function () {
	    console.log(store.getState());
	    document.title = 'Editing ' + store.getState().meta.pagetitle;
	  });

	  store.dispatch(actions.updateMeta({
	    pagetitle: 'Hello World!'
	  }));

	  store.dispatch(actions.updateMeta({
	    template: 1
	  }));

	  store.dispatch(actions.updateSettings({
	    searchable: true,
	    richText: true
	  }));

	  store.dispatch(actions.updatePublication({
	    publishedon: new Date()
	  }));

	  store.dispatch(actions.updateMeta({
	    pagetitle: 'rad'
	  }));

	  //store.dispatch(actions.updateResourceGroup(0,true));

	  store.dispatch(actions.updateContent('This is content'));

	  var ResourceEditFormController = (0, _reactRedux.connect)(function (state, props) {
	    return {
	      meta: state.meta,
	      settings: state.settings,
	      publication: state.publication,
	      resourceGroups: state.resourceGroups,
	      content: state.content
	    };
	  })(ResourceEditForm);

	  ReactDOM.render(React.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    React.createElement(ResourceEditFormController, null)
	  ), document.getElementById('resource-edit-form'));
	};

	exports.MetaBox = MetaBox;

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

	var UPDATE_META = 'updatemeta';
	var updateMeta = function updateMeta(meta) {
	  return {
	    type: UPDATE_META,
	    meta: meta
	  };
	};

	exports.UPDATE_META = UPDATE_META;
	exports.updateMeta = updateMeta;

	var UPDATE_SETTINGS = 'updatesettings';
	var updateSettings = function updateSettings(settings) {
	  return {
	    type: UPDATE_SETTINGS,
	    settings: settings
	  };
	};

	exports.UPDATE_SETTINGS = UPDATE_SETTINGS;
	exports.updateSettings = updateSettings;

	var UPDATE_PUBLICATION = 'udpatepublication';
	var updatePublication = function updatePublication(publication) {
	  return {
	    type: UPDATE_PUBLICATION,
	    publication: publication
	  };
	};

	exports.UPDATE_PUBLICATION = UPDATE_PUBLICATION;
	exports.updatePublication = updatePublication;

	var UPDATE_RESOURCE_GROUP = 'updateresourcegroup';
	var updateResourceGroup = function updateResourceGroup(index, active) {
	  console.log('updateResourceGroup', index, active);
	  return {
	    type: UPDATE_RESOURCE_GROUP,
	    index: index,
	    active: active
	  };
	};

	exports.UPDATE_RESOURCE_GROUP = UPDATE_RESOURCE_GROUP;
	exports.updateResourceGroup = updateResourceGroup;

	var UPDATE_RESOURCE_GROUPS = 'updateresourcegroups';
	var updateResourceGroups = function updateResourceGroups(resourceGroups) {
	  return {
	    type: UPDATE_RESOURCE_GROUPS,
	    resourceGroups: resourceGroups
	  };
	};

	exports.UPDATE_RESOURCE_GROUPS = UPDATE_RESOURCE_GROUPS;
	exports.updateResourceGroups = updateResourceGroups;

	var UPDATE_CONTENT = 'updatecontent';
	var updateContent = function updateContent(content) {
	  return {
	    type: UPDATE_CONTENT,
	    content: content
	  };
	};

	exports.UPDATE_CONTENT = UPDATE_CONTENT;
	exports.updateContent = updateContent;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var redux = __webpack_require__(2);
	var createStore = redux.createStore;

	var reducers = __webpack_require__(6);

	var store = createStore(reducers.resourceReducer);

	module.exports = store;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var actions = __webpack_require__(4);
	var combineReducers = __webpack_require__(2).combineReducers;
	var update = __webpack_require__(7);

	var initialState = {
	  meta: {
	    pagetitle: '',
	    longtitle: 'bacon',
	    description: '',
	    introtext: '',
	    template: 2,
	    alias: '',
	    menutitle: '',
	    introtext: 'intro text hello world',
	    menuhide: true,
	    published: true
	  },
	  settings: {
	    parent: 2,
	    resourceType: 'modResource',
	    contentType: 'html',
	    contentDisposition: 'inline',
	    menuindex: 3,
	    container: true,
	    searchable: true,
	    richText: true,
	    freezeURI: true,
	    cacheable: true,
	    emptyCache: true,
	    deleted: true
	  },
	  publication: {
	    publishedon: new Date(),
	    publishedon: null,
	    unpubdate: null
	  },
	  resourceGroups: [{
	    name: 'Group bacon!',
	    id: 0,
	    active: false
	  }, {
	    name: 'Group 2',
	    id: 1,
	    active: true
	  }, {
	    name: 'Group 3',
	    id: 2,
	    active: false
	  }],
	  content: ''
	};

	var metaReducer = function metaReducer(state, action) {
	  state = state || initialState.meta;
	  //console.log(action.type);
	  switch (action.type) {
	    case actions.UPDATE_META:
	      return Object.assign({}, state, action.meta);
	      break;
	  }

	  return state;
	};

	var settingsReducer = function settingsReducer(state, action) {
	  state = state || initialState.settings;
	  console.log('settingsReducer', action.type);
	  switch (action.type) {
	    case actions.UPDATE_SETTINGS:
	      return Object.assign({}, state, action.settings);
	      break;
	  }

	  return state;
	};

	var publicationReducer = function publicationReducer(state, action) {
	  state = state || initialState.publication;
	  switch (action.type) {
	    case actions.UPDATE_PUBLICATION:
	      return Object.assign({}, state, action.publication);
	      break;
	  }
	  return state;
	};

	var resourceGroupsReducer = function resourceGroupsReducer(state, action) {
	  state = state || initialState.resourceGroups;

	  switch (action.type) {
	    case actions.UPDATE_RESOURCE_GROUP:
	      //console.log('state',state);
	      var d = action.index;
	      console.log('resourceGroupsReducer', action, action.index);
	      //console.log('d',d,d.index);
	      //return state;
	      return update(state, _defineProperty({}, action.index, {
	        $merge: { active: action.active }
	      }));
	      //console.log(update(state, {'Group 1': {$apply:function(x){ x.active = action.active }} }));
	      //return Object.assign({},state,action.resourceGroups);
	      break;

	    case actions.UPDATE_RESOURCE_GROUPS:
	      //return Object.assign({},state,action.resourceGroups);
	      break;
	  }
	  return state;
	};

	var contentReducer = function contentReducer(state, action) {
	  state = state || initialState.content;
	  switch (action.type) {
	    case actions.UPDATE_CONTENT:
	      return action.content;
	      break;
	  }
	  return state;
	};

	var resourceReducer = combineReducers({
	  meta: metaReducer,
	  settings: settingsReducer,
	  publication: publicationReducer,
	  resourceGroups: resourceGroupsReducer,
	  content: contentReducer
	});

	exports.resourceReducer = resourceReducer;

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

	var _assign = __webpack_require__(10);

	var keyOf = __webpack_require__(11);
	var invariant = __webpack_require__(12);
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
	  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(false) : void 0;
	  var specValue = spec[command];
	  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(false) : void 0;
	}

	function update(value, spec) {
	  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(false) : void 0;

	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(false) : void 0;

	    return spec[COMMAND_SET];
	  }

	  var nextValue = shallowCopy(value);

	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(false) : void 0;
	    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(false) : void 0;
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
	    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(false) : void 0;
	    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : void 0;
	    spec[COMMAND_SPLICE].forEach(function (args) {
	      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : void 0;
	      nextValue.splice.apply(nextValue, args);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : void 0;
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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
/* 11 */
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
	var keyOf = function (oneKeyObj) {
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var actions = __webpack_require__(4);
	var store = __webpack_require__(5);

	var ResourceTitle = function ResourceTitle(props) {
	  return React.createElement(
	    'h1',
	    null,
	    props.pagetitle
	  );
	};

	var ButtonBar = function ButtonBar(props) {
	  return React.createElement(
	    'div',
	    { className: 'button-bar' },
	    React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'button',
	        { disabled: !props.save, type: 'submit' },
	        'Save'
	      )
	    ),
	    React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'button',
	        { formaction: '/resource/duplicate' },
	        'Duplicate'
	      )
	    ),
	    React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'button',
	        null,
	        'Delete'
	      )
	    ),
	    React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'button',
	        { formaction: '/resource/preview', formtaget: '_blank' },
	        'View'
	      )
	    )
	  );
	};

	var ResourceFieldsetMeta = function ResourceFieldsetMeta(props) {
	  var meta = props.meta;

	  var templateOptions = [{
	    name: 'Base Template',
	    value: '0'
	  }, {
	    name: 'Blog Post',
	    value: '1'
	  }, {
	    name: 'Product',
	    value: '2'
	  }];

	  var options = templateOptions.map(function (option) {
	    var selected = option.value == meta.template;
	    return React.createElement(
	      'option',
	      { selected: selected, key: option.value, value: option.value },
	      option.name
	    );
	  });

	  return React.createElement(
	    'fieldset',
	    null,
	    React.createElement(
	      'legend',
	      null,
	      'Document'
	    ),
	    React.createElement(
	      'div',
	      { className: 'field-group' },
	      React.createElement(
	        'div',
	        { className: 'pagetitle-field' },
	        React.createElement(
	          'label',
	          { 'for': 'pagetitle' },
	          'Pagetitle'
	        ),
	        React.createElement('input', { type: 'text', name: 'pagetitle', value: meta.pagetitle, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMeta({
	              pagetitle: event.target.value
	            }));
	          }, required: true })
	      ),
	      React.createElement(
	        'div',
	        { className: 'longtitle-field' },
	        React.createElement(
	          'label',
	          { 'for': 'longtitle' },
	          'Long Title'
	        ),
	        React.createElement('input', { type: 'text', name: 'longtitle', value: meta.longtitle, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMeta({
	              longtitle: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'description-field' },
	        React.createElement(
	          'label',
	          { 'for': 'description' },
	          'Description'
	        ),
	        React.createElement('textarea', { type: 'text', name: 'description', value: meta.description, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMeta({
	              description: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'introtext-field' },
	        React.createElement(
	          'label',
	          { 'for': 'introtext' },
	          'Intro Text'
	        ),
	        React.createElement('textarea', { type: 'text', name: 'introtext', value: meta.introtext, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMeta({
	              introtext: event.target.value
	            }));
	          } })
	      )
	    ),
	    React.createElement(
	      'div',
	      { className: 'field-group' },
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'label',
	          { 'for': 'template' },
	          'Template ',
	          meta.template
	        ),
	        React.createElement(
	          'select',
	          { name: 'template', onChange: function onChange(event) {
	              return store.dispatch(actions.updateMeta({
	                template: event.target.value
	              }));
	            } },
	          options
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'alias-field' },
	        React.createElement(
	          'label',
	          { 'for': 'alias' },
	          'Alias'
	        ),
	        React.createElement('input', { type: 'text', name: 'alias', value: meta.alias, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMeta({
	              alias: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'menutitle-field' },
	        React.createElement(
	          'label',
	          { 'for': 'menutitle' },
	          'Menu Title'
	        ),
	        React.createElement('input', { type: 'text', name: 'menutitle', value: meta.menutitle, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMeta({
	              menutitle: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'link-attributes-field' },
	        React.createElement(
	          'label',
	          { 'for': 'link-attributes' },
	          'Link Attributes'
	        ),
	        React.createElement('input', { type: 'text', name: 'link-attributes', value: meta.linkAttributes, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMeta({
	              linkAttributes: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'menuhide-field' },
	        React.createElement(
	          'label',
	          { 'for': 'menuhide' },
	          'Hide From Menus'
	        ),
	        React.createElement('input', { type: 'checkbox', name: 'menuhide', checked: meta.menuhide, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMeta({
	              menuhide: event.target.checked
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'published-field' },
	        React.createElement(
	          'label',
	          { 'for': 'published' },
	          'Published'
	        ),
	        React.createElement('input', { type: 'checkbox', name: 'published', checked: meta.published, onChange: function onChange(event) {
	            return store.dispatch(actions.updateMeta({
	              published: event.target.checked
	            }));
	          } })
	      )
	    )
	  );
	};

	var ResourceFieldSettings = function ResourceFieldSettings(props) {
	  var settings = props.settings;

	  var parentResources = [{
	    name: '',
	    value: '0'
	  }, {
	    name: 'Blog (1)',
	    value: '1'
	  }, {
	    name: 'Products (2)',
	    value: '2'
	  }];

	  var resourceTypes = [{
	    name: 'Resource',
	    value: 'modResource'
	  }, {
	    name: 'Symlink',
	    value: 'modSymlink'
	  }, {
	    name: 'WebLink',
	    value: 'modWebLink'
	  }];

	  var contentTypes = [{
	    name: 'Content',
	    types: [{
	      name: 'HTML',
	      value: 'html'
	    }, {
	      name: 'JSON',
	      value: 'json'
	    }, {
	      name: 'PDF',
	      value: 'pdf'
	    }, {
	      name: 'RSS',
	      value: 'rss'
	    }, {
	      name: 'Text',
	      value: 'text'
	    }, {
	      name: 'XML',
	      value: 'xml'
	    }]
	  }, {
	    name: 'Assets',
	    types: [{
	      name: 'CSS',
	      value: 'css'
	    }, {
	      name: 'JavaScript',
	      value: 'js'
	    }]
	  }];

	  var parentResourceOptions = parentResources.map(function (option) {
	    return React.createElement(
	      'option',
	      { selected: option.value == settings.parent, key: option.value, value: option.value },
	      option.name
	    );
	  });

	  var resourceTypeOptions = resourceTypes.map(function (option) {
	    return React.createElement(
	      'option',
	      { selected: option.value == settings.resourceType, key: option.value, value: option.value },
	      option.name
	    );
	  });

	  var contentTypesOptions = contentTypes.map(function (optgroup) {
	    var optgOptions = optgroup.types.map(function (option) {
	      return React.createElement(
	        'option',
	        { selected: option.value == settings.contentType, key: option.value, value: option.value },
	        option.name
	      );
	    });
	    return React.createElement(
	      'optgroup',
	      { label: optgroup.name },
	      optgOptions
	    );
	  });

	  return React.createElement(
	    'fieldset',
	    null,
	    React.createElement(
	      'legend',
	      null,
	      'Settings'
	    ),
	    React.createElement(
	      'div',
	      { className: 'field-group' },
	      React.createElement(
	        'div',
	        { className: 'parent-resource-field' },
	        React.createElement(
	          'label',
	          { 'for': 'parent-resource' },
	          'Parent Resource'
	        ),
	        React.createElement(
	          'select',
	          { name: 'parent-resource', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                parent: event.target.value
	              }));
	            } },
	          parentResourceOptions
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'resource-type-field' },
	        React.createElement(
	          'label',
	          { 'for': 'resource-type' },
	          'Resource Type'
	        ),
	        React.createElement(
	          'select',
	          { name: 'resource-type', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                resourceType: event.target.value
	              }));
	            } },
	          resourceTypeOptions
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'field content-type-field' },
	        React.createElement(
	          'label',
	          { 'for': 'content_type' },
	          'Content Type'
	        ),
	        React.createElement(
	          'select',
	          { name: 'content_type', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                contentType: event.target.value
	              }));
	            } },
	          contentTypesOptions
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'field field-content_disposition' },
	        React.createElement(
	          'label',
	          { 'for': 'content_disposition' },
	          'Content Disposition'
	        ),
	        React.createElement('input', { type: 'radio', checked: settings.contentDisposition == "inline", value: 'inline', name: 'content_disposition', onChange: function onChange(event) {
	            return store.dispatch(actions.updateSettings({
	              contentDisposition: event.target.value
	            }));
	          } }),
	        'Inline',
	        React.createElement('br', null),
	        React.createElement('input', { type: 'radio', checked: settings.contentDisposition == "attachment", value: 'attachment', name: 'content_disposition', onChange: function onChange(event) {
	            return store.dispatch(actions.updateSettings({
	              contentDisposition: event.target.value
	            }));
	          } }),
	        'Attachment'
	      ),
	      React.createElement(
	        'div',
	        { className: 'field field-menuindex' },
	        React.createElement(
	          'label',
	          { 'for': 'menuindex' },
	          'Menu Index'
	        ),
	        React.createElement('input', { type: 'number', name: 'menuindex', value: settings.menuindex, min: '0', step: '1', onChange: function onChange(event) {
	            return store.dispatch(actions.updateSettings({
	              menuindex: event.target.value
	            }));
	          } })
	      )
	    ),
	    React.createElement(
	      'div',
	      { className: 'field-group' },
	      React.createElement(
	        'fieldset',
	        { className: 'checbox-field' },
	        React.createElement(
	          'legend',
	          null,
	          'Booleans'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'container' },
	          React.createElement('input', { name: 'container', checked: settings.container, type: 'checkbox', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                container: event.target.checked
	              }));
	            } }),
	          '  Container'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'searchable' },
	          React.createElement('input', { name: 'searchable', checked: settings.searchable, type: 'checkbox', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                searchable: event.target.checked
	              }));
	            } }),
	          '  Searchable'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'richText' },
	          React.createElement('input', { name: 'richText', checked: settings.richText, type: 'checkbox', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                richText: event.target.checked
	              }));
	            } }),
	          '  Rich Text'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'freezeURI' },
	          React.createElement('input', { name: 'freezeURI', checked: settings.freezeURI, type: 'checkbox', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                freezeURI: event.target.checked
	              }));
	            } }),
	          '  Freeze URI'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'cacheable' },
	          React.createElement('input', { name: 'cacheable', checked: settings.cacheable, type: 'checkbox', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                cacheable: event.target.checked
	              }));
	            } }),
	          '  Cacheable'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'emptyCache' },
	          React.createElement('input', { name: 'emptyCache', checked: settings.emptyCache, type: 'checkbox', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                emptyCache: event.target.checked
	              }));
	            } }),
	          '  Empty Cache'
	        ),
	        React.createElement(
	          'label',
	          { 'for': 'deleted' },
	          React.createElement('input', { name: 'deleted', checked: settings.deleted, type: 'checkbox', onChange: function onChange(event) {
	              return store.dispatch(actions.updateSettings({
	                deleted: event.target.checked
	              }));
	            } }),
	          '  Deleted'
	        )
	      )
	    )
	  );
	};

	var ResourcePublicationFieldset = function ResourcePublicationFieldset(props) {
	  var publication = props.publication;

	  return React.createElement(
	    'fieldset',
	    null,
	    React.createElement(
	      'legend',
	      null,
	      'Publication'
	    ),
	    React.createElement(
	      'div',
	      { className: 'field-group' },
	      React.createElement(
	        'div',
	        { className: 'field field-publishedon' },
	        React.createElement(
	          'label',
	          { 'for': 'publishedon' },
	          'Published On'
	        ),
	        React.createElement('input', { type: 'datetime', name: 'publishedon', value: publication.publishedon, onChange: function onChange(event) {
	            return store.dispatch(actions.updatePublication({
	              publishedon: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        { className: 'field field-pubdate' },
	        React.createElement(
	          'label',
	          { 'for': 'pubdate' },
	          'Published Date'
	        ),
	        React.createElement('input', { type: 'datetime', name: 'pubdate', value: publication.pubdate, onChange: function onChange(event) {
	            return store.dispatch(actions.updatePublication({
	              pubdate: event.target.value
	            }));
	          } })
	      ),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'label',
	          { 'for': 'unpubdate' },
	          'Unpublish date'
	        ),
	        React.createElement('input', { type: 'datetime', name: 'unpubdate', onChange: function onChange(event) {
	            return store.dispatch(actions.updatePublication({
	              unpubdate: event.target.value
	            }));
	          } })
	      )
	    )
	  );
	};

	var ResourceGroupFieldset = function ResourceGroupFieldset(props) {
	  var resourceGroups = props.resourceGroups;

	  var groupsData = [{
	    name: 'Group 1',
	    id: 0,
	    active: false
	  }, {
	    name: 'Group 2',
	    id: 1,
	    active: true
	  }, {
	    name: 'Group 3',
	    id: 2,
	    active: false
	  }];

	  var groups = resourceGroups.map(function (group, index) {
	    return React.createElement(
	      'tr',
	      null,
	      React.createElement(
	        'td',
	        null,
	        group.name
	      ),
	      React.createElement(
	        'td',
	        null,
	        React.createElement(
	          'label',
	          { 'for': 'rsgrp-' + group.id + '-access' },
	          React.createElement('input', { type: 'checkbox', checked: group.active, name: 'rsgrp-' + group.id + '-access', onChange: function onChange(event) {
	              return store.dispatch(actions.updateResourceGroup(index, event.target.checked));
	            } })
	        )
	      )
	    );
	  });

	  return React.createElement(
	    'fieldset',
	    null,
	    React.createElement(
	      'legend',
	      null,
	      'Resource Groups'
	    ),
	    React.createElement(
	      'p',
	      null,
	      'Here you can select which Resource Group this Resource belongs to.'
	    ),
	    React.createElement(
	      'table',
	      { className: 'resource-groups' },
	      React.createElement(
	        'thead',
	        null,
	        React.createElement(
	          'tr',
	          null,
	          React.createElement(
	            'th',
	            null,
	            'Name'
	          ),
	          React.createElement(
	            'th',
	            null,
	            'Access'
	          )
	        )
	      ),
	      groups
	    )
	  );
	};

	var ResourceContentFieldset = function ResourceContentFieldset(props) {
	  return React.createElement(
	    'fieldset',
	    { className: 'content' },
	    React.createElement(
	      'legend',
	      null,
	      'Content'
	    ),
	    React.createElement(
	      'label',
	      { 'for': 'content' },
	      'Content'
	    ),
	    React.createElement(
	      'textarea',
	      { name: 'content', cols: '30', rows: '10', onChange: function onChange(event) {
	          return store.dispatch(actions.updateContent(event.target.value));
	        } },
	      props.content
	    )
	  );
	};

	var ResourceEditForm = React.createClass({
	  displayName: 'ResourceEditForm',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(ResourceTitle, { pagetitle: this.props.meta.pagetitle }),
	      React.createElement(
	        'form',
	        null,
	        React.createElement(ButtonBar, { save: this.props.meta.pagetitle.length > 0 }),
	        React.createElement(ResourceFieldsetMeta, { meta: this.props.meta }),
	        React.createElement(ResourceFieldSettings, { settings: this.props.settings }),
	        React.createElement(ResourcePublicationFieldset, { publication: this.props.publication }),
	        React.createElement(ResourceGroupFieldset, { resourceGroups: this.props.resourceGroups }),
	        React.createElement(ResourceContentFieldset, { content: this.props.content }),
	        React.createElement(
	          'footer',
	          null,
	          React.createElement(ButtonBar, { save: this.props.meta.pagetitle.length > 0 })
	        )
	      )
	    );
	  }
	});

	module.exports = ResourceEditForm;

/***/ }
/******/ ]);