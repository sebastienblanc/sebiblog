'use strict';

function SearchPostController($scope,$filter,dataService) {
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
    var postPipe = dataService.postPipe;
    var postStore = dataService.postStore;

	$scope.performSearch = function() {
        postPipe.read({
            success: function(data){
                $scope.searchResults = data;
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


function listPostController($scope,$filter,dataService) {

    var converter = new Showdown.converter();
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
    var postPipe = dataService.postPipe;
    var postStore = dataService.postStore;

    $scope.performSearch = function() {
        postPipe.read({
            success: function(data){
                $scope.postList = data;
                var max = $scope.numberOfPages();
                $scope.pageRange = [];
                for(var ctr=0;ctr<max;ctr++) {
                    $scope.pageRange.push(ctr);
                }
                $scope.$apply();
            }
        });
    };

    $scope.convert = function(input) {
        return converter.makeHtml(input);
    }

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


function NewPostController($scope,$location,dataService) {
    var postPipe = dataService.postPipe;
    $scope.disabled = false;


    $scope.save = function() {
        $scope.post.postDate = new Date();
        postPipe.save($scope.post,{
            complete: function(data){
                $location.path('/Posts');
                $scope.$apply();
            }
        });
    };
	
    $scope.cancel = function() {
        $location.path("/Posts");
    };
}

function EditPostController($scope,$routeParams,$location,dataService) {
	var self = this;
	$scope.disabled = false;
    $scope.comments = [];
    var postPipe = dataService.postPipe;
    var  commentPipe = dataService.commentPipe;
	$scope.get = function() {
        postPipe.read({
            id: $routeParams.PostId,
            success: function(data){
                self.original = data.entity;
                $scope.post = JSON.parse(JSON.stringify(data.entity));
                commentPipe.read({
                    query: {
                        post_id: $scope.post.id
                    },
                    success: function(data){
                       $scope.comments = data;
                       $scope.$apply();
                   }
                });
                
            }
        });
    };

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.post);
	};

	$scope.save = function() {
        postPipe.save($scope.post,{
            complete: function(data){
                $location.path('/Posts');
                $scope.$apply();
            }
        });
	};

	$scope.cancel = function() {
		$location.path("/Posts");
	};

	$scope.remove = function() {
        postPipe.remove($scope.post,{
            success: function(data){
                $location.path('/Posts');
                $scope.$apply();
            }
        });
	};
	
	$scope.get();
};

function ShowPostController($scope,$routeParams,$location,dataService) {
    var self = this;
    $scope.disabled = false;
    $scope.comments = [];
    var postPipe = dataService.postPipe;
    var  commentPipe = dataService.commentPipe;
    var converter = new Showdown.converter();
    $scope.get = function() {
        postPipe.read({
            id: $routeParams.PostId,
            success: function(data){
                self.original = data.entity;
                $scope.post = JSON.parse(JSON.stringify(data.entity));
                $scope.converted = converter.makeHtml($scope.post.content);
                commentPipe.read({
                    query: {
                        post_id: $scope.post.id
                    },
                    success: function(data){
                       $scope.comments = data;
                       $scope.$apply();
                   }
                });
                
            }
        });
    };
   
 
    $scope.isClean = function() {
        return angular.equals(self.original, $scope.post);
    };

    $scope.saveComment = function() {
        $scope.comment.post = $scope.post;
        $scope.comment.userName = sessionStorage.getItem("username");
        commentPipe.save($scope.comment,{
            success: function(data){
                $location.path('/Posts/show/'+ $routeParams.PostId);
                $scope.get();
            }
        });
    };

    $scope.cancel = function() {
        $location.path("/Posts");
    };

    $scope.remove = function() {
        postPipe.remove($scope.post,{
            success: function(data){
                $location.path('/Posts');
                $scope.$apply();
            }
        });
    };
    
    $scope.get();
};



function LoginController($scope,$routeParams,$location,dataService) {
   
    var restAuth = dataService.restAuth;
    
    $scope.login = function() {
         sessionStorage.removeItem( "username" );
         sessionStorage.removeItem( "access" );
        var user = $scope.user;
        restAuth.login( user, {
            success: function( data ) {
                var role = $.inArray( "admin", data.roles ) >= 0 ? 1 : 0;
                sessionStorage.setItem( "username", data.username );
                sessionStorage.setItem( "access", role );
                $scope.$apply();
            },
            error: function( data ) {
                
            }
        });
    };


    $scope.enroll = function() {
        sessionStorage.removeItem( "username" );
        sessionStorage.removeItem( "access" );
        var user = $scope.user;
        restAuth.enroll( user, {
            success: function( data ) {
                var role = $.inArray( "admin", data.roles ) >= 0 ? 1 : 0;
                sessionStorage.setItem( "username", data.username );
                sessionStorage.setItem( "access", role );
                $scope.$apply();
            },
            error: function( data ) {
                
            }
        });
    };

     $scope.logout = function() {
        sessionStorage.removeItem( "username" );
        sessionStorage.removeItem( "access" );
        var user = $scope.user;
        restAuth.logout();
    };

    $scope.isAdmin = function(){
        return sessionStorage.getItem("access") == 1;
    };

     $scope.isLoggedIn = function(){
        return sessionStorage.getItem("username") !=  undefined;
    };
};