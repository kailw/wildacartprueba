'use strict';

moduleProducto.controller('productoCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "producto";


        $scope.ajaxDatoProducto = {
            id: null,
            desc: null
        };


        $scope.crear = function () {
            $scope.upload();
            var foto = 'default.svg';
            if ($scope.file !== undefined) {
                foto = $scope.file.name;
            }

            var json = {
                id: null,
                codigo: $scope.codigo,
                desc: $scope.descripcion,
                existencias: $scope.existencias,
                precio: $scope.precio,
                foto: foto,
                id_tipoProducto: $scope.ajaxDatoProducto.id
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=' + $scope.ob + '&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
                $scope.idCreado = response.data.message.id;
            }, function (response) {
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;

        $scope.tipoProductoRefresh = function (quiensoy, consulta) {
            var form = quiensoy;
            if ($scope.vacio === "") {
                $scope.vacio;
            } else {
                $scope.vacio = "";
            }
            if (consulta) {
                $http({
                    method: 'GET',
                    url: 'json?ob=tipoproducto&op=get&id=' + $scope.ajaxDatoProducto.id
                }).then(function (response) {
                    $scope.ajaxDatoProducto = response.data.message;
                    if ($scope.ajaxDatoProducto !== null) {
                        form.userForm.id_tipoProducto.$setValidity('valid', true);
                    } else {
                        form.userForm.id_tipoProducto.$setValidity('valid', false);
                        $scope.vacio = "Error al acceder al tipo de producto";                        
                    }

                }, function (response) {
                    form.userForm.id_tipoProducto.$setValidity('valid', false);
                    $scope.ajaxDatoProducto.desc = "Error al acceder al tipo de producto";
                });
            } else {
                form.userForm.id_tipoProducto.$setValidity('valid', true);
            }
        };

        $scope.upload = function () {
            var file = $scope.file;
            var oformData = new FormData();
            oformData.append('file', file);

            $http({
                headers: {'Content-Type': undefined},
                method: 'POST',
                data: oformData,
                url: 'json?ob=producto&op=addimage'
            }).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            });
        };

    }]).directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);
