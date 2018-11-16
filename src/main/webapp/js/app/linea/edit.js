'use strict';

moduleLinea.controller('lineaEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
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


        $scope.guardar = function () {
            var json = {
                id: $scope.ajaxDatoLinea.id,
                cantidad: $scope.ajaxDatoLinea.cantidad,
                id_producto: $scope.ajaxDatoLinea.id_producto,
                id_factura: $scope.ajaxDatoLinea.id_factura
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
                $scope.ajaxDatoLinea = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };


//        $scope.oModal = function () {
//        // Debes proveer un controlador y una plantilla.
//        ModalService.showModal({
//            template: 'js/app/tipousuario/selection.html',
//            controller: 'tipousuarioSelectionController'
//        }).then(function (modal) {
//            modal.close.then(function (result) {
//                // Una vez que el modal sea cerrado, la libreria invoca esta función
//                // y en result tienes el resultado.
//                $scope.resultadoModal = result;
//            });
//        });
//
//        };
        $scope.isActive = toolService.isActive;

    }]);