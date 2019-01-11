'use strict';

moduleUsuario.controller('usuarioEditUsuarioController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {

        $scope.id = $routeParams.id;
        $scope.ob = "usuario";
        $scope.mensajeOK = false;
        $scope.mensajeError = false;


        $http({
            method: 'GET',
            url: '/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoUsuario = response.data.message;
        }, function (response) {
            $scope.mensajeError = true;
            //$scope.ajaxDatoUsuario = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.guardar = function () {
            var json = {
                id: $scope.ajaxDatoUsuario.id,
                dni: $scope.ajaxDatoUsuario.dni,
                nombre: $scope.ajaxDatoUsuario.nombre,
                ape1: $scope.ajaxDatoUsuario.ape1,
                ape2: $scope.ajaxDatoUsuario.ape2,
                login: $scope.ajaxDatoUsuario.login,
                pass: forge_sha256($scope.ajaxDatoUsuario.pass),
                id_tipoUsuario: $scope.ajaxDatoUsuario.obj_tipoUsuario.id
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: '/json?ob=' + $scope.ob + '&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensajeOK = true;
            }, function (response) {
                $scope.mensajeError = true;
                $scope.ajaxDatoUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;



        $scope.tipoUsuarioRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            $scope.vacio = "";            
            if (consulta) {                
                $http({
                    method: 'GET',
                    url: 'json?ob=tipousuario&op=get&id=' + $scope.ajaxDatoUsuario.obj_tipoUsuario.id
                }).then(function (response) {
                    $scope.ajaxDatoUsuario.obj_tipoUsuario = response.data.message;
                    if ($scope.ajaxDatoUsuario.obj_tipoUsuario !== null) {
                        form.userForm.obj_tipousuario.$setValidity('valid', true);
                    } else {
                        form.userForm.obj_tipousuario.$setValidity('valid', false);
                        $scope.vacio = "Error al acceder al tipo de usuario";
                    }

                }, function (response) {
                    form.userForm.obj_tipousuario.$setValidity('valid', false);
                    $scope.ajaxDatoUsuario.obj_tipoUsuario.desc = "Error al acceder al tipo de usuario";
                });
            } else {
                form.userForm.obj_tipousuario.$setValidity('valid', true);
            }
        };

    }]);
