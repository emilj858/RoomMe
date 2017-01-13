(function() {
    'use strict';

    angular
        .module('app')
        .factory('conversationFactory', conversationFactory);

    conversationFactory.$inject = ['apiUrl', '$http'];

    /* @ngInject */
    function conversationFactory(apiUrl, $http) {
        var service = {
            getAll: getAll,
            getById: getById,
            create: create

       
        };
        return service;

        ////////////////

        function getAll() {
   			return $http
   				.get(apiUrl + '/conversations');
        }

        function getById(id) {
        	return $http
        		.get(apiUrl + '/conversations/' + id);
        }

        function create(obj) {
        	return $http
        		.post(apiUrl + '/conversations', obj);
        }
    }
})();

