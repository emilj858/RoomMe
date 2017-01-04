(function() {
    'use strict';

    angular
        .module('app')
        .factory('listingFactory', listingFactory);

    listingFactory.$inject = ['$http'];

    /* @ngInject */
    function listingFactory($http) {
        var service = {
        	getById: getById,
        	getAll: getAll,
            create: create,
            update: update,
            remove: remove

        };
        return service;

        ////////////////

        function getById(id) {
        	return $http
        		.get(apiUrl + '/Listings/' + id);
        }

        function GetAll() {
        	return $http
        		.get(apiUrl + '/Listings');
        }

        function create(obj) {
        	return $http
        		.post(apiUrl + '/Listings', obj);
        }

        function update(id, obj) {
        	return $http
        		.put(apiUrl + '/Listings/' + id, obj);
        }

        function remove(id) {
        	return $http
        		.delete(apiUrl + '/Listings/' + id);
        }

    }
})();