'use strict'

moduleProducto.controller('productoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.totalPages = 1;
        $scope.select = ["5", "10", "25", "50", "500"];
        if (!$routeParams.rpp) {
            $scope.numeroRegistrosPagina = "10";
        } else {
            $scope.numeroRegistrosPagina = $routeParams.rpp;
        }
        if (!$routeParams.page) {
            $scope.numeroPagina = "1";
        } else {
            if ($routeParams.page >= 1) {
                $scope.numeroPagina = $routeParams.page;
            } else {
                $scope.numeroPagina = "1";
            }
        }

        if (!$routeParams.column) {
            $scope.column = "id";
        } else {
            $scope.column = $routeParams.column;
        }

        if (!$routeParams.order) {
            $scope.order = "asc";
        } else {
            $scope.order = $routeParams.order;
        }



        $http({
            method: 'GET',
            withCredentials: true,
            url: "http://localhost:8081/trolleyes/json?ob=producto&op=getcount"
        }).then(function (response) {
            $scope.status = response.status;
            $scope.numeroRegistros = response.data.message;
            $scope.totalPages = Math.ceil($scope.numeroRegistros / $scope.numeroRegistrosPagina);
            pagination2();
            $scope.arrayPages = [];
            for (var i = 1; i <= $scope.totalPages; i++) {
                $scope.arrayPages.push(i);
            }

        }, function (response) {
            $scope.numeroRegistros = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $http({
            method: "GET",
            withCredential: true,
            url: "http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=" + $scope.numeroRegistrosPagina + "&page=" + $scope.numeroPagina +
                    "&column=" + $scope.column + "&order=" + $scope.order
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoProducto = response.data.message;
        }, function (response) {
//                $scope.cssAlertSuccessDos = "alert alert-danger"
//                $scope.ajaxMensajeProducto2 = "Debes introducir al menos un número";
            $scope.ajaxDatoProducto = response.data.message || 'Request failed';
            $scope.status = response.status;
        });



        $scope.onChange = function () {
            $location.path("producto/plist/" + $scope.numeroRegistrosPagina + "/" + $scope.numeroPagina); //{{numeroPagina}}/' + $scope.adda.id);                  
        }

        $scope.ordenar = function (column, order) {
            $http({
                method: "GET",
                url: "http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=" + $scope.numeroRegistrosPagina + "&page=" + $scope.numeroPagina +
                        "&column=" + $scope.column + "&order=" + $scope.order
            }).then(function (response) {
                $location.url("producto/plist/" + $scope.numeroRegistrosPagina + "/" + $scope.numeroPagina + "/" + column + "/" + order);
                $scope.status = response.status;
                $scope.ajaxDatoProducto = response.data.message;
            }, function (response) {
                $scope.ajaxDatoProducto = response.data.message || 'Request failed';
                $scope.status = response.status;
            });

        }

        function pagination2() {
            $scope.list2 = [];
            $scope.neight = Math.ceil($scope.numeroPagina);
            $scope.negith_next = $scope.neight + 1;
            $scope.negith_prev = $scope.neight - 1;
            $scope.num = "3";
            $scope.num2 = "4";            
            $scope.aux1 = $scope.negith_next + 1;
            $scope.aux2 = $scope.negith_prev - 1;
            $scope.borrar = "8";

            if ($scope.totalPages > 5) {
                for (var i = 1; i <= $scope.totalPages; i++) {
                    if (i === $scope.negith_next) {
                        $scope.list2.push(i);
                    } else if (i === $scope.negith_prev) {
                        $scope.list2.push(i);
                    } else if (i === $scope.neight) {
                        $scope.list2.push(i);
                    } else if (i === $scope.aux1) {
                        $scope.list2.push("...");
                        $scope.list2.push($scope.totalPages);
                    } else if (i === $scope.aux2) {
                        $scope.list2.push("1");
                        $scope.list2.push("...");
                    }
                }
                if ($scope.num === $scope.numeroPagina) {
                    $scope.list2.splice(1, 1);                                       
                } else if ($scope.borrar === $scope.numeroPagina){                    
                    $scope.list2.splice(5, 1); 
                }                                
            } else {
                for (var i = 1; i <= $scope.totalPages; i++) {
                    if (i === $scope.negith_next) {
                        $scope.list2.push(i);
                    } else if (i === $scope.negith_prev) {
                        $scope.list2.push(i);
                    } else if (i === $scope.neight) {
                        $scope.list2.push(i);
                    } else if (i === $scope.aux1) {
                        $scope.list2.push("...");
                        $scope.list2.push($scope.totalPages);
                    } else if (i === $scope.aux2) {
                        $scope.list2.push("1");
                        $scope.list2.push("...");
                    }
                }
                if ($scope.num === $scope.numeroPagina) {
                    $scope.list2.splice(1, 1);
                    $scope.list2.splice(4, 1);
                }
            }
        }



        $scope.limpiar = function () {
            $scope.numeroInsertar = "";
            $scope.numeroRegistrosPagina = "10";
            $scope.cssAlertSuccessUno = "";
            $scope.cssAlertSuccessDos = "";
            $scope.ajaxMensajeProducto1 = "";
            $scope.ajaxMensajeProducto2 = "";
            $scope.numeroPagina = "1";
            $scope.onChange();
        }

        $scope.isActive = toolService.isActive;

    }]);