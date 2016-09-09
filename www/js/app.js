// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('news', ['ionic', 'ionic-material', 'ionicLazyLoad']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.lists', {
                url: '/lists',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/lists.html',
                        controller: 'ListsCtrl'
                    }
                }
            })
            .state('app.news_index', {
                url: '/news_index',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/news_index.html',
                        controller: 'NewsCtrl'
                    }
                }
            })
            .state('app.submenu_list', {
                url: '/submenu_list/:newsId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/submenu_list.html',
                        controller: 'SubmenuCtrl'
                    }
                }
            })
            .state('app.article_list', {
                url: '/article_list/:newsId/:submenuId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/article_list.html',
                        controller: 'ArticleCtrl'
                    }
                }
            })
            .state('app.article_view', {
                url: '/article_view/{url:.*}',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/article_view.html',
                        controller: 'ArticleViewCtrl'
                    }
                }
            })
            ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/news_index');
});
