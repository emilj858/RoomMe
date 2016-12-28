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
   				.get('');
        }

        function getById() {
        	return $http
        		.get('' + id);
        }

        function create(obj) {
        	return $http
        		.post('', obj);
        }
    }
})();

