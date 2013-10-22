angular.module('services.number2range', [])
    .factory('number2range', [function(){
        return {
            getRange: function(num) {
                return new Array(num);
            }
        }
    }]);