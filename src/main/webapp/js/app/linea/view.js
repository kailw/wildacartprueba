'use strict'

moduleLinea.controller('lineaViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
        function ($scope, $http, $location, toolService, $routeParams,sessionService) {
            $scope.id = $routeParams.id;
            $scope.ob = "linea";

            if (sessionService) {
                $scope.usuariologeado = sessionService.getUserName();
                $scope.loginH = true;
            }
            $http({
                method: 'GET',
                url: '/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDatoLinea = response.data.message;
            }, function (response) {
                $scope.ajaxDatoLinea = response.data.message || 'Request failed';
                $scope.status = response.status;
            });

            $scope.isActive = toolService.isActive;

        }
]);