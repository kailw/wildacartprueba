'use strict';

moduleUsuario.controller('usuarioCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams','sessionService',
    function ($scope, $http, $location, toolService, $routeParams,sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "usuario";
        $http({
            method: 'GET',
            url: '/json?ob='+$scope.ob+'&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoUsuario = response.data.message;
        }, function (response) {
            $scope.ajaxDatoUsuario = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
                
        if(sessionService){
            $scope.usuariologeado = sessionService.getUserName();
            $scope.loginH = true;
        }
        
        $scope.guardar = function () {
            var json = {
                id: null,
                dni: $scope.dni,
                nombre : $scope.nombre,
                ape1: $scope.ape1,
                ape2: $scope.ape2,
                login: $scope.login,
                pass : $scope.pass,
                id_tipoUsuario: $scope.id_tipoUsuario                
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob='+$scope.ob+'&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {
                $scope.ajaxDatoUsuario= response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;

    }]);