(function() {
    'use strict';

    angular
        .module('app')
        .filter('address', addressFilter);

    function addressFilter() {
        return addressFilterFilter;

        ////////////////

        function addressFilterFilter(obj) {
            var result = '';

            if(obj.address) {
         		result += obj.address;   	
            }

            if(obj.city) {
            	result += ', ' + obj.city;
            }

            if(obj.state) {
            	if(!obj.city) {
            		result += ', ' + obj.state;
            	} else {
            		result += ' ' + obj.state;
            	}
            }

            if(obj.zip) {
            	if(!obj.city && !obj.state) {
            		result += ', ' + obj.zip;
            	}

            	if(obj.city || obj.state) {
            		result += ' ' + obj.zip;
            	}
            }

            return result;
        }
    }

})();