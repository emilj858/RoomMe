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
        		.get('' + id);
        }

        function GetAll() {
        	return $http
        		.get('');
        }

        function create(obj) {
        	return $http
        		.post('', obj);
        }

        function update(id, obj) {
        	return $http
        		.put('' + id, obj);
        }

        function remove(id) {
        	return $http
        		.delete('' + id);
        }

    }
})();