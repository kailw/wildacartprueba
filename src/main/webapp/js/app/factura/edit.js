'use strict';

moduleFactura.controller('facturaEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {
        $scope.id = $routeParams.id;
        $scope.myDate = new Date();
        $scope.ob = "factura";
        if (sessionService) {
            $scope.usuariologeado = sessionService.getUserName();
            $scope.loginH = true;
        }

        $http({
            method: 'GET',
            url: '/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDatoFactura = response.data.message;
        }, function (response) {
            $scope.ajaxDatoFactura = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.guardar = function () {
            var json = {
                id: $scope.ajaxDatoFactura.id,
                fecha: null,
                iva: $scope.ajaxDatoFactura.iva,
                id_usuario: $scope.ajaxDatoFactura.obj_Usuario.id
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
                $scope.ajaxDatoFactura = response.data.message || 'Request failed';
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