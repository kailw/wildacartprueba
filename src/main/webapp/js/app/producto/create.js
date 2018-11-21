'use strict';

moduleProducto.controller('productoCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams','sessionService',
    function ($scope, $http, $location, toolService, $routeParams,sessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "producto";
        
        
                
        if(sessionService){
            $scope.usuariologeado = sessionService.getUserName();
            $scope.loginH = true;
        }
        
        $scope.guardar = function () {
            var json = {
                id: null,
                codigo: $scope.codigo,
                desc: $scope.descripcion,
                existencias : $scope.existencias,
                precio: $scope.precio,
                foto: $scope.foto,
                id_tipoProducto: $scope.id_tipoProducto              
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
                $scope.status = response.status;
            });
        };
        $scope.isActive = toolService.isActive;

    }]);