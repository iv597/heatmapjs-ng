var hmjs = angular.module('hmjs-ng', []);

hmjs.directive('heatmap', function() {
    'use strict';

    return {
        restrict: 'E',
        template: '<div ng-attr-id="hmjs-ng_hm_{{ date }}" style="height: 100%;"></div>',
        scope: {
            points: '=',
            max: '@',
            transparent: '@'
        },
        link: function (scope, element, attrs) {
            scope.date = Date.now();

            var ele = element[0].children[0]
              , bg = Boolean(scope.transparent) ? 'rgba(0, 0, 0, 0)' : null
              , heatmap = h337.create({
                    container: ele,
                    // backgroundColor with alpha so you can see through it
                    backgroundColor: bg
                });

            updateHeatmap();

            scope.$watch('points.length', updateHeatmap);

            function handlePoints(points) {
                var ret = [];

                for (var i=0; i < points.length; i++) {
                    ret.push({
                        x: points[i][0],
                        y: points[i][1],
                        value: 1
                    });
                }

                return ret;
            }

            function updateHeatmap() {
                heatmap.setData({
                    max: parseInt(scope.max),
                    data: handlePoints(scope.points)
                });
            }
        }
    };
});