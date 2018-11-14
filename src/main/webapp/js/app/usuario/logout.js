"use strict";

moduleUsuario.controller("usuarioLogoutController", ["$scope", "$http", "$routeParams", "toolService", 'sessionService', '$location',
    function ($scope, $http, $routeParams, toolService, sessionService, $location) {

        $http({
            method: 'GET',
            url: '/json?ob=usuario&op=logout'
        }).then(function (response) {
            $scope.ajaxDatoLogin = response.data.message;
            if (response.status === 200) {
                sessionService.setSessionInactive();
                sessionService.setUserName("");
                $scope.loginH = false;
            }
            $scope.loginH = false;
        }, function (response) {
            $scope.ajaxDatoLogin = response.data.message || 'Request Failed';
        });

        sessionService.setSessionInactive();



        $scope.isActive = toolService.isActive;
    }
]);