(function() {
    'use strict';

    angular
        .module('app')
        .factory('messageFactory', messageFactory);

    messageFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function messageFactory($http, apiUrl) {
        var service = {
            getAll: getAll,
            create: create
        };
        return service;

        ////////////////

        function getAll() {
        	return $http
        		.get(apiUrl + '/messages');
        }

        function create(obj) {
        	return $http
        		.post(apiUrl + '/messages', obj)
        }
    }
})();