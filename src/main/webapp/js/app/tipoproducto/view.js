'use strict';

moduleTipoproducto.controller('tipoproductoViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.ob = "tipoproducto";
        $http({
            method: 'GET',
            url: '/json?ob='+$scope.ob+'&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataTipoproducto = response.data.message;
        }, function (response) {
            $scope.ajaxDataTipoproducto = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $scope.isActive = toolService.isActive;

    }]);