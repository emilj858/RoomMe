(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'LocalStorageModule'])
        .value('apiUrl', 'http://localhost:49798/api')
        .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

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

            .state('profile.conversation', {
                url: '/conversation',
                controller: 'ConversationController as conversationCtrl',
                templateUrl: '/app/profile/profile.conversation.html',
                secure: true
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

            .state('register', {
                url: '/register',
                controller: 'RegisterController as registerCtrl',
                templateUrl: '/app/register/register.html'
            })

            .state('login', {
                url: '/login',
                controller: 'LoginController as loginCtrl',
                templateUrl: '/app/login/login.html'
            })
        })
})();
