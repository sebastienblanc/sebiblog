'use strict';

var sebiblog = angular.module('sebiblog', ['sebiblog.filters', 'ngSanitize'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/Comments',{templateUrl:'partials/Comment/search.html',controller:SearchCommentController})
      .when('/Comments/new',{templateUrl:'partials/Comment/detail.html',controller:NewCommentController})
      .when('/Comments/edit/:CommentId',{templateUrl:'partials/Comment/detail.html',controller:EditCommentController})
      .when('/Posts',{templateUrl:'partials/Post/search.html',controller:SearchPostController})
      .when('/Posts/new',{templateUrl:'partials/Post/detail.html',controller:NewPostController})
      .when('/Posts/edit/:PostId',{templateUrl:'partials/Post/detail.html',controller:EditPostController})
      .when('/Posts/show/:PostId',{templateUrl:'partials/Post/show.html',controller:ShowPostController})
      .when('/Posts/list',{templateUrl:'partials/Post/list.html',controller:listPostController})
      .otherwise({
        redirectTo: '/Posts/list'
      });
  }]);
