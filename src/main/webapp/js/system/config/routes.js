var autenticacionAdministrador = function ($q, $location, $http, sessionService, countcarritoService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'json?ob=usuario&op=check'
    }).then(function (response) {
        //comprobar que el usuario en sesión es administrador
        if (response.data.message.obj_tipoUsuario.id === 1) {
            //hay que meter el usuario activo en el sessionService
            sessionService.setSessionActive();
            sessionService.setTipoUserId(response.data.message.obj_tipoUsuario.id);
            sessionService.setAdmin();
            sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
            sessionService.setId(response.data.message.id);
            deferred.resolve();
        } else {
            $location.path('/home');
        }
    }, function (response) {
        sessionService.setSessionInactive;
        $location.path('/home');
    });
    return deferred.promise;
};


var autenticacionUsuario = function ($q, $location, $http, sessionService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'json?ob=usuario&op=check'
    }).then(function (response) {
        //comprobar que el usuario en sesión es usuario
        if (response.data.message.obj_tipoUsuario.id === 2) {
            //hay que meter el usuario activo en el sessionService
            sessionService.setTipoUserId(response.data.message.obj_tipoUsuario.id);
            sessionService.setSessionActive();
            sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
            sessionService.setId(response.data.message.id);
            deferred.resolve(response.data.message);
        } else {
            $location.path('/home');
        }
    }, function (response) {
        sessionService.setSessionInactive;
        $location.path('/home');
    });
    return deferred.promise;
};

var autenticacionHome = function ($q, sessionService, $http) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.message !== "No active session") {
            if (response.data.message.obj_tipoUsuario.id === 1) {
                sessionService.setSessionActive();
                sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                sessionService.setId(response.data.message.id);
                sessionService.setAdmin();
                sessionService.setTipoUserId(response.data.message.obj_tipoUsuario.id);
                deferred.resolve();
            } else if (response.data.message.obj_tipoUsuario.id === 2) {
                sessionService.setSessionActive();
                sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                sessionService.setTipoUserId(response.data.message.obj_tipoUsuario.id);
                sessionService.setId(response.data.message.id);
                sessionService.setUser();
                deferred.resolve();
            }
        }
        deferred.resolve();

    }, function (response) {
        deferred.resolve();
    });
    return deferred.promise;
};


wildcart.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'js/app/common/home.html', controller: 'homeController', resolve: {auth: autenticacionHome}});
        $routeProvider.when('/home', {templateUrl: 'js/app/common/home.html', controller: 'homeController', resolve: {auth: autenticacionHome}});
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/edit/:id?', {templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/remove/:id?', {templateUrl: 'js/app/tipousuario/remove.html', controller: 'tipousuarioRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/create', {templateUrl: 'js/app/tipousuario/create.html', controller: 'tipousuarioCreateController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/producto/plist_1/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist_1.html', controller: 'productoPlist_1Controller', resolve: {auth: autenticacionAdministrador}});
        //$routeProvider.when('/producto/plist_1/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist_1.html', controller: 'productoPlist_1Controller', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/edit/:id?', {templateUrl: 'js/app/producto/edit.html', controller: 'productoEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/create', {templateUrl: 'js/app/producto/create.html', controller: 'productoCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/remove/:id?', {templateUrl: 'js/app/producto/remove.html', controller: 'productoRemoveController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/view/:id?', {templateUrl: 'js/app/factura/view.html', controller: 'facturaViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/edit/:id?', {templateUrl: 'js/app/factura/edit.html', controller: 'facturaEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/remove/:id?', {templateUrl: 'js/app/factura/remove.html', controller: 'facturaRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/create/:id?', {templateUrl: 'js/app/factura/create.html', controller: 'facturaCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/plistlinea/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plistlinea.html', controller: 'facturaPlistLineaController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/newfacturauser/:id?', {templateUrl: 'js/app/factura/newfacturauser.html', controller: 'facturaNewUserController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/linea/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/view/:id?', {templateUrl: 'js/app/linea/view.html', controller: 'lineaViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/edit/:id?', {templateUrl: 'js/app/linea/edit.html', controller: 'lineaEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/remove/:id?', {templateUrl: 'js/app/linea/remove.html', controller: 'lineaRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/create/:id?', {templateUrl: 'js/app/linea/create.html', controller: 'lineaCreateController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/edit/:id?', {templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/remove/:id?', {templateUrl: 'js/app/usuario/remove.html', controller: 'usuarioRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/create', {templateUrl: 'js/app/usuario/create.html', controller: 'usuarioCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/plistfactura/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plistfactura.html', controller: 'usuarioPlistFacturaController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/carrito/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/carrito/plist.html', controller: 'carritoPlistController'});

        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/view/:id?', {templateUrl: 'js/app/tipoproducto/view.html', controller: 'tipoproductoViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/edit/:id?', {templateUrl: 'js/app/tipoproducto/edit.html', controller: 'tipoproductoEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/remove/:id?', {templateUrl: 'js/app/tipoproducto/remove.html', controller: 'tipoproductoRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/create', {templateUrl: 'js/app/tipoproducto/create.html', controller: 'tipoproductoCreateController', resolve: {auth: autenticacionAdministrador}});


        $routeProvider.when('/login', {templateUrl: 'js/app/login.html', controller: 'usuarioLoginController', resolve: {auth: autenticacionHome}});
        $routeProvider.when('/logout', {templateUrl: 'js/app/logout.html', controller: 'usuarioLogoutController', resolve: {auth: autenticacionHome}});

        $routeProvider.when('/user/usuario/view/:id?', {templateUrl: 'js/app/user/usuario/view.html', controller: 'usuarioViewUsuarioController', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/user/usuario/plistfactura/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/user/usuario/plistfactura.html', controller: 'usuarioPlistFacturaUsuarioController', resolve: {auth: autenticacionUsuario}});

        $routeProvider.when('/user/usuario/edit/:id?', {templateUrl: 'js/app/user/usuario/edit.html', controller: 'usuarioEditUsuarioController', resolve: {auth: autenticacionUsuario}});
        
        $routeProvider.when('/user/factura/plistlinea/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/user/factura/plistlinea.html', controller: 'facturaPlistLineaUsuarioController', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/user/factura/view/:id?', {templateUrl: 'js/app/user/factura/view.html', controller: 'facturaViewUsuarioController', resolve: {auth: autenticacionUsuario}});

        $routeProvider.when('/user/producto/view/:id?', {templateUrl: 'js/app/user/producto/view.html', controller: 'productoViewUsuarioController', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/user/producto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/user/producto/plist.html', controller: 'productoPlistUsuarioController', resolve: {auth: autenticacionUsuario}});





        $routeProvider.otherwise({redirectTo: '/'});
    }]);