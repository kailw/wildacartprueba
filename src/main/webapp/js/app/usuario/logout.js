"use strict";

moduleUsuario.controller("usuarioLogoutController", ["$scope", "$http", "$routeParams", "toolService", 'sessionService', '$location',
    function ($scope, $http, $routeParams, toolService, sessionService, $location) {


        $http({
            method: 'GET',
            header: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            url: '/json?ob=usuario&op=logout'
        }).then(function (response, data) {
            $scope.ajaxDatoLogin = response.data.message;
            $scope.loginH = false;

        }, function (response) {
            $scope.ajaxDatoLogin = response.data.message || 'Request Failed';            
        });

        if (sessionService) {
            $scope.usarioLogeado = sessionService.getUserName();
            $scope.loginH = true;
        } else {
            $scope.loginH = false;
        }


        $scope.isActive = toolService.isActive;
    }
]);