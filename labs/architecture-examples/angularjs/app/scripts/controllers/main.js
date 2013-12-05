angular.module('MatboardApplication')
  .controller('MainCtrl', function ($scope,$http,$filter) {
	$scope.aliasEdited = false;
	$scope.displayTitle = 'New Resource';
	$scope.handleTitleChange = function(){
		$scope.displayTitle = $scope.title;
		if(!$scope.aliasEdited) $scope.alias = $filter('alias')($scope.title);
	};
	$scope.handleSave = function(){
		$http({method:'POST', url:'views/main.html', data:{title:$scope.title, alias:$scope.alias, content:$scope.content}})
		  .success(function(data, status, headers, config){
			console.log('success');
		  }).error(function(data, status, headers, config){
			console.log('error');
		});
	};
	
	var leavingPageText = "Your changes will be lost.";
    window.onbeforeunload = function(){
        return leavingPageText;
    }

    $scope.$on('$locationChangeStart', function(event, next, current) {
        if(!confirm(leavingPageText + "\n\nAre you sure you want to leave this page?")) {
            event.preventDefault();
        }
    });
});

/* notes:
Still new to Angular and not sure if some of these things could have been done a better way.
For example, is using a seperate displayTitle property practical to support the initial default value while 
also utilizing data-binding? Could the business logic for the "smart alias" be handled another way?
*/

/* resources:
code to confirm navigating away from page:
https://groups.google.com/forum/#!msg/angular/-PfujIEdeCY/_dyzYPiEqlkJ
*/
