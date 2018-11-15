'use strict';

moduleTipousuario.controller('tipousuarioSelectionController', ['$scope', '$http', '$location', 'toolService',
    function ($scope, $http, $location, toolService) {
        $scope.ruta = $location.path();
        $scope.numeroPagina = "1";
        $scope.numeroRegistrosPagina = "10";
        $scope.ob = "tipousuario";

        $http({
            method: "GET",
            withCredential: true,
            url: "/json?ob=" + $scope.ob + "&op=getpage&rpp=" + $scope.numeroRegistrosPagina + "&page=" + $scope.numeroPagina
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoTipousuario = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoTipousuario = response.data.message || 'Request failed';
        });

        $http({
            method: "GET",
            withCredential: true,
            url: "/json?ob=" + $scope.ob + "&op=getpage&rpp=" + $scope.numeroRegistrosPagina + "&page=" + $scope.numeroPagina
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoTipousuario = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoTipousuario = response.data.message || 'Request failed';
        });

        $scope.seleccionar = function (id) {
            $http({
                method: "GET",
                withCredential: true,
                url: "/json?ob=" + $scope.ob + "&op=get&id=" + id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDatoTipousuarioID = response.data.message;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDatoTipousuarioID = response.data.message || 'Request failed';
            });

        };

        moduloDirectivas.directive('addModalVar', [function () {
                return {
                    restrict: 'A',
                    templateUrl: 'modal/selection.html',
                    scope: {
                        arrayDeVariables: '=arrayDeVariables'
                    },
                    link: function (scope, element, attrs) {
                        scope.newVariableAndValue = {
                            name: '',
                            value: ''
                        };
                        scope.save = function () {
                            var tempVariableAndValue = {
                                name: scope.newVariableAndValue.name,
                                value: scope.newVariableAndValue.value
                            }
                            scope.arrayDeVariables.push(tempVariableAndValue);
                        };
                    }
                };
            }]);


        $scope.isActive = toolService.isActive;

    }
]);