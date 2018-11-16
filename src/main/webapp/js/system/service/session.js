'use strict';

moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var usuariologeadoID = "";
        return {
            getUserName: function () {
                return userName;
            },
            setUserName: function (name) {
                userName = name;
            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setId: function (id) {
                usuariologeadoID = id;
            },
            getId : function(){
                return usuariologeadoID;
            },
            setSessionActive: function () {
                isSessionActive = true;
            },
            setSessionInactive: function () {
                isSessionActive = false;
            }
        }

    }]);