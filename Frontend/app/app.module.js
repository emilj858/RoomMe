(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'LocalStorageModule', 'oitozero.ngSweetAlert', 'angular-filepicker', 'ngMaps'])
        .value('apiUrl', 'http://localhost:49798/api')
        .config(function(filepickerProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

            filepickerProvider.setKey('AZk5feTEwRPeVhuwn1JV2z');

            $httpProvider.interceptors.push('authInterceptorService');

            $urlRouterProvider.otherwise('/login');

            $stateProvider
            .state('home', {
                url: '/home',
                controller: 'HomeController as homeCtrl',
                templateUrl: '/app/home/home.html'
            })

            .state('profile', {
                url: '/profile',
                abstract: true,
                template: '<div ui-view></div>'
            })

            .state('profile.detail', {
                url: '/detail',
                controller: 'ProfileDetailController as profileDetailCtrl',
                templateUrl: '/app/profile/profile.detail.html',
                secure: true
            })

            .state('profile.addListing', {
                url: '/addListing',
                controller: 'AddListingController as addListingCtrl',
                templateUrl: '/app/profile/profile.addListing.html',
                secure: true
            })

            .state('profile.editListing', {
                url: '/editListing',
                controller: 'EditListingController as editListingCtrl',
                templateUrl: '/app/profile/profile.editListing.html',
                secure: true
            })
            .state('conversation', {
                url: '/conversation',
                abstract: true,
                template: '<div ui-view></div>',
                secure: true
            })

            .state('conversation.grid', {
                url: '/grid',
                controller: 'ConversationGridController as conversationGridCtrl',
                templateUrl: '/app/conversation/conversation.grid.html'
            })

            .state('conversation.detail', {
                url: '/detail?id?userId',
                controller: 'ConversationDetailController as conversationDetailCtrl',
                templateUrl: '/app/conversation/conversation.detail.html'
            })

            .state('listing', {
                url: '/listing',
                abstract: true,
                template: '<div ui-view></div>'
            })

            .state('listing.grid', {
                url: '/grid',
                controller: 'ListingGridController as listingGridCtrl',
                templateUrl: '/app/listing/listing.grid.html'
            })

            .state('listing.map', {
                url: '/map',
                controller: 'ListingMapController as listingMapCtrl',
                templateUrl: '/app/listing/listing.map.html'
            })

            .state('listing.detail', {
                url: '/detail?id',
                controller: 'ListingDetailController as listingDetailCtrl',
                templateUrl: '/app/listing/listing.detail.html',
                secure: true
            })

            .state('login', {
                url: '/login',
                controller: 'LoginController as loginCtrl',
                templateUrl: '/app/login/login.html'
            })
        })
})();
