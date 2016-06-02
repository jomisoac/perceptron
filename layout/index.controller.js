(function() {
    'use strict';

    angular
        .module('agi')
        .controller('indexController', indexController);

    function indexController($location, $state) {
        var vm = this;

        vm.hoy = new Date;
    }
})();


