angular.module('game', ['number'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'app/game/game.tpl.html',
            controller: 'GameCtrl'
        })
    }])

    /**
     * GameCtrl
     *
     * ゲームコントローラ
     */
    .controller('GameCtrl', ['$scope', '$log', '$timeout', 'number2range', 'NumberService', function($scope, $log, $timeout, number2range, NumberService) {
        $log.info('GameCtrl');
        $scope.rows = 5;
        $scope.cols = 5;
        $scope.getRange = number2range.getRange;
        $scope.time = 0;
        //時間の更新関数
        //TODO: 共通関数にまとめる。
        var timeout;
        $scope.onTimeout = function() {
            $scope.time = Math.round(($scope.time + 0.01) * 100) / 100;
            timeout = $timeout($scope.onTimeout, 10);
        };

        timeout = $timeout($scope.onTimeout, 10);
        $scope.$watch('rows + cols', function(){
            $timeout.cancel(timeout);
            $scope.time = 0;
            timeout = $timeout($scope.onTimeout, 10);
            NumberService.setGoalNumber($scope.rows * $scope.cols);
        });
        $scope.stop = function() {
            $timeout.cancel(timeout);
        }
    }])

    /**
     * NumberService
     *
     * ゲーム上のNumberについてのサービス
     *
     */
    .factory('NumberService', ['$log', function($log){
        var count = 0;
        var goal = 0;
        var numberList = [];
        return {
            /**
             * 次にタップすべき番号を教える
             * @returns {number}
             */
            getNextNumber: function() {
                return count + 1;
            },
            /**
             * 最後にタップすべき番号を教える
             * @returns {number}
             */
            getGoalNumber: function() {
                return goal;
            },
            /**
             * 最後にタップする番号をセットする
             * @param num
             */
            setGoalNumber: function(num) {
                count = 0;
                goal = num;
                numberList = [];
                //Shuffle Machine
                //TODO: 共通関数にまとめる
                function shuffle(a) {
                    for (var i=a.length-1;i>=0;i--) {
                        var r=Math.floor(i*Math.random());
                        var tmp=a[i];
                        a[i]=a[r];
                        a[r]=tmp;
                    }
                    return a;
                }
                for(var i = 1; i < goal + 1; i++) {
                    numberList.push(i);
                }
                numberList = shuffle(numberList);
            },
            /**
             * 番号リストから値を取り出して渡す
             * @returns {*}
             */
            shiftNumberList: function() {
                if(numberList.length < 1) {
                    $log.error('numgerList is nullArray');
                }
                return numberList.shift();
            },
            /**
             * カウンターを進める
             */
            count: function() {
                count++;
            }
        };
    }])

    /**
     * GameService
     *
     * ゲーム上のサービス
     *
     */
    .factory('GameService', [function(){
        return {
            reset: function() {
                console.log('リセットします！');


            },
            //ゲームをクリアしたかどうかの判定
            isCompleted: function() {
                return false;
            },
            //現在の秒数を数える
            getCurrentTime: function() {

            }
        }
    }]);

