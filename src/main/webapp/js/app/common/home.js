'use strict'

moduleCommon.controller('homeController', ['$scope', '$location', 'toolService', 'sessionService',
    function ($scope, $location, toolService, sessionService) {

        $scope.loginH = false;

        if (sessionService) {
            $scope.usarioLogeado = sessionService.getUserName();
            $scope.loginH = true;            
        }

        $scope.ruta = $location.path();

        $scope.isActive = toolService.isActive;

    }]);