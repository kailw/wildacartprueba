'use strict';

moduleFactura.controller('facturaViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.id = $routeParams.id;   
        $scope.ob = "factura";
        $http({
            method: 'GET',            
            url: '/json?ob=' +$scope.ob +'&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoFactura = response.data.message;
        }, function (response) {
            $scope.ajaxDatoFactura = response.data.message || 'Request failed';
            $scope.status = response.status;
        });                

        $scope.isActive = toolService.isActive;

    }]);