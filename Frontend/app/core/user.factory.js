(function() {
    'use strict';

    angular
        .module('app')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function userFactory($http, apiUrl) {
        var service = {
            getById: getById,
            getAll: getAll,
            create: create,
            update: update,
            remove: remove,
            addFavoriteToUser: addFavoriteToUser,
            removeFavoriteFromUser: removeFavoriteFromUser,
            getMe: getMe
        };
        return service;

        ////////////////

        function getById(id) {
        	return $http
        		.get(apiUrl + '/users/' + id);
        }
        function getAll() {
        	return $http
        		.get(apiUrl + '/users');
        }
        function create(obj) {
        	return $http
        		.post(apiUrl + '/users', obj);
        }
        function update(obj, id) {
        	return $http
        		.put(apiUrl + '/Users/' + id, obj);
        }
        function remove(id) {
        	return $http
        		.delete(apiUrl + '/users/' + id);
        }
        function addFavoriteToUser(listingId) {
        	return $http
        		.post(apiUrl + '/me/favorite/' + listingId);
        }

        function removeFavoriteFromUser(listingId) {
        	return $http
        		.delete(apiUrl + '/me/favorite/' + listingId)
        }

        function getMe(){
            return $http
                .get(apiUrl + '/me')
        }
    }
})();