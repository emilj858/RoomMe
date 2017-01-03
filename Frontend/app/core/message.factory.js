(function() {
    'use strict';

    angular
        .module('app')
        .factory('messageFactory', messageFactory);

    messageFactory.$inject = ['$http'];

    /* @ngInject */
    function messageFactory($http) {
        var service = {
            getAll: getAll,
            create: create
        };
        return service;

        ////////////////

        function getAll() {
        	return $http
        		.get('http://localhost:49798/api/messages');
        }

        function create(obj) {
        	return $http
        		.post('http://localhost:49798/api/messages', obj)
        }
    }
})();