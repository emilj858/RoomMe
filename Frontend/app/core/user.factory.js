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
        		.get('' + id);
        }
        function getAll() {
        	return $http
        		.get('');
        }
        function create(obj) {
        	return $http
        		.post('', obj);
        }
        function update(obj, id) {
        	return $http
        		.put('' + id, obj);
        }
        function remove(id) {
        	return $http
        		.delete('' + id);
        }
        function addFavoriteToUser(listingId, userId) {
        	return $http
        		.post('' + listingId + '/users/' + userId);
        }

        function removeFavoriteFromUser(listingId, userId) {
        	return $http
        		.delete('' + listingId + '/users/' + userId)
        }
    }
})();