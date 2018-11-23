'use strict';

moduleFactura.controller('facturaCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;

        $scope.ob = "factura";        
        if (sessionService) {
            $scope.usuariologeado = sessionService.getUserName();
            $scope.loginH = true;
            $scope.usuariologeadoID = sessionService.getId();
        }

        $scope.guardar = function () {
            var json = {
                id: null,
                fecha: null,
                iva: $scope.iva,
                id_usuario: $scope.id_usuario
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=' + $scope.ob + '&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {
                $scope.ajaxDatoFactura = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };


        $scope.isActive = toolService.isActive;

        $scope.usuarioRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            if ($scope.vacio === "") {
                $scope.vacio; 
            } else{
                $scope.vacio = ""; 
            }
            if (consulta) {
                $http({
                    method: 'GET',
                    url: 'json?ob=usuario&op=get&id=' + $scope.ajaxDatoFactura.id
                }).then(function (response) {
                    $scope.ajaxDatoFactura = response.data.message;
                    if ($scope.ajaxDatoFactura !== null) {
                        form.userForm.id_Usuario.$setValidity('valid', true);
                    } else {
                        form.userForm.id_Usuario.$setValidity('valid', false);
                        $scope.vacio = "Error al acceder al usuario";
                    }

                }, function (response) {
                    form.userForm.id_Usuario.$setValidity('valid', false);
                    $scope.ajaxDatoFactura.nombre = "Error al acceder al usuario";
                });
            } else {
                form.userForm.id_Usuario.$setValidity('valid', true);
            }
        };

    }]);