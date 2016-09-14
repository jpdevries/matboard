'use strict';

var JSONArea = function JSONArea(entity, options) {
  // lightweight and unopionanted all JSONArea does is listen to update events on the text area and dispatch an update event indicating whether or not the content is valid JSON
  options = typeof options == 'undefined' ? {} : options;
  var events = typeof options.events == 'undefined' ? ['change', 'keyup'] : options.events;
  var sourceObjects = typeof options.sourceObjects == 'undefined' ? [] : options.sourceObjects;

  var jsonArea = {
    getElement: function getElement() {
      return entity;
    },
    init: function init() {
      var that = this;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var event = _step.value;
          // for each event
          entity.addEventListener(event, function (e) {
            // add the event
            entity.dispatchEvent(new CustomEvent("update", { // dispatch an update event
              detail: {
                isJSON: that.isJSON(this.value) // and let them know if the JSON is validated
              }
            }));
          });
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

      return this;
    },
    isJSON: function isJSON(string) {
      // accepts a string returns true or false for if it is valid JSON
      try {
        var jsonObject = JSON.parse(string);
      } catch (e) {
        return false;
      }
      return true;
    }
  };
  // our JSONArea Factory creates a delegate prototype (jsonArea), then uses prototyal inheritance to create, extend and return a new initialisized instance
  return Object.assign.apply( // gotta use apply to support passing in an unkown amount of sourceObjects
  null, [Object.create(jsonArea)].concat(sourceObjects)).init();
};
//# sourceMappingURL=JSONarea.js.map
