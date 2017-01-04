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
        		.get(apiUrl + '/Users/' + id);
        }
        function getAll() {
        	return $http
        		.get(apiUrl + '/Users');
        }
        function create(obj) {
        	return $http
        		.post(apiUrl + '/Users', obj);
        }
        function update(obj, id) {
        	return $http
        		.put(apiUrl + '/Users/' + id, obj);
        }
        function remove(id) {
        	return $http
        		.delete(apiUrl + '/Users/' + id);
        }
        function addFavoriteToUser(listingId, userId) {
        	return $http
        		.post(apiUrl + '/Favorites/' + listingId + userId);
        }

        function removeFavoriteFromUser(listingId, userId) {
        	return $http
        		.delete(apiUrl + '/Favorites/' + listingId + userId)
        }
    }
})();