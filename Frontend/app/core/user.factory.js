(function() {
    'use strict';

    angular
        .module('app')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$http'];

    /* @ngInject */
    function userFactory($http) {
        var service = {
            getById: getById,
            getAll: getAll,
            create: create,
            update: update,
            remove: remove,
            addFavoriteToUser: addFavoriteToUser,
            removeFavoriteFromUser: removeFavoriteFromUser
        };
        return service;

        ////////////////

        function getById(id) {
        	return $http
        		.get('http://localhost:49798/api/users/' + id);
        }
        function getAll() {
        	return $http
        		.get('http://localhost:49798/api/users');
        }
        function create(obj) {
        	return $http
        		.post('http://localhost:49798/api/users', obj);
        }
        function update(obj, id) {
        	return $http
        		.put('http://localhost:49798/api/users/' + id, obj);
        }
        function remove(id) {
        	return $http
        		.delete('http://localhost:49798/api/users/' + id);
        }
        function addFavoriteToUser(listingId, userId) {
        	return $http
        		.post('http://localhost:49798/api/favorties/' + listingId +'/' + userId);
        }

        function removeFavoriteFromUser(listingId, userId) {
        	return $http
        		.delete('http://localhost:49798/api/favorites/' + listingId + '/' + userId)
        }
    }
})();