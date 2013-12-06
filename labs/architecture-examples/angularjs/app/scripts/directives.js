angular.module('Matboard.Directives', [])
    .directive('leavingPage', function () {
        return {
            restrict: 'A',
            link: function (scope) {
                var leavingPageText = "Your changes will be lost.";
                
                window.onbeforeunload = function(){
                    return (scope.resource.$dirty !== true) ? null : leavingPageText;
                }
            }
        }
    });