moduleComponent.component('headerComponent', {
    templateUrl: 'js/app/components/header.html',
    controllerAs: 'c',
    controller: js
});

function js(toolService, sessionService) {
    var self = this;

//  console.log(sessionService.isSessionActive());
    self.loginH = sessionService.isSessionActive();
    self.usuariologeado = sessionService.getUserName();
    self.usuariologeadoID = sessionService.getId();
    self.isActive = toolService.isActive;


    self.carrito = sessionService.getCountCarrito();
    sessionService.registerObserverCallback(function () {
        self.carrito = sessionService.getCountCarrito();
    });
}
;







