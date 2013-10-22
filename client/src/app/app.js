angular.module('app', [
    'game',
    'services.number2range'
]);

angular.module('app').config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/game'});
}]);

angular.module('app').controller('AppCtrl', ['$scope', function($scope){
}]);

angular.module('app').controller('HeaderCtrl', ['$scope', function($scope){
}]);
