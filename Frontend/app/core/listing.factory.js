(function() {
    'use strict';

    angular
        .module('app')
        .factory('listingFactory', listingFactory)

    listingFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function listingFactory($http, apiUrl) {
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
        		.get(apiUrl + '/listings/' + id);
        }

        function getAll() {
        	return $http
        		.get(apiUrl + '/listings');
                console.log("working")
        }

        function create(obj) {
        	return $http
        		.post(apiUrl + '/listings', obj);
        }

        function update(id, obj) {
        	return $http
        		.put(apiUrl + '/listings/' + id, obj);
        }

        function remove(id) {
        	return $http
        		.delete(apiUrl + '/listings/' + id);
        }

    }
})();