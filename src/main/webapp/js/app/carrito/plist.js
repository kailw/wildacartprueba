'use strict';

moduleCarrito.controller('carritoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', "sessionService", "$route", "$window",
    function ($scope, $http, $location, toolService, $routeParams, sessionService, $route, $window) {

        $scope.totalPages = 1;
        $scope.select = ["5", "10", "25", "50", "500"];
        $scope.ob = "carrito";
        $scope.error = "";
        $scope.productoComprado = false;

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }


        if (sessionService) {
            $scope.usuariologeado = sessionService.getUserName();
            $scope.loginH = true;
            $scope.usuariologeadoID = sessionService.getId();
        }


        $scope.resetOrder = function () {
            $location.url($scope.ob + "/plist/" + $scope.rpp + "/1");
            $scope.activar = "false";
        };


        $scope.ordena = function (order, align) {
            if ($scope.orderURLServidor === "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor += "-" + order + "," + align;
                $scope.orderURLCliente += "-" + order + "," + align;
            }
            ;
            $location.url($scope.ob + "/plist/" + $scope.rpp + "/" + $scope.page + "/" + $scope.orderURLCliente);
        };


        $scope.mostrar = function () {
            $http({
                method: 'GET',
                url: '/json?ob=' + $scope.ob + '&op=show'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataCarritoShow = response.data.message;
                $scope.precioProducto = 0;
                $scope.cantidadProducto = 0;
                if ($scope.ajaxDataCarritoShow === "Carrito vacio") {
                    $scope.carritoVacio = true;
                    $scope.carritoVacioTabla = false;
                } else {
                    $scope.carritoVacio = false;
                    $scope.carritoVacioTabla = true;
                }
                for (var i = 0; i < response.data.message.length; i++) {
                    $scope.precioProducto += response.data.message[i].obj_Producto.precio;
                    $scope.cantidadProducto += response.data.message[i].cantidad;
                }

            }, function (response) {
                $scope.status = response.status;
                $scope.error += $scope.status + " " + response.message || 'Request failed';
            });
        };

        $scope.mostrar();

        $scope.carrito = function (operacion, id, cantidad) {
            $http({
                method: 'GET',
                url: '/json?ob=' + $scope.ob + '&op=' + operacion + '&producto=' + id + '&cantidad=' + cantidad
            }).then(function (response) {
                $route.reload();
            }, function (response) {
                $scope.status = response.status;
                $scope.error = $scope.status + " " + response.message || 'Request failed';
            });
        };

        $scope.empty = function () {
            $http({
                method: 'GET',
                url: '/json?ob=' + $scope.ob + '&op=empty'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataCarritoShow = response.data.message;
                if ($scope.ajaxDataCarritoShow === "Carrito vacio") {
                    $scope.carritoVacio = true;
                    $scope.carritoVacioTabla = false;
                }

            }, function (response) {
                $scope.status = response.status;
                $scope.error += $scope.status + " " + response.message || 'Request failed';
            });
        };


        $scope.buy = function () {
            $http({
                method: 'GET',
                url: '/json?ob=' + $scope.ob + '&op=buy'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataCarritoShow = response.data.message;
                $scope.productoComprado = true;
                $scope.carritoVacioTabla = false;
                $scope.carritoVacio = false;
                console.log($scope.ajaxDataCarritoShow);
            }, function (response) {
                $scope.status = response.status;
                $scope.error += $scope.status + " " + response.data.message || 'Request failed';
                console.log($scope.error);
            });
        };

        $scope.update = function () {
            $location.url($scope.ob + "/plist/" + $scope.rpp + "/" + $scope.page + "/" + $scope.orderURLCliente);
        };


        $scope.isActive = toolService.isActive;
    }



]);