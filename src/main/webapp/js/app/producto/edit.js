'use strict';

moduleProducto.controller('productoEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.ob = "producto";
        $http({
            method: 'GET',
            url: '/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoProducto = response.data.message;
        }, function (response) {
            $scope.ajaxDatoProducto = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.guardar = function () {
            var json = {
                id: $scope.ajaxDatoProducto.id,
                codigo: $scope.ajaxDatoProducto.codigo,
                desc: $scope.ajaxDatoProducto.desc,
                existencias: $scope.ajaxDatoProducto.existencias,
                precio: $scope.ajaxDatoProducto.precio,
                foto: $scope.ajaxDatoProducto.foto,
                id_tipoProducto: $scope.ajaxDatoProducto.obj_tipoProducto.id
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=' + $scope.ob + '&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {
                $scope.ajaxDatoProducto = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;

        $scope.tipoProductoRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            if (consulta) {
                $http({
                    method: 'GET',
                    url: 'json?ob=tipoproducto&op=get&id=' + $scope.ajaxDatoProducto.obj_tipoProducto.id
                }).then(function (response) {
                    form.userForm.obj_tipoProducto.$setValidity('valid', true);
                    $scope.ajaxDatoProducto.obj_tipoProducto = response.data.message;
                }, function (response) {
                    form.userForm.obj_tipoProducto.$setValidity('valid', false);
                    $scope.ajaxDatoProducto.obj_tipoProducto.desc = "Error al acceder al tipo de producto";
                });
            } else {
                form.userForm.obj_tipoProducto.$setValidity('valid', true);
            }
        }
    }]);
