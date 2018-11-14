'use strict'

moduleTipousuario.controller('tipousuarioPlistController', ['$scope', '$http', '$location', 'toolService',
    function ($scope, $http, $location, toolService) {
        $scope.ruta = $location.path();
        $scope.numeroPagina = "1";
        $scope.numeroRegistrosPagina = "10";
        $scope.limpiar = function () {
            $scope.numeroPagina = "";
            $scope.numeroRegistrosPagina = "";
            $scope.cssAlertSuccess = "";
            $scope.ajaxMensajeTipousuario = "";
            $scope.ajaxDatoTipousuario = "";
        }

        $http({
            method: "GET",
            withCredential: true,
            url: "http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=" + $scope.numeroRegistrosPagina + "&page=" + $scope.numeroPagina
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoTipousuario = response.data.message;
        }, function (response) {
            $scope.cssAlertSuccess = "alert alert-danger"
            $scope.ajaxMensajeTipousuario = "Debes introducir al menos un número";
            $scope.status = response.status;
        });

        $scope.mostrarDatos = function () {
            $http({
                method: "GET",
                withCredential: true,
                url: "http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=" + $scope.numeroRegistrosPagina + "&page=" + $scope.numeroPagina
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDatoTipousuario = response.data.message;
            }, function (response) {
                $scope.cssAlertSuccess = "alert alert-danger"
                $scope.ajaxMensajeTipousuario = "Debes introducir al menos un número";
                $scope.status = response.status;
            });
        }

        $scope.isActive = toolService.isActive;

    }
]);