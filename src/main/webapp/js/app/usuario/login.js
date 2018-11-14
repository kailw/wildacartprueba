"use strict";

moduleUsuario.controller("usuarioLoginController", ["$scope", "$http", "$routeParams", "toolService", "$location", "sessionService",
    function ($scope, $http, $routeParams, toolService, $location, sessionService) {

        if (sessionService) {
            $scope.usarioLogeado = sessionService.getUserName();
            $scope.loginH = false;
        }

        $scope.formulario = true;
        $scope.log = function () {
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: '/json?ob=usuario&op=login&user=' + $scope.login + '&pass=' + forge_sha256($scope.pass)
            }).then(function (response, data) {
                $scope.yesLogin = true;
                $scope.errorLogin = false;
                $scope.loginH = true;
                $scope.formulario = false;

                $scope.ajaxDatoLogin = response.data.message;
            }, function (response) {
                $scope.errorLogin = true;
                $scope.ajaxDatoLogin = response.data.message || 'Request Failed';
            });
        }
        $scope.isActive = toolService.isActive;
    }
]);