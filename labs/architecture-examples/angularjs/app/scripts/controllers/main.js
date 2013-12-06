angular.module('Matboard.Application')
  .controller('ResourceController', function ($scope, $http, $filter, $state) {
	$scope.aliasEdited = false;
	$scope.displayTitle = 'New Resource';

	$scope.handleTitleChange = function(title){
		$scope.displayTitle = title;
		if(! $scope.aliasEdited) {
            $scope.page.alias = $filter('alias')(title);
        }
	};

    $scope.savePage = function (page) {
        $http({
            method: 'POST',
            url:'views/main.html', 
            data: page
        }).success(function(data, status, headers, config){
            console.log('success');
        }).error(function(data, status, headers, config){
            console.log('error');
        });
    };
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
