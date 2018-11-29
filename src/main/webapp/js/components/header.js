'use strict';
moduleComponent.component('headerComponent', {
    templateUrl: 'js/app/components/header.html',
    controllerAs: 'c',
    controller: js
});

function js(toolService, sessionService) {
    var self = this;

    self.loginH = sessionService.isSessionActive();
    self.usuariologeado = sessionService.getUserName();
    self.usuariologeadoID = sessionService.getId();        
    self.isActive = toolService.isActive;    
}







