angular.module('Matboard.Directives', [])
    .directive('leavingPage', function () {
        return {
            restrict: 'A',
            link: function (scope) {
                var leavingPageText = "Your changes will be lost.";

                window.onbeforeunload = function(){
                    return (scope.resource.$dirty !== true) ? null : leavingPageText;
                }

                scope.$on('$stateChangeStart', function(event, next, current) {
                    if(!confirm(leavingPageText + "\n\nAre you sure you want to leave this page?")) {
                        event.preventDefault();
                    }
                });
            }
        }
    });