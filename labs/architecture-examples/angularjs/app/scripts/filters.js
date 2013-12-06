angular.module('Matboard.Filters', [])
    .filter('alias', function() {
        return function(input) {
            return(input === undefined) ? '' : input.toLowerCase().replace(/\s+/g, ' ').replace(/ /g,'-');
        };
    })
    .filter('default', function() {
        return function(input,_default) {
          return (input) ? input : _default;
        };
    });