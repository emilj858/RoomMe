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
        		.get('http://localhost:49798/api/listings/' + id);
        }

        function GetAll() {
        	return $http
        		.get('http://localhost:49798/api/listings');
        }

        function create(obj) {
        	return $http
        		.post('http://localhost:49798/api/listings', obj);
        }

        function update(id, obj) {
        	return $http
        		.put('http://localhost:49798/api/listings/' + id, obj);
        }

        function remove(id) {
        	return $http
        		.delete('http://localhost:49798/api/listings/' + id);
        }

    }
})();