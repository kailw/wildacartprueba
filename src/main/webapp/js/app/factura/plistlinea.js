'use strict'

moduleFactura.controller('facturaPlistLineaController', ['$scope', 'toolService', '$http', 'sessionService', '$routeParams', '$location',
    function ($scope, toolService, $http, sessionService, $routeParams, $location) {
        $scope.id = $routeParams.id;
        $scope.idUsuarioFactura;
        $scope.totalPages = 1;
        $scope.ob = "factura";
        $scope.select = ["5", "10", "25", "50", "500"];

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = "10";
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        if (!$routeParams.page) {
            $scope.page = "1";
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = "1";
            }
        }


        $scope.resetOrder = function () {
            $location.url("factura/plistlinea/" + $scope.id + "/10/1");
        };


        $scope.ordena = function (order, align) {
            if ($scope.orderURLServidor === "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            $location.url(`factura/plistfactura/` + $scope.id + `/` + $scope.rpp + `/` + $scope.page + `/` + $scope.orderURLCliente);
        };

        //getcount
        $http({
            method: 'GET',
            url: '/json?ob=linea&op=getcountxlinea&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoLineaFactura = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDatoLineaFactura / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDatoLineaFactura = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $scope.hola;

        $http({
            method: 'GET',
            url: '/json?ob=linea&op=getlineafactura&rpp=' + $scope.rpp + '&page=' + $scope.page + '&id=' + $scope.id + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoLineaFactura = response.data.message;
            $scope.idUsuarioFactura = response.data.message[0].obj_Factura.id_usuario;
            $scope.idFactura = response.data.message[0].obj_Factura.id;
            $http({
                method: 'GET',
                url: '/json?ob=usuario&op=get&id=' + $scope.idUsuarioFactura
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDatosUsuarios = response.data.message;                                                                
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDatosUsuarios = response.data.message || 'Request failed';
            });
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoLineaFactura = response.data.message || 'Request failed';
        });





        $scope.update = function () {
            $location.url(`factura/plistlinea/` + $scope.id + `/` + $scope.rpp + `/` + $scope.page + '/' + $scope.orderURLCliente);
        };

        //paginacion neighbourhood
        function pagination2() {
            $scope.list2 = [];
            $scope.neighborhood = 1;
            for (var i = 1; i <= $scope.totalPages; i++) {
                if (i === $scope.page) {
                    $scope.list2.push(i);
                } else if (i <= $scope.page && i >= ($scope.page - $scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i >= $scope.page && i <= ($scope.page - -$scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i === ($scope.page - $scope.neighborhood) - 1) {
                    if ($scope.page >= 4) {
                        $scope.list2.push("...");
                    }
                } else if (i === ($scope.page - -$scope.neighborhood) + 1) {
                    if ($scope.page <= $scope.totalPages - 3) {
                        $scope.list2.push("...");
                    }
                }
            }
        }
        ;


        $scope.isActive = toolService.isActive;



    }
]);