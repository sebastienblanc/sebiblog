'use strict';

function SearchCommentController($scope,$filter,dataService) {
    $scope.filter = $filter;
	$scope.search={};
	$scope.currentPage = 0;
	$scope.pageSize= 10;
	$scope.searchResults = [];
	$scope.pageRange = [];
	$scope.numberOfPages = function() {
		var result = Math.ceil($scope.searchResults.length/$scope.pageSize);
		return (result == 0) ? 1 : result;
	};
    var commentPipe = dataService.commentPipe;
    var commentStore = dataService.commentStore;
    var postPipe = dataService.postPipe;
    postPipe.read({
        success: function(data){
            $scope.postList = data;
            $scope.$apply();
        }
    });

	$scope.performSearch = function() {
        commentPipe.read({
            complete: function(data){
                commentStore.save(data,true);
                $scope.searchResults = commentStore.read();
                var max = $scope.numberOfPages();
                $scope.pageRange = [];
                for(var ctr=0;ctr<max;ctr++) {
                    $scope.pageRange.push(ctr);
                }
                $scope.$apply();
            }
        });
    };
	
	$scope.previous = function() {
	   if($scope.currentPage > 0) {
	       $scope.currentPage--;
	   }
	};
	
	$scope.next = function() {
	   if($scope.currentPage < ($scope.numberOfPages() - 1) ) {
	       $scope.currentPage++;
       }
	};
	
	$scope.setPage = function(n) {
	   $scope.currentPage = n;
	};

    $scope.filterSearchResults = function(result) {
        var flag = true;
        for(var key in $scope.search){
            if($scope.search.hasOwnProperty(key)) {
                var expected = $scope.search[key];
                if(expected == null || expected === "") {
                    continue;
                }
                var actual = result[key];
                if(angular.isObject(expected)) {
                    flag = flag && angular.equals(expected,actual);
                }
                else {
                    flag = flag && (actual.toString().indexOf(expected.toString()) != -1);
                }
                if(flag === false) {
                    return false;
                }
            }
        }
        return true;
    };

	$scope.performSearch();
};

function NewCommentController($scope,$location,dataService) {
    var commentPipe = dataService.commentPipe;
    $scope.disabled = false;

        var postPipe = dataService.postPipe;
        postPipe.read({
            success: function(data){
                $scope.postList = data;
                $scope.$apply();
            }
        });

    $scope.save = function() {
        commentPipe.save($scope.comment,{
            complete: function(data){
                $location.path('/Comments');
                $scope.$apply();
            }
        });
    };
	
    $scope.cancel = function() {
        $location.path("/Comments");
    };
}

function EditCommentController($scope,$routeParams,$location,dataService) {
	var self = this;
	$scope.disabled = false;
    var commentPipe = dataService.commentPipe;
    var postPipe = dataService.postPipe;

	$scope.get = function() {
        commentPipe.read({
            id: $routeParams.CommentId,
            success: function(data){
                self.original = data.entity;
                $scope.comment = JSON.parse(JSON.stringify(data.entity));
                 postPipe.read({
                    success: function(data){
                        $scope.postList = data;
                        angular.forEach($scope.postList, function(datum){
                        if(angular.equals(datum,$scope.comment.post)) {
                            $scope.comment.post = datum;
                            self.original.post = datum;
                        }
                        });
                        $scope.$apply();
                    }
                });

                $scope.$apply();
            }
        });
    };

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.comment);
	};

	$scope.save = function() {
        commentPipe.save($scope.comment,{
            complete: function(data){
                $location.path('/Comments');
                $scope.$apply();
            }
        });
	};

	$scope.cancel = function() {
		$location.path("/Comments");
	};

	$scope.remove = function() {
        commentPipe.remove($scope.comment,{
            success: function(data){
                $location.path('/Comments');
                $scope.$apply();
            }
        });
	};
	
	$scope.get();
};