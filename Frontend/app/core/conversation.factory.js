(function() {
    'use strict';

    angular
        .module('app')
        .factory('conversationFactory', conversationFactory);

    conversationFactory.$inject = ['$http'];

    /* @ngInject */
    function conversationFactory($http) {
        var service = {
            getAll: getAll,
            getById: getById,
            create: create

       
        };
        return service;

        ////////////////

        function getAll() {
   			return $http
   				.get('http://localhost:49798/api/conversations');
        }

        function getById() {
        	return $http
        		.get('http://localhost:49798/api/conversations/' + id);
        }

        function create(obj) {
        	return $http
        		.post('http://localhost:49798/api/conversations', obj);
        }
    }
})();

