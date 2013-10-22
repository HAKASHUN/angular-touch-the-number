/**
 * Numberモジュール
 * タイル１つについてのロジック
 */
angular.module('number', [])
    .controller('NumberCtrl', ['$scope', '$log', 'NumberService', function($scope, $log, NumberService) {
        $log.info('NumberCtrl');

        //値の変更と共にデータを修正
        $scope.$watch('rows + cols', function(){
            $scope.complete = false;
            $scope.number = NumberService.shiftNumberList();
        });


        //数字をタップした際の処理
        $scope.touched = function() {
            //正解だったら、NumberServiceのカウントを進めてあげる
            if($scope.number === NumberService.getNextNumber()) {
                $scope.complete = true;
                NumberService.count();
                if($scope.number === NumberService.getGoalNumber()) {
                    $scope.stop();
                }
            }
        };

    }]);